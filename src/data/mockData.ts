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
  { id: 1, crop: "Cotton", variety: "DCH-32", state: "Maharashtra", mandi: "Yavatmal", price: 6850, unit: "quintal", trend: "up", change: 5.2 },
  { id: 2, crop: "Wheat", variety: "HD-2967", state: "Punjab", mandi: "Ludhiana", price: 2275, unit: "quintal", trend: "stable", change: 0.5 },
  { id: 3, crop: "Rice", variety: "Basmati", state: "Haryana", mandi: "Karnal", price: 4200, unit: "quintal", trend: "up", change: 3.8 },
  { id: 4, crop: "Soybean", variety: "JS-335", state: "Madhya Pradesh", mandi: "Indore", price: 4650, unit: "quintal", trend: "down", change: -2.1 },
  { id: 5, crop: "Maize", variety: "DHM-117", state: "Karnataka", mandi: "Hubli", price: 2150, unit: "quintal", trend: "up", change: 1.5 },
  { id: 6, crop: "Sugarcane", variety: "Co-0238", state: "Uttar Pradesh", mandi: "Meerut", price: 350, unit: "quintal", trend: "stable", change: 0 },
  { id: 7, crop: "Groundnut", variety: "TG-37A", state: "Gujarat", mandi: "Rajkot", price: 5800, unit: "quintal", trend: "up", change: 4.2 },
  { id: 8, crop: "Mustard", variety: "RH-749", state: "Rajasthan", mandi: "Bharatpur", price: 5200, unit: "quintal", trend: "down", change: -1.8 },
  { id: 9, crop: "Chana", variety: "JG-11", state: "Maharashtra", mandi: "Pune", price: 4850, unit: "quintal", trend: "up", change: 2.9 },
  { id: 10, crop: "Bajra", variety: "HHB-67", state: "Rajasthan", mandi: "Jaipur", price: 2350, unit: "quintal", trend: "stable", change: 0.3 },
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

// Government Scheme News
export const govSchemeNews = [
  {
    id: 1,
    title: "PM-KISAN 17th Installment Released - ₹2,000 Direct Transfer",
    description: "The Government of India has released the 17th installment of PM-KISAN scheme. Over 9 crore farmers to receive ₹2,000 directly in their bank accounts.",
    date: "2025-12-01",
    source: "Ministry of Agriculture",
    url: "https://pmkisan.gov.in",
    category: "PM-KISAN",
  },
  {
    id: 2,
    title: "PM Fasal Bima Yojana: Premium Rates Reduced for Kharif 2025",
    description: "Government announces reduced premium rates for crop insurance. Farmers can now avail insurance at lower costs with enhanced coverage.",
    date: "2025-11-28",
    source: "Ministry of Agriculture",
    url: "https://pmfby.gov.in",
    category: "Insurance",
  },
  {
    id: 3,
    title: "Kisan Credit Card (KCC) Interest Subvention Extended",
    description: "The interest subvention scheme for KCC has been extended. Farmers can avail loans at 4% interest rate for agricultural activities.",
    date: "2025-11-25",
    source: "RBI & Ministry of Agriculture",
    url: "https://www.rbi.org.in",
    category: "Credit",
  },
  {
    id: 4,
    title: "Soil Health Card Scheme: Free Testing for All Farmers",
    description: "Government launches free soil health testing campaign. Farmers can get their soil tested and receive customized fertilizer recommendations.",
    date: "2025-11-20",
    source: "Department of Agriculture",
    url: "https://soilhealth.dac.gov.in",
    category: "Soil Health",
  },
  {
    id: 5,
    title: "New Subsidy on Drip Irrigation Systems - 55% Government Support",
    description: "Enhanced subsidy scheme for micro-irrigation. Farmers can get up to 55% subsidy on drip and sprinkler irrigation systems.",
    date: "2025-11-15",
    source: "Ministry of Jal Shakti",
    url: "https://pmksy.gov.in",
    category: "Irrigation",
  },
  {
    id: 6,
    title: "Pradhan Mantri Kisan Maan Dhan Yojana: Pension Scheme for Farmers",
    description: "Small and marginal farmers aged 18-40 can enroll for pension scheme. Monthly contribution of ₹55-200 for assured pension after 60 years.",
    date: "2025-11-10",
    source: "Ministry of Agriculture",
    url: "https://maandhan.in",
    category: "Pension",
  },
];

// Map Markers for Smart Mapping
export const mapMarkers = [
  // Major Agricultural Markets (Mandi/APMC) in India
  { id: 1, lat: 28.7041, lng: 77.1025, type: "market", name: "Azadpur Mandi", details: "Delhi - Largest fruit & vegetable market in Asia. Handles 3,000+ tons daily. Major crops: Fruits, Vegetables, Grains", status: "active" },
  { id: 2, lat: 19.0760, lng: 72.8777, type: "market", name: "Vashi APMC", details: "Mumbai, Maharashtra - Major wholesale market. Handles 2,500+ tons daily. Major crops: Fruits, Vegetables, Spices", status: "active" },
  { id: 3, lat: 13.0827, lng: 80.2707, type: "market", name: "Koyambedu Market", details: "Chennai, Tamil Nadu - Largest wholesale market in South India. Major crops: Fruits, Vegetables, Flowers", status: "active" },
  { id: 4, lat: 12.9716, lng: 77.5946, type: "market", name: "Yeshwanthpur APMC", details: "Bangalore, Karnataka - Major agricultural market. Handles 1,800+ tons daily. Major crops: Fruits, Vegetables, Grains", status: "active" },
  { id: 5, lat: 30.7333, lng: 76.7794, type: "market", name: "Chandigarh Mandi", details: "Chandigarh - Major grain market. Handles 1,200+ tons daily. Major crops: Wheat, Rice, Pulses", status: "active" },
  { id: 6, lat: 22.7196, lng: 75.8577, type: "market", name: "Indore Mandi", details: "Indore, Madhya Pradesh - Largest soyabean market in Asia. Major crops: Soyabean, Wheat, Cotton", status: "active" },
  { id: 7, lat: 21.1458, lng: 79.0882, type: "market", name: "Nagpur APMC", details: "Nagpur, Maharashtra - Major orange and cotton market. Major crops: Oranges, Cotton, Soyabean", status: "active" },
  { id: 8, lat: 23.0225, lng: 72.5714, type: "market", name: "Ahmedabad APMC", details: "Ahmedabad, Gujarat - Major agricultural market. Handles 2,000+ tons daily. Major crops: Cotton, Groundnut, Vegetables", status: "active" },
  { id: 9, lat: 22.5726, lng: 88.3639, type: "market", name: "Kolkata Mandi", details: "Kolkata, West Bengal - Major wholesale market. Handles 1,500+ tons daily. Major crops: Rice, Vegetables, Fish", status: "active" },
  { id: 10, lat: 17.3850, lng: 78.4867, type: "market", name: "Hyderabad APMC", details: "Hyderabad, Telangana - Major agricultural market. Handles 1,800+ tons daily. Major crops: Rice, Cotton, Chillies", status: "active" },
  { id: 11, lat: 26.9124, lng: 75.7873, type: "market", name: "Jaipur Mandi", details: "Jaipur, Rajasthan - Major grain market. Major crops: Wheat, Mustard, Pulses", status: "active" },
  { id: 12, lat: 25.5941, lng: 85.1376, type: "market", name: "Patna Mandi", details: "Patna, Bihar - Major agricultural market. Major crops: Rice, Wheat, Vegetables", status: "active" },
  { id: 13, lat: 19.2183, lng: 72.9781, type: "market", name: "Nashik APMC", details: "Nashik, Maharashtra - Major onion and grape market. Major crops: Onions, Grapes, Vegetables", status: "active" },
  { id: 14, lat: 30.9010, lng: 75.8573, type: "market", name: "Ludhiana Mandi", details: "Ludhiana, Punjab - Major grain market. Major crops: Wheat, Rice, Cotton", status: "active" },
  { id: 15, lat: 18.5204, lng: 73.8567, type: "market", name: "Pune APMC", details: "Pune, Maharashtra - Major agricultural market. Major crops: Vegetables, Fruits, Grains", status: "active" },
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
