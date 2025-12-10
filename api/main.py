import io
import os
import time
from typing import Dict, List

import torch
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, UnidentifiedImageError
from pydantic import BaseModel
from torchvision import transforms

MODEL_PATH = os.getenv("MODEL_PATH", "Models/disease_detector_v1.pt")
API_PREFIX = os.getenv("API_PREFIX", "/api/disease")
CLASS_NAMES_PATH = os.getenv("CLASS_NAMES_PATH", "")
MAX_IMAGE_SIZE_MB = float(os.getenv("MAX_IMAGE_SIZE_MB", "8"))

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

_model = None
_class_names: List[str] = []

preprocess = transforms.Compose(
    [
        transforms.Resize((256, 256)),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ]
)


class PredictionResponse(BaseModel):
    disease: str
    confidence: float
    severity: str
    description: str
    treatment: List[str]
    prevention: List[str]
    inference_ms: float


DISEASE_META: Dict[str, Dict[str, object]] = {
    "leaf_rust": {
        "description": "Fungal disease causing orange-brown pustules on leaves. Common in wheat crops during humid conditions.",
        "treatment": [
            "Apply fungicide containing Propiconazole or Tebuconazole at 0.1%",
            "Repeat spray after 10-15 days if symptoms persist",
            "Remove severely infected leaves to reduce spread",
            "Ensure proper spacing for air circulation",
        ],
        "prevention": [
            "Use disease-resistant varieties",
            "Avoid overhead irrigation",
            "Maintain proper plant spacing",
            "Apply preventive fungicide before disease onset",
        ],
    },
    "powdery_mildew": {
        "description": "White powdery growth on leaves and stems. Thrives in warm, dry conditions with high humidity.",
        "treatment": [
            "Apply sulfur-based fungicide as per label",
            "Use neem oil solution (2-3%) in early stages",
            "Prune infected parts to improve airflow",
            "Avoid excessive nitrogen fertilization",
        ],
        "prevention": [
            "Plant resistant varieties",
            "Avoid dense planting",
            "Water at the base, not on leaves",
            "Maintain proper nutrition and airflow",
        ],
    },
}


def load_class_names() -> List[str]:
    if CLASS_NAMES_PATH and os.path.exists(CLASS_NAMES_PATH):
        with open(CLASS_NAMES_PATH, "r", encoding="utf-8") as handle:
            names = [line.strip() for line in handle if line.strip()]
            if names:
                return names
    # Default list; adjust to your trained classes
    return ["leaf_rust", "powdery_mildew", "early_blight", "late_blight", "healthy"]


def load_model() -> torch.nn.Module:
    global _class_names
    if not os.path.exists(MODEL_PATH):
        raise RuntimeError(f"Model file not found at {MODEL_PATH}")
    try:
        model = torch.jit.load(MODEL_PATH, map_location=DEVICE)
    except Exception as exc:  # noqa: BLE001
        raise RuntimeError(
            "Unable to load model. Please export the model as TorchScript "
            "(torch.jit.trace/script) or provide a loadable .pt with architecture."
        ) from exc
    model.eval()
    _class_names = load_class_names()
    return model


def ensure_class_name(index: int) -> str:
    if index < len(_class_names):
        return _class_names[index]
    # Extend dynamically if model outputs more classes than we have names for
    missing = index - len(_class_names) + 1
    _class_names.extend([f"class_{i}" for i in range(len(_class_names), len(_class_names) + missing)])
    return _class_names[index]


def severity_from_confidence(conf: float) -> str:
    if conf >= 0.8:
        return "high"
    if conf >= 0.55:
        return "medium"
    return "low"


def build_meta(label: str, confidence: float) -> PredictionResponse:
    key = label.lower().replace(" ", "_")
    meta = DISEASE_META.get(key, {})
    description = meta.get("description", f"Detected sign of {label}. Review visually to confirm.")
    treatment = meta.get(
        "treatment",
        [
            "Isolate affected plants to limit spread",
            "Consult local agronomist for targeted chemical/biological control",
            "Follow label instructions for any spray applications",
        ],
    )
    prevention = meta.get(
        "prevention",
        [
            "Rotate crops to break disease cycles",
            "Use certified disease-free seeds",
            "Maintain proper spacing and sanitation",
            "Monitor field regularly for early signs",
        ],
    )
    return PredictionResponse(
        disease=label,
        confidence=round(confidence * 100, 2),
        severity=severity_from_confidence(confidence),
        description=description,
        treatment=list(treatment),
        prevention=list(prevention),
        inference_ms=0.0,
    )


def predict(image_bytes: bytes) -> PredictionResponse:
    if _model is None:
        raise RuntimeError("Model not loaded")
    try:
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    except (UnidentifiedImageError, OSError) as exc:  # noqa: BLE001
        raise HTTPException(status_code=400, detail="Invalid image file") from exc

    tensor = preprocess(image).unsqueeze(0).to(DEVICE)
    start = time.perf_counter()
    with torch.inference_mode():
        output = _model(tensor)
        if isinstance(output, (list, tuple)):
            output = output[0]
        if output.ndim == 1:
            output = output.unsqueeze(0)
        probs = torch.softmax(output, dim=1)
        conf, idx = torch.max(probs, dim=1)
    elapsed_ms = (time.perf_counter() - start) * 1000
    label = ensure_class_name(int(idx.item()))
    response = build_meta(label, float(conf.item()))
    response.inference_ms = round(elapsed_ms, 2)
    return response


app = FastAPI(title="Plant Disease Detection API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def _startup() -> None:
    global _model
    _model = load_model()


@app.get(f"{API_PREFIX}/health")
def health() -> Dict[str, object]:
    return {
        "status": "ok",
        "model_loaded": _model is not None,
        "device": str(DEVICE),
        "classes": _class_names,
    }


@app.post(f"{API_PREFIX}/predict", response_model=PredictionResponse)
async def predict_endpoint(
    file: UploadFile = File(..., description="Leaf/plant image"),
    crop_type: str = Form(default="", description="Optional crop type"),
) -> PredictionResponse:
    content = await file.read()
    max_bytes = MAX_IMAGE_SIZE_MB * 1024 * 1024
    if len(content) > max_bytes:
        raise HTTPException(status_code=413, detail=f"Image too large (>{MAX_IMAGE_SIZE_MB}MB)")
    response = predict(content)
    if crop_type:
        response.description += f" | Crop: {crop_type}"
    return response

