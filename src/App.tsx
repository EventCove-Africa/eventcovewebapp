import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { motion } from "framer-motion";
import { routeConfig } from "./routesConfig";
import logo from "./assets/icons/logo.svg";

export const FallbackLoader = () => (
  <div className="flex justify-center items-center h-screen">
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
    </motion.div>
  </div>
);

function App() {
  return (
    <main className="scroll-smooth w-full h-full">
      <Suspense fallback={<FallbackLoader />}>
        <Routes>
          {routeConfig.map((route) => {
            return (
              <Route key={route.path} path={route.path} element={route.element}>
                {route.children?.map((child) => {
                  return (
                    <Route
                      key={child.path}
                      path={child.path}
                      element={child.element}
                    />
                  );
                })}
              </Route>
            );
          })}
        </Routes>
      </Suspense>
    </main>
  );
}

export default App;
