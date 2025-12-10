import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Bug, Upload, Image as ImageIcon, AlertTriangle, CheckCircle2, X, Loader2, Camera, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface PestResult {
  pest: string;
  confidence: number;
  severity: "low" | "medium" | "high";
  description: string;
  damage: string;
  control: {
    organic: string[];
    chemical: string[];
  };
  prevention: string[];
}

const samplePests: PestResult[] = [
  {
    pest: "Aphids",
    confidence: 94,
    severity: "high",
    description: "Small, soft-bodied insects that cluster on new growth and undersides of leaves. They suck plant sap and can transmit viruses.",
    damage: "Yellowing leaves, stunted growth, honeydew secretion, sooty mold growth",
    control: {
      organic: [
        "Spray neem oil solution (2-3%) every 7-10 days",
        "Release beneficial insects like ladybugs",
        "Use insecticidal soap spray",
        "Apply garlic-chili spray",
      ],
      chemical: [
        "Imidacloprid 17.8% SL @ 0.3ml/liter",
        "Thiamethoxam 25% WG @ 0.2g/liter",
        "Apply early morning or evening",
      ],
    },
    prevention: [
      "Use yellow sticky traps",
      "Remove weeds that host aphids",
      "Encourage natural predators",
      "Avoid over-fertilization with nitrogen",
    ],
  },
  {
    pest: "Whitefly",
    confidence: 89,
    severity: "medium",
    description: "Small white-winged insects that feed on plant sap. They excrete honeydew and can transmit plant viruses.",
    damage: "Yellowing leaves, wilting, reduced yield, honeydew and sooty mold",
    control: {
      organic: [
        "Yellow sticky traps",
        "Neem oil spray (2%)",
        "Release Encarsia formosa (parasitic wasp)",
        "Spray with soap solution",
      ],
      chemical: [
        "Acetamiprid 20% SP @ 0.5g/liter",
        "Thiamethoxam 25% WG @ 0.2g/liter",
        "Spray on undersides of leaves",
      ],
    },
    prevention: [
      "Use reflective mulches",
      "Remove crop residues",
      "Monitor regularly",
      "Maintain proper spacing",
    ],
  },
  {
    pest: "Bollworm",
    confidence: 91,
    severity: "high",
    description: "Larvae that bore into cotton bolls, fruits, or pods. They cause direct damage to the harvestable parts.",
    damage: "Holes in bolls/fruits, premature dropping, reduced quality and yield",
    control: {
      organic: [
        "Release Trichogramma wasps",
        "Hand-pick and destroy larvae",
        "Use Bt (Bacillus thuringiensis) spray",
        "Apply neem-based products",
      ],
      chemical: [
        "Chlorantraniliprole 18.5% SC @ 0.3ml/liter",
        "Emamectin benzoate 5% SG @ 0.4g/liter",
        "Spray during early stages",
      ],
    },
    prevention: [
      "Use pheromone traps",
      "Crop rotation",
      "Destroy crop residues",
      "Plant early-maturing varieties",
    ],
  },
];

export default function PestDetection() {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [cropType, setCropType] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PestResult | null>(null);
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

  const handleDetect = async () => {
    if (!selectedImage || !cropType) {
      toast({
        title: "Missing information",
        description: "Please upload an image and select crop type",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate AI detection
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Randomly select a pest result
    const randomPest = samplePests[Math.floor(Math.random() * samplePests.length)];
    setResult(randomPest);
    setLoading(false);

    toast({
      title: "Detection complete",
      description: `Detected: ${randomPest.pest} with ${randomPest.confidence}% confidence`,
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
        <h1 className="text-2xl font-display font-bold text-foreground">Pest Detection</h1>
        <p className="text-muted-foreground">Identify pests and get control recommendations using AI</p>
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
                <Bug className="w-5 h-5 text-primary" />
                <CardTitle>Upload Image</CardTitle>
              </div>
              <CardDescription>Upload a clear image of the pest or damaged plant</CardDescription>
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
                onClick={handleDetect}
                className="w-full"
                disabled={!selectedImage || !cropType || loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Detecting...
                  </>
                ) : (
                  <>
                    <Bug className="w-4 h-4 mr-2" />
                    Detect Pest
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
                  <span>Take close-up photos of the pest</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Include both pest and damage signs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Ensure good lighting and focus</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Multiple angles help improve accuracy</span>
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
                <Bug className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Detection Yet</h3>
                <p className="text-muted-foreground">
                  Upload an image and select crop type, then click "Detect Pest" to get AI-powered identification and control recommendations.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{result.pest}</CardTitle>
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
                  <h4 className="font-semibold text-sm mb-2">Damage Signs</h4>
                  <p className="text-sm text-muted-foreground">{result.damage}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Organic Control Methods
                  </h4>
                  <ul className="space-y-2">
                    {result.control.organic.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-success mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Chemical Control</h4>
                  <ul className="space-y-2">
                    {result.control.chemical.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-warning mt-1">•</span>
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
                  Detect Another Pest
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

