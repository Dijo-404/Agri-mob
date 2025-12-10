# Plant Disease Detection API

FastAPI + PyTorch service to run the `Models/disease_detector_v1.pt` model and serve results to the web UI.

## Setup

```sh
cd /home/dijo404/git/Agri-mob
python -m venv .venv
source .venv/bin/activate
pip install -r api/requirements.txt
```

## Run locally

```sh
uvicorn api.main:app --reload --host 0.0.0.0 --port 8000
```

The API exposes:
- `GET /api/disease/health` — health and class list
- `POST /api/disease/predict` — multipart form with `file` (image) and optional `crop_type`

## Environment variables

- `MODEL_PATH` — path to the `.pt` file (default: `Models/disease_detector_v1.pt`)
- `API_PREFIX` — route prefix (default: `/api/disease`)
- `CLASS_NAMES_PATH` — optional newline-separated class names
- `MAX_IMAGE_SIZE_MB` — upload size guard (default: `8`)

If your model is not a TorchScript export, convert it to TorchScript (`torch.jit.trace`/`torch.jit.script`) or update the loader in `api/main.py` to match your architecture.

