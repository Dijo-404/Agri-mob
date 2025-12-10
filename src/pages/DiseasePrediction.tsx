import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, Image as ImageIcon, AlertTriangle, CheckCircle2, X, Loader2, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface DiseaseResult {
  disease: string;
  confidence: number;
  severity: "low" | "medium" | "high";
  description: string;
  treatment: string[];
  prevention: string[];
}

const sampleDiseases: DiseaseResult[] = [
  {
    disease: "Leaf Rust",
    confidence: 92,
    severity: "high",
    description: "Fungal disease causing orange-brown pustules on leaves. Common in wheat crops during humid conditions.",
    treatment: [
      "Apply fungicide containing Propiconazole or Tebuconazole",
      "Spray at 0.1% concentration, repeat after 15 days",
      "Remove and destroy severely infected leaves",
      "Ensure proper spacing for air circulation",
    ],
    prevention: [
      "Use disease-resistant varieties",
      "Avoid overhead irrigation",
      "Maintain proper plant spacing",
      "Apply preventive fungicide before disease onset",
    ],
  },
  {
    disease: "Powdery Mildew",
    confidence: 88,
    severity: "medium",
    description: "White powdery growth on leaves and stems. Thrives in warm, dry conditions with high humidity.",
    treatment: [
      "Apply sulfur-based fungicide",
      "Use neem oil solution (2-3%)",
      "Remove infected plant parts",
      "Improve air circulation",
    ],
    prevention: [
      "Plant resistant varieties",
      "Avoid dense planting",
      "Water at base, not on leaves",
      "Maintain proper nutrition",
    ],
  },
];

export default function DiseasePrediction() {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [cropType, setCropType] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiseaseResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePredict = async () => {
    if (!selectedImage || !cropType) {
      toast({
        title: "Missing information",
        description: "Please upload an image and select crop type",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate AI prediction
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Randomly select a disease result
    const randomDisease = sampleDiseases[Math.floor(Math.random() * sampleDiseases.length)];
    setResult(randomDisease);
    setLoading(false);

    toast({
      title: "Analysis complete",
      description: `Detected: ${randomDisease.disease} with ${randomDisease.confidence}% confidence`,
    });
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageFile(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-destructive/10 text-destructive";
      case "medium":
        return "bg-warning/10 text-warning";
      default:
        return "bg-success/10 text-success";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Disease Prediction</h1>
        <p className="text-muted-foreground">Upload leaf images to detect crop diseases using AI</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-primary" />
                <CardTitle>Upload Image</CardTitle>
              </div>
              <CardDescription>Upload a clear image of the affected leaf or plant part</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="cropType">Crop Type</Label>
                <Select value={cropType} onValueChange={setCropType}>
                  <SelectTrigger id="cropType">
                    <SelectValue placeholder="Select crop type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="cotton">Cotton</SelectItem>
                    <SelectItem value="maize">Maize</SelectItem>
                    <SelectItem value="soybean">Soybean</SelectItem>
                    <SelectItem value="tomato">Tomato</SelectItem>
                    <SelectItem value="potato">Potato</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {!selectedImage ? (
                <div
                  className="border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:border-primary transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="font-medium text-foreground mb-2">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground">PNG, JPG up to 5MB</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={selectedImage}
                    alt="Uploaded"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={handleRemoveImage}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}

              <Button
                onClick={handlePredict}
                className="w-full"
                disabled={!selectedImage || !cropType || loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Detect Disease
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Tips for Best Results</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Take photos in good lighting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Focus on the affected area</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Include both healthy and diseased parts if possible</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Ensure image is clear and not blurry</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {!result ? (
            <Card>
              <CardContent className="p-12 text-center">
                <ImageIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Analysis Yet</h3>
                <p className="text-muted-foreground">
                  Upload an image and select crop type, then click "Detect Disease" to get AI-powered analysis.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{result.disease}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getSeverityColor(result.severity)}>
                        {result.severity.toUpperCase()} Severity
                      </Badge>
                      <Badge variant="outline">
                        {result.confidence}% Confidence
                      </Badge>
                    </div>
                  </div>
                  {result.severity === "high" ? (
                    <AlertTriangle className="w-6 h-6 text-destructive" />
                  ) : (
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{result.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Treatment</h4>
                  <ul className="space-y-2">
                    {result.treatment.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Prevention</h4>
                  <ul className="space-y-2">
                    {result.prevention.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => {
                    setResult(null);
                    setSelectedImage(null);
                    setImageFile(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                >
                  Analyze Another Image
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

