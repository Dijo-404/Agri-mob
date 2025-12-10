import { useState } from "react";
import { motion } from "framer-motion";
import {
  Droplets,
  Thermometer,
  Wind,
  Gauge,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Layers,
  RefreshCw,
} from "lucide-react";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { sensorData } from "@/data/mockData";

// Sparkline Chart Component
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const chartData = data.map((value, index) => ({ value, index }));
  return (
    <div className="h-10 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <YAxis domain={["dataMin - 5", "dataMax + 5"]} hide />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Sensor Card Component
function SensorCard({ sensor, delay }: { sensor: typeof sensorData[0]; delay: number }) {
  const iconMap: Record<string, typeof Droplets> = {
    soil_moisture: Droplets,
    temperature: Thermometer,
    humidity: Wind,
    water_level: Gauge,
  };
  const Icon = iconMap[sensor.type] || Droplets;

  const colorMap: Record<string, string> = {
    normal: "text-success",
    warning: "text-warning",
    high: "text-destructive",
  };
  const statusColor = colorMap[sensor.status] || "text-muted-foreground";

  const sparklineColor =
    sensor.status === "normal" ? "#22c55e" : sensor.status === "warning" ? "#f59e0b" : "#ef4444";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      className="glass-card rounded-xl p-4"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${
              sensor.status === "normal"
                ? "bg-success/10"
                : sensor.status === "warning"
                ? "bg-warning/10"
                : "bg-destructive/10"
            }`}
          >
            <Icon className={`w-5 h-5 ${statusColor}`} />
          </div>
          <div>
            <p className="font-medium text-foreground text-sm">{sensor.name}</p>
            <p className="text-xs text-muted-foreground">{sensor.lastUpdate}</p>
          </div>
        </div>
        {sensor.status === "normal" ? (
          <CheckCircle className="w-4 h-4 text-success" />
        ) : (
          <AlertTriangle className="w-4 h-4 text-warning" />
        )}
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-foreground">
            {sensor.value}
            <span className="text-sm font-normal text-muted-foreground ml-1">{sensor.unit}</span>
          </p>
        </div>
        <Sparkline data={sensor.history} color={sparklineColor} />
      </div>

      <div className="mt-3 pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground">7-day moisture history</p>
      </div>
    </motion.div>
  );
}

export default function FieldManagement() {
  const { toast } = useToast();
  const [selectedLayer, setSelectedLayer] = useState<"satellite" | "terrain" | "hybrid">("satellite");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleSyncSensors = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRefreshing(false);
    toast({
      title: "Sensors synced",
      description: "Latest sensor data has been updated",
    });
  };

  const handleAddMarker = () => {
    toast({
      title: "Marker added",
      description: "New field marker has been added to the map",
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Field Management</h1>
          <p className="text-muted-foreground">IoT sensors & satellite monitoring</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleSyncSensors}
            disabled={isRefreshing}
          >
            <RefreshCw className={cn("w-4 h-4 mr-2", isRefreshing && "animate-spin")} />
            {isRefreshing ? "Syncing..." : "Sync Sensors"}
          </Button>
          <Button size="sm" onClick={handleAddMarker}>
            <MapPin className="w-4 h-4 mr-2" />
            Add Marker
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Satellite View - Large Central Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-3 glass-card rounded-xl overflow-hidden"
        >
          {/* Map Controls */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium text-foreground">Farm Map View</span>
            </div>
            <div className="flex items-center gap-2">
              {(["satellite", "terrain", "hybrid"] as const).map((layer) => (
                <Button
                  key={layer}
                  variant={selectedLayer === layer ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLayer(layer)}
                  className="capitalize"
                >
                  {layer}
                </Button>
              ))}
            </div>
          </div>

          {/* Satellite Image Placeholder */}
          <div className="relative h-[500px] bg-muted">
            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80"
              alt="Satellite view of farm"
              className="w-full h-full object-cover"
            />

            {/* Map Overlay with Markers */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent">
              {/* Field Markers */}
              <div className="absolute top-[20%] left-[25%] flex flex-col items-center">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <Droplets className="w-4 h-4 text-white" />
                </div>
                <span className="mt-1 px-2 py-0.5 bg-background/90 rounded text-xs font-medium">
                  Field A - 45%
                </span>
              </div>

              <div className="absolute top-[40%] left-[55%] flex flex-col items-center">
                <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <Droplets className="w-4 h-4 text-white" />
                </div>
                <span className="mt-1 px-2 py-0.5 bg-background/90 rounded text-xs font-medium">
                  Field B - 32%
                </span>
              </div>

              <div className="absolute top-[60%] left-[35%] flex flex-col items-center">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg">
                  <Thermometer className="w-4 h-4 text-white" />
                </div>
                <span className="mt-1 px-2 py-0.5 bg-background/90 rounded text-xs font-medium">
                  28°C
                </span>
              </div>

              <div className="absolute top-[30%] left-[70%] flex flex-col items-center">
                <div className="w-8 h-8 bg-destructive rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <AlertTriangle className="w-4 h-4 text-white" />
                </div>
                <span className="mt-1 px-2 py-0.5 bg-destructive/90 text-white rounded text-xs font-medium">
                  Pest Alert
                </span>
              </div>
            </div>

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 glass-card rounded-lg p-3">
              <p className="text-xs font-medium text-foreground mb-2">Legend</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <span className="text-muted-foreground">Normal</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <span className="text-muted-foreground">Warning</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <span className="text-muted-foreground">Alert</span>
                </div>
              </div>
            </div>

            {/* Farm Info */}
            <div className="absolute bottom-4 right-4 glass-card rounded-lg p-3">
              <p className="text-xs font-medium text-foreground">Total Farm Area</p>
              <p className="text-lg font-bold text-foreground">15 acres</p>
              <p className="text-xs text-muted-foreground">5 active sensors</p>
            </div>
          </div>
        </motion.div>

        {/* Sensor Overlay - Right Sidebar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Live Sensor Data</h2>
            <span className="text-xs text-muted-foreground">Auto-refresh: 30s</span>
          </div>

          {sensorData.map((sensor, idx) => (
            <SensorCard key={sensor.id} sensor={sensor} delay={idx * 0.1} />
          ))}
        </div>
      </div>
    </div>
  );
}
