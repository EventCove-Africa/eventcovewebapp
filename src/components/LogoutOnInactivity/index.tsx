/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useLocation } from "react-router-dom";
import { useUser } from "../../context/UserDetailsProvider.tsx";
import { useUserProps } from "../../types/generalTypes.tsx";
import ModalPopup from "../ModalPopup/index.tsx";
import info from "../../assets/icons/info.svg";
import close_cancel from "../../assets/icons/close-circle.svg";
import Button from "../FormComponents/Button/index.tsx";
import useOpenCloseModal from "../../hooks/useOpenCloseModal.tsx";

const INACTIVITY_TIME = 10 * 60 * 1000; // 10 minutes for testing
const WARNING_TIME = 120 * 1000; // 2 minutes for warning

const LogoutOnInactivity = () => {
  const { logout } = useUser() as useUserProps;
  const router = useLocation();
  const { isOpenModal, handleOpenClose } = useOpenCloseModal();
  const timeoutRef = useRef<any>(null);
  // Check if the current route includes "app"
  const isDashboardRoute = router.pathname.includes("app");

  const handleOnIdle = () => {
    if (!isDashboardRoute) return;
    handleOpenClose();
    timeoutRef.current = setTimeout(() => {
      logout();
    }, WARNING_TIME);
  };

  const handleStayActive = () => {
    handleOpenClose();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    resetIdleTimer(); // Reset the idle timer on interaction
  };

  const {
    reset: resetIdleTimer,
    pause: pauseIdleTimer,
    resume: resumeIdleTimer,
  } = useIdleTimer({
    timeout: isDashboardRoute ? INACTIVITY_TIME - WARNING_TIME : undefined, // Only activate if on the dashboard
    onIdle: handleOnIdle,
    debounce: 500, // Debounce to prevent false resets
    // startOnMount: false, // Don't start until we explicitly call resume
  });

  useEffect(() => {
    if (isDashboardRoute) {
      // If we are on the dashboard, start the idle timer
      resumeIdleTimer();
    } else {
      // If not on the dashboard, pause the idle timer
      pauseIdleTimer();
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isDashboardRoute, resumeIdleTimer, pauseIdleTimer]);

  // Render nothing if not on the dashboard route
  if (!isDashboardRoute) return null;

  return (
    <>
      <ModalPopup isOpen={isOpenModal} itemPosition="start">
        <div className="bg-white h-auto w-full md:w-[350px] rounded-xl p-3">
          <div className="flex justify-end">
            <img
              onClick={handleStayActive}
              src={close_cancel}
              alt="close_cancel"
              className="cursor-pointer"
            />
          </div>
          <div className="flex justify-center">
            <img src={info} alt="info" className="w-[70px] h-[70px]" />
          </div>
          <h4 className="text-dark_200 text-base font-normal text-center my-4">
            Inactivity detected. Would you like to continue?
          </h4>
          <div className="w-full flex items-center gap-4">
            <Button
              title="Yes"
              className="w-full h-[40px] text-center border border-dark_200"
              type="button"
              onClick={handleStayActive}
            />
            <Button
              title="No"
              className="w-full h-[40px] text-center border border-primary_100"
              backgroundColor="none"
              textColor="text-primary_100"
              type="button"
              onClick={logout}
            />
          </div>
        </div>
      </ModalPopup>
    </>
  );
};

export default LogoutOnInactivity;
