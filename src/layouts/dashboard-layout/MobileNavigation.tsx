import { NavLink } from "react-router-dom";
import { sidebarMenuItems } from "./SidebarItems";
import { useEffect, useState } from "react";

export default function MobileNavigation() {
  const [isMobile, setIsMobile] = useState(false);

  // Check for device type (mobile)
  useEffect(() => {
    const checkDeviceType = () => {
      setIsMobile(window.innerWidth <= 1024); // Adjust breakpoint as needed
    };

    checkDeviceType();
    window.addEventListener("resize", checkDeviceType);

    return () => {
      window.removeEventListener("resize", checkDeviceType);
    };
  }, []);

  if (!isMobile) return null; // Don't render if not on mobile

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-200 lg:hidden">
      <ul className="flex justify-between items-center p-2">
        {sidebarMenuItems.map(({ name, path, icon: Icon }) => (
          <li key={name} className="flex-1 text-center">
            <NavLink
              to={path}
              className={({ isActive }) => `
                flex flex-col items-center text-sm font-medium py-2 transition-all duration-200 ${
                  isActive
                    ? "text-primary_100"
                    : "text-grey_100 hover:text-primary_100"
                }
              `}
            >
              <Icon size={16} className="mb-1" />
              <span className="text-xs font-medium">{name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
