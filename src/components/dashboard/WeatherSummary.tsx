import { useEffect, useMemo, useState } from "react";
import { Cloud, Droplets, MapPin, ThermometerSun, Wind } from "lucide-react";
import { weatherData as mockWeather } from "@/data/mockData";
import { cn } from "@/lib/utils";

type WeatherResponse = {
  name: string;
  weather: { main: string; description: string; icon: string }[];
  main: { temp: number; humidity: number };
  wind: { speed: number };
};

type SummaryProps = {
  city?: string;
};

const metricCards = [
  { key: "temp", label: "Temp", icon: ThermometerSun },
  { key: "humidity", label: "Humidity", icon: Droplets },
  { key: "wind", label: "Wind", icon: Wind },
  { key: "moisture", label: "Moisture", icon: Cloud },
] as const;

export function WeatherSummary({ city = "Nagpur" }: SummaryProps) {
  const [data, setData] = useState(mockWeather.current);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    if (!apiKey) return;

    const controller = new AbortController();
    const fetchWeather = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("weather fetch failed");
        const json: WeatherResponse = await res.json();
        setData({
          temp: Math.round(json.main.temp),
          condition: json.weather?.[0]?.main ?? "Clear",
          humidity: json.main.humidity,
          wind: Math.round(json.wind.speed),
          location: json.name || city,
        });
      } catch (err) {
        console.warn("Weather fallback to mock", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
    return () => controller.abort();
  }, [city]);

  const metrics = useMemo(
    () => [
      { key: "temp", value: `${data.temp}°C` },
      { key: "humidity", value: `${data.humidity}%` },
      { key: "wind", value: `${data.wind} km/h` },
      { key: "moisture", value: "50%" }, // placeholder until soil sensor API exists
    ],
    [data]
  );

  return (
    <div className="glass-card frosted-border rounded-2xl p-5 md:p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 text-accent" />
          <span className="font-semibold text-foreground">{data.location}</span>
          <span className="text-muted-foreground">Live weather</span>
        </div>
        {isLoading && <span className="text-xs text-muted-foreground">Updating…</span>}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {metricCards.map((metric) => {
          const Icon = metric.icon;
          const value = metrics.find((m) => m.key === metric.key)?.value || "--";
          return (
            <div
              key={metric.key}
              className={cn(
                "rounded-xl px-4 py-3 border bg-gradient-to-br",
                metric.key === "temp" && "from-amber-500/15 to-orange-500/5",
                metric.key === "humidity" && "from-cyan-500/15 to-sky-500/5",
                metric.key === "wind" && "from-emerald-500/15 to-emerald-500/5",
                metric.key === "moisture" && "from-indigo-500/15 to-blue-500/5",
                "border-white/20"
              )}
            >
              <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wide">
                <Icon className="h-4 w-4 text-foreground/80" />
                <span>{metric.label}</span>
              </div>
              <p className="text-xl font-display font-semibold text-foreground mt-1">{value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
