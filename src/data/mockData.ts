// Yield data for charts (2023 vs 2024)
export const yieldData = [
  { month: "Jan", year2023: 45, year2024: 52 },
  { month: "Feb", year2023: 38, year2024: 48 },
  { month: "Mar", year2023: 62, year2024: 71 },
  { month: "Apr", year2023: 85, year2024: 92 },
  { month: "May", year2023: 78, year2024: 88 },
  { month: "Jun", year2023: 42, year2024: 55 },
  { month: "Jul", year2023: 35, year2024: 45 },
  { month: "Aug", year2023: 48, year2024: 58 },
  { month: "Sep", year2023: 72, year2024: 82 },
  { month: "Oct", year2023: 95, year2024: 105 },
  { month: "Nov", year2023: 88, year2024: 98 },
  { month: "Dec", year2023: 55, year2024: 65 },
];

// Market prices data
export const marketPrices = [
  { id: 1, crop: "Cotton", variety: "DCH-32", state: "Maharashtra", mandi: "Nagpur APMC", price: 6850, trend: "up", change: 2.5 },
  { id: 2, crop: "Wheat", variety: "PBW-343", state: "Punjab", mandi: "Ludhiana", price: 2275, trend: "up", change: 1.8 },
  { id: 3, crop: "Rice", variety: "Basmati 1121", state: "Haryana", mandi: "Karnal", price: 4200, trend: "down", change: -0.8 },
  { id: 4, crop: "Soybean", variety: "JS-9560", state: "Madhya Pradesh", mandi: "Indore", price: 4650, trend: "up", change: 3.2 },
  { id: 5, crop: "Sugarcane", variety: "Co-0238", state: "Uttar Pradesh", mandi: "Meerut", price: 350, trend: "stable", change: 0 },
  { id: 6, crop: "Groundnut", variety: "TAG-24", state: "Gujarat", mandi: "Rajkot", price: 5800, trend: "up", change: 1.5 },
  { id: 7, crop: "Chana", variety: "Kabuli", state: "Rajasthan", mandi: "Bikaner", price: 5200, trend: "down", change: -1.2 },
  { id: 8, crop: "Mustard", variety: "Pusa Bold", state: "Rajasthan", mandi: "Alwar", price: 5100, trend: "up", change: 2.1 },
  { id: 9, crop: "Onion", variety: "Nashik Red", state: "Maharashtra", mandi: "Lasalgaon", price: 1800, trend: "down", change: -4.5 },
  { id: 10, crop: "Tomato", variety: "Hybrid", state: "Karnataka", mandi: "Kolar", price: 2200, trend: "up", change: 5.8 },
  { id: 11, crop: "Potato", variety: "Kufri Jyoti", state: "Uttar Pradesh", mandi: "Agra", price: 1200, trend: "stable", change: 0.2 },
  { id: 12, crop: "Maize", variety: "DHM-117", state: "Bihar", mandi: "Patna", price: 2050, trend: "up", change: 1.1 },
];

// IoT Sensor data
export const sensorData = [
  {
    id: "ESP32-001",
    name: "Field A - North",
    moisture: 68,
    temperature: 28,
    ph: 6.8,
    battery: 85,
    status: "online",
    moistureHistory: [62, 65, 68, 64, 70, 68, 68],
  },
  {
    id: "ESP32-002",
    name: "Field A - South",
    moisture: 45,
    temperature: 31,
    ph: 7.2,
    battery: 72,
    status: "online",
    moistureHistory: [52, 48, 45, 47, 44, 46, 45],
  },
  {
    id: "ESP32-003",
    name: "Field B - Center",
    moisture: 72,
    temperature: 27,
    ph: 6.5,
    battery: 92,
    status: "online",
    moistureHistory: [68, 70, 72, 71, 73, 72, 72],
  },
  {
    id: "ESP32-004",
    name: "Field C - West",
    moisture: 38,
    temperature: 33,
    ph: 7.5,
    battery: 15,
    status: "low_battery",
    moistureHistory: [45, 42, 40, 38, 37, 38, 38],
  },
];

// Forum posts
export const forumPosts = [
  {
    id: 1,
    title: "Best fertilizer for cotton in Vidarbha region?",
    author: "Ramesh Patil",
    avatar: "RP",
    category: "Seeds & Varieties",
    content: "I'm growing cotton in Wardha district. Which fertilizer combination works best for black soil? Currently using DAP but yields are low.",
    upvotes: 45,
    comments: 12,
    timeAgo: "2 hours ago",
    image: null,
  },
  {
    id: 2,
    title: "How to control pink bollworm in cotton?",
    author: "Suresh Kumar",
    avatar: "SK",
    category: "Pest Control",
    content: "My cotton crop is heavily infested with pink bollworm. Tried regular pesticides but no effect. Need urgent help before harvest!",
    upvotes: 78,
    comments: 23,
    timeAgo: "5 hours ago",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=400",
  },
  {
    id: 3,
    title: "Drip irrigation setup cost for 5 acres",
    author: "Anita Devi",
    avatar: "AD",
    category: "Irrigation",
    content: "Planning to install drip irrigation for my sugarcane field. Can anyone share approximate cost and best company to contact in UP?",
    upvotes: 32,
    comments: 18,
    timeAgo: "1 day ago",
    image: null,
  },
  {
    id: 4,
    title: "Experience with John Deere 5050D tractor",
    author: "Vikram Singh",
    avatar: "VS",
    category: "Farm Machinery",
    content: "Thinking of buying John Deere 5050D for my 15-acre farm. Any owners here? How's the mileage and after-sales service?",
    upvotes: 56,
    comments: 34,
    timeAgo: "2 days ago",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400",
  },
  {
    id: 5,
    title: "PM-KISAN amount not received for 3 months",
    author: "Mohan Lal",
    avatar: "ML",
    category: "Government Help",
    content: "I haven't received PM-KISAN payment since June. Bank account and Aadhaar are linked correctly. Who should I contact?",
    upvotes: 89,
    comments: 41,
    timeAgo: "3 days ago",
    image: null,
  },
];

// Government schemes
export const govSchemes = [
  {
    id: 1,
    name: "PM-KISAN",
    fullName: "Pradhan Mantri Kisan Samman Nidhi",
    description: "Direct income support of ₹6,000 per year to small and marginal farmer families.",
    eligibility: ["Land owning farmers", "Small & Marginal"],
    benefits: "₹6,000/year in 3 installments",
    deadline: "Ongoing",
    icon: "Banknote",
  },
  {
    id: 2,
    name: "PM Fasal Bima Yojana",
    fullName: "Pradhan Mantri Fasal Bima Yojana",
    description: "Crop insurance scheme providing financial support to farmers in case of crop failure.",
    eligibility: ["All farmers", "Kharif & Rabi crops"],
    benefits: "Up to ₹2 lakh coverage",
    deadline: "Before sowing season",
    icon: "Shield",
  },
  {
    id: 3,
    name: "Kisan Credit Card",
    fullName: "Kisan Credit Card Scheme",
    description: "Credit facility for farmers to meet their agricultural and consumption needs.",
    eligibility: ["All farmers", "Tenant farmers", "Sharecroppers"],
    benefits: "Up to ₹3 lakh @ 4% interest",
    deadline: "Ongoing",
    icon: "CreditCard",
  },
  {
    id: 4,
    name: "Soil Health Card",
    fullName: "Soil Health Card Scheme",
    description: "Free soil testing and nutrient recommendations for optimal fertilizer use.",
    eligibility: ["All farmers"],
    benefits: "Free soil testing",
    deadline: "Ongoing",
    icon: "FileText",
  },
  {
    id: 5,
    name: "PM-KUSUM",
    fullName: "Pradhan Mantri Kisan Urja Suraksha Evam Utthan Mahabhiyan",
    description: "Solar pump and grid-connected renewable power plants for farmers.",
    eligibility: ["All farmers", "Farmer groups"],
    benefits: "60% subsidy on solar pumps",
    deadline: "March 2025",
    icon: "Sun",
  },
  {
    id: 6,
    name: "eNAM",
    fullName: "National Agriculture Market",
    description: "Online trading platform for agricultural commodities across India.",
    eligibility: ["All farmers", "Traders"],
    benefits: "Better price discovery",
    deadline: "Ongoing",
    icon: "Store",
  },
];

// Recent activity
export const recentActivity = [
  { id: 1, type: "alert", message: "Low soil moisture detected in Field C", time: "10 mins ago", severity: "warning" },
  { id: 2, type: "sensor", message: "Temperature reading: 31°C in Field A", time: "25 mins ago", severity: "info" },
  { id: 3, type: "market", message: "Cotton prices up by ₹150 in Nagpur APMC", time: "1 hour ago", severity: "success" },
  { id: 4, type: "weather", message: "Rain expected in next 48 hours", time: "2 hours ago", severity: "info" },
  { id: 5, type: "alert", message: "ESP32-004 battery critically low (15%)", time: "3 hours ago", severity: "error" },
  { id: 6, type: "ai", message: "AI recommends irrigation for Field B tomorrow", time: "4 hours ago", severity: "info" },
];

// Weather data
export const weatherData = {
  current: {
    temp: 32,
    condition: "Partly Cloudy",
    humidity: 65,
    wind: 12,
    location: "Nagpur, Maharashtra",
  },
  forecast: [
    { day: "Today", high: 34, low: 24, condition: "sunny" },
    { day: "Tue", high: 33, low: 23, condition: "cloudy" },
    { day: "Wed", high: 30, low: 22, condition: "rainy" },
    { day: "Thu", high: 28, low: 21, condition: "rainy" },
    { day: "Fri", high: 31, low: 22, condition: "sunny" },
  ],
};

// Map markers across India
export const mapMarkers = [
  { id: "delhi", name: "Delhi", lat: 28.6139, lng: 77.209, type: "market" },
  { id: "nagpur", name: "Nagpur", lat: 21.1466, lng: 79.0888, type: "weather" },
  { id: "pune", name: "Pune", lat: 18.5204, lng: 73.8567, type: "iot" },
  { id: "bengaluru", name: "Bengaluru", lat: 12.9716, lng: 77.5946, type: "forecast" },
  { id: "jaipur", name: "Jaipur", lat: 26.9124, lng: 75.7873, type: "market" },
  { id: "bhubaneswar", name: "Bhubaneswar", lat: 20.2961, lng: 85.8245, type: "alert" },
  { id: "ahmedabad", name: "Ahmedabad", lat: 23.0225, lng: 72.5714, type: "iot" },
  { id: "lucknow", name: "Lucknow", lat: 26.8467, lng: 80.9462, type: "market" },
  { id: "patna", name: "Patna", lat: 25.5941, lng: 85.1376, type: "rain" },
  { id: "hyderabad", name: "Hyderabad", lat: 17.385, lng: 78.4867, type: "market" },
];

export const helplines = [
  {
    state: "Andhra Pradesh",
    category: "Consumer Affairs",
    numbers: ["1800-425-0082", "1800-425-2977"],
    website: "cphfs.in",
  },
  {
    state: "Arunachal Pradesh",
    category: "Agriculture Dept",
    numbers: ["1800-345-3601"],
    website: "",
  },
  {
    state: "Maharashtra",
    category: "Farmer Helpline",
    numbers: ["1800-233-4000"],
    website: "mahafarm.gov.in",
  },
  {
    state: "Tamil Nadu",
    category: "Krishi Call Center",
    numbers: ["1551"],
    website: "",
  },
  {
    state: "Karnataka",
    category: "Consumer Affairs",
    numbers: ["1800-425-9339"],
    website: "",
  },
];

// Forum categories
export const forumCategories = [
  { id: 1, name: "Pest Control", count: 234, icon: "Bug" },
  { id: 2, name: "Seeds & Varieties", count: 189, icon: "Sprout" },
  { id: 3, name: "Farm Machinery", count: 156, icon: "Tractor" },
  { id: 4, name: "Irrigation", count: 142, icon: "Droplets" },
  { id: 5, name: "Government Help", count: 298, icon: "Landmark" },
];

// Dashboard stats
export const dashboardStats = {
  yieldForecast: { value: 485, unit: "quintals", change: 12.5 },
  marketPrice: { value: 6850, unit: "₹/quintal", crop: "Cotton", change: 2.5 },
  activeAlerts: { value: 3, types: ["pest", "moisture", "weather"] },
  nextHarvest: { days: 18, crop: "Cotton" },
};