import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: number;
  icon: LucideIcon;
  iconColor?: string;
  delay?: number;
}

export function StatCard({
  title,
  value,
  subtitle,
  change,
  icon: Icon,
  iconColor = "text-primary",
  delay = 0,
}: StatCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)" }}
      className="stat-card"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-display font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className={cn("p-3 rounded-xl bg-muted/50", iconColor)}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      
      {change !== undefined && (
        <div className="mt-4 flex items-center gap-2">
          {isPositive && <TrendingUp className="w-4 h-4 text-success" />}
          {isNegative && <TrendingDown className="w-4 h-4 text-destructive" />}
          <span
            className={cn(
              "text-sm font-medium",
              isPositive && "text-success",
              isNegative && "text-destructive",
              !isPositive && !isNegative && "text-muted-foreground"
            )}
          >
            {isPositive && "+"}
            {change}% from last month
          </span>
        </div>
      )}
    </motion.div>
  );
}