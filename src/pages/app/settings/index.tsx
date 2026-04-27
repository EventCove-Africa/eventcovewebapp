import { useEffect, useMemo } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { ArrowRight, Lock1, Profile2User, KeySquare } from "iconsax-react";
import useFetchWalletDetails from "../../../hooks/useFetchWalletDetails";

export default function Settings() {
  const { pathname } = useLocation();
  const { walletDetails, fetchWalletDetails } = useFetchWalletDetails();
  const { pinAdded } = walletDetails;
  const tabs = useMemo(() => {
    return [
      {
        title: "PROFILE",
        key: "profile",
        route: "/app/settings/profile",
        icon: <Profile2User size="20" color="#A30162" />,
        show: true,
        description: "Update Profile",
      },
      {
        title: "PASSWORD",
        key: "password",
        route: "/app/settings/password",
        icon: <Lock1 size="20" color="#A30162" />,
        show: true,
        description: "Update Password",
      },
      {
        title: "RESET TRANSACTION PIN",
        key: "reset-transaction-pin",
        route: "/app/settings/reset-transaction-pin",
        icon: <KeySquare size="20" color="#A30162" />,
        show: pinAdded,
        description: "Update PIN",
      },
    ];
  }, [pinAdded]);

  useEffect(() => {
    let mounted = false;
    (async () => {
      mounted = true;
      if (mounted) {
        fetchWalletDetails();
      }
    })();
    return () => {
      mounted = false;
    };
  }, [fetchWalletDetails]);

  return (
    <div className="w-full h-full lg:mb-0 mb-36">
      <h3 className="text-dark_200 text-base font-normal">Settings</h3>
      <div className="w-full flex md:flex-row flex-col gap-4 mt-4">
        <div className="w-full h-fit flex flex-col gap-4">
          {tabs
            .filter((tab) => tab.show)
            .map((list, index) => (
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
                  <h3 className="text-dark_200 text-sm font-normal">
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
