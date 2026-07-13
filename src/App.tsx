import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import ClickSpark from "@/components/ClickSpark";
import Home from "./pages/Home";
import Work from "./pages/Work";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Styleguide from "./pages/Styleguide";
import Contact from "./pages/Contact";
import Uptime from "./pages/Uptime";
import Now from "./pages/Now";
import Decisions from "./pages/Decisions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <ClickSpark
          sparkColor="#39ff14"
          sparkSize={12}
          sparkRadius={20}
          sparkCount={10}
          duration={500}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<ProjectDetail />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/about" element={<About />} />
            <Route path="/styleguide" element={<Styleguide />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/uptime" element={<Uptime />} />
            <Route path="/now" element={<Now />} />
            <Route path="/decisions" element={<Decisions />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ClickSpark>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
