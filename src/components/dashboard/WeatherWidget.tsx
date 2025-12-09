import { motion } from "framer-motion";
import { Cloud, Sun, CloudRain, Droplets, Wind, MapPin } from "lucide-react";
import { weatherData } from "@/data/mockData";

const weatherIcons: Record<string, typeof Sun> = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
};

export function WeatherWidget() {
  const { current, forecast } = weatherData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="glass-card frosted-border rounded-xl p-6 h-full"
    >
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-4 h-4 text-accent" />
        <span className="text-sm font-medium text-foreground">{current.location}</span>
      </div>

      {/* Current Weather */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-5xl font-display font-bold text-foreground">{current.temp}°</p>
          <p className="text-muted-foreground mt-1">{current.condition}</p>
        </div>
        <div className="text-right space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Droplets className="w-4 h-4 text-accent" />
            <span>{current.humidity}%</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Wind className="w-4 h-4" />
            <span>{current.wind} km/h</span>
          </div>
        </div>
      </div>

      {/* Forecast */}
      <div className="border-t border-border pt-4">
        <p className="text-sm font-medium text-muted-foreground mb-3">5-Day Forecast</p>
        <div className="grid grid-cols-5 gap-2">
          {forecast.map((day, index) => {
            const Icon = weatherIcons[day.condition] || Cloud;
            return (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="text-center p-2 rounded-lg bg-muted/30"
              >
                <p className="text-xs text-muted-foreground mb-1">{day.day}</p>
                <Icon className="w-5 h-5 mx-auto text-accent mb-1" />
                <p className="text-xs font-medium">{day.high}°</p>
                <p className="text-xs text-muted-foreground">{day.low}°</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}