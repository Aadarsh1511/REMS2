import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
// import { Dashboard } from "./pages/Dashboard";
// import PropertySearch from "./pages/PropertySearch";
import PropertyDetail from "./pages/PropertyDetail";
import AddProperty from "./pages/AddProperty";
import BookVisit from "./pages/BookVisit";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Careers from "./pages/Careers";
import TermsConditions from "./pages/TermsConditions";
import RequestInfo from "./pages/RequestInfo";
import Feedback from "./pages/Feedback";
import ReportProblem from "./pages/ReportProblem";
import Testimonials from "./pages/Testimonials";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SummonsNotices from "./pages/SummonsNotices";
import Grievances from "./pages/Grievances";
import SafetyGuide from "./pages/SafetyGuide";
import MobileApps from "./pages/MobileApps";
import OurServices from "./pages/OurServices";
import PriceTrends from "./pages/PriceTrends";
import PostProperty from "./pages/PostProperty";
import RealEstateInvestments from "./pages/RealEstateInvestments";
import BuildersIndia from "./pages/BuildersIndia";
import AreaConverter from "./pages/AreaConverter";
import Articles from "./pages/Articles";
import RentReceipt from "./pages/RentReceipt";
import CustomerService from "./pages/CustomerService";
import Sitemap from "./pages/Sitemap";
import AgentProfile from "./pages/AgentProfile";
import EMICalculator from "./pages/EMICalculator";
import PropertyValuation from "./pages/PropertyValuation";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import { Index2 } from "./pages/Index2";
import Dashboard from "./pages/Dashboard";




const queryClient = new QueryClient();

const App = () => {
  const [isLoggeIn, setisLoggedIn] = useState(false);

  // Check login status on app load
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setisLoggedIn(true);
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <BrowserRouter>
          <Header isLoggeIn={isLoggeIn} setisLoggedIn={setisLoggedIn} />

          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/login"
              element={<Login setisLoggeIn={setisLoggedIn} />}
            />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/search" element={<Index2/>} />
            <Route path="index" element={<Index/>} />
            <Route path="/property/:slug" element={<PropertyDetail />} />
            <Route path="/add-property" element={<AddProperty />} />
            <Route path="/book-visit" element={<BookVisit />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/agent" element={<AgentDashboard />} />
            <Route path="/owner" element={<OwnerDashboard />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/request-info" element={<RequestInfo />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/report-problem" element={<ReportProblem />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/summons-notices" element={<SummonsNotices />} />
            <Route path="/grievances" element={<Grievances />} />
            <Route path="/safety-guide" element={<SafetyGuide />} />
            <Route path="/mobile-apps" element={<MobileApps />} />
            <Route path="/our-services" element={<OurServices />} />
            <Route path="/price-trends" element={<PriceTrends />} />
            <Route path="/post-property" element={<PostProperty />} />
            <Route
              path="/real-estate-investments"
              element={<RealEstateInvestments />}
            />
           
            <Route path="/builders-in-india" element={<BuildersIndia />} />
            <Route path="/area-converter" element={<AreaConverter />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/rent-receipt" element={<RentReceipt />} />
            <Route path="/customer-service" element={<CustomerService />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/agent/:agentId" element={<AgentProfile />} />
            <Route path="/emi-calculator" element={<EMICalculator />} />
            <Route path="/property-valuation" element={<PropertyValuation />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};
export default App;
