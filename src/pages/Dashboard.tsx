import { motion } from "framer-motion";
import {
  AlertTriangle,
  Calendar,
  Droplets,
  Leaf,
  LucideIcon,
  MapPin,
  Shield,
  Sprout,
  Waves,
  Wheat,
  Wind,
} from "lucide-react";
import { YieldChart } from "@/components/dashboard/YieldChart";
import { WeatherWidget } from "@/components/dashboard/WeatherWidget";
import { sensorData, dashboardStats, recentActivity, weatherData } from "@/data/mockData";

type TileTone = "emerald" | "amber" | "sky";

const focusSignals: Array<{
  title: string;
  value: string;
  hint: string;
  icon: LucideIcon;
  tone: TileTone;
}> = [
  {
    title: "Water Budget",
    value: "68%",
    hint: "Irrigate Field B tonight to stay above 55%",
    icon: Droplets,
    tone: "emerald",
  },
  {
    title: "Harvest Window",
    value: `${dashboardStats.nextHarvest.days} days`,
    hint: `${dashboardStats.nextHarvest.crop} looks on track`,
    icon: Calendar,
    tone: "amber",
  },
  {
    title: "Market Pulse",
    value: `₹${dashboardStats.marketPrice.value.toLocaleString()}`,
    hint: "Cotton price momentum +2.5% in Nagpur",
    icon: Wheat,
    tone: "sky",
  },
];

const actionBoard = [
  {
    title: "Schedule drip irrigation for Field B",
    detail: "Soil moisture sits at 45% with 31°C daytime temp.",
    badge: "Tonight",
    icon: Waves,
  },
  {
    title: "Send advisory for pink bollworm scouting",
    detail: "Cotton at square stage; scout rows 4 & 5 first.",
    badge: "Tomorrow AM",
    icon: Shield,
  },
  {
    title: "Update mandi targets",
    detail: "Lock in cotton lots if price holds above ₹6,850.",
    badge: "This week",
    icon: MapPin,
  },
];

const toneStyles: Record<TileTone, string> = {
  emerald: "from-emerald-500/20 via-emerald-500/10 to-primary/5 border-emerald-500/30",
  amber: "from-amber-500/25 via-orange-500/10 to-primary/5 border-amber-500/30",
  sky: "from-sky-500/25 via-cyan-500/10 to-primary/5 border-sky-500/30",
};

const toneText: Record<TileTone, string> = {
  emerald: "text-emerald-600",
  amber: "text-amber-600",
  sky: "text-sky-600",
};

