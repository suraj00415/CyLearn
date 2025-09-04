import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";
import Labs from "./pages/Labs";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import Register from "./pages/Register";
import SecurityAnalyzer from "./pages/SecurityAnalyzer";
import StartLab from "./pages/StartLab";

const queryClient = new QueryClient();

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/labs" element={<Labs />} />
      <Route path="/labs/:labId" element={<Labs />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/security-analyzer" element={<SecurityAnalyzer />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/start-lab/:labId" element={<StartLab />} />
        <Route path="/dashboard/:stakeholderType" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </TooltipProvider>
);

export default App;
