import { weatherData as mockWeather } from "@/data/mockData";
import { motion } from "framer-motion";
import { Cloud, CloudSun, CloudRain, Sun } from "lucide-react";

const iconMap: Record<string, typeof Sun> = {
  sunny: Sun,
  clear: Sun,
  cloudy: Cloud,
  rain: CloudRain,
  rainy: CloudRain,
  "partly cloudy": CloudSun,
};

type ForecastStripProps = {
  days?: number;
};

export function WeatherForecastStrip({ days = 7 }: ForecastStripProps) {
  const forecast = mockWeather.forecast.slice(0, days);

  return (
    <div className="glass-card frosted-border rounded-2xl p-4 md:p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <CloudSun className="h-5 w-5 text-accent" />
          <span>7-Day Forecast</span>
        </div>
        <span className="text-xs text-muted-foreground">Based on latest feed</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
        {forecast.map((day, idx) => {
          const Icon = iconMap[day.condition] || Cloud;
          return (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx }}
              className="rounded-xl border border-white/20 bg-gradient-to-br from-white/5 to-white/0 p-3 flex flex-col gap-1"
            >
              <p className="text-xs text-muted-foreground">{day.day}</p>
              <Icon className="h-5 w-5 text-accent" />
              <p className="text-lg font-semibold text-foreground">{day.high}°C</p>
              <p className="text-xs text-muted-foreground">{day.low}° / night</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
