import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserDetailsProvider } from "./context/UserDetailsProvider.tsx.tsx";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-tooltip/dist/react-tooltip.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <UserDetailsProvider>
          <App />
        </UserDetailsProvider>
      </GoogleOAuthProvider>
      <Toaster
        toastOptions={{
          duration: 4000,
          className: "z-50",
        }}
      />
    </HashRouter>
  </StrictMode>
);
