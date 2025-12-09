import { motion } from "framer-motion";
import { TestTube, Beaker, FileText, CheckCircle2, AlertCircle, ExternalLink, Shovel, Thermometer, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const testingSteps = [
  {
    step: 1,
    title: "Choose the Right Location",
    description: "Select representative areas of your field. Avoid testing near fences, trees, or areas where fertilizers were recently applied.",
    icon: Shovel,
    details: [
      "Test multiple spots across your field (at least 5-10 samples)",
      "Avoid areas with visible differences (wet spots, compacted areas)",
      "Sample at consistent depth (6-8 inches for most crops)",
    ],
  },
  {
    step: 2,
    title: "Collect Soil Samples",
    description: "Use a clean shovel or soil probe to collect samples. Mix samples from multiple locations for a composite sample.",
    icon: Beaker,
    details: [
      "Remove surface debris (leaves, grass, stones)",
      "Dig a V-shaped hole 6-8 inches deep",
      "Take a thin slice from the side of the hole",
      "Collect 10-15 subsamples from different locations",
      "Mix all subsamples in a clean bucket",
    ],
  },
  {
    step: 3,
    title: "Prepare the Sample",
    description: "Remove stones, roots, and organic matter. Air dry the sample before testing.",
    icon: FileText,
    details: [
      "Spread soil on clean paper or tray",
      "Remove large stones, roots, and debris",
      "Break up clumps and let air dry (not in direct sunlight)",
      "Do not use oven or microwave to dry",
      "Once dry, crush to fine powder consistency",
    ],
  },
  {
    step: 4,
    title: "Test pH Level",
    description: "pH indicates soil acidity or alkalinity. Most crops prefer pH between 6.0-7.5.",
    icon: Thermometer,
    details: [
      "Use pH test strips or digital pH meter",
      "Mix 1 part soil with 2 parts distilled water",
      "Stir well and let settle for 5 minutes",
      "Dip pH strip or insert pH meter probe",
      "Read the pH value (scale 0-14)",
    ],
  },
  {
    step: 5,
    title: "Test Nutrient Levels",
    description: "Test for essential nutrients: Nitrogen (N), Phosphorus (P), and Potassium (K).",
    icon: TestTube,
    details: [
      "Use soil test kit or send to laboratory",
      "Follow kit instructions for each nutrient test",
      "Nitrogen: Test with nitrate test strips",
      "Phosphorus: Use colorimetric test",
      "Potassium: Use flame test or lab analysis",
    ],
  },
  {
    step: 6,
    title: "Interpret Results",
    description: "Compare your results with optimal ranges for your crop type and make recommendations.",
    icon: BookOpen,
    details: [
      "pH: 6.0-7.5 is optimal for most crops",
      "Nitrogen: 200-400 kg/ha is good",
      "Phosphorus: 20-50 kg/ha is adequate",
      "Potassium: 150-300 kg/ha is sufficient",
      "Adjust fertilizer application based on results",
    ],
  },
];

const testingMethods = [
  {
    method: "Home Test Kit",
    description: "Quick and affordable testing using commercial soil test kits",
    pros: ["Fast results", "Affordable", "Easy to use"],
    cons: ["Less accurate", "Limited parameters"],
    bestFor: "Regular monitoring",
  },
  {
    method: "Laboratory Testing",
    description: "Professional analysis by certified soil testing laboratories",
    pros: ["Highly accurate", "Comprehensive analysis", "Expert recommendations"],
    cons: ["Takes time", "More expensive", "Requires sample submission"],
    bestFor: "Detailed analysis",
  },
  {
    method: "Digital Soil Sensors",
    description: "Modern IoT sensors for real-time soil monitoring",
    pros: ["Real-time data", "Continuous monitoring", "Multiple parameters"],
    cons: ["Initial cost", "Requires setup", "Needs maintenance"],
    bestFor: "Precision farming",
  },
];


export default function SoilTest() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">How to Test Soil</h1>
        <p className="text-muted-foreground">Complete guide to soil testing for better crop yields</p>
      </div>

      {/* External Testing Portal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <TestTube className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Soil Testing Portal</CardTitle>
                  <CardDescription>Access our advanced soil testing platform</CardDescription>
                </div>
              </div>
              <Button
                onClick={() => window.open("http://192.168.31.197/", "_blank", "noopener,noreferrer")}
                className="gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Open Portal
              </Button>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Step-by-Step Guide */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Step-by-Step Testing Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testingSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">Step {step.step}</Badge>
                      </div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                      <CardDescription className="mt-1">{step.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testing Methods Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Testing Methods Comparison</CardTitle>
            <CardDescription>Choose the right method for your needs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testingMethods.map((method, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2">{method.method}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{method.description}</p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-success mb-1">Pros:</p>
                      <ul className="space-y-1">
                        {method.pros.map((pro, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                            <CheckCircle2 className="w-3 h-3 text-success mt-0.5 flex-shrink-0" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-warning mb-1">Cons:</p>
                      <ul className="space-y-1">
                        {method.cons.map((con, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                            <AlertCircle className="w-3 h-3 text-warning mt-0.5 flex-shrink-0" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-xs">
                        <span className="font-medium">Best for: </span>
                        <span className="text-muted-foreground">{method.bestFor}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Understanding Soil Test Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Understanding Your Soil Test Results</CardTitle>
            <CardDescription>Learn how to interpret and act on your soil test data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <TestTube className="w-5 h-5 text-primary" />
                  pH Level Interpretation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg bg-destructive/5 border-destructive/20">
                    <p className="font-medium text-destructive mb-2">Acidic Soil (pH &lt; 6.0)</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      Too acidic soil can limit nutrient availability and harm beneficial microorganisms.
                    </p>
                    <p className="text-xs font-medium">Solution: Add agricultural lime (CaCO₃) to raise pH</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-success/5 border-success/20">
                    <p className="font-medium text-success mb-2">Optimal Range (pH 6.0-7.5)</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      Most crops thrive in this range. Nutrients are readily available to plants.
                    </p>
                    <p className="text-xs font-medium">Action: Maintain current pH levels</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-warning/5 border-warning/20">
                    <p className="font-medium text-warning mb-2">Alkaline Soil (pH &gt; 7.5)</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      High pH can cause micronutrient deficiencies, especially iron and zinc.
                    </p>
                    <p className="text-xs font-medium">Solution: Add sulfur or organic matter to lower pH</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Beaker className="w-5 h-5 text-primary" />
                  Nutrient Levels Explained
                </h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">N</Badge>
                      <h4 className="font-semibold">Nitrogen (N)</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Essential for leaf growth and green color. Low nitrogen causes yellowing leaves and stunted growth.
                    </p>
                    <p className="text-xs">
                      <span className="font-medium">Sources:</span> Urea, DAP, organic compost, legume crops
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">P</Badge>
                      <h4 className="font-semibold">Phosphorus (P)</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Critical for root development, flowering, and fruit formation. Deficiency leads to poor root growth.
                    </p>
                    <p className="text-xs">
                      <span className="font-medium">Sources:</span> DAP, SSP, bone meal, rock phosphate
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">K</Badge>
                      <h4 className="font-semibold">Potassium (K)</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Important for water regulation, disease resistance, and overall plant health. Low K causes weak stems.
                    </p>
                    <p className="text-xs">
                      <span className="font-medium">Sources:</span> MOP, SOP, wood ash, compost
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Common Soil Problems & Solutions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Common Soil Problems & Solutions</CardTitle>
            <CardDescription>Identify and fix common soil health issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                  <h4 className="font-semibold">Poor Drainage</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Waterlogged soil prevents root growth and causes root rot.
                </p>
                <ul className="text-xs space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                    <span>Add organic matter to improve soil structure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                    <span>Create raised beds or install drainage systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                    <span>Avoid over-irrigation</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-warning" />
                  <h4 className="font-semibold">Low Organic Matter</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Organic matter below 2% indicates poor soil fertility and structure.
                </p>
                <ul className="text-xs space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                    <span>Add compost, farmyard manure, or green manure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                    <span>Practice crop rotation with legumes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                    <span>Use cover crops during off-season</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                  <h4 className="font-semibold">Compacted Soil</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Hard, compacted soil restricts root penetration and water infiltration.
                </p>
                <ul className="text-xs space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                    <span>Deep tillage or subsoiling (avoid over-tilling)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                    <span>Add organic matter to improve soil structure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                    <span>Use cover crops with deep roots</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-warning" />
                  <h4 className="font-semibold">Nutrient Imbalance</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Excess or deficiency of nutrients affects crop growth and yield.
                </p>
                <ul className="text-xs space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                    <span>Follow soil test recommendations precisely</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                    <span>Use balanced fertilizers (NPK ratios)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                    <span>Apply micronutrients if needed (zinc, iron, boron)</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* When to Test Soil */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>When to Test Your Soil</CardTitle>
            <CardDescription>Timing is crucial for effective soil testing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4">Best Times for Testing</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-primary">1</span>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Before Planting Season</p>
                      <p className="text-sm text-muted-foreground">
                        Test 2-3 weeks before sowing to allow time for soil amendments and fertilizer application.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-primary">2</span>
                    </div>
                    <div>
                      <p className="font-medium mb-1">After Harvest</p>
                      <p className="text-sm text-muted-foreground">
                        Test after crop removal to assess nutrient depletion and plan for next season.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-primary">3</span>
                    </div>
                    <div>
                      <p className="font-medium mb-1">When Problems Arise</p>
                      <p className="text-sm text-muted-foreground">
                        If you notice poor crop growth, yellowing leaves, or low yields, test immediately.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Testing Frequency</h3>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium mb-1">Annual Testing</p>
                    <p className="text-sm text-muted-foreground">
                      Test every year for consistent monitoring and to track changes over time.
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium mb-1">Seasonal Testing</p>
                    <p className="text-sm text-muted-foreground">
                      Test before each major crop season (Kharif and Rabi) for optimal results.
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium mb-1">Problem-Based Testing</p>
                    <p className="text-sm text-muted-foreground">
                      Test whenever you notice crop health issues or after major soil amendments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Important Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Card className="bg-warning/5 border-warning/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-warning" />
              <CardTitle>Important Tips</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Test Before Planting</p>
                  <p className="text-sm text-muted-foreground">
                    Test soil 2-3 weeks before planting to allow time for amendments
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Test Annually</p>
                  <p className="text-sm text-muted-foreground">
                    Regular testing helps track soil health changes over time
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Use Clean Tools</p>
                  <p className="text-sm text-muted-foreground">
                    Always use clean, dry tools to avoid contamination
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Test Different Areas</p>
                  <p className="text-sm text-muted-foreground">
                    Different parts of your field may have different soil conditions
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
