import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Login from "./pages/Login";
import AuthCallback from "./pages/AuthCallback";
import Dashboard from "./pages/Dashboard";
import FieldManagement from "./pages/FieldManagement";
import MarketAnalytics from "./pages/MarketAnalytics";
import Community from "./pages/Community";
import GovSchemes from "./pages/GovSchemes";
import Settings from "./pages/Settings";
import SmartMapping from "./pages/SmartMapping";
import Helpline from "./pages/Helpline";
import YieldPrediction from "./pages/YieldPrediction";
import Weather from "./pages/Weather";
import LearnFarmerCourse from "./pages/LearnFarmerCourse";
import CropRotation from "./pages/CropRotation";
import FarmingCalendar from "./pages/FarmingCalendar";
import ProfitLoss from "./pages/ProfitLoss";
import SoilTest from "./pages/SoilTest";
import AIAssistant from "./pages/AIAssistant";
import CropRecommendation from "./pages/CropRecommendation";
import DiseasePrediction from "./pages/DiseasePrediction";
import PestDetection from "./pages/PestDetection";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/field-management" element={<FieldManagement />} />
                      <Route path="/market-analytics" element={<MarketAnalytics />} />
                      <Route path="/community" element={<Community />} />
                      <Route path="/gov-schemes" element={<GovSchemes />} />
                      <Route path="/smart-mapping" element={<SmartMapping />} />
                      <Route path="/helpline" element={<Helpline />} />
                      <Route path="/yield-prediction" element={<YieldPrediction />} />
                      <Route path="/weather" element={<Weather />} />
                      <Route path="/learn" element={<LearnFarmerCourse />} />
                      <Route path="/crop-rotation" element={<CropRotation />} />
                      <Route path="/farming-calendar" element={<FarmingCalendar />} />
                      <Route path="/profit-loss" element={<ProfitLoss />} />
                      <Route path="/soil-test" element={<SoilTest />} />
                      <Route path="/ai-assistant" element={<AIAssistant />} />
                      <Route path="/crop-recommendation" element={<CropRecommendation />} />
                      <Route path="/disease-prediction" element={<DiseasePrediction />} />
                      <Route path="/pest-detection" element={<PestDetection />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;