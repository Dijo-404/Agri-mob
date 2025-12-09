import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { Wifi, WifiOff, Battery, BatteryLow, Thermometer, Droplets, FlaskConical } from "lucide-react";
import { sensorData } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function SensorCard({ sensor }: { sensor: typeof sensorData[0] }) {
  const isOnline = sensor.status === "online";
  const isLowBattery = sensor.battery < 20;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      className="glass-card rounded-xl p-4 space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isOnline ? (
            <Wifi className="w-4 h-4 text-success" />
          ) : (
            <WifiOff className="w-4 h-4 text-destructive" />
          )}
          <span className="font-medium text-foreground text-sm">{sensor.name}</span>
        </div>
        <Badge
          variant={isOnline ? "default" : "destructive"}
          className={cn(
            "text-xs",
            isOnline && "bg-success/10 text-success hover:bg-success/20"
          )}
        >
          {isOnline ? "Online" : "Offline"}
        </Badge>
      </div>

      {/* Sparkline */}
      <div className="h-12">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sensor.moistureHistory.map((value, i) => ({ day: i, value }))}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={sensor.moisture < 40 ? "hsl(var(--warning))" : "hsl(var(--accent))"}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-2 rounded-lg bg-muted/30">
          <Droplets className={cn(
            "w-4 h-4 mx-auto mb-1",
            sensor.moisture < 40 ? "text-warning" : "text-accent"
          )} />
          <p className="text-lg font-semibold">{sensor.moisture}%</p>
          <p className="text-xs text-muted-foreground">Moisture</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-muted/30">
          <Thermometer className="w-4 h-4 mx-auto mb-1 text-destructive" />
          <p className="text-lg font-semibold">{sensor.temperature}°C</p>
          <p className="text-xs text-muted-foreground">Temp</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-muted/30">
          <FlaskConical className="w-4 h-4 mx-auto mb-1 text-primary" />
          <p className="text-lg font-semibold">{sensor.ph}</p>
          <p className="text-xs text-muted-foreground">pH</p>
        </div>
      </div>

      {/* Battery */}
      <div className="flex items-center justify-between pt-2 border-t border-border/50">
        <div className="flex items-center gap-2">
          {isLowBattery ? (
            <BatteryLow className="w-4 h-4 text-destructive" />
          ) : (
            <Battery className="w-4 h-4 text-success" />
          )}
          <span className={cn(
            "text-sm",
            isLowBattery ? "text-destructive" : "text-muted-foreground"
          )}>
            {sensor.battery}%
          </span>
        </div>
        <span className="text-xs text-muted-foreground">{sensor.id}</span>
      </div>
    </motion.div>
  );
}