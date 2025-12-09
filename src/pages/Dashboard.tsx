import { motion } from "framer-motion";
import { Wheat, IndianRupee, AlertCircle, Calendar } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { YieldChart } from "@/components/dashboard/YieldChart";
import { WeatherWidget } from "@/components/dashboard/WeatherWidget";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { dashboardStats } from "@/data/mockData";

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your farm overview.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Yield Forecast"
          value={`${dashboardStats.yieldForecast.value} q`}
          subtitle="Expected this season"
          change={dashboardStats.yieldForecast.change}
          icon={Wheat}
          iconColor="text-secondary"
          delay={0}
        />
        <StatCard
          title="Cotton Price"
          value={`₹${dashboardStats.marketPrice.value.toLocaleString()}`}
          subtitle="per quintal (Nagpur)"
          change={dashboardStats.marketPrice.change}
          icon={IndianRupee}
          iconColor="text-success"
          delay={0.1}
        />
        <StatCard
          title="Active Alerts"
          value={dashboardStats.activeAlerts.value}
          subtitle="Needs attention"
          icon={AlertCircle}
          iconColor="text-warning"
          delay={0.2}
        />
        <StatCard
          title="Next Harvest"
          value={`${dashboardStats.nextHarvest.days} days`}
          subtitle={dashboardStats.nextHarvest.crop}
          icon={Calendar}
          iconColor="text-accent"
          delay={0.3}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <YieldChart />
        </div>
        <div className="lg:col-span-2">
          <WeatherWidget />
        </div>
      </div>

      {/* Activity Table */}
      <RecentActivity />
    </motion.div>
  );
}