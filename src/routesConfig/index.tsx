/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { animationVariants, isObjectEmpty } from "../utils";
import { useUser } from "../context/UserDetailsProvider.tsx";
import { useUserProps } from "../types/generalTypes.tsx";
import { FallbackLoader } from "../App.tsx";

// Constants
export const APP_ROUTES = {
  ROOT: "/",
  AUTH: "/auth",
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  ADD_BANK: "/auth/signup/add-bank",
  FORGET_PW: "/auth/forget-password",
  RESET_PW: "/auth/reset-password",
  APP: "/app",
  HOME: "/app/home",
  EVENTS: "/app/events",
  ADD_EVENTS: "/app/events/add",
  EDIT_EVENTS: "/app/events/edit/:event_id",
  EVENT_DETAILS: "/app/events/:id",
  VIEW_EVENT_ATTENDEES: "/app/events/attendees/:id",
  TICKETS: "/app/tickets",
  ADD_TICKETS: "/app/tickets/add/:eventId",
  EDIT_TICKETS: "/app/tickets/edit/:ticketId",
  WALLET: "/app/wallet",
  ADD_WALLET: "/app/wallet/update",
  SETTINGS: "/app/settings",
  STATISTICS: "/app/admin/statistics",
  SETTINGS_PROFILE: "/app/settings/profile",
  SETTINGS_PASSWORD: "/app/settings/password",
  TICKETS_VALIDATION: "/tickets-validation/:eventId",
  NOT_FOUND: "*",
  UNAUTHORIZED: "/unauthorized",
};

// Enhanced lazy loading with displayName
const lazyLoad = <T extends React.ComponentType<any>>(
  loader: () => Promise<{ default: T }>,
  name?: string
) => {
  const Component = lazy(loader);
  if (name) (Component as any).displayName = name;
  return Component;
};

// Layouts
export const AuthLayout = lazyLoad(
  () => import("../layouts/auth-layout"),
  "AuthLayout"
);
export const DashboardLayout = lazyLoad(
  () => import("../layouts/dashboard-layout"),
  "DashboardLayout"
);

// Auth Pages
export const Login = lazyLoad(() => import("../pages/auth/login"), "Login");
export const SignUp = lazyLoad(() => import("../pages/auth/signup"), "SignUp");
export const ForgetPassword = lazyLoad(
  () => import("../pages/auth/forget-password"),
  "ForgetPassword"
);
export const ResetPassword = lazyLoad(
  () => import("../pages/auth/reset-password"),
  "ResetPassword"
);
// App Pages
export const Home = lazyLoad(() => import("../pages/app/home"), "Home");
export const Events = lazyLoad(() => import("../pages/app/events"), "Events");
export const AddEvents = lazyLoad(
  () => import("../pages/app/events/add"),
  "AddEvents"
);
export const EventDetails = lazyLoad(
  () => import("../pages/app/events/event-details"),
  "EventDetails"
);
export const ViewAttendees = lazyLoad(
  () => import("../pages/app/events/event-details/ViewAttendees"),
  "ViewAttendees"
);
export const Tickets = lazyLoad(
  () => import("../pages/app/tickets"),
  "Tickets"
);
export const AddTickets = lazyLoad(
  () => import("../pages/app/tickets/add"),
  "AddTickets"
);
export const EditTicket = lazyLoad(
  () => import("../pages/app/tickets/edit"),
  "EditTicket"
);
export const Wallet = lazyLoad(() => import("../pages/app/wallet"), "Wallet");
export const AddWallet = lazyLoad(
  () => import("../pages/app/wallet/add"),
  "AddWallet"
);
export const Settings = lazyLoad(
  () => import("../pages/app/settings"),
  "Settings"
);
export const Statistics = lazyLoad(
  () => import("../pages/admin/statistics"),
  "Settings"
);
export const SettingsProfile = lazyLoad(
  () => import("../pages/app/settings/components/SettingsProfile.tsx"),
  "SettingsProfile"
);
export const SettingsPassword = lazyLoad(
  () => import("../pages/app/settings/components/SettingsPassword.tsx"),
  "SettingsPassword"
);

// Other Pages
export const NotFound = lazyLoad(
  () => import("../pages/not-found"),
  "NotFound"
);
export const Forbidden = lazyLoad(
  () => import("../pages/forbidden"),
  "Forbidden"
);
export const TicketsValidation = lazyLoad(
  () => import("../pages/tickets-validation"),
  "TicketsValidation"
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { loadingDetails, handleGetUserDetails, userDetails } =
    useUser() as useUserProps;
  const access_token = Cookies.get("access_token");
  const location = useLocation();
  useEffect(() => {
    let mounted = true;
    if (access_token && mounted) {
      handleGetUserDetails().finally(() => setIsInitialLoad(false));
    } else {
      setIsInitialLoad(false); // No access_token, no need to load
    }
    return () => {
      mounted = false;
    };
  }, [access_token]);

  const hasValidUserDetails = (user: typeof userDetails) => {
    return user && user.email.trim() !== "" && user.fullName.trim() === "";
  };

  if (isInitialLoad || loadingDetails) return <FallbackLoader />;
  const isAuthenticated = access_token && !isObjectEmpty(userDetails);
  if (isAuthenticated && hasValidUserDetails(userDetails)) {
    return (
      <Navigate
        to={APP_ROUTES.UNAUTHORIZED}
        state={{ from: location }}
        replace
      />
    );
  }

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to={APP_ROUTES.LOGIN} state={{ from: location }} replace />
  );
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const access_token = Cookies.get("access_token");
  const location = useLocation();
  const ProtectedAuthRoutes = access_token;
  return ProtectedAuthRoutes ? (
    <Navigate to={APP_ROUTES.HOME} state={{ from: location }} replace />
  ) : (
    <>{children}</>
  );
};

const AnimatedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      transition={{ duration: 0.4 }}
      variants={animationVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {children}
    </motion.div>
  );
};

export const routeConfig = [
  {
    path: APP_ROUTES.ROOT,
    element: <Navigate to={APP_ROUTES.LOGIN} />,
  },
  {
    path: APP_ROUTES.AUTH,
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      { path: APP_ROUTES.LOGIN, element: <Login /> },
      { path: APP_ROUTES.SIGNUP, element: <SignUp /> },
      {
        path: APP_ROUTES.FORGET_PW,
        element: <ForgetPassword />,
      },
      {
        path: APP_ROUTES.RESET_PW,
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: APP_ROUTES.APP,
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: APP_ROUTES.HOME,
        element: (
          <AnimatedRoute>
            <Home />
          </AnimatedRoute>
        ),
      },
      {
        path: APP_ROUTES.EVENTS,
        element: (
          <AnimatedRoute>
            <Events />
          </AnimatedRoute>
        ),
      },
      {
        path: APP_ROUTES.ADD_EVENTS,
        element: (
          <AnimatedRoute>
            <AddEvents />
          </AnimatedRoute>
        ),
      },
      {
        path: APP_ROUTES.EDIT_EVENTS,
        element: (
          <AnimatedRoute>
            <AddEvents />
          </AnimatedRoute>
        ),
      },
      {
        path: APP_ROUTES.VIEW_EVENT_ATTENDEES,
        element: (
          <AnimatedRoute>
            <ViewAttendees />
          </AnimatedRoute>
        ),
      },
      {
        path: APP_ROUTES.EVENT_DETAILS,
        element: (
          <AnimatedRoute>
            <EventDetails />
          </AnimatedRoute>
        ),
      },
      {
        path: APP_ROUTES.TICKETS,
        element: (
          <AnimatedRoute>
            <Tickets />
          </AnimatedRoute>
        ),
      },
      {
        path: APP_ROUTES.ADD_TICKETS,
        element: (
          <AnimatedRoute>
            <AddTickets />
          </AnimatedRoute>
        ),
      },
      {
        path: APP_ROUTES.EDIT_TICKETS,
        element: (
          <AnimatedRoute>
            <EditTicket />
          </AnimatedRoute>
        ),
      },
      {
        path: APP_ROUTES.WALLET,
        element: (
          <AnimatedRoute>
            <Wallet />
          </AnimatedRoute>
        ),
      },
      {
        path: APP_ROUTES.ADD_WALLET,
        element: (
          <AnimatedRoute>
            <AddWallet />
          </AnimatedRoute>
        ),
      },
      {
        path: APP_ROUTES.STATISTICS,
        element: (
          <AnimatedRoute>
            <Statistics />
          </AnimatedRoute>
        ),
      },
      {
        path: APP_ROUTES.SETTINGS,
        element: <Settings />,
        children: [
          {
            path: APP_ROUTES.SETTINGS,
            element: <Navigate to={APP_ROUTES.SETTINGS_PROFILE} />,
          },
          {
            path: APP_ROUTES.SETTINGS_PROFILE,
            element: (
              <AnimatedRoute>
                <SettingsProfile />
              </AnimatedRoute>
            ),
          },
          {
            path: APP_ROUTES.SETTINGS_PASSWORD,
            element: (
              <AnimatedRoute>
                <SettingsPassword />
              </AnimatedRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: APP_ROUTES.TICKETS_VALIDATION,
    element: <TicketsValidation />,
  },
  {
    path: APP_ROUTES.UNAUTHORIZED,
    element: <Forbidden />,
  },
  {
    path: APP_ROUTES.NOT_FOUND,
    element: <NotFound />,
  },
];
