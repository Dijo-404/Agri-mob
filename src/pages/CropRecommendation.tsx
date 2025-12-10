import { useState } from "react";
import { motion } from "framer-motion";
import { Sprout, MapPin, Droplets, Thermometer, Sun, Wind, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { indianStates } from "@/data/mockData";

interface CropRecommendation {
  crop: string;
  suitability: number;
  reasons: string[];
  season: string;
  expectedYield: string;
  marketPrice: string;
}

const recommendedCrops: Record<string, CropRecommendation[]> = {
  "Maharashtra": [
    {
      crop: "Cotton",
      suitability: 95,
      reasons: ["Optimal soil pH (6.5-7.5)", "Suitable rainfall pattern", "High market demand"],
      season: "Kharif (June-October)",
      expectedYield: "8-12 quintals/acre",
      marketPrice: "₹6,500-7,200/quintal",
    },
    {
      crop: "Soybean",
      suitability: 90,
      reasons: ["Well-drained soil", "Moderate rainfall", "Good market price"],
      season: "Kharif (June-September)",
      expectedYield: "15-20 quintals/acre",
      marketPrice: "₹4,200-4,800/quintal",
    },
    {
      crop: "Wheat",
      suitability: 85,
      reasons: ["Cool winter climate", "Irrigation available", "Stable market"],
      season: "Rabi (November-March)",
      expectedYield: "25-30 quintals/acre",
      marketPrice: "₹2,200-2,500/quintal",
    },
  ],
  "Punjab": [
    {
      crop: "Wheat",
      suitability: 98,
      reasons: ["Perfect climate", "Fertile soil", "Excellent irrigation"],
      season: "Rabi (November-March)",
      expectedYield: "45-50 quintals/acre",
      marketPrice: "₹2,200-2,500/quintal",
    },
    {
      crop: "Rice",
      suitability: 95,
      reasons: ["High rainfall", "Clay soil", "Strong market"],
      season: "Kharif (June-October)",
      expectedYield: "35-40 quintals/acre",
      marketPrice: "₹1,800-2,200/quintal",
    },
  ],
};

export default function CropRecommendation() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [formData, setFormData] = useState({
    state: "",
    district: "",
    soilType: "",
    soilPH: "",
    rainfall: "",
    temperature: "",
    landArea: "",
    irrigation: "",
    previousCrop: "",
  });

  const handleRecommend = async () => {
    if (!formData.state || !formData.soilType || !formData.rainfall) {
      toast({
        title: "Missing information",
        description: "Please fill in at least State, Soil Type, and Rainfall",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate AI recommendation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Get recommendations based on state or generate generic ones
    const stateRecommendations = recommendedCrops[formData.state] || [
      {
        crop: "Wheat",
        suitability: 85,
        reasons: ["Suitable climate", "Good soil conditions", "Market demand"],
        season: "Rabi (November-March)",
        expectedYield: "25-30 quintals/acre",
        marketPrice: "₹2,200-2,500/quintal",
      },
      {
        crop: "Rice",
        suitability: 80,
        reasons: ["Adequate rainfall", "Suitable temperature", "High yield potential"],
        season: "Kharif (June-October)",
        expectedYield: "30-35 quintals/acre",
        marketPrice: "₹1,800-2,200/quintal",
      },
    ];

    setRecommendations(stateRecommendations);
    setLoading(false);
    
    toast({
      title: "Recommendations generated",
      description: `Found ${stateRecommendations.length} suitable crops for your farm`,
    });
  };

  const getSuitabilityColor = (suitability: number) => {
    if (suitability >= 90) return "text-success";
    if (suitability >= 75) return "text-primary";
    return "text-warning";
  };

  const getSuitabilityBadge = (suitability: number) => {
    if (suitability >= 90) return "bg-success/10 text-success";
    if (suitability >= 75) return "bg-primary/10 text-primary";
    return "bg-warning/10 text-warning";
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
        <h1 className="text-2xl font-display font-bold text-foreground">Crop Recommendation</h1>
        <p className="text-muted-foreground">AI-powered crop suggestions based on your farm conditions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1 space-y-6"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sprout className="w-5 h-5 text-primary" />
                <CardTitle>Farm Details</CardTitle>
              </div>
              <CardDescription>Enter your farm information for AI recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="state">State</Label>
                <Select value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value })}>
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="district">District (Optional)</Label>
                <Input
                  id="district"
                  placeholder="Enter district"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="soilType">Soil Type</Label>
                <Select value={formData.soilType} onValueChange={(value) => setFormData({ ...formData, soilType: value })}>
                  <SelectTrigger id="soilType">
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clay">Clay</SelectItem>
                    <SelectItem value="loamy">Loamy</SelectItem>
                    <SelectItem value="sandy">Sandy</SelectItem>
                    <SelectItem value="sandy-loam">Sandy Loam</SelectItem>
                    <SelectItem value="clay-loam">Clay Loam</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="soilPH">Soil pH (Optional)</Label>
                <Input
                  id="soilPH"
                  type="number"
                  step="0.1"
                  min="4"
                  max="9"
                  placeholder="e.g., 6.5"
                  value={formData.soilPH}
                  onChange={(e) => setFormData({ ...formData, soilPH: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="rainfall">Annual Rainfall (mm)</Label>
                <Input
                  id="rainfall"
                  type="number"
                  placeholder="e.g., 1200"
                  value={formData.rainfall}
                  onChange={(e) => setFormData({ ...formData, rainfall: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="temperature">Average Temperature (°C)</Label>
                <Input
                  id="temperature"
                  type="number"
                  placeholder="e.g., 28"
                  value={formData.temperature}
                  onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="landArea">Land Area (acres)</Label>
                <Input
                  id="landArea"
                  type="number"
                  placeholder="e.g., 5"
                  value={formData.landArea}
                  onChange={(e) => setFormData({ ...formData, landArea: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="irrigation">Irrigation Available</Label>
                <Select value={formData.irrigation} onValueChange={(value) => setFormData({ ...formData, irrigation: value })}>
                  <SelectTrigger id="irrigation">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="previousCrop">Previous Crop (Optional)</Label>
                <Input
                  id="previousCrop"
                  placeholder="e.g., Wheat"
                  value={formData.previousCrop}
                  onChange={(e) => setFormData({ ...formData, previousCrop: e.target.value })}
                />
              </div>

              <Button 
                onClick={handleRecommend} 
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sprout className="w-4 h-4 mr-2" />
                    Get Recommendations
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-4"
        >
          {recommendations.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Sprout className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Recommendations Yet</h3>
                <p className="text-muted-foreground">
                  Fill in your farm details and click "Get Recommendations" to receive AI-powered crop suggestions.
                </p>
              </CardContent>
            </Card>
          ) : (
            recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl">{rec.crop}</CardTitle>
                          <Badge className={getSuitabilityBadge(rec.suitability)}>
                            {rec.suitability}% Match
                          </Badge>
                        </div>
                        <CardDescription>{rec.season}</CardDescription>
                      </div>
                      {rec.suitability >= 90 && (
                        <CheckCircle2 className="w-6 h-6 text-success" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Why this crop?</h4>
                      <ul className="space-y-1">
                        {rec.reasons.map((reason, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1">•</span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Expected Yield</p>
                        <p className="font-semibold">{rec.expectedYield}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Market Price</p>
                        <p className="font-semibold">{rec.marketPrice}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

