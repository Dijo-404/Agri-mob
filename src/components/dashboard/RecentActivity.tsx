import { motion } from "framer-motion";
import { AlertTriangle, Thermometer, TrendingUp, Cloud, Cpu, Bot } from "lucide-react";
import { recentActivity } from "@/data/mockData";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const typeIcons: Record<string, typeof AlertTriangle> = {
  alert: AlertTriangle,
  sensor: Thermometer,
  market: TrendingUp,
  weather: Cloud,
  device: Cpu,
  ai: Bot,
};

const severityColors: Record<string, string> = {
  warning: "text-warning bg-warning/10",
  info: "text-accent bg-accent/10",
  success: "text-success bg-success/10",
  error: "text-destructive bg-destructive/10",
};

export function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="glass-card rounded-xl p-6"
    >
      <h3 className="text-lg font-display font-semibold text-foreground mb-4">Recent Activity</h3>
      
      <Table>
        <TableHeader>
          <TableRow className="border-border/50">
            <TableHead className="w-12">Type</TableHead>
            <TableHead>Activity</TableHead>
            <TableHead className="text-right w-32">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentActivity.map((activity, index) => {
            const Icon = typeIcons[activity.type] || AlertTriangle;
            return (
              <motion.tr
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="border-border/30"
              >
                <TableCell>
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", severityColors[activity.severity])}>
                    <Icon className="w-4 h-4" />
                  </div>
                </TableCell>
                <TableCell className="font-medium text-foreground">{activity.message}</TableCell>
                <TableCell className="text-right text-muted-foreground text-sm">{activity.time}</TableCell>
              </motion.tr>
            );
          })}
        </TableBody>
      </Table>
    </motion.div>
  );
}