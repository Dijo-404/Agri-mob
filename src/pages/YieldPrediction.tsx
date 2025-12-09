import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { indianStates } from "@/data/mockData";

const crops = ["Wheat", "Rice", "Maize", "Cotton", "Soybean", "Sugarcane", "Groundnut", "Mustard", "Chana", "Bajra"];

export default function YieldPrediction() {
  const [crop, setCrop] = useState("");
  const [month, setMonth] = useState("");
  const [state, setState] = useState("");
  const [area, setArea] = useState("");
  const [year] = useState(new Date().getFullYear());
  const [rainfall, setRainfall] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ yield: number; otherCrops: { name: string; yield: number }[] } | null>(null);

  const handlePredict = async () => {
    if (!crop || !state || !area) return;

    setLoading(true);
    // Simulate API call with mock prediction
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const baseYield = parseFloat(area) * (Math.random() * 3 + 2);
    const rainfallFactor = rainfall ? 1 + (parseFloat(rainfall) / 1000) * 0.2 : 1;

    setResult({
      yield: parseFloat((baseYield * rainfallFactor).toFixed(2)),
      otherCrops: [
        { name: "Wheat", yield: parseFloat((baseYield * 0.9).toFixed(2)) },
        { name: "Rice", yield: parseFloat((baseYield * 1.1).toFixed(2)) },
        { name: "Maize", yield: parseFloat((baseYield * 0.85).toFixed(2)) },
      ].filter((c) => c.name.toLowerCase() !== crop.toLowerCase()),
    });
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-lime-500 via-green-500 to-emerald-500 text-white shadow-xl">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,#fff,transparent_40%)]" />
        <div className="relative p-6 sm:p-8 text-center">
          <BarChart3 className="h-10 w-10 mx-auto mb-3 text-white/90" />
          <h1 className="text-3xl font-display font-bold">Yield Prediction</h1>
          <p className="text-white/80 mt-1">Predict crop yield based on your farm data</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="glass-card frosted-border rounded-2xl p-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="crop">Crop</Label>
            <Select value={crop} onValueChange={setCrop}>
              <SelectTrigger id="crop" className="bg-card/70 border-white/15">
                <SelectValue placeholder="Select crop (e.g. wheat)" />
              </SelectTrigger>
              <SelectContent>
                {crops.map((c) => (
                  <SelectItem key={c} value={c.toLowerCase()}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="month">Month (1-12)</Label>
            <Input
              id="month"
              type="number"
              min={1}
              max={12}
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder="1-12"
              className="bg-card/70 border-white/15"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Select value={state} onValueChange={setState}>
              <SelectTrigger id="state" className="bg-card/70 border-white/15">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {indianStates.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="area">Area (hectares)</Label>
            <Input
              id="area"
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Area (hectares)"
              className="bg-card/70 border-white/15"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="year">Year</Label>
            <Input id="year" value={year} disabled className="bg-card/70 border-white/15 opacity-70" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rainfall">Rainfall (mm)</Label>
            <Input
              id="rainfall"
              type="number"
              value={rainfall}
              onChange={(e) => setRainfall(e.target.value)}
              placeholder="Rainfall (mm)"
              className="bg-card/70 border-white/15"
            />
          </div>

          <Button
            onClick={handlePredict}
            disabled={loading || !crop || !state || !area}
            className="w-full bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white font-semibold py-6"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Predicting...
              </>
            ) : (
              "Predict"
            )}
          </Button>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card frosted-border rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">Prediction Result</h3>
              <div className="bg-gradient-to-br from-emerald-500/20 to-lime-500/10 rounded-xl p-5 border border-emerald-500/30">
                <p className="text-sm text-muted-foreground">Predicted Yield for {crop}</p>
                <p className="text-4xl font-display font-bold text-foreground mt-2">
                  {result.yield} <span className="text-lg font-normal text-muted-foreground">tonnes</span>
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Based on {area} hectares in {state}
                </p>
              </div>

              {result.otherCrops.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Comparison with Other Crops</h4>
                  <div className="space-y-3">
                    {result.otherCrops.map((other) => (
                      <div key={other.name} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{other.name}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-accent rounded-full"
                              style={{ width: `${Math.min((other.yield / result.yield) * 100, 100)}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-foreground w-20 text-right">
                            {other.yield} t
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Tips Card */}
          <div className="glass-card frosted-border rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Yield Optimization Tips</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <span className="text-emerald-600 text-xs font-bold">1</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Ensure proper soil preparation and seed selection for your region.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <span className="text-emerald-600 text-xs font-bold">2</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Monitor soil moisture levels and irrigate at critical growth stages.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <span className="text-emerald-600 text-xs font-bold">3</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Apply balanced fertilizers based on soil test recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
