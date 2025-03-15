import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { ArrowRight, Lock1, Profile2User } from "iconsax-react";

export default function Settings() {
  const { pathname } = useLocation();
  const [tabs] = useState([
    {
      title: "Profile",
      key: "profile",
      route: "/app/settings/profile",
      icon: <Profile2User size="20" color="#A30162" />,
    },
    {
      title: "Password",
      key: "password",
      route: "/app/settings/password",
      icon: <Lock1 size="20" color="#A30162" />,
    },
  ]);

  return (
    <div className="w-full h-full lg:mb-0 mb-36">
      <h3 className="text-dark_200 text-base font-normal">Settings</h3>
      <div className="w-full flex md:flex-row flex-col md:gap-10 gap-4 mt-4">
        <div className="w-full h-fit flex flex-col gap-4">
          {tabs.map((list, index) => (
            <NavLink
              key={index}
              to={list.route}
              className={({ isActive }) =>
                `w-full rounded-md p-3 bg-white flex justify-between items-center cursor-pointer border ${
                  isActive
                    ? "border-primary_100 bg-primary_50"
                    : "hover:border-primary_100 border-none shadow-sm"
                }`
              }
            >
              <div className="w-full flex items-center gap-3">
                <div className="rounded-full bg-primary_200 p-2">
                  {list.icon}
                </div>
                <h3 className="text-dark_200 md:text-base text-sm font-normal">
                  {list.title}
                </h3>
              </div>
              <ArrowRight
                size="20"
                color={pathname === list.route ? "#A30162" : "#7C8AA0"}
              />
            </NavLink>
          ))}
        </div>
        <div className="w-full bg-white h-fit p-3 shadow-sm rounded-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
