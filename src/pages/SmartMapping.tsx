import { useEffect } from "react";
import { MapPin } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { mapMarkers } from "@/data/mockData";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function SmartMapping() {
  useEffect(() => {
    // Workaround for default icon path issues in Vite
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (L.Marker.prototype as any).options.icon = icon;
  }, []);

  return (
    <div className="space-y-4">
      <div className="glass-card frosted-border rounded-2xl p-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">SmartMapping</p>
          <h1 className="text-2xl font-display font-semibold text-foreground">Interactive map · tap markers for details</h1>
        </div>
        <MapPin className="h-5 w-5 text-accent" />
      </div>

      <div className="rounded-2xl border overflow-hidden shadow-xl bg-card">
        <MapContainer
          center={[22.5937, 78.9629]}
          zoom={5}
          style={{ height: "70vh", width: "100%" }}
          scrollWheelZoom
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {mapMarkers.map((marker) => (
            <Marker key={marker.id} position={[marker.lat, marker.lng]} icon={icon}>
              <Popup>
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">{marker.name}</p>
                  <p className="text-xs text-muted-foreground">Type: {marker.type}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
