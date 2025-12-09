import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Plus, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const farmingActivities = [
  {
    id: 1,
    title: "Sowing Wheat",
    date: "2025-12-15",
    field: "Field A",
    type: "sowing",
    status: "upcoming",
    priority: "high",
  },
  {
    id: 2,
    title: "Fertilizer Application",
    date: "2025-12-10",
    field: "Field B",
    type: "fertilizer",
    status: "pending",
    priority: "medium",
  },
  {
    id: 3,
    title: "Irrigation Check",
    date: "2025-12-08",
    field: "Field C",
    type: "irrigation",
    status: "completed",
    priority: "low",
  },
  {
    id: 4,
    title: "Pest Control",
    date: "2025-12-20",
    field: "Field A",
    type: "pest-control",
    status: "upcoming",
    priority: "high",
  },
  {
    id: 5,
    title: "Harvest Cotton",
    date: "2025-12-25",
    field: "Field B",
    type: "harvest",
    status: "upcoming",
    priority: "high",
  },
];

const activityTypes = {
  sowing: { label: "Sowing", color: "bg-blue-500" },
  fertilizer: { label: "Fertilizer", color: "bg-green-500" },
  irrigation: { label: "Irrigation", color: "bg-cyan-500" },
  "pest-control": { label: "Pest Control", color: "bg-red-500" },
  harvest: { label: "Harvest", color: "bg-yellow-500" },
  weeding: { label: "Weeding", color: "bg-orange-500" },
};

export default function FarmingCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [newActivity, setNewActivity] = useState({
    title: "",
    date: "",
    field: "",
    type: "",
    priority: "medium",
  });
  const [activities, setActivities] = useState(farmingActivities);

  const handleAddActivity = () => {
    if (newActivity.title && newActivity.date && newActivity.field && newActivity.type) {
      const activity = {
        id: activities.length + 1,
        ...newActivity,
        status: "upcoming" as const,
      };
      setActivities([...activities, activity]);
      setNewActivity({ title: "", date: "", field: "", type: "", priority: "medium" });
    }
  };

  const handleToggleStatus = (id: number) => {
    setActivities(
      activities.map((activity) =>
        activity.id === id
          ? { ...activity, status: activity.status === "completed" ? "pending" : "completed" }
          : activity
      )
    );
  };

  const getUpcomingActivities = () => {
    const today = new Date().toISOString().split("T")[0];
    return activities.filter((a) => a.date >= today && a.status !== "completed");
  };

  const getTodayActivities = () => {
    const today = new Date().toISOString().split("T")[0];
    return activities.filter((a) => a.date === today);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Farming Calendar</h1>
        <p className="text-muted-foreground">Schedule and track your farming activities</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Calendar View */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Today's Activities */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <CardTitle>Today's Activities</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {getTodayActivities().length > 0 ? (
                <div className="space-y-3">
                  {getTodayActivities().map((activity) => {
                    const typeInfo = activityTypes[activity.type as keyof typeof activityTypes];
                    return (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn("w-3 h-3 rounded-full", typeInfo?.color)} />
                          <div>
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-muted-foreground">{activity.field}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{typeInfo?.label}</Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleToggleStatus(activity.id)}
                          >
                            <CheckCircle2
                              className={cn(
                                "w-4 h-4",
                                activity.status === "completed" ? "text-success" : "text-muted-foreground"
                              )}
                            />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No activities scheduled for today</p>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Activities */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-primary" />
                <CardTitle>Upcoming Activities</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getUpcomingActivities()
                  .sort((a, b) => a.date.localeCompare(b.date))
                  .map((activity) => {
                    const typeInfo = activityTypes[activity.type as keyof typeof activityTypes];
                    const activityDate = new Date(activity.date);
                    const daysUntil = Math.ceil(
                      (activityDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                    );
                    return (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn("w-3 h-3 rounded-full", typeInfo?.color)} />
                          <div>
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {activity.field} • {activityDate.toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={activity.priority === "high" ? "destructive" : "outline"}
                          >
                            {daysUntil === 0 ? "Today" : `${daysUntil} days`}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Add Activity & Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Add New Activity */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" />
                <CardTitle>Add Activity</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="activity-title">Activity Title</Label>
                <Input
                  id="activity-title"
                  placeholder="e.g., Sowing Wheat"
                  value={newActivity.title}
                  onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="activity-date">Date</Label>
                <Input
                  id="activity-date"
                  type="date"
                  value={newActivity.date}
                  onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="activity-field">Field</Label>
                <Select value={newActivity.field} onValueChange={(value) => setNewActivity({ ...newActivity, field: value })}>
                  <SelectTrigger id="activity-field">
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="field-a">Field A</SelectItem>
                    <SelectItem value="field-b">Field B</SelectItem>
                    <SelectItem value="field-c">Field C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="activity-type">Activity Type</Label>
                <Select value={newActivity.type} onValueChange={(value) => setNewActivity({ ...newActivity, type: value })}>
                  <SelectTrigger id="activity-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sowing">Sowing</SelectItem>
                    <SelectItem value="fertilizer">Fertilizer</SelectItem>
                    <SelectItem value="irrigation">Irrigation</SelectItem>
                    <SelectItem value="pest-control">Pest Control</SelectItem>
                    <SelectItem value="harvest">Harvest</SelectItem>
                    <SelectItem value="weeding">Weeding</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="activity-priority">Priority</Label>
                <Select value={newActivity.priority} onValueChange={(value) => setNewActivity({ ...newActivity, priority: value })}>
                  <SelectTrigger id="activity-priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddActivity} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Activity
              </Button>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Activities</span>
                <span className="font-semibold">{activities.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Completed</span>
                <span className="font-semibold text-success">
                  {activities.filter((a) => a.status === "completed").length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Pending</span>
                <span className="font-semibold text-warning">
                  {activities.filter((a) => a.status === "pending").length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Upcoming</span>
                <span className="font-semibold text-primary">
                  {activities.filter((a) => a.status === "upcoming").length}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

