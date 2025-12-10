import { useEffect } from "react";
import { MapPin, Cloud, Radio, TrendingUp, AlertTriangle, CloudRain } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { mapMarkers } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

// Color-coded marker icons based on type
const markerColors: Record<string, string> = {
  market: "#22c55e",    // green
  weather: "#f59e0b",   // amber
  iot: "#3b82f6",       // blue
  forecast: "#8b5cf6",  // purple
  alert: "#ef4444",     // red
  rain: "#06b6d4",      // cyan
};

const createColoredIcon = (color: string) =>
  L.divIcon({
    className: "custom-marker",
    html: `<div style="background:${color};width:24px;height:24px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

const typeIcons: Record<string, typeof MapPin> = {
  market: TrendingUp,
  weather: Cloud,
  iot: Radio,
  forecast: Cloud,
  alert: AlertTriangle,
  rain: CloudRain,
};

const typeLabels: Record<string, string> = {
  market: "Mandi / Market",
  weather: "Weather Station",
  iot: "IoT Sensors",
  forecast: "Forecast Hub",
  alert: "Alert Zone",
  rain: "Rainfall Monitor",
};

export default function SmartMapping() {
  useEffect(() => {
    // Add custom CSS for markers
    const style = document.createElement("style");
    style.textContent = `.custom-marker { background: transparent !important; border: none !important; }`;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="glass-card frosted-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">SmartMapping</p>
            <h1 className="text-2xl font-display font-semibold text-foreground">Major Agricultural Markets in India</h1>
            <p className="text-sm text-muted-foreground mt-1">Click on green markers to view market details</p>
          </div>
          <MapPin className="h-5 w-5 text-accent" />
        </div>
        <div className="flex flex-wrap gap-3">
          {Object.entries(typeLabels).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2 text-sm text-muted-foreground">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: markerColors[key] }}
              />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border overflow-hidden shadow-xl bg-card">
        <MapContainer
          center={[22.5937, 78.9629]}
          zoom={5}
          style={{ height: "70vh", width: "100%" }}
          scrollWheelZoom
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | AgriSmart'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {mapMarkers.map((marker) => {
            const Icon = typeIcons[marker.type] || MapPin;
            return (
              <Marker
                key={marker.id}
                position={[marker.lat, marker.lng]}
                icon={createColoredIcon(markerColors[marker.type] || "#6b7280")}
              >
                <Popup>
                  <div className="min-w-[200px] max-w-[280px] space-y-2 p-1">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 flex-shrink-0" style={{ color: markerColors[marker.type] }} />
                      <span className="font-semibold text-sm">{marker.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {typeLabels[marker.type] || "Agricultural Market"}
                    </Badge>
                    <p className="text-xs text-muted-foreground leading-relaxed">{marker.details}</p>
                    {marker.status && (
                      <Badge variant={marker.status === "active" ? "default" : "secondary"} className="text-xs mt-1">
                        {marker.status === "active" ? "Active Market" : marker.status}
                      </Badge>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
