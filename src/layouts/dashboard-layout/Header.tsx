/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect, useCallback } from "react";
import {
  ArrowDown2,
  Logout,
  NotificationBing,
  Setting2,
  User,
} from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { useUserProps } from "../../types";
import { useUser } from "../../context/UserDetailsProvider.tsx";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ icon, label, onClick }) => {
  return (
    <li
      className="py-2 px-4 text-sm cursor-pointer hover:bg-gray-100 flex gap-3 items-center"
      onClick={onClick}
    >
      {icon} {label}
    </li>
  );
};

export default function Header({ setLogoutConfirmation }: any) {
  const { userDetails } = useUser() as useUserProps;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuRef = useRef<HTMLDivElement | null>(null); // For the menu
  const buttonRef = useRef<HTMLButtonElement | null>(null); // For the button

  // Memoize the callback to avoid unnecessary re-renders
  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Close the menu if the user clicks outside of the component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsMenuOpen(false);
    setLogoutConfirmation(true);
  };

  return (
    <div className="w-full flex gap-4 justify-end items-center h-full relative">
      <div className="bg-dark_200 w-8 h-8 rounded-md flex justify-center items-center">
        <NotificationBing
          className="w-5 h-5 cursor-pointer"
          color="#FFFFFF"
          variant="Bold"
          aria-label="Notifications"
        />
      </div>
      <User
        size="32"
        color="#868B90"
        variant="Bold"
        className="rounded-full w-8 h-8"
        aria-label="User Avatar"
      />
      <div className="flex flex-col gap-1">
        <h4 className="text-dark_200 text-xs font-normal">
          {userDetails?.fullName}
        </h4>
        <button
          className="text-grey_100 text-xs font-normal flex gap-2 cursor-pointer outline-none"
          onClick={handleMenuToggle}
          aria-haspopup="true"
          aria-expanded={isMenuOpen ? "true" : "false"}
          aria-label="Toggle user menu"
          ref={buttonRef} // Assigning buttonRef to the button
        >
          <span className="outline-none">{userDetails?.email}</span>
          <ArrowDown2 size="16" color="#767779" />
        </button>
        {isMenuOpen && (
          <div
            ref={menuRef} // Assigning menuRef to the menu div
            className={`absolute bg-white shadow-lg p-2 rounded-md mt-10 w-48 sm:w-56 z-50 right-0 transition-all duration-300 ease-in transform ${
              isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
            role="menu"
            aria-labelledby="user-menu"
          >
            <ul>
              <MenuItem
                icon={<Setting2 size="18" color="#767779" />}
                label="Settings"
                onClick={() => navigate("/app/settings")}
              />
              <MenuItem
                icon={<Logout size="18" color="#767779" />}
                label="Logout"
                onClick={handleLogout}
              />
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
