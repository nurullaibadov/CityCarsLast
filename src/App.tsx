import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { LazyMotion, domAnimation } from "framer-motion";

// Lazy load pages for better performance
// ... (rest of the lazy imports)
const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Cars = lazy(() => import("./pages/Cars"));
const CarDetails = lazy(() => import("./pages/CarDetails"));
const Drivers = lazy(() => import("./pages/Drivers"));
const DriverDetails = lazy(() => import("./pages/DriverDetails"));
const Transfer = lazy(() => import("./pages/Transfer"));
const Tracking = lazy(() => import("./pages/Tracking"));
const News = lazy(() => import("./pages/News"));
const Contact = lazy(() => import("./pages/Contact"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Favorites = lazy(() => import("./pages/Favorites"));
const FAQ = lazy(() => import("./pages/FAQ"));
const PricingCalculator = lazy(() => import("./pages/PricingCalculator"));
const Comparison = lazy(() => import("./pages/Comparison"));
const Booking = lazy(() => import("./pages/Booking"));
const ServiceDetails = lazy(() => import("./pages/ServiceDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin pages
const AdminLogin = lazy(() => import("./pages/Admin/Login"));
const AdminLayout = lazy(() => import("./pages/Admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/Admin/Dashboard"));
const AdminCars = lazy(() => import("./pages/Admin/Cars"));
const AdminBookings = lazy(() => import("./pages/Admin/Bookings"));
const AdminUsers = lazy(() => import("./pages/Admin/Users"));
const AdminDrivers = lazy(() => import("./pages/Admin/DriversManagement"));
const AdminBlacklist = lazy(() => import("./pages/Admin/Blacklist"));
const AdminMessages = lazy(() => import("./pages/Admin/Messages"));
const AdminSettings = lazy(() => import("./pages/Admin/Settings"));

const queryClient = new QueryClient();

// Loading component for Suspense
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <AuthProvider>
            <LazyMotion features={domAnimation}>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/cars" element={<Cars />} />
                    <Route path="/cars/:id" element={<CarDetails />} />
                    <Route path="/comparison" element={<Comparison />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/drivers" element={<Drivers />} />
                    <Route path="/drivers/:id" element={<DriverDetails />} />
                    <Route path="/transfer" element={<Transfer />} />
                    <Route path="/tracking" element={<Tracking />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/pricing" element={<PricingCalculator />} />
                    <Route path="/services/:id" element={<ServiceDetails />} />

                    {/* Admin Routes */}
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route path="/admin" element={<AdminLayout />}>
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="cars" element={<AdminCars />} />
                      <Route path="bookings" element={<AdminBookings />} />
                      <Route path="users" element={<AdminUsers />} />
                      <Route path="drivers" element={<AdminDrivers />} />
                      <Route path="blacklist" element={<AdminBlacklist />} />
                      <Route path="messages" element={<AdminMessages />} />
                      <Route path="settings" element={<AdminSettings />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </LazyMotion>
          </AuthProvider>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
