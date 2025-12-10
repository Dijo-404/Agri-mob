import React from "react";
import { ArrowRight, CloudSun, Layers, Map, ShieldCheck, Sparkles, Sprout, Bug, TrendingUp, Mic, Users, Calculator, BookOpenCheck, FlaskConical, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type Feature = {
  title: string;
  description: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
};

const features: Feature[] = [
  { title: "Crop Recommendation", description: "AI-powered crop suggestions", to: "/crop-recommendation", icon: Sprout, gradient: "from-emerald-500 to-lime-500" },
  { title: "Disease Detection", description: "Upload leaf images to detect diseases", to: "/disease-prediction", icon: ShieldCheck, gradient: "from-rose-500 to-orange-500" },
  { title: "Pest Detection", description: "Identify pests and controls", to: "/pest-detection", icon: Bug, gradient: "from-purple-500 to-indigo-500" },
  { title: "Market Prices", description: "Real-time mandi insights", to: "/market-analytics", icon: TrendingUp, gradient: "from-sky-500 to-blue-500" },
  { title: "AI Assistant", description: "Ask anything about your farm", to: "/ai-assistant", icon: Sparkles, gradient: "from-pink-500 to-fuchsia-500" },
  { title: "Profit & Loss", description: "Track farm profitability", to: "/profit-loss", icon: Calculator, gradient: "from-amber-500 to-orange-500" },
  { title: "Weather", description: "7-day forecast at a glance", to: "/weather", icon: CloudSun, gradient: "from-cyan-500 to-teal-500" },
  { title: "Community", description: "Join groups and chat", to: "/community", icon: Users, gradient: "from-emerald-500 to-teal-500" },
  { title: "SmartMapping", description: "Geospatial farm insights", to: "/smart-mapping", icon: Map, gradient: "from-blue-500 to-cyan-500" },
  { title: "Yield Prediction", description: "Predict crop yield", to: "/yield-prediction", icon: Layers, gradient: "from-lime-500 to-green-500" },
  { title: "Learn Courses", description: "Enhance farming knowledge", to: "/learn", icon: BookOpenCheck, gradient: "from-indigo-500 to-purple-500" },
  { title: "Soil Test", description: "Analyze soil quality", to: "/soil-test", icon: FlaskConical, gradient: "from-amber-600 to-amber-400" },
  { title: "Gov Schemes", description: "Access programs quickly", to: "/gov-schemes", icon: BookOpenCheck, gradient: "from-indigo-500 to-blue-500" },
  { title: "Helpline", description: "State-wise support numbers", to: "/helpline", icon: PhoneCall, gradient: "from-rose-500 to-red-500" },
];

export function FeatureTiles() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Explore features</p>
          <h3 className="text-xl font-display font-semibold text-foreground">Tap a card to get started</h3>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link key={feature.title} to={feature.to} className="tile-card bg-gradient-to-br" style={{ backgroundImage: undefined }}>
              <div className={cn("absolute inset-0 opacity-70 bg-gradient-to-br", feature.gradient)} />
              <div className="relative flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-white/15 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-semibold leading-tight">{feature.title}</p>
                  <p className="text-sm text-white/80">{feature.description}</p>
                </div>
                <ArrowRight className="tile-arrow h-4 w-4" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
