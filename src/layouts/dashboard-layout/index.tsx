import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import MobileNavigation from "./MobileNavigation";

export default function DashboardLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prevState) => !prevState);
  };

  return (
    <div className="flex w-full h-screen min-h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`bg-white md:flex-shrink-0 px-1 transition-all duration-300 md:block hidden ${
          isSidebarCollapsed ? "w-[60px]" : "w-[150px]"
        }`}
      >
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
        />
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="h-[56px] bg-white flex-shrink-0 px-4">
          <Header />
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto md:p-4 p-2 bg-gray-50">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="h-auto bg-white flex-shrink-0 px-4 py-2 md:block hidden">
          <Footer />
        </footer>

        {/* Mobile Navigation */}
        <MobileNavigation />
      </div>
    </div>
  );
}
