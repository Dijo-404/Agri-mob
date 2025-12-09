import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Banknote, Shield, CreditCard, FileText, Sun, Store, X, Check, ChevronRight, ChevronLeft } from "lucide-react";
import { govSchemes } from "@/data/mockData";
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

export default function GovSchemes() {
  const [selectedScheme, setSelectedScheme] = useState<typeof govSchemes[0] | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
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

  const handleApply = (scheme: typeof govSchemes[0]) => {
    setSelectedScheme(scheme);
    setCurrentStep(1);
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

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {govSchemes.map((scheme, index) => {
          const Icon = schemeIcons[scheme.icon] || FileText;
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
                  <h3 className="font-display font-semibold text-foreground">{scheme.name}</h3>
                  <p className="text-xs text-muted-foreground">{scheme.fullName}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 flex-1">{scheme.description}</p>

              {/* Benefits */}
              <div className="bg-success/10 rounded-lg p-3 mb-4">
                <p className="text-sm font-medium text-success">{scheme.benefits}</p>
              </div>

              {/* Eligibility Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {scheme.eligibility.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Deadline & Apply Button */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-xs text-muted-foreground">
                  Deadline: {scheme.deadline}
                </span>
                <Button size="sm" onClick={() => handleApply(scheme)}>
                  Apply Now
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>

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
              <Button onClick={handleClose} className="bg-success hover:bg-success/90">
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