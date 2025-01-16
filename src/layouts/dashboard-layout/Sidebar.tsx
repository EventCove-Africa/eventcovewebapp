import { NavLink } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import { sidebarMenuItems } from "./SidebarItems";
import { ArrowLeft, ArrowRight } from "iconsax-react";

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isCollapsed, toggleSidebar }: SidebarProps) {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Logo Section */}
      <div className="h-[56px] flex items-center justify-between px-3">
        {!isCollapsed && <img src={logo} alt="Logo" className="w-[130px]" />}
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-gray-800 transition"
          aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ArrowRight size={24} /> : <ArrowLeft size={24} />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-4">
        <ul className="space-y-4">
          {sidebarMenuItems.map(({ name, path, icon: Icon }) => (
            <li key={name}>
              <NavLink
                to={path}
                className={({ isActive }) => `
                  w-full flex items-center gap-2 py-2 text-left
                  transition-colors duration-200
                  ${
                    isActive
                      ? "bg-primary_200 border-l-2 text-primary_100 border-primary_100"
                      : "text-grey_100 hover:border-l-2 hover:text-primary_100 hover:bg-primary_200 hover:border-primary_100"
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size="20"
                      className={`transition-colors duration-200 ml-3 ${
                        isActive ? "text-primary_100" : "text-grey_100 hover:text-primary_100"
                      }`}
                    />
                    {!isCollapsed && <span className="text-sm font-medium">{name}</span>}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
