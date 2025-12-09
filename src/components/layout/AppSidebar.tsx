import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Map,
  TrendingUp,
  Users,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Leaf,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/field-management", label: "Field Management", icon: Map },
  { path: "/market-analytics", label: "Market Analytics", icon: TrendingUp },
  { path: "/community", label: "Community Forum", icon: Users },
  { path: "/gov-schemes", label: "Gov Schemes", icon: FileText },
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
      className="h-screen bg-sidebar/95 text-sidebar-foreground flex flex-col fixed left-0 top-0 z-50 border-r border-sidebar-border/60 backdrop-blur-xl shadow-2xl"
    >
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0">
          <Leaf className="w-6 h-6 text-secondary-foreground" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="font-display font-bold text-xl text-sidebar-foreground">AgriSmart</h1>
              <p className="text-xs text-sidebar-foreground/60">Farm Dashboard</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "sidebar-item",
                isActive ? "sidebar-item-active" : "sidebar-item-inactive"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-medium"
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
      <div className="p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full h-10 text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </Button>
      </div>
    </motion.aside>
  );
}