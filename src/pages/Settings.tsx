import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Globe, Moon, Sun, Wifi, MapPin, Leaf, Save, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();
  const [isDark, setIsDark] = useState(false);
  const [notifications, setNotifications] = useState({
    sms: true,
    push: true,
    email: false,
  });
  const [language, setLanguage] = useState("en");
  const [farmData, setFarmData] = useState({
    name: "Patil Farms",
    location: "Nagpur, Maharashtra",
    area: "30",
    crops: ["Cotton", "Soybean", "Wheat"],
  });
  const [devices] = useState([
    { id: "ESP32-001", name: "Field A - North", status: "online" },
    { id: "ESP32-002", name: "Field A - South", status: "online" },
    { id: "ESP32-003", name: "Field B - Center", status: "online" },
    { id: "ESP32-004", name: "Field C - West", status: "low_battery" },
  ]);

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
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
        <h1 className="text-2xl font-display font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account and farm preferences</p>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="basic" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Basic Settings
          </TabsTrigger>
          <TabsTrigger value="farm" className="flex items-center gap-2">
            <Leaf className="w-4 h-4" />
            Farm Profile
          </TabsTrigger>
        </TabsList>

        {/* Basic Settings */}
        <TabsContent value="basic">
          <div className="grid gap-6 max-w-2xl">
            {/* Theme */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                {isDark ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-secondary" />}
                <h3 className="font-display font-semibold text-foreground">Appearance</h3>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                </div>
                <Switch checked={isDark} onCheckedChange={toggleTheme} />
              </div>
            </motion.div>

            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Bell className="w-5 h-5 text-primary" />
                <h3 className="font-display font-semibold text-foreground">Notifications</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">SMS Alerts</p>
                    <p className="text-sm text-muted-foreground">Receive important alerts via SMS</p>
                  </div>
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Get instant updates in your browser</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Email Digest</p>
                    <p className="text-sm text-muted-foreground">Weekly summary of farm activities</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                  />
                </div>
              </div>
            </motion.div>

            {/* Language */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-5 h-5 text-primary" />
                <h3 className="font-display font-semibold text-foreground">Language</h3>
              </div>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                  <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                  <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
                  <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
          </div>
        </TabsContent>

        {/* Farm Profile */}
        <TabsContent value="farm">
          <div className="grid gap-6 max-w-2xl">
            {/* Farm Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Leaf className="w-5 h-5 text-primary" />
                <h3 className="font-display font-semibold text-foreground">Farm Details</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="farmName">Farm Name</Label>
                  <Input
                    id="farmName"
                    value={farmData.name}
                    onChange={(e) => setFarmData({ ...farmData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="location"
                      value={farmData.location}
                      onChange={(e) => setFarmData({ ...farmData, location: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="area">Total Land Area (acres)</Label>
                  <Input
                    id="area"
                    type="number"
                    value={farmData.area}
                    onChange={(e) => setFarmData({ ...farmData, area: e.target.value })}
                  />
                </div>
              </div>
            </motion.div>

            {/* Crops */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Leaf className="w-5 h-5 text-success" />
                  <h3 className="font-display font-semibold text-foreground">Primary Crops</h3>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Crop
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {farmData.crops.map((crop) => (
                  <Badge key={crop} variant="secondary" className="px-3 py-1">
                    {crop}
                    <button
                      onClick={() => setFarmData({
                        ...farmData,
                        crops: farmData.crops.filter(c => c !== crop)
                      })}
                      className="ml-2 hover:text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </motion.div>

            {/* Connected Devices */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Wifi className="w-5 h-5 text-accent" />
                  <h3 className="font-display font-semibold text-foreground">Connected Devices</h3>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Device
                </Button>
              </div>
              <div className="space-y-3">
                {devices.map((device) => (
                  <div
                    key={device.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                  >
                    <div>
                      <p className="font-medium text-foreground">{device.name}</p>
                      <p className="text-xs text-muted-foreground">{device.id}</p>
                    </div>
                    <Badge
                      variant={device.status === "online" ? "default" : "destructive"}
                      className={device.status === "online" ? "bg-success/10 text-success" : ""}
                    >
                      {device.status === "online" ? "Online" : "Low Battery"}
                    </Badge>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end max-w-2xl">
        <Button onClick={handleSave} className="px-8">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </motion.div>
  );
}