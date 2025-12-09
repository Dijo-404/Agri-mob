import React, { useMemo, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TextInput,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

const TABS = ["Home", "Crop", "Market", "Community", "Profile"];

const COLORS = {
  bg: "#050910",
  card: "#0b1624",
  text: "#e8f0ff",
  muted: "#9fb1c8",
  accent: "#3b82f6",
};

const featureTiles = [
  { title: "Crop Recommendation", desc: "AI crop suggestions", color: ["#22c55e", "#16a34a"] },
  { title: "Disease Detection", desc: "Upload leaf images", color: ["#f43f5e", "#fb923c"] },
  { title: "Pest Detection", desc: "Identify pests quickly", color: ["#a855f7", "#6366f1"] },
  { title: "Market Prices", desc: "Real-time mandi data", color: ["#0ea5e9", "#2563eb"] },
  { title: "AI Assistant", desc: "Ask anything", color: ["#ec4899", "#a855f7"] },
  { title: "Profit & Loss", desc: "Track profitability", color: ["#f59e0b", "#ea580c"] },
  { title: "Weather", desc: "7-day forecast", color: ["#06b6d4", "#0ea5e9"] },
  { title: "Community", desc: "Groups and chat", color: ["#10b981", "#14b8a6"] },
  { title: "SmartMapping", desc: "Geospatial insights", color: ["#2563eb", "#06b6d4"] },
  { title: "Helpline", desc: "State wise support", color: ["#ef4444", "#f97316"] },
];

const mockForecast = [
  { day: "Today", temp: 25, low: 23, high: 27, icon: "☁️" },
  { day: "Tomorrow", temp: 25, low: 23, high: 27, icon: "☁️" },
  { day: "Day 3", temp: 25, low: 23, high: 27, icon: "⛅️" },
  { day: "Day 4", temp: 25, low: 23, high: 27, icon: "☀️" },
];

const mockMarkers = [
  { id: "delhi", title: "Delhi", coordinate: { latitude: 28.6139, longitude: 77.209 } },
  { id: "nagpur", title: "Nagpur", coordinate: { latitude: 21.1466, longitude: 79.0888 } },
  { id: "pune", title: "Pune", coordinate: { latitude: 18.5204, longitude: 73.8567 } },
  { id: "bengaluru", title: "Bengaluru", coordinate: { latitude: 12.9716, longitude: 77.5946 } },
];

const helplines = [
  { state: "Andhra Pradesh", category: "Consumer Affairs", numbers: ["1800-425-0082", "1800-425-2977"] },
  { state: "Maharashtra", category: "Farmer Helpline", numbers: ["1800-233-4000"] },
  { state: "Tamil Nadu", category: "Krishi Call Center", numbers: ["1551"] },
  { state: "Karnataka", category: "Consumer Affairs", numbers: ["1800-425-9339"] },
];

const { width } = Dimensions.get("window");

function MetricCard({ value, label, icon }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricIcon}>{icon}</Text>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

function FeatureTile({ item }) {
  return (
    <LinearGradient colors={item.color} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.tile}>
      <View>
        <Text style={styles.tileTitle}>{item.title}</Text>
        <Text style={styles.tileDesc}>{item.desc}</Text>
      </View>
      <Text style={styles.tileArrow}>→</Text>
    </LinearGradient>
  );
}

function HomeScreen({ weather }) {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <LinearGradient colors={["#0f172a", "#0b1220"]} style={styles.hero}>
        <View>
          <Text style={styles.heroTitle}>AgriSmart</Text>
          <Text style={styles.heroSub}>Your AI-powered farming assistant</Text>
          <View style={styles.row}>
            <Text style={styles.location}>📍 {weather.city}</Text>
            <Text style={styles.muted}>Live weather</Text>
          </View>
        </View>
        <View style={styles.heroMetrics}>
          <MetricCard value={`${weather.temp}°C`} label="Temp" icon="🌡️" />
          <MetricCard value={`${weather.humidity}%`} label="Humidity" icon="💧" />
          <MetricCard value={`${weather.wind} km/h`} label="Wind" icon="🌬️" />
          <MetricCard value={`50%`} label="Moisture" icon="🌱" />
        </View>
      </LinearGradient>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>7-Day Forecast</Text>
          <Text style={styles.viewAll}>View All</Text>
        </View>
        <View style={styles.forecastRow}>
          {mockForecast.map((day) => (
            <View key={day.day} style={styles.forecastItem}>
              <Text style={styles.forecastDay}>{day.day}</Text>
              <Text style={styles.forecastIcon}>{day.icon}</Text>
              <Text style={styles.forecastTemp}>{day.temp}°C</Text>
              <Text style={styles.forecastRange}>
                {day.low}° / {day.high}°
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ gap: 12 }}>
        <Text style={styles.sectionTitle}>Explore Features</Text>
        {chunk(featureTiles, 2).map((row, idx) => (
          <View key={idx} style={styles.tileRow}>
            {row.map((item) => (
              <FeatureTile key={item.title} item={item} />
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function MapScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 22.5937,
          longitude: 78.9629,
          latitudeDelta: 20,
          longitudeDelta: 20,
        }}
      >
        {mockMarkers.map((m) => (
          <Marker key={m.id} coordinate={m.coordinate} title={m.title} description="Tap for details" />
        ))}
      </MapView>
    </View>
  );
}

function HelplineScreen() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return helplines.filter(
      (h) =>
        h.state.toLowerCase().includes(q) ||
        h.category.toLowerCase().includes(q) ||
        h.numbers.some((n) => n.includes(q))
    );
  }, [query]);

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>AI Smart Helpline</Text>
        <Text style={styles.muted}>24/7 support · call directly</Text>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search helplines..."
            placeholderTextColor={COLORS.muted}
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
          />
        </View>
      </View>

      {filtered.map((entry) => (
        <View key={entry.state} style={styles.helplineCard}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>{entry.state}</Text>
              <Text style={styles.muted}>{entry.category}</Text>
            </View>
          </View>
          <View style={{ marginTop: 10, gap: 8 }}>
            {entry.numbers.map((num) => (
              <View key={num} style={styles.callButton}>
                <Text style={styles.callText}>📞 {num}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

function chunk(arr, size) {
  const res = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

export default function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const [weather, setWeather] = useState({ city: "Chennai", temp: 25, humidity: 89, wind: 20 });

  useEffect(() => {
    const apiKey = process.env.EXPO_PUBLIC_WEATHER_API_KEY;
    if (!apiKey) return;
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(weather.city)}&units=metric&appid=${apiKey}`
        );
        const json = await res.json();
        setWeather({
          city: json.name || weather.city,
          temp: Math.round(json.main?.temp ?? weather.temp),
          humidity: json.main?.humidity ?? weather.humidity,
          wind: Math.round(json.wind?.speed ?? weather.wind),
        });
      } catch (err) {
        console.warn("weather fallback mobile", err);
      }
    };
    fetchWeather();
  }, []);

  const renderTab = () => {
    if (activeTab === "Home") return <HomeScreen weather={weather} />;
    if (activeTab === "Market") return <MapScreen />;
    if (activeTab === "Community") return <HelplineScreen />;
    return (
      <View style={styles.placeholder}>
        <Text style={styles.cardTitle}>{activeTab}</Text>
        <Text style={styles.muted}>Coming soon</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={{ flex: 1, backgroundColor: COLORS.bg }}>{renderTab()}</View>
      <View style={styles.tabBar}>
        {TABS.map((tab) => (
          <TouchableOpacity key={tab} style={styles.tab} onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.micButton}>
        <Text style={{ fontSize: 20 }}>🎤</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  hero: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  heroTitle: { color: COLORS.text, fontSize: 20, fontWeight: "700" },
  heroSub: { color: COLORS.muted, marginTop: 4 },
  row: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 8 },
  location: { color: COLORS.text, fontWeight: "600" },
  muted: { color: COLORS.muted },
  heroMetrics: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 12 },
  metricCard: {
    backgroundColor: "rgba(255,255,255,0.04)",
    padding: 12,
    borderRadius: 12,
    width: (width - 32 - 24) / 2,
  },
  metricIcon: { fontSize: 16 },
  metricValue: { color: COLORS.text, fontSize: 18, fontWeight: "700", marginTop: 4 },
  metricLabel: { color: COLORS.muted, fontSize: 12 },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#132032",
    marginBottom: 12,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  cardTitle: { color: COLORS.text, fontSize: 16, fontWeight: "700" },
  viewAll: { color: COLORS.muted, fontSize: 12 },
  forecastRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  forecastItem: { alignItems: "center", gap: 4, width: (width - 32 - 24) / 4 },
  forecastDay: { color: COLORS.muted, fontSize: 12 },
  forecastIcon: { fontSize: 18 },
  forecastTemp: { color: COLORS.text, fontSize: 16, fontWeight: "700" },
  forecastRange: { color: COLORS.muted, fontSize: 12 },
  sectionTitle: { color: COLORS.text, fontSize: 16, fontWeight: "700", marginTop: 8 },
  tileRow: { flexDirection: "row", gap: 10 },
  tile: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tileTitle: { color: "#fff", fontSize: 16, fontWeight: "700" },
  tileDesc: { color: "rgba(255,255,255,0.8)", marginTop: 4 },
  tileArrow: { color: "#fff", fontSize: 18 },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#0f172a",
    borderTopWidth: 1,
    borderTopColor: "#1f2937",
  },
  tab: { alignItems: "center", flex: 1 },
  tabText: { color: COLORS.muted, fontSize: 12 },
  tabTextActive: { color: COLORS.text, fontWeight: "700" },
  micButton: {
    position: "absolute",
    bottom: 70,
    right: 20,
    backgroundColor: "#22c55e",
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#22c55e",
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  placeholder: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8 },
  searchBox: {
    backgroundColor: "#0f172a",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  searchInput: { color: COLORS.text },
  helplineCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#132032",
    marginBottom: 12,
  },
  callButton: {
    backgroundColor: "#0f766e",
    padding: 12,
    borderRadius: 10,
  },
  callText: { color: "#e0f2f1", fontWeight: "700" },
});