const impactMetrics = [
  {
    title: "Sustainability score",
    value: "81",
    hint: "Water, soil and chemical balance trending green",
    accent: "from-emerald-500/30 to-emerald-500/10",
  },
  {
    title: "Irrigation efficiency",
    value: "92%",
    hint: "Drip runtime optimized vs evapotranspiration",
    accent: "from-cyan-500/25 to-blue-500/10",
  },
  {
    title: "Input budget used",
    value: "56%",
    hint: "₹1.8L of ₹3.2L planned this season",
    accent: "from-amber-500/25 to-orange-500/10",
  },
];

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-r from-primary/95 via-emerald-800/80 to-lime-500/70 text-white shadow-xl frosted-border">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,#34d399,transparent_35%),radial-gradient(circle_at_80%_0%,#a3e635,transparent_30%),radial-gradient(circle_at_60%_60%,#22d3ee,transparent_25%)]" />
        <div className="relative p-6 sm:p-8 flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs uppercase tracking-[0.25em] text-white/70">Agri mission control</p>
              <h1 className="text-3xl sm:text-4xl font-display font-semibold">
                Today&apos;s field pulse for {weatherData.current.location}
              </h1>
              <p className="text-white/80">
                Focus on water balance, harvest readiness, and price signals. The dashboard leans into what changes the next 48
                hours—not just a static snapshot.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/90 border border-white/15">
                  {dashboardStats.activeAlerts.value} open alerts
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/90 border border-white/15">
                  Next harvest in {dashboardStats.nextHarvest.days} days
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/90 border border-white/15">
                  Wind {weatherData.current.wind} km/h · {weatherData.current.condition}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full lg:w-96">
              {focusSignals.map((signal) => {
                const Icon = signal.icon;
                return (
                  <div
                    key={signal.title}
                    className={`relative overflow-hidden rounded-xl border ${toneStyles[signal.tone]} bg-gradient-to-br p-4 shadow-lg`}
                  >
                    <div className="absolute inset-0 bg-white/10 blur-3xl" />
                    <div className="relative space-y-1">
                      <Icon className={`h-5 w-5 ${toneText[signal.tone]}`} />
                      <p className="text-sm text-white/80">{signal.title}</p>
                      <p className="text-xl font-display font-semibold text-white">{signal.value}</p>
                      <p className="text-xs text-white/70">{signal.hint}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {impactMetrics.map((metric) => (
              <div
                key={metric.title}
                className={`rounded-xl border glass-card bg-gradient-to-br ${metric.accent} p-4 shadow-lg`}
              >
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Health</p>
                <p className="text-lg font-semibold text-foreground">{metric.title}</p>
                <p className="text-3xl font-display font-bold mt-2 text-foreground">{metric.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{metric.hint}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <YieldChart />
            </div>
            <div className="lg:col-span-2">
              <WeatherWidget />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {sensorData.slice(0, 3).map((sensor, idx) => (
              <motion.div
                key={sensor.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.05 }}
                className="rounded-xl border glass-card frosted-border p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Field health</p>
                    <p className="text-lg font-semibold text-foreground">{sensor.name}</p>
                  </div>
                  <div
                    className={`px-2 py-1 text-xs rounded-full ${
                      sensor.status === "online"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {sensor.status === "online" ? "online" : "attention"}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="rounded-lg bg-emerald-100/60 text-emerald-700 px-3 py-2">
                    <p className="text-[11px] uppercase tracking-wide">Moisture</p>
                    <p className="text-lg font-semibold">{sensor.moisture}%</p>
                  </div>
                  <div className="rounded-lg bg-amber-100/60 text-amber-700 px-3 py-2">
                    <p className="text-[11px] uppercase tracking-wide">Temp</p>
                    <p className="text-lg font-semibold">{sensor.temperature}°C</p>
                  </div>
                  <div className="rounded-lg bg-sky-100/60 text-sky-700 px-3 py-2">
                    <p className="text-[11px] uppercase tracking-wide">Battery</p>
                    <p className="text-lg font-semibold">{sensor.battery}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Wind className="h-4 w-4 text-accent" />
                  <span>pH {sensor.ph} · last 24h trend steady</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="glass-card frosted-border rounded-xl border p-5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Live feed</p>
                <h3 className="text-lg font-display font-semibold text-foreground">Signals + anomalies</h3>
              </div>
              <Leaf className="h-5 w-5 text-accent" />
            </div>
            <div className="space-y-3">
              {recentActivity.slice(0, 5).map((activity, idx) => {
                const Icon = activity.type === "alert" ? AlertTriangle : Sprout;
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                    className="rounded-lg border border-border/60 p-3 flex items-start gap-3"
                  >
                    <div className="h-9 w-9 rounded-lg bg-muted/60 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-accent" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="glass-card frosted-border rounded-xl border p-5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Action board</p>
                <h3 className="text-lg font-display font-semibold text-foreground">What moves the needle</h3>
              </div>
              <Droplets className="h-5 w-5 text-accent" />
            </div>
            <div className="space-y-3">
              {actionBoard.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.05 }}
                    className="rounded-lg border border-border/60 p-3 flex gap-3"
                  >
                    <div className="h-10 w-10 rounded-full bg-muted/60 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">{action.title}</p>
                        <span className="text-[11px] px-2 py-1 rounded-full bg-accent/15 text-accent-foreground">
                          {action.badge}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{action.detail}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}