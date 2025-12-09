// Farming Courses Data

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface CourseModule {
  id: string;
  title: string;
  content: string[];
  type: "lesson" | "quiz";
  quizQuestions?: QuizQuestion[];
  videoUrl?: string;
  imageUrl?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  duration: string;
  modules: CourseModule[];
}

export const farmingCourses: Course[] = [
  {
    id: "organic-farming",
    title: "Organic Farming Fundamentals",
    description: "Learn the principles and practices of organic farming for sustainable agriculture",
    icon: "leaf",
    color: "#22c55e",
    duration: "4-5 hours",
    modules: [
      {
        id: "of-m1",
        title: "Introduction to Organic Farming",
        type: "lesson",
        content: [
          "Organic farming is a method of crop and livestock production that involves much more than choosing not to use pesticides, fertilizers, genetically modified organisms, antibiotics and growth hormones.",
          "Organic farming focuses on maintaining soil health, ecosystem management, and promoting biodiversity.",
          "Key principles include crop rotation, green manures, compost, biological pest control, and mechanical cultivation.",
          "Organic farming systems rely on crop rotation, crop residues, animal manures, legumes, green manure, off-farm organic wastes, and biological pest control to maintain soil productivity.",
          "The goal is to optimize the health and productivity of interdependent communities of soil life, plants, animals and people.",
        ],
        videoUrl: "https://youtu.be/SOcxRMOjXWY",
        imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80",
      },
      {
        id: "of-m2",
        title: "Soil Management in Organic Farming",
        type: "lesson",
        content: [
          "Healthy soil is the foundation of organic farming. Soil should be rich in organic matter and teeming with beneficial microorganisms.",
          "Composting is essential: Create compost from crop residues, animal manure, kitchen waste, and other organic materials.",
          "Green manuring involves growing specific crops and plowing them back into the soil to improve fertility.",
          "Crop rotation prevents soil depletion by alternating different crops in the same field across seasons.",
          "Avoid synthetic fertilizers. Use natural alternatives like bone meal, rock phosphate, and seaweed extracts.",
          "Maintain proper soil pH (6.0-7.0 for most crops) using natural amendments like lime or sulfur.",
        ],
        videoUrl: "https://youtu.be/heTxEsrPVdQ",
        imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80",
      },
      {
        id: "of-m3",
        title: "Pest and Disease Management",
        type: "lesson",
        content: [
          "Integrated Pest Management (IPM) is crucial in organic farming. Focus on prevention rather than cure.",
          "Biological control: Introduce beneficial insects like ladybugs, lacewings, and predatory mites to control pests.",
          "Companion planting: Some plants naturally repel pests. For example, marigolds repel nematodes, and basil repels flies.",
          "Crop rotation breaks pest and disease cycles by preventing pests from finding their host plants.",
          "Use organic pesticides only as a last resort: Neem oil, pyrethrin, and diatomaceous earth are approved organic options.",
          "Proper spacing and pruning improve air circulation, reducing fungal diseases.",
        ],
        videoUrl: "https://youtu.be/m28inqnDKp8",
        imageUrl: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
      },
      {
        id: "of-quiz",
        title: "Organic Farming Quiz",
        type: "quiz",
        content: [],
        quizQuestions: [
          {
            id: "of-q1",
            question: "What is the minimum transition period required for organic certification?",
            options: ["1 year", "2 years", "3 years", "5 years"],
            correctAnswer: 2,
            explanation: "Land must be managed organically for at least 3 years before it can be certified as organic.",
          },
          {
            id: "of-q2",
            question: "Which of the following is NOT a principle of organic farming?",
            options: ["Crop rotation", "Use of synthetic fertilizers", "Biological pest control", "Green manuring"],
            correctAnswer: 1,
            explanation: "Organic farming strictly avoids synthetic fertilizers.",
          },
          {
            id: "of-q3",
            question: "What is the ideal soil pH range for most crops?",
            options: ["4.0-5.0", "5.0-6.0", "6.0-7.0", "7.0-8.0"],
            correctAnswer: 2,
            explanation: "Most crops grow best in slightly acidic to neutral soil, with a pH range of 6.0-7.0.",
          },
        ],
      },
    ],
  },
  {
    id: "crop-management",
    title: "Modern Crop Management Techniques",
    description: "Master advanced crop management for maximum yield and quality",
    icon: "stats-chart",
    color: "#3b82f6",
    duration: "5-6 hours",
    modules: [
      {
        id: "cm-m1",
        title: "Soil Preparation and Seed Selection",
        type: "lesson",
        content: [
          "Proper soil preparation is crucial for successful crop production. Start with soil testing to determine pH, nutrient levels, and organic matter content.",
          "Primary tillage: Deep plowing (20-25 cm) breaks hardpan and improves soil aeration. Best done during summer for solarization.",
          "Secondary tillage: Harrowing and leveling create a fine seedbed. Ensure uniform soil texture and remove weeds.",
          "Seed selection: Choose high-yielding, disease-resistant varieties suitable for your region and season.",
          "Seed treatment: Treat seeds with fungicides and insecticides to prevent seed-borne diseases and early pest attacks.",
          "Sowing depth: Generally 2-3 times the seed diameter. Deeper for larger seeds, shallower for small seeds.",
        ],
        videoUrl: "https://youtu.be/8Y9vV5w5mR4",
        imageUrl: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
      },
      {
        id: "cm-m2",
        title: "Irrigation and Water Management",
        type: "lesson",
        content: [
          "Efficient water management is essential for crop productivity and water conservation.",
          "Critical stages: Identify critical growth stages when water stress significantly impacts yield (e.g., flowering, grain filling).",
          "Drip irrigation: Most efficient method, delivering water directly to root zone, reducing water loss and weed growth.",
          "Sprinkler irrigation: Suitable for various crops, provides uniform water distribution, but higher evaporation losses.",
          "Water scheduling: Apply water based on soil moisture levels, not on fixed schedules. Use tensiometers or soil moisture sensors.",
          "Mulching: Reduces evaporation, maintains soil moisture, and controls weeds. Use organic mulch like straw or plastic mulch.",
        ],
        videoUrl: "https://youtu.be/qKzJz7a-7r8",
        imageUrl: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80",
      },
      {
        id: "cm-m3",
        title: "Nutrient Management and Fertilization",
        type: "lesson",
        content: [
          "Balanced nutrition is key to achieving optimal crop yields and quality.",
          "Essential nutrients: Crops need 17 essential elements. Major nutrients (NPK), secondary nutrients (Ca, Mg, S), and micronutrients.",
          "Soil testing: Regular soil testing (every 2-3 years) helps determine nutrient deficiencies and fertilizer requirements.",
          "Fertilizer application: Basal application at sowing (50-60%), Top dressing during active growth (40-50%).",
          "NPK ratio: Follow recommended NPK ratios for different crops (e.g., Rice: 4:2:1, Wheat: 4:2:1, Cotton: 3:2:1).",
          "Organic fertilizers: Combine with inorganic fertilizers. FYM, compost, and green manure improve soil health.",
        ],
        videoUrl: "https://youtu.be/x6jq3yZv2o4",
        imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80",
      },
      {
        id: "cm-quiz",
        title: "Crop Management Quiz",
        type: "quiz",
        content: [],
        quizQuestions: [
          {
            id: "cm-q1",
            question: "What is the recommended depth for primary tillage?",
            options: ["10-15 cm", "15-20 cm", "20-25 cm", "25-30 cm"],
            correctAnswer: 2,
            explanation: "Primary tillage should be done at 20-25 cm depth to break hardpan and improve soil aeration.",
          },
          {
            id: "cm-q2",
            question: "Which irrigation method is most water-efficient?",
            options: ["Flood irrigation", "Sprinkler irrigation", "Drip irrigation", "Furrow irrigation"],
            correctAnswer: 2,
            explanation: "Drip irrigation is the most efficient method, delivering water directly to the root zone.",
          },
        ],
      },
    ],
  },
  {
    id: "sustainable-agriculture",
    title: "Sustainable Agriculture Practices",
    description: "Learn sustainable farming methods for long-term productivity and environmental protection",
    icon: "earth",
    color: "#10b981",
    duration: "4-5 hours",
    modules: [
      {
        id: "sa-m1",
        title: "Principles of Sustainable Agriculture",
        type: "lesson",
        content: [
          "Sustainable agriculture meets present food needs without compromising future generations' ability to meet their needs.",
          "Three pillars: Environmental health, economic profitability, and social equity.",
          "Key principles: Maintain soil health, Conserve water resources, Promote biodiversity, Reduce chemical inputs.",
          "Sustainable practices help combat climate change by reducing greenhouse gas emissions and sequestering carbon in soil.",
          "Long-term benefits include improved soil fertility, reduced input costs, and increased resilience to climate variability.",
        ],
        videoUrl: "https://youtu.be/RlGH3qy3cJs",
        imageUrl: "https://images.unsplash.com/photo-1478146896985-b7a3f92e48b6?w=800&q=80",
      },
      {
        id: "sa-m2",
        title: "Conservation Agriculture",
        type: "lesson",
        content: [
          "Conservation agriculture is based on three principles: minimum soil disturbance, permanent soil cover, and crop diversification.",
          "Zero tillage (No-till): Reduces soil erosion, improves water retention, and saves fuel and labor costs.",
          "Crop residues: Leave crop residues on field surface to protect soil from erosion and maintain moisture.",
          "Cover crops: Grow cover crops between main crops to improve soil health, suppress weeds, and fix nitrogen.",
          "Benefits: Improved soil structure, Reduced erosion by 50-90%, Water savings of 20-30%, Lower fuel and labor costs.",
        ],
        videoUrl: "https://youtu.be/3o8pYJz6QbY",
        imageUrl: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80",
      },
      {
        id: "sa-m3",
        title: "Water Conservation Techniques",
        type: "lesson",
        content: [
          "Water is a precious resource. Efficient water use is essential for sustainable agriculture.",
          "Rainwater harvesting: Collect and store rainwater in ponds, tanks, or underground reservoirs.",
          "Watershed management: Implement measures to capture and store rainwater in the watershed.",
          "Drip and sprinkler irrigation: Use efficient irrigation systems to reduce water wastage.",
          "Mulching: Apply organic or plastic mulch to reduce evaporation and maintain soil moisture.",
          "Crop selection: Choose drought-tolerant varieties and crops suitable for local climate.",
        ],
        videoUrl: "https://youtu.be/w6d2R6c7xRk",
        imageUrl: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80",
      },
      {
        id: "sa-quiz",
        title: "Sustainable Agriculture Quiz",
        type: "quiz",
        content: [],
        quizQuestions: [
          {
            id: "sa-q1",
            question: "What are the three pillars of sustainable agriculture?",
            options: [
              "Soil, water, air",
              "Environmental health, economic profitability, social equity",
              "Crops, livestock, fisheries",
              "Production, processing, marketing",
            ],
            correctAnswer: 1,
            explanation: "Sustainable agriculture is built on three pillars: environmental health, economic profitability, and social equity.",
          },
          {
            id: "sa-q2",
            question: "What is the main benefit of zero tillage farming?",
            options: [
              "Higher yields",
              "Reduced soil erosion and improved water retention",
              "Faster planting",
              "Lower seed costs",
            ],
            correctAnswer: 1,
            explanation: "Zero tillage reduces soil erosion by 50-90%, improves water retention, and saves fuel and labor costs.",
          },
        ],
      },
    ],
  },
];
