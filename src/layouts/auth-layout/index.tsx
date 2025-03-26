import { Outlet } from "react-router-dom";
import authBg from "../../assets/images/auth-bg.png";
import branding from "../../assets/icons/branding.svg";
import event from "../../assets/icons/event.svg";
import ticket from "../../assets/icons/ticket.svg";
import payment from "../../assets/icons/payment.svg";
import AuthTooltip from "../../components/AuthTooltip";
import logo from "../../assets/icons/logo.svg";

export default function AuthLayout() {
  // Detect screen size
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  return (
    <div className="flex flex-col w-full h-screen">
      {/* Header */}
      <header className="bg-white h-[68px] w-full px-6 flex items-center rounded-md shadow-sm">
        <img
          src={logo}
          alt="EventCove Logo"
          className="h-8 cursor-pointer"
          loading="lazy"
          aria-hidden="true"
        />
      </header>
      {/* Main Content */}
      <main className="flex-1 overflow-hidden px-6 py-4">
        <div className="flex h-full bg-white p-4 rounded-xl shadow-lg">
          {/* Left Section */}
          <div className="flex-1 py-3 md:px-6 px-0 overflow-auto">
            <Outlet />
          </div>

          {/* Right Section */}
          <div className="hidden lg:block flex-1 relative">
            <img
              src={authBg}
              alt="EventCove Auth Background"
              className="h-full w-full object-cover rounded-xl"
              loading="lazy"
            />

            {/* Tooltips with responsive animations */}
            <AuthTooltip
              image={branding}
              title="Customizable Branding"
              description="Customizable Branding"
              position={
                isMobile
                  ? { top: "1rem", left: "1rem" }
                  : { top: "5rem", left: "-5rem" }
              }
              animationClass="animate-bounce-up"
            />
            <AuthTooltip
              image={event}
              title="Smart Event Management"
              description="Smart Event Management"
              position={
                isMobile
                  ? { top: "8rem", left: "1rem" }
                  : {
                      top: "50%",
                      right: "2rem",
                      transform: "translateY(-50%)",
                    }
              }
              animationClass="animate-slide-right"
            />
            <AuthTooltip
              image={ticket}
              title="Effortless Ticketing"
              description="Effortless Ticketing"
              position={
                isMobile
                  ? { bottom: "8rem", left: "1rem" }
                  : { bottom: "6rem", left: "2rem" }
              }
              animationClass="animate-float"
            />
            <AuthTooltip
              image={payment}
              title="Secure Payments"
              description="Secure Payments"
              position={
                isMobile
                  ? { bottom: "2rem", right: "1rem" }
                  : { bottom: "2rem", right: "2rem" }
              }
              animationClass="animate-zoom"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
