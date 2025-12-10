import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Banknote, Shield, CreditCard, FileText, Sun, Store, X, Check, ChevronRight, ChevronLeft, ExternalLink, Newspaper, Search } from "lucide-react";
import { govSchemes, govSchemeNews } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const schemeIcons: Record<string, typeof Banknote> = {
  Banknote,
  Shield,
  CreditCard,
  FileText,
  Sun,
  Store,
};

const applicationSteps = [
  { id: 1, title: "Farmer Details", fields: ["name", "aadhaar", "phone"] },
  { id: 2, title: "Land Details", fields: ["survey", "area", "district"] },
  { id: 3, title: "Bank Details", fields: ["bank", "account", "ifsc"] },
  { id: 4, title: "Documents", fields: ["landRecord", "idProof"] },
  { id: 5, title: "Review", fields: [] },
];

// Function to highlight matching text
const highlightText = (text: string, query: string) => {
  if (!query || !text) return text;
  
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, index) => {
    // Check if this part matches the query (case-insensitive)
    if (part.toLowerCase() === query.toLowerCase()) {
      return (
        <mark key={index} className="bg-primary/20 text-primary font-medium px-0.5 rounded">
          {part}
        </mark>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

export default function GovSchemes() {
  const { toast } = useToast();
  const [selectedScheme, setSelectedScheme] = useState<typeof govSchemes[0] | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    aadhaar: "",
    phone: "",
    survey: "",
    area: "",
    district: "",
    bank: "",
    account: "",
    ifsc: "",
  });

  // Safety check for govSchemes data
  if (!govSchemes || govSchemes.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Government Schemes</h1>
          <p className="text-muted-foreground">Explore and apply for agricultural welfare schemes</p>
        </div>
        <div className="glass-card rounded-xl p-12 text-center">
          <p className="text-muted-foreground">No schemes available at the moment.</p>
        </div>
      </div>
    );
  }

  // Calculate relevance score for schemes
  const calculateSchemeScore = (scheme: typeof govSchemes[0], query: string): number => {
    let score = 0;
    const queryLower = query.toLowerCase();
    
    const name = (scheme?.name || "").toLowerCase();
    const fullName = (scheme?.fullName || "").toLowerCase();
    const description = (scheme?.description || "").toLowerCase();
    const benefits = Array.isArray(scheme?.benefits) 
      ? scheme.benefits.join(" ").toLowerCase()
      : (scheme?.benefits || "").toLowerCase();
    const eligibility = typeof scheme?.eligibility === 'string'
      ? scheme.eligibility.toLowerCase()
      : Array.isArray(scheme?.eligibility)
      ? scheme.eligibility.join(" ").toLowerCase()
      : "";
    
    // Exact match in name (highest priority)
    if (name === queryLower) score += 100;
    else if (name.startsWith(queryLower)) score += 50;
    else if (name.includes(queryLower)) score += 20;
    
    // Full name matches
    if (fullName === queryLower) score += 80;
    else if (fullName.startsWith(queryLower)) score += 40;
    else if (fullName.includes(queryLower)) score += 15;
    
    // Description matches
    if (description.startsWith(queryLower)) score += 30;
    else if (description.includes(queryLower)) score += 10;
    
    // Benefits matches
    if (benefits.includes(queryLower)) score += 5;
    
    // Eligibility matches
    if (eligibility.includes(queryLower)) score += 5;
    
    return score;
  };

  // Filter and sort schemes based on search query
  const filteredSchemes = useMemo(() => {
    if (!searchQuery.trim()) {
      return govSchemes;
    }
    
    const query = searchQuery.toLowerCase();
    const schemesWithScores = govSchemes
      .map(scheme => ({
        scheme,
        score: calculateSchemeScore(scheme, query)
      }))
      .filter(item => item.score > 0) // Only include matching schemes
      .sort((a, b) => b.score - a.score) // Sort by score descending
      .map(item => item.scheme); // Extract just the schemes
    
    return schemesWithScores;
  }, [searchQuery]);

  // Calculate relevance score for news
  const calculateNewsScore = (news: typeof govSchemeNews[0], query: string): number => {
    let score = 0;
    const queryLower = query.toLowerCase();
    
    const title = (news?.title || "").toLowerCase();
    const description = (news?.description || "").toLowerCase();
    const category = (news?.category || "").toLowerCase();
    const source = (news?.source || "").toLowerCase();
    
    // Exact match in title (highest priority)
    if (title === queryLower) score += 100;
    else if (title.startsWith(queryLower)) score += 50;
    else if (title.includes(queryLower)) score += 20;
    
    // Category matches
    if (category === queryLower) score += 40;
    else if (category.startsWith(queryLower)) score += 30;
    else if (category.includes(queryLower)) score += 15;
    
    // Description matches
    if (description.startsWith(queryLower)) score += 30;
    else if (description.includes(queryLower)) score += 10;
    
    // Source matches
    if (source.includes(queryLower)) score += 5;
    
    return score;
  };

  // Filter and sort news based on search query
  const filteredNews = useMemo(() => {
    if (!govSchemeNews || govSchemeNews.length === 0) {
      return [];
    }
    
    if (!searchQuery.trim()) {
      return govSchemeNews;
    }
    
    const query = searchQuery.toLowerCase();
    const newsWithScores = govSchemeNews
      .map(news => ({
        news,
        score: calculateNewsScore(news, query)
      }))
      .filter(item => item.score > 0) // Only include matching news
      .sort((a, b) => b.score - a.score) // Sort by score descending
      .map(item => item.news); // Extract just the news
    
    return newsWithScores;
  }, [searchQuery]);

  const handleApply = (scheme: typeof govSchemes[0]) => {
    setSelectedScheme(scheme);
    setCurrentStep(1);
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.name || !formData.aadhaar || !formData.phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields in step 1",
        variant: "destructive",
      });
      setCurrentStep(1);
      return;
    }
    if (!formData.survey || !formData.area || !formData.district) {
      toast({
        title: "Missing information",
        description: "Please fill in all land details in step 2",
        variant: "destructive",
      });
      setCurrentStep(2);
      return;
    }
    if (!formData.bank || !formData.account || !formData.ifsc) {
      toast({
        title: "Missing information",
        description: "Please fill in all bank details in step 3",
        variant: "destructive",
      });
      setCurrentStep(3);
      return;
    }

    // Simulate API submission
    toast({
      title: "Application submitted successfully!",
      description: `Your application for ${selectedScheme?.name} has been submitted. You will receive a confirmation SMS shortly.`,
    });

    // Save to localStorage for reference
    const applications = JSON.parse(localStorage.getItem("govSchemeApplications") || "[]");
    applications.push({
      scheme: selectedScheme?.name,
      ...formData,
      submittedAt: new Date().toISOString(),
    });
    localStorage.setItem("govSchemeApplications", JSON.stringify(applications));

    handleClose();
  };

  const handleClose = () => {
    setSelectedScheme(null);
    setCurrentStep(1);
    setFormData({
      name: "",
      aadhaar: "",
      phone: "",
      survey: "",
      area: "",
      district: "",
      bank: "",
      account: "",
      ifsc: "",
    });
  };

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
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
        <h1 className="text-2xl font-display font-bold text-foreground">Government Schemes</h1>
        <p className="text-muted-foreground">Explore and apply for agricultural welfare schemes</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search schemes, news, benefits, eligibility..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchemes.length === 0 ? (
          <div className="col-span-full glass-card rounded-xl p-12 text-center">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground font-medium">No schemes found</p>
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your search query
            </p>
          </div>
        ) : (
          filteredSchemes.map((scheme, index) => {
          // Assign icon based on scheme name or use default
          const schemeName = scheme?.name || "";
          const iconKey = schemeName.includes("KISAN") || schemeName.includes("Kisan") 
            ? "Banknote" 
            : schemeName.includes("Bima") || schemeName.includes("Insurance")
            ? "Shield"
            : schemeName.includes("Credit") || schemeName.includes("Card")
            ? "CreditCard"
            : schemeName.includes("Health") || schemeName.includes("Soil")
            ? "FileText"
            : "FileText";
          const Icon = schemeIcons[iconKey] || FileText;
          
          // Handle benefits - it's an array
          const benefitsArray = Array.isArray(scheme?.benefits) 
            ? scheme.benefits 
            : scheme?.benefits 
            ? [scheme.benefits] 
            : [];
          
          // Handle eligibility - it's a string, not an array
          const eligibilityText = typeof scheme?.eligibility === 'string' 
            ? scheme.eligibility 
            : Array.isArray(scheme?.eligibility) 
            ? scheme.eligibility.join(", ") 
            : "Not specified";
          
          return (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)" }}
              className="glass-card rounded-xl p-6 flex flex-col"
            >
              {/* Icon & Title */}
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-foreground">
                    {searchQuery ? highlightText(scheme?.name || "Scheme", searchQuery) : (scheme?.name || "Scheme")}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {searchQuery ? highlightText(scheme?.fullName || "", searchQuery) : (scheme?.fullName || "")}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 flex-1">
                {searchQuery ? highlightText(scheme?.description || "No description available", searchQuery) : (scheme?.description || "No description available")}
              </p>

              {/* Benefits */}
              <div className="bg-success/10 rounded-lg p-3 mb-4">
                <p className="text-xs font-medium text-success mb-1">Key Benefits:</p>
                <ul className="text-xs text-success space-y-1">
                  {benefitsArray.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-success mt-0.5">•</span>
                      <span>{searchQuery ? highlightText(benefit, searchQuery) : benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Eligibility Tags */}
              <div className="mb-4">
                <p className="text-xs font-medium text-foreground mb-2">Eligibility:</p>
                <Badge variant="outline" className="text-xs">
                  {searchQuery ? highlightText(eligibilityText, searchQuery) : eligibilityText}
                </Badge>
              </div>

              {/* Deadline & Apply Button */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-xs text-muted-foreground">
                  Deadline: {scheme?.deadline || "N/A"}
                </span>
                <Button size="sm" onClick={() => handleApply(scheme)}>
                  Apply Now
                </Button>
              </div>
            </motion.div>
          );
          })
        )}
      </div>

      {/* Government Scheme News Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <Newspaper className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-display font-bold text-foreground">Latest Government Scheme News</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNews.length === 0 ? (
            <div className="col-span-full glass-card rounded-xl p-8 text-center">
              <Newspaper className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">No news found</p>
              <p className="text-sm text-muted-foreground mt-2">
                {searchQuery ? "Try adjusting your search query" : "No news available at the moment"}
              </p>
            </div>
          ) : (
            filteredNews.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="glass-card rounded-xl p-5 hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => window.open(news.url, '_blank', 'noopener,noreferrer')}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <Badge variant="outline" className="text-xs mb-2">
                      {searchQuery ? highlightText(news.category, searchQuery) : news.category}
                    </Badge>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                      {searchQuery ? highlightText(news.title, searchQuery) : news.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {searchQuery ? highlightText(news.description, searchQuery) : news.description}
                    </p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                  <span>{searchQuery ? highlightText(news.source, searchQuery) : news.source}</span>
                  <span>{new Date(news.date).toLocaleDateString('en-IN', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}</span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>

      {/* Application Modal */}
      <Dialog open={!!selectedScheme} onOpenChange={handleClose}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">
              Apply for {selectedScheme?.name}
            </DialogTitle>
          </DialogHeader>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-6">
            {applicationSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    currentStep > step.id
                      ? "bg-success text-success-foreground"
                      : currentStep === step.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                </div>
                {index < applicationSteps.length - 1 && (
                  <div
                    className={cn(
                      "w-8 h-0.5 mx-1",
                      currentStep > step.id ? "bg-success" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h4 className="font-medium text-foreground">
                Step {currentStep}: {applicationSteps[currentStep - 1].title}
              </h4>

              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name (as per Aadhaar)</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="aadhaar">Aadhaar Number</Label>
                    <Input
                      id="aadhaar"
                      value={formData.aadhaar}
                      onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })}
                      placeholder="XXXX-XXXX-XXXX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Mobile Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="survey">Survey Number</Label>
                    <Input
                      id="survey"
                      value={formData.survey}
                      onChange={(e) => setFormData({ ...formData, survey: e.target.value })}
                      placeholder="Enter land survey number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="area">Land Area (in acres)</Label>
                    <Input
                      id="area"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      placeholder="e.g., 5.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="district">District</Label>
                    <Input
                      id="district"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      placeholder="Enter your district"
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bank">Bank Name</Label>
                    <Input
                      id="bank"
                      value={formData.bank}
                      onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
                      placeholder="e.g., State Bank of India"
                    />
                  </div>
                  <div>
                    <Label htmlFor="account">Account Number</Label>
                    <Input
                      id="account"
                      value={formData.account}
                      onChange={(e) => setFormData({ ...formData, account: e.target.value })}
                      placeholder="Enter account number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ifsc">IFSC Code</Label>
                    <Input
                      id="ifsc"
                      value={formData.ifsc}
                      onChange={(e) => setFormData({ ...formData, ifsc: e.target.value })}
                      placeholder="e.g., SBIN0001234"
                    />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <p className="text-muted-foreground mb-2">Upload Land Record (7/12 Extract)</p>
                    <Button variant="outline" size="sm">Choose File</Button>
                  </div>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <p className="text-muted-foreground mb-2">Upload ID Proof</p>
                    <Button variant="outline" size="sm">Choose File</Button>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">{formData.name || "Not provided"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Aadhaar:</span>
                      <span className="font-medium">{formData.aadhaar || "Not provided"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Land Area:</span>
                      <span className="font-medium">{formData.area || "Not provided"} acres</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bank:</span>
                      <span className="font-medium">{formData.bank || "Not provided"}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    By submitting, you confirm that all information provided is accurate and you agree to the terms and conditions.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            {currentStep < 5 ? (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-success hover:bg-success/90">
                <Check className="w-4 h-4 mr-2" />
                Submit Application
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}