import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { animationVariants } from "./utils";

// Lazy imports for layouts and pages
// Auth routes
const AuthLayout = lazy(() => import("./layouts/auth-layout"));
const Login = lazy(() => import("./pages/auth/login"));
const SignUp = lazy(() => import("./pages/auth/signup"));
const ForgetPassword = lazy(() => import("./pages/auth/forget-password"));
const ResetPassword = lazy(() => import("./pages/auth/reset-password"));
const AddBank = lazy(() => import("./pages/auth/add-bank"));
const NotFound = lazy(() => import("./pages/not-found"));
const Forbidden = lazy(() => import("./pages/forbidden"));

// App routes
const DashboardLayout = lazy(() => import("./layouts/dashboard-layout"));
const Home = lazy(() => import("./pages/app/home"));
const Events = lazy(() => import("./pages/app/events"));
const AddEvents = lazy(() => import("./pages/app/events/add"));
const EventDetails = lazy(() => import("./pages/app/events/event-details"));
const Tickets = lazy(() => import("./pages/app/tickets"));
const AddTickets = lazy(() => import("./pages/app/tickets/add"));

const FallbackLoader = () => <div>Loading...</div>;

interface PageTransitionProps {
  children: React.ReactNode;
  locationKey: string;
}

const PageTransition = ({ children, locationKey }: PageTransitionProps) => {
  return (
    <motion.div
      key={locationKey} // Still needed for animation re-renders
      transition={{ duration: 0.4 }}
      variants={animationVariants}
      initial="hidden"
      animate="visible"
      exit="hidden" // Optional for exit animations
    >
      {children}
    </motion.div>
  );
};

function App() {
  const location = useLocation();

  return (
    <main className="scroll-smooth w-full h-full">
      <Suspense fallback={<FallbackLoader />}>
        <Routes>
          <Route path="/" element={<Navigate to="auth/login" />} />
          <Route path="auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="signup/add-bank" element={<AddBank />} />
            <Route path="forget-password" element={<ForgetPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>
          <Route path="app" element={<DashboardLayout />}>
            <Route
              path="home"
              element={
                <PageTransition locationKey={location.pathname}>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="events"
              element={
                <PageTransition locationKey={location.pathname}>
                  <Events />
                </PageTransition>
              }
            />
            <Route
              path="events/add"
              element={
                <PageTransition locationKey={location.pathname}>
                  <AddEvents />
                </PageTransition>
              }
            />
            <Route
              path="events/:id"
              element={
                <PageTransition locationKey={location.pathname}>
                  <EventDetails />
                </PageTransition>
              }
            />
            <Route
              path="tickets"
              element={
                <PageTransition locationKey={location.pathname}>
                  <Tickets />
                </PageTransition>
              }
            />
            <Route
              path="tickets/add"
              element={
                <PageTransition locationKey={location.pathname}>
                  <AddTickets />
                </PageTransition>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/unauthorized" element={<Forbidden />} />
        </Routes>
      </Suspense>
    </main>
  );
}

export default App;
