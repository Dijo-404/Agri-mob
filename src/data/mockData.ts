// Comprehensive Mock Data for AgriSmart Web Dashboard

// Weather Data
export const weatherData = {
  current: {
    temp: 28,
    feelsLike: 30,
    humidity: 65,
    windSpeed: 12,
    condition: "Partly Cloudy",
    icon: "partly-cloudy",
    location: "Nashik, Maharashtra",
    soilMoisture: 45,
    uvIndex: 6,
  },
  forecast: [
    { day: "Today", high: 32, low: 24, condition: "Partly Cloudy", icon: "partly-cloudy", rainChance: 20 },
    { day: "Tue", high: 33, low: 25, condition: "Sunny", icon: "sunny", rainChance: 10 },
    { day: "Wed", high: 31, low: 24, condition: "Cloudy", icon: "cloudy", rainChance: 40 },
    { day: "Thu", high: 29, low: 23, condition: "Rain", icon: "rain", rainChance: 80 },
    { day: "Fri", high: 28, low: 22, condition: "Rain", icon: "rain", rainChance: 70 },
    { day: "Sat", high: 30, low: 23, condition: "Partly Cloudy", icon: "partly-cloudy", rainChance: 30 },
    { day: "Sun", high: 32, low: 25, condition: "Sunny", icon: "sunny", rainChance: 5 },
  ],
};

// Yield Data for 12 months (This Year vs Last Year)
export const yieldData = [
  { month: "Jan", thisYear: 42, lastYear: 38 },
  { month: "Feb", thisYear: 48, lastYear: 42 },
  { month: "Mar", thisYear: 55, lastYear: 50 },
  { month: "Apr", thisYear: 62, lastYear: 55 },
  { month: "May", thisYear: 70, lastYear: 62 },
  { month: "Jun", thisYear: 78, lastYear: 68 },
  { month: "Jul", thisYear: 85, lastYear: 75 },
  { month: "Aug", thisYear: 92, lastYear: 82 },
  { month: "Sep", thisYear: 88, lastYear: 78 },
  { month: "Oct", thisYear: 75, lastYear: 70 },
  { month: "Nov", thisYear: 60, lastYear: 55 },
  { month: "Dec", thisYear: 50, lastYear: 45 },
];

// Dashboard Stats
export const dashboardStats = {
  yieldForecast: { value: 485, unit: "quintals", change: 12.5, trend: "up" },
  marketPrice: { value: 6850, unit: "₹/quintal", crop: "Cotton", change: 2.5, trend: "up" },
  activeAlerts: { value: 3, types: ["pest", "moisture", "weather"] },
  nextHarvest: { days: 18, crop: "Cotton", date: "Dec 27, 2025" },
};

// Sensor Data for IoT
export const sensorData = [
  {
    id: "sensor-1",
    name: "Field A - North",
    type: "soil_moisture",
    value: 45,
    unit: "%",
    status: "normal",
    history: [42, 44, 45, 43, 46, 45, 44],
    lastUpdate: "2 min ago",
  },
  {
    id: "sensor-2",
    name: "Field A - South",
    type: "soil_moisture",
    value: 32,
    unit: "%",
    status: "warning",
    history: [38, 36, 35, 34, 33, 32, 32],
    lastUpdate: "5 min ago",
  },
  {
    id: "sensor-3",
    name: "Field B - Center",
    type: "temperature",
    value: 28,
    unit: "°C",
    status: "normal",
    history: [26, 27, 27, 28, 28, 28, 28],
    lastUpdate: "1 min ago",
  },
  {
    id: "sensor-4",
    name: "Greenhouse 1",
    type: "humidity",
    value: 72,
    unit: "%",
    status: "high",
    history: [68, 69, 70, 71, 72, 72, 72],
    lastUpdate: "3 min ago",
  },
  {
    id: "sensor-5",
    name: "Water Tank",
    type: "water_level",
    value: 85,
    unit: "%",
    status: "normal",
    history: [90, 89, 88, 87, 86, 85, 85],
    lastUpdate: "10 min ago",
  },
];

// Recent Activity
export const recentActivity = [
  { id: 1, type: "sensor", message: "Soil moisture low in Field B", time: "5 min ago", severity: "warning" },
  { id: 2, type: "ai", message: "Crop recommendation generated", time: "15 min ago", severity: "info" },
  { id: 3, type: "market", message: "Cotton price increased by 5%", time: "1 hour ago", severity: "success" },
  { id: 4, type: "weather", message: "Rain expected in 2 days", time: "2 hours ago", severity: "info" },
  { id: 5, type: "pest", message: "Aphid activity detected in Field A", time: "3 hours ago", severity: "danger" },
  { id: 6, type: "harvest", message: "Wheat harvest completed", time: "Yesterday", severity: "success" },
];

// Market Prices Table Data
export const marketPrices = [
  { id: 1, crop: "Cotton", variety: "DCH-32", state: "Maharashtra", price: 6850, unit: "quintal", trend: "up", change: 5.2 },
  { id: 2, crop: "Wheat", variety: "HD-2967", state: "Punjab", price: 2275, unit: "quintal", trend: "stable", change: 0.5 },
  { id: 3, crop: "Rice", variety: "Basmati", state: "Haryana", price: 4200, unit: "quintal", trend: "up", change: 3.8 },
  { id: 4, crop: "Soybean", variety: "JS-335", state: "Madhya Pradesh", price: 4650, unit: "quintal", trend: "down", change: -2.1 },
  { id: 5, crop: "Maize", variety: "DHM-117", state: "Karnataka", price: 2150, unit: "quintal", trend: "up", change: 1.5 },
  { id: 6, crop: "Sugarcane", variety: "Co-0238", state: "Uttar Pradesh", price: 350, unit: "quintal", trend: "stable", change: 0 },
  { id: 7, crop: "Groundnut", variety: "TG-37A", state: "Gujarat", price: 5800, unit: "quintal", trend: "up", change: 4.2 },
  { id: 8, crop: "Mustard", variety: "RH-749", state: "Rajasthan", price: 5200, unit: "quintal", trend: "down", change: -1.8 },
  { id: 9, crop: "Chana", variety: "JG-11", state: "Maharashtra", price: 4850, unit: "quintal", trend: "up", change: 2.9 },
  { id: 10, crop: "Bajra", variety: "HHB-67", state: "Rajasthan", price: 2350, unit: "quintal", trend: "stable", change: 0.3 },
];

// Forum Posts
export const forumPosts = [
  {
    id: 1,
    title: "Best fertilizer for cotton during flowering stage?",
    author: "Ramesh Kumar",
    avatar: "RK",
    category: "Seeds & Fertilizers",
    replies: 23,
    upvotes: 45,
    time: "2 hours ago",
    preview: "I'm growing cotton and it's now in the flowering stage. What NPK ratio would you recommend?",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400",
  },
  {
    id: 2,
    title: "How to control aphids organically in wheat?",
    author: "Suresh Patel",
    avatar: "SP",
    category: "Pests & Diseases",
    replies: 18,
    upvotes: 32,
    time: "5 hours ago",
    preview: "Noticed aphids on my wheat crop. Looking for organic solutions that won't affect the grain quality.",
    image: null,
  },
  {
    id: 3,
    title: "New tractor vs used - what's your experience?",
    author: "Dinesh Sharma",
    avatar: "DS",
    category: "Machinery",
    replies: 56,
    upvotes: 89,
    time: "1 day ago",
    preview: "Planning to buy a tractor for my 15-acre farm. Should I go for a new Mahindra or a used John Deere?",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400",
  },
  {
    id: 4,
    title: "Drip irrigation setup cost and ROI",
    author: "Priya Deshmukh",
    avatar: "PD",
    category: "Irrigation",
    replies: 34,
    upvotes: 67,
    time: "2 days ago",
    preview: "Want to switch from flood irrigation to drip. How long before I see returns on investment?",
    image: null,
  },
  {
    id: 5,
    title: "PM-KISAN payment stuck - how to resolve?",
    author: "Anil Yadav",
    avatar: "AY",
    category: "Government Schemes",
    replies: 42,
    upvotes: 78,
    time: "3 days ago",
    preview: "Haven't received PM-KISAN payment for 2 installments. Bank details are correct. Any suggestions?",
    image: null,
  },
];

// Forum Categories
export const forumCategories = [
  { id: 1, name: "Pests & Diseases", count: 234, icon: "Bug" },
  { id: 2, name: "Seeds & Fertilizers", count: 189, icon: "Sprout" },
  { id: 3, name: "Machinery", count: 156, icon: "Tractor" },
  { id: 4, name: "Irrigation", count: 142, icon: "Droplets" },
  { id: 5, name: "Government Schemes", count: 298, icon: "Landmark" },
  { id: 6, name: "Market Prices", count: 167, icon: "TrendingUp" },
];

// Government Schemes
export const govSchemes = [
  {
    id: 1,
    name: "PM-KISAN",
    fullName: "Pradhan Mantri Kisan Samman Nidhi",
    description: "Direct income support of ₹6,000 per year to farmer families",
    benefits: ["₹2,000 every 4 months", "Direct bank transfer", "No middlemen"],
    eligibility: "Small and marginal farmers with cultivable land",
    deadline: "Ongoing",
    status: "active",
  },
  {
    id: 2,
    name: "PM Fasal Bima Yojana",
    fullName: "Pradhan Mantri Fasal Bima Yojana",
    description: "Crop insurance scheme providing financial support in case of crop failure",
    benefits: ["Low premium rates", "Full sum insured", "Quick claim settlement"],
    eligibility: "All farmers growing notified crops",
    deadline: "Before sowing season",
    status: "active",
  },
  {
    id: 3,
    name: "Kisan Credit Card",
    fullName: "Kisan Credit Card Scheme",
    description: "Credit facility for farmers to meet their agricultural needs",
    benefits: ["Interest subvention", "Flexible repayment", "Insurance coverage"],
    eligibility: "All farmers, including tenant farmers",
    deadline: "Ongoing",
    status: "active",
  },
  {
    id: 4,
    name: "Soil Health Card",
    fullName: "Soil Health Card Scheme",
    description: "Free soil testing and recommendations for nutrients and fertilizers",
    benefits: ["Free soil analysis", "Customized recommendations", "Improved yield"],
    eligibility: "All farmers",
    deadline: "Ongoing",
    status: "active",
  },
];

// Trending Schemes (sidebar)
export const trendingSchemes = [
  { name: "PM-KISAN", applications: "2.3L this week" },
  { name: "Fasal Bima", applications: "1.8L this week" },
  { name: "KCC Renewal", applications: "95K this week" },
  { name: "Subsidy Portal", applications: "67K this week" },
];

// Map Markers for Smart Mapping
export const mapMarkers = [
  { id: 1, lat: 20.0114, lng: 73.7803, type: "field", name: "Field A - Cotton", area: "5 acres", status: "healthy" },
  { id: 2, lat: 20.0134, lng: 73.7823, type: "field", name: "Field B - Wheat", area: "3 acres", status: "needs_water" },
  { id: 3, lat: 20.0094, lng: 73.7783, type: "sensor", name: "Moisture Sensor 1", value: "45%", status: "normal" },
  { id: 4, lat: 20.0124, lng: 73.7843, type: "sensor", name: "Temperature Sensor", value: "28°C", status: "normal" },
  { id: 5, lat: 20.0074, lng: 73.7763, type: "alert", name: "Pest Alert Zone", message: "Aphids detected", severity: "high" },
  { id: 6, lat: 20.0154, lng: 73.7863, type: "water", name: "Water Tank", level: "85%", status: "good" },
  { id: 7, lat: 20.0084, lng: 73.7813, type: "field", name: "Field C - Soybean", area: "4 acres", status: "harvesting" },
  { id: 8, lat: 20.0144, lng: 73.7793, type: "equipment", name: "Tractor Location", status: "idle" },
];

// Helplines
export const helplines = [
  { state: "National", category: "Kisan Call Center", numbers: ["1800-180-1551"], website: "farmer.gov.in" },
  { state: "Maharashtra", category: "Agriculture Helpline", numbers: ["1800-233-4000"], website: "mahaagri.gov.in" },
  { state: "Punjab", category: "Kisan Helpline", numbers: ["1800-180-1551", "0172-2701118"], website: "agripb.gov.in" },
  { state: "Haryana", category: "Agriculture Helpline", numbers: ["1800-180-2117"], website: "agriharyana.gov.in" },
  { state: "Gujarat", category: "Kisan Helpline", numbers: ["1800-180-1551", "079-23256001"], website: "agri.gujarat.gov.in" },
  { state: "Karnataka", category: "Raitha Samparka Kendra", numbers: ["1800-425-1553"], website: "raitamitra.kar.nic.in" },
  { state: "Tamil Nadu", category: "Uzhavar Helpline", numbers: ["1800-425-1885"], website: "tnagri.tn.gov.in" },
  { state: "Uttar Pradesh", category: "Kisan Helpline", numbers: ["1800-180-1551"], website: "upagripardarshi.gov.in" },
  { state: "Madhya Pradesh", category: "Kisan Call Center", numbers: ["1800-180-1551", "0755-2583313"], website: "mpkrishi.mp.gov.in" },
  { state: "Rajasthan", category: "Kisan Helpline", numbers: ["1800-180-1551"], website: "agriculture.rajasthan.gov.in" },
];

// Indian States for dropdowns
export const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

// Indian Districts by State
export const indianDistricts: Record<string, string[]> = {
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur", "Kolhapur", "Amravati", "Satara", "Sangli"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Pathankot", "Hoshiarpur"],
  "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal", "Hisar", "Rohtak", "Sonipat"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubli", "Mangaluru", "Belgaum", "Dharwad", "Shimoga", "Tumkur"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Allahabad", "Meerut", "Noida", "Ghaziabad"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Rewa", "Satna"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Alwar", "Bharatpur"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Darjeeling", "Kharagpur"],
};

// Crops for dropdowns
export const crops = [
  "Cotton", "Wheat", "Rice", "Maize", "Soybean", "Sugarcane", "Groundnut",
  "Mustard", "Chana", "Bajra", "Jowar", "Sunflower", "Tomato", "Onion", "Potato",
];
