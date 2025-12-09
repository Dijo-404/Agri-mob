import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Calendar, TrendingUp, Info, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const cropRotationPlans = [
  {
    id: 1,
    name: "Three-Year Rotation",
    crops: ["Wheat", "Legumes", "Cotton"],
    benefits: "Improves soil fertility, reduces pests",
    season: "Kharif-Rabi",
  },
  {
    id: 2,
    name: "Four-Year Rotation",
    crops: ["Rice", "Pulses", "Oilseeds", "Wheat"],
    benefits: "Balanced nutrient management",
    season: "Year-round",
  },
  {
    id: 3,
    name: "Two-Year Rotation",
    crops: ["Cotton", "Wheat"],
    benefits: "Simple and effective",
    season: "Kharif-Rabi",
  },
];

const cropCompatibility = {
  "Wheat": ["Legumes", "Mustard", "Potato"],
  "Rice": ["Pulses", "Oilseeds"],
  "Cotton": ["Wheat", "Legumes"],
  "Soybean": ["Wheat", "Maize"],
  "Maize": ["Wheat", "Pulses"],
};

export default function CropRotation() {
  const [selectedField, setSelectedField] = useState("");
  const [currentCrop, setCurrentCrop] = useState("");
  const [rotationPlan, setRotationPlan] = useState<string[]>([]);
  const [customPlan, setCustomPlan] = useState("");

  const handleAddCrop = () => {
    if (customPlan && !rotationPlan.includes(customPlan)) {
      setRotationPlan([...rotationPlan, customPlan]);
      setCustomPlan("");
    }
  };

  const handleRemoveCrop = (crop: string) => {
    setRotationPlan(rotationPlan.filter(c => c !== crop));
  };

  const getCompatibleCrops = (crop: string) => {
    return cropCompatibility[crop as keyof typeof cropCompatibility] || [];
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
        <h1 className="text-2xl font-display font-bold text-foreground">Crop Rotation</h1>
        <p className="text-muted-foreground">Plan and manage crop rotation for better soil health</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rotation Planner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-primary" />
                <CardTitle>Rotation Planner</CardTitle>
              </div>
              <CardDescription>Create a custom crop rotation plan for your fields</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="field">Select Field</Label>
                <Select value={selectedField} onValueChange={setSelectedField}>
                  <SelectTrigger id="field">
                    <SelectValue placeholder="Choose a field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="field-a">Field A - 5 acres</SelectItem>
                    <SelectItem value="field-b">Field B - 3 acres</SelectItem>
                    <SelectItem value="field-c">Field C - 4 acres</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="current-crop">Current Crop</Label>
                <Select value={currentCrop} onValueChange={setCurrentCrop}>
                  <SelectTrigger id="current-crop">
                    <SelectValue placeholder="What's currently growing?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="cotton">Cotton</SelectItem>
                    <SelectItem value="soybean">Soybean</SelectItem>
                    <SelectItem value="maize">Maize</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {currentCrop && (
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm font-medium mb-2">Recommended Next Crops:</p>
                  <div className="flex flex-wrap gap-2">
                    {getCompatibleCrops(currentCrop.charAt(0).toUpperCase() + currentCrop.slice(1)).map((crop) => (
                      <Badge key={crop} variant="outline" className="cursor-pointer hover:bg-primary/10">
                        {crop}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="rotation-plan">Rotation Plan</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="rotation-plan"
                    placeholder="Add crop to rotation"
                    value={customPlan}
                    onChange={(e) => setCustomPlan(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddCrop()}
                  />
                  <Button onClick={handleAddCrop}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {rotationPlan.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {rotationPlan.map((crop, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-2">
                        {index + 1}. {crop}
                        <button
                          onClick={() => handleRemoveCrop(crop)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <Button className="w-full">Save Rotation Plan</Button>
            </CardContent>
          </Card>

          {/* Rotation Timeline */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <CardTitle>Rotation Timeline</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rotationPlan.map((crop, index) => (
                  <div key={index} className="flex items-center gap-4 pb-4 border-b last:border-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{crop}</p>
                      <p className="text-sm text-muted-foreground">Season {index + 1}</p>
                    </div>
                    <Badge variant="outline">Planned</Badge>
                  </div>
                ))}
                {rotationPlan.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No rotation plan created yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recommended Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <CardTitle>Recommended Plans</CardTitle>
              </div>
              <CardDescription>Pre-built rotation strategies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {cropRotationPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => setRotationPlan(plan.crops)}
                >
                  <h4 className="font-semibold mb-2">{plan.name}</h4>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {plan.crops.map((crop) => (
                      <Badge key={crop} variant="outline" className="text-xs">
                        {crop}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{plan.benefits}</p>
                  <p className="text-xs text-primary">{plan.season}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Benefits Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                <CardTitle>Benefits</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Improves soil fertility and structure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Reduces pest and disease buildup</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Better nutrient utilization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Increases crop yield</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Reduces need for chemical inputs</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

