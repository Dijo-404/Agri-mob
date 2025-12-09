import { motion } from "framer-motion";
import { MapPin, Layers, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SensorCard } from "@/components/field/SensorCard";
import { sensorData } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

export default function FieldManagement() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Field Management</h1>
          <p className="text-muted-foreground">Monitor your fields and IoT sensors in real-time</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Layers className="w-4 h-4 mr-2" />
            Layers
          </Button>
          <Button variant="outline" size="sm">
            <Maximize2 className="w-4 h-4 mr-2" />
            Fullscreen
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Satellite Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 glass-card rounded-xl overflow-hidden"
        >
          {/* Map Placeholder */}
          <div className="relative h-[600px] bg-gradient-to-br from-primary/10 via-accent/5 to-success/10">
            {/* Satellite-style grid overlay */}
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Farm Fields */}
            <div className="absolute inset-8">
              {/* Field A */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute top-0 left-0 w-[45%] h-[55%] bg-success/30 border-2 border-success rounded-lg flex items-center justify-center"
              >
                <div className="text-center">
                  <Badge className="bg-success text-success-foreground mb-2">Field A</Badge>
                  <p className="text-xs text-foreground/80">Cotton - 12 acres</p>
                  <p className="text-xs text-success">Healthy</p>
                </div>
              </motion.div>

              {/* Field B */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute top-0 right-0 w-[50%] h-[45%] bg-success/30 border-2 border-success rounded-lg flex items-center justify-center"
              >
                <div className="text-center">
                  <Badge className="bg-success text-success-foreground mb-2">Field B</Badge>
                  <p className="text-xs text-foreground/80">Wheat - 8 acres</p>
                  <p className="text-xs text-success">Healthy</p>
                </div>
              </motion.div>

              {/* Field C - Needs attention */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-0 left-[20%] w-[55%] h-[40%] bg-warning/30 border-2 border-warning rounded-lg flex items-center justify-center"
              >
                <div className="text-center">
                  <Badge className="bg-warning text-warning-foreground mb-2">Field C</Badge>
                  <p className="text-xs text-foreground/80">Soybean - 10 acres</p>
                  <p className="text-xs text-warning">Low Moisture</p>
                </div>
              </motion.div>

              {/* Sensor Markers */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="absolute top-[15%] left-[15%] w-6 h-6 bg-accent rounded-full border-2 border-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
              >
                <MapPin className="w-3 h-3 text-white" />
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
                className="absolute top-[35%] left-[30%] w-6 h-6 bg-accent rounded-full border-2 border-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
              >
                <MapPin className="w-3 h-3 text-white" />
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="absolute top-[20%] right-[25%] w-6 h-6 bg-accent rounded-full border-2 border-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
              >
                <MapPin className="w-3 h-3 text-white" />
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9, type: "spring" }}
                className="absolute bottom-[25%] left-[45%] w-6 h-6 bg-warning rounded-full border-2 border-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform animate-pulse"
              >
                <MapPin className="w-3 h-3 text-white" />
              </motion.div>
            </div>

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 glass-card rounded-lg p-3 space-y-2">
              <p className="text-xs font-medium text-foreground">Legend</p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-success rounded" />
                <span className="text-xs text-muted-foreground">Healthy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-warning rounded" />
                <span className="text-xs text-muted-foreground">Needs Attention</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-accent rounded-full" />
                <span className="text-xs text-muted-foreground">IoT Sensor</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sensor Sidebar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-foreground">Live Sensors</h3>
            <Badge variant="outline" className="text-xs">
              {sensorData.filter(s => s.status === "online").length}/{sensorData.length} Online
            </Badge>
          </div>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {sensorData.map((sensor, index) => (
              <motion.div
                key={sensor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <SensorCard sensor={sensor} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}