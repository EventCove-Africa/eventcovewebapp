import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { motion } from "framer-motion";
import { routeConfig } from "./routesConfig";
import logo from "./assets/icons/logo.svg";

const LoadingFlicker = () => {
  return (
    <div>
      <style>
        {`
          @keyframes flicker {
            0% { opacity: 1; }
            10% { opacity: 0.8; }
            20% { opacity: 1; }
            30% { opacity: 0.7; }
            40% { opacity: 1; }
            50% { opacity: 0.3; }
            60% { opacity: 1; }
            70% { opacity: 0.6; }
            80% { opacity: 1; }
            90% { opacity: 0.4; }
            100% { opacity: 1; }
          }
        `}
      </style>
      <div className="text-primary_100 font-bold text-base animate-flicker animate-pulse">
        Loading details...
      </div>
    </div>
  );
};

export const FallbackLoader = () => (
  <div className="flex justify-center gap-3 items-center h-screen">
    <motion.div
      className="loader"
      initial={{ opacity: 0.5, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      <img
        src={logo}
        alt="EventCove Logo"
        className="h-8 cursor-pointer"
        loading="lazy"
        aria-hidden="true"
      />
      <LoadingFlicker />
    </motion.div>
  </div>
);

function App() {
  return (
    <main className="scroll-smooth w-full h-full">
      <Suspense fallback={<FallbackLoader />}>
        <Routes>
          {routeConfig.map((route) => (
            <Route key={route.path} path={route.path} element={route.element}>
              {route.children?.map((child) => (
                <Route
                  key={child.path}
                  path={child.path}
                  element={child.element}
                >
                  {child.children?.map((subChild) => (
                    <Route
                      key={subChild.path}
                      path={subChild.path}
                      element={subChild.element}
                    />
                  ))}
                </Route>
              ))}
            </Route>
          ))}
        </Routes>
      </Suspense>
    </main>
  );
}

export default App;
