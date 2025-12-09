import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Layers,
  TrendingUp,
  Users,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Leaf,
  MapPin,
  PhoneCall,
  BarChart3,
  Cloud,
  GraduationCap,
  RotateCcw,
  Calendar,
  DollarSign,
  TestTube,
  Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/ai-assistant", label: "AI Assistant", icon: Bot },
  { path: "/field-management", label: "Field Management", icon: Layers },
  { path: "/crop-rotation", label: "Crop Rotation", icon: RotateCcw },
  { path: "/farming-calendar", label: "Farming Calendar", icon: Calendar },
  { path: "/soil-test", label: "Soil Test", icon: TestTube },
  { path: "/market-analytics", label: "Market Analytics", icon: TrendingUp },
  { path: "/profit-loss", label: "Profit & Loss", icon: DollarSign },
  { path: "/yield-prediction", label: "Yield Prediction", icon: BarChart3 },
  { path: "/weather", label: "Weather", icon: Cloud },
  { path: "/learn", label: "Learn Courses", icon: GraduationCap },
  { path: "/community", label: "Community Forum", icon: Users },
  { path: "/gov-schemes", label: "Gov Schemes", icon: FileText },
  { path: "/smart-mapping", label: "Smart Mapping", icon: MapPin },
  { path: "/helpline", label: "Helpline", icon: PhoneCall },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen flex flex-col fixed left-0 top-0 z-50"
      style={{ backgroundColor: "#064E3B" }} // Deep Forest Green
    >
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
          <Leaf className="w-6 h-6 text-emerald-300" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="font-display font-bold text-xl text-white">AgriSmart</h1>
              <p className="text-xs text-white/60">Farm Dashboard</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-white/15 text-white font-medium"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-white/10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full h-10 text-white/70 hover:text-white hover:bg-white/10"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </Button>
      </div>
    </motion.aside>
  );
}
