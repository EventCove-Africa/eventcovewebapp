/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import {
  ArrowDown2,
  ArrowLeft,
  ArrowRight2,
  Logout,
  User,
} from "iconsax-react";
import logo from "../../assets/icons/logo.svg";
import QRscan from "./components/QRscan";
import TicketIdEntry from "./components/TicketIdEntry";
import ModalPopup from "../../components/ModalPopup";
import SignupSuccess from "../components/SignupSuccess";
import useOpenCloseModal from "../../hooks/useOpenCloseModal";
import { MenuItem } from "../../layouts/dashboard-layout/Header";
import { useCallback, useEffect, useRef, useState } from "react";
import { useUser } from "../../context/UserDetailsProvider.tsx";
import { useUserProps } from "../../types/generalTypes.tsx";
import useQueryParams from "../../hooks/useQueryParams.tsx";
import toast from "react-hot-toast";
import { _handleThrowErrorMessage } from "../../utils/index.ts";
import { api } from "../../services/api.ts";
import { appUrls } from "../../services/urls/index.ts";
import { FormikHelpers } from "formik";

type TicketValidationProps = {
  eventReference: string;
  ticketNumber: string;
  email: string;
};

export default function TicketsValidation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const menuRef = useRef<HTMLDivElement | null>(null); // For the menu
  const buttonRef = useRef<HTMLButtonElement | null>(null); // For the button
  const { isOpenModal, handleOpenClose } = useOpenCloseModal();
  const { logout, userDetails } = useUser() as useUserProps;
  // Extract query parameter for eventType
  const getParam = useQueryParams();
  const validationType = getParam("validation-type");
  const { eventId } = useParams();
  const email = Cookies.get("email");
  const user_email = email || userDetails?.email;
  const options = [
    {
      name: "Scan QR code",
      key: "scan",
    },
    {
      name: "Enter the details",
      key: "ticket_id_entry",
    },
  ];

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
    logout(`?eventId=${eventId}`);
  };

  const handleValidateTickets = async (
    payload: TicketValidationProps,
    actions: FormikHelpers<TicketValidationProps>
  ) => {
    try {
      const res = await api.post(appUrls.TICKET_VALIDATION_URL, payload);
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        handleOpenClose();
        actions.resetForm();
      }
    } catch (error: any) {
      toast.error(_handleThrowErrorMessage(error?.data?.message));
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 gap-3">
      <header className="bg-white h-[68px] w-full px-6 flex justify-between items-center rounded-md shadow-sm">
        <img
          src={logo}
          alt="EventCove Logo"
          className="h-8"
          loading="lazy"
          aria-hidden="true"
        />
        <div className="flex gap-5 items-center">
          <User
            size="32"
            color="#868B90"
            variant="Bold"
            className="rounded-full w-8 h-8"
            aria-label="User Avatar"
          />
          <div className="flex flex-col gap-1">
            <h4 className="text-dark_200 text-xs font-normal">
              Tickets validation
            </h4>
            <button
              className="text-grey_100 text-xs font-normal flex gap-2 cursor-pointer"
              onClick={handleMenuToggle}
              aria-haspopup="true"
              aria-expanded={isMenuOpen ? "true" : "false"}
              aria-label="Toggle user menu"
              ref={buttonRef} // Assigning buttonRef to the button
            >
              <span>{user_email}</span>
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
                    icon={<Logout size="18" color="#767779" />}
                    label="Logout"
                    onClick={handleLogout}
                  />
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="md:px-6 px-4 w-full">
        {state === "EVENT_ORGANIZER" && (
          <div
            onClick={() => navigate(`/app/events/${eventId}`)}
            className="flex items-center gap-1 mb-4 cursor-pointer"
          >
            <ArrowLeft size="24" color="#000000" />
            <h4 className="text-dark_200 md:text-base text-sm font-bold">
              Go Back to event details
            </h4>
          </div>
        )}
        <div className="flex-1 h-full  flex lg:gap-16 gap-4 lg:flex-row flex-col justify-between gap">
          <div className="lg:w-3/5 w-full flex flex-col gap-2">
            <h4 className="text-dark_200 md:text-sm text-xs font-normal">
              Select any of the options below ✨
            </h4>
            <div className="flex flex-col w-full gap-4">
              {options.map((d, i) => {
                const is_active = d?.key === validationType;
                const active_color = is_active
                  ? "text-primary_100"
                  : "text-dark_200";
                return (
                  <div
                    onClick={() => {
                      navigate(
                        `/tickets-validation/${eventId}?validation-type=${d?.key}`,
                        {
                          state,
                        }
                      );
                    }}
                    key={i}
                    className={`${
                      is_active
                        ? "bg-primary_300 border border-secondary_200"
                        : "bg-white cursor-pointer"
                    } flex justify-between items-center p-4 rounded-md`}
                  >
                    <h4 className={`${active_color} text-sm font-normal`}>
                      {d?.name}
                    </h4>
                    <ArrowRight2 size="16" className={`${active_color}`} />
                  </div>
                );
              })}
            </div>
          </div>
          {validationType === "scan" && (
            <QRscan
              eventReference={eventId}
              email={user_email}
              handleOpenClose={handleOpenClose}
            />
          )}
          {validationType === "ticket_id_entry" && (
            <TicketIdEntry
              eventReference={eventId}
              email={user_email}
              handleValidateTickets={handleValidateTickets}
            />
          )}
        </div>
      </div>
      <ModalPopup isOpen={isOpenModal}>
        <SignupSuccess
          text="Ticket validation successful 🚀"
          handleOpenClose={handleOpenClose}
          handleFunction={handleOpenClose}
          buttonText="Proceed"
        />
      </ModalPopup>
    </div>
  );
}
