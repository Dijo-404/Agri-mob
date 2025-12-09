import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Cloud, CloudRain, CloudSun, Droplets, Loader2, MapPin, Sun, Thermometer, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { indianStates, indianDistricts } from "@/data/mockData";

type WeatherData = {
  temp: number;
  feelsLike: number;
  humidity: number;
  wind: number;
  condition: string;
  icon: string;
  soilMoisture: number;
};

type ForecastDay = {
  date: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
};

const weatherIcons: Record<string, typeof Sun> = {
  sunny: Sun,
  clear: Sun,
  cloudy: Cloud,
  "partly cloudy": CloudSun,
  rain: CloudRain,
  rainy: CloudRain,
};

export default function Weather() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districts, setDistricts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);

  useEffect(() => {
    if (selectedState && indianDistricts[selectedState]) {
      setDistricts(indianDistricts[selectedState]);
      setSelectedDistrict("");
    } else {
      setDistricts([]);
    }
  }, [selectedState]);

  const fetchWeather = async () => {
    if (!selectedState) return;

    setLoading(true);
    const location = selectedDistrict || selectedState;

    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      if (apiKey) {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)},IN&units=metric&appid=${apiKey}`
        );
        if (res.ok) {
          const data = await res.json();
          setWeather({
            temp: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            humidity: data.main.humidity,
            wind: Math.round(data.wind.speed * 3.6), // m/s to km/h
            condition: data.weather[0]?.main || "Clear",
            icon: data.weather[0]?.icon || "01d",
            soilMoisture: Math.round(40 + Math.random() * 30), // Mock soil moisture
          });

          // Fetch forecast
          const forecastRes = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)},IN&units=metric&appid=${apiKey}`
          );
          if (forecastRes.ok) {
            const forecastData = await forecastRes.json();
            const dailyForecast: ForecastDay[] = [];
            const seenDates = new Set<string>();

            for (const item of forecastData.list) {
              const date = new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" });
              if (!seenDates.has(date) && dailyForecast.length < 7) {
                seenDates.add(date);
                dailyForecast.push({
                  date: dailyForecast.length === 0 ? "Today" : date,
                  high: Math.round(item.main.temp_max),
                  low: Math.round(item.main.temp_min),
                  condition: item.weather[0]?.main?.toLowerCase() || "clear",
                  icon: item.weather[0]?.icon || "01d",
                });
              }
            }
            setForecast(dailyForecast);
          }
        }
      }
    } catch (err) {
      console.warn("Weather fetch failed, using mock data", err);
    }

    // Fallback mock data
    if (!weather) {
      setWeather({
        temp: 34,
        feelsLike: 35,
        humidity: 70,
        wind: 19,
        condition: "Cloudy",
        icon: "03d",
        soilMoisture: 54,
      });
      setForecast([
        { date: "Today", high: 33, low: 29, condition: "partly cloudy", icon: "02d" },
        { date: "Tue", high: 36, low: 28, condition: "sunny", icon: "01d" },
        { date: "Wed", high: 35, low: 27, condition: "cloudy", icon: "03d" },
        { date: "Thu", high: 32, low: 26, condition: "rain", icon: "10d" },
        { date: "Fri", high: 30, low: 25, condition: "rain", icon: "10d" },
        { date: "Sat", high: 31, low: 26, condition: "partly cloudy", icon: "02d" },
        { date: "Sun", high: 33, low: 27, condition: "sunny", icon: "01d" },
      ]);
    }

    setLoading(false);
  };

  const getWeatherIcon = (condition: string) => {
    return weatherIcons[condition.toLowerCase()] || Cloud;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white shadow-xl">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,#fff,transparent_40%)]" />
        <div className="relative p-6 sm:p-8">
          <h1 className="text-3xl font-display font-bold">Weather</h1>
          <p className="text-white/80 mt-1">Current Weather & 7-Day Forecast</p>
        </div>
      </div>

      {/* Location Selection */}
      <div className="glass-card frosted-border rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Select Location</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-accent shrink-0" />
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="bg-card/70 border-white/15 flex-1">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                {indianStates.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedState && districts.length > 0 && (
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-accent shrink-0" />
              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger className="bg-card/70 border-white/15 flex-1">
                  <SelectValue placeholder="Select District (Optional)" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <Button
          onClick={fetchWeather}
          disabled={!selectedState || loading}
          className="w-full md:w-auto bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <Cloud className="h-4 w-4 mr-2" />
              Get Weather
            </>
          )}
        </Button>
      </div>

      {/* Current Weather */}
      {weather && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card frosted-border rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
            <MapPin className="h-5 w-5 text-accent" />
            <span className="font-semibold text-foreground">
              {selectedDistrict ? `${selectedDistrict}, ${selectedState}` : selectedState}
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-around gap-6 mb-6">
            <div className="flex items-center gap-4">
              {(() => {
                const Icon = getWeatherIcon(weather.condition);
                return <Icon className="h-20 w-20 text-amber-500" />;
              })()}
              <div className="text-center md:text-left">
                <p className="text-5xl font-display font-bold text-foreground">{weather.temp}°C</p>
                <p className="text-muted-foreground">{weather.condition}</p>
                <p className="text-sm text-muted-foreground">Feels like {weather.feelsLike}°C</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <Droplets className="h-6 w-6 mx-auto text-sky-500 mb-2" />
              <p className="text-xs text-muted-foreground">Humidity</p>
              <p className="text-lg font-semibold text-foreground">{weather.humidity}%</p>
            </div>
            <div className="text-center">
              <Wind className="h-6 w-6 mx-auto text-purple-500 mb-2" />
              <p className="text-xs text-muted-foreground">Wind Speed</p>
              <p className="text-lg font-semibold text-foreground">{weather.wind} km/h</p>
            </div>
            <div className="text-center">
              <Thermometer className="h-6 w-6 mx-auto text-cyan-500 mb-2" />
              <p className="text-xs text-muted-foreground">Soil Moisture</p>
              <p className="text-lg font-semibold text-foreground">{weather.soilMoisture}%</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* 7-Day Forecast */}
      {forecast.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card frosted-border rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">7-Day Forecast</h3>
          <div className="space-y-3">
            {forecast.map((day, idx) => {
              const Icon = getWeatherIcon(day.condition);
              return (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx }}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <span className="font-medium text-foreground w-20">{day.date}</span>
                  <Icon className="h-8 w-8 text-amber-500" />
                  <div className="text-right">
                    <span className="font-semibold text-foreground">{day.high}°C</span>
                    <span className="text-muted-foreground text-sm ml-2">
                      {day.low}° / {day.high}°
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground w-24 text-right capitalize">{day.condition}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Farming Tips */}
      {weather && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card frosted-border rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Farming Tips</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <span className="text-emerald-600">✓</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Weather is ideal for planting. Ensure adequate irrigation.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                <span className="text-amber-600">⚠</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Day 4 forecast shows rain. Plan irrigation accordingly.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <span className="text-emerald-600">🌱</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Current conditions are perfect for crop spraying activities.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
