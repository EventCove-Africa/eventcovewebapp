import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserDetailsProvider } from "./context/UserDetailsProvider.tsx.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
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
    </BrowserRouter>
  </StrictMode>
);
