import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  DollarSign,
  AlertTriangle,
  Calendar,
  Activity,
  Cloud,
  Droplets,
  Wind,
  Sun,
  CloudRain,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { dashboardStats, yieldData, weatherData, recentActivity } from "@/data/mockData";

// Stat Card Component
function StatCard({
  title,
  value,
  unit,
  change,
  trend,
  icon: Icon,
  color,
  delay,
}: {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  trend?: "up" | "down" | "stable";
  icon: typeof TrendingUp;
  color: string;
  delay: number;
}) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor = trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="stat-card"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">
            {value}
            {unit && <span className="text-lg font-normal text-muted-foreground ml-1">{unit}</span>}
          </p>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      {change !== undefined && (
        <div className={`flex items-center gap-1 mt-3 text-sm ${trendColor}`}>
          <TrendIcon className="w-4 h-4" />
          <span>{Math.abs(change)}%</span>
          <span className="text-muted-foreground">vs last month</span>
        </div>
      )}
    </motion.div>
  );
}

// Weather Icon Component
function WeatherIcon({ condition }: { condition: string }) {
  const iconMap: Record<string, typeof Sun> = {
    sunny: Sun,
    "partly-cloudy": Cloud,
    cloudy: Cloud,
    rain: CloudRain,
  };
  const Icon = iconMap[condition] || Sun;
  return <Icon className="w-8 h-8 text-amber-500" />;
}

// Custom Tooltip for Chart
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value} quintals
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Ravi. Here's your farm overview.</p>
      </div>

      {/* Top Row: 4 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Yield Forecast"
          value={dashboardStats.yieldForecast.value}
          unit={dashboardStats.yieldForecast.unit}
          change={dashboardStats.yieldForecast.change}
          trend="up"
          icon={BarChart3}
          color="bg-primary"
          delay={0}
        />
        <StatCard
          title={`Market Price (${dashboardStats.marketPrice.crop})`}
          value={`₹${dashboardStats.marketPrice.value}`}
          unit={`/${dashboardStats.marketPrice.unit.split("/")[1]}`}
          change={dashboardStats.marketPrice.change}
          trend="up"
          icon={DollarSign}
          color="bg-secondary"
          delay={0.1}
        />
        <StatCard
          title="Active Alerts"
          value={dashboardStats.activeAlerts.value}
          icon={AlertTriangle}
          color="bg-warning"
          delay={0.2}
        />
        <StatCard
          title="Next Harvest"
          value={dashboardStats.nextHarvest.days}
          unit="days"
          icon={Calendar}
          color="bg-accent"
          delay={0.3}
        />
      </div>

      {/* Middle Row: Yield Chart (60%) + Weather Radar (40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Yield Prediction Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-3 glass-card rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Yield Prediction Graph</h2>
              <p className="text-sm text-muted-foreground">This year vs last year comparison</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">This Year</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                <span className="text-muted-foreground">Last Year</span>
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={yieldData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="thisYear"
                  name="This Year"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="lastYear"
                  name="Last Year"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: "hsl(var(--muted-foreground))", strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Live Weather Radar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="lg:col-span-2 glass-card rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Live Weather</h2>
            <span className="text-xs text-muted-foreground">{weatherData.current.location}</span>
          </div>

          {/* Current Weather */}
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border">
            <div className="p-3 bg-amber-500/10 rounded-xl">
              <Sun className="w-12 h-12 text-amber-500" />
            </div>
            <div>
              <p className="text-4xl font-bold text-foreground">{weatherData.current.temp}°C</p>
              <p className="text-muted-foreground">{weatherData.current.condition}</p>
            </div>
          </div>

          {/* Weather Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <Droplets className="w-5 h-5 mx-auto text-sky-500 mb-1" />
              <p className="text-xs text-muted-foreground">Humidity</p>
              <p className="font-semibold text-foreground">{weatherData.current.humidity}%</p>
            </div>
            <div className="text-center">
              <Wind className="w-5 h-5 mx-auto text-slate-500 mb-1" />
              <p className="text-xs text-muted-foreground">Wind</p>
              <p className="font-semibold text-foreground">{weatherData.current.windSpeed} km/h</p>
            </div>
            <div className="text-center">
              <Droplets className="w-5 h-5 mx-auto text-emerald-500 mb-1" />
              <p className="text-xs text-muted-foreground">Soil Moisture</p>
              <p className="font-semibold text-foreground">{weatherData.current.soilMoisture}%</p>
            </div>
          </div>

          {/* 7-Day Forecast Mini */}
          <div>
            <p className="text-sm font-medium text-foreground mb-3">7-Day Forecast</p>
            <div className="space-y-2">
              {weatherData.forecast.slice(0, 5).map((day, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground w-12">{day.day}</span>
                  <WeatherIcon condition={day.icon} />
                  <span className="text-foreground font-medium w-16 text-right">
                    {day.high}° / {day.low}°
                  </span>
                  <span className="text-sky-500 text-xs w-10 text-right">{day.rainChance}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Row: Recent Activity Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="glass-card rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
            <p className="text-sm text-muted-foreground">Latest sensor readings and AI chat history</p>
          </div>
          <Activity className="w-5 h-5 text-muted-foreground" />
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Message</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((activity) => (
                <tr key={activity.id}>
                  <td>
                    <span className="capitalize text-foreground font-medium">{activity.type}</span>
                  </td>
                  <td className="text-muted-foreground">{activity.message}</td>
                  <td className="text-muted-foreground text-sm">{activity.time}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        activity.severity === "warning"
                          ? "bg-warning/10 text-warning"
                          : activity.severity === "danger"
                          ? "bg-destructive/10 text-destructive"
                          : activity.severity === "success"
                          ? "bg-success/10 text-success"
                          : "bg-accent/10 text-accent"
                      }`}
                    >
                      {activity.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
