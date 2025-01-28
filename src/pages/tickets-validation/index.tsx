import { ArrowRight2 } from "iconsax-react";
import logo from "../../assets/icons/logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import QRscan from "./components/QRscan";
import TicketIdEntry from "./components/TicketIdEntry";
import ModalPopup from "../../components/ModalPopup";
import SignupSuccess from "../components/SignupSuccess";
import useOpenCloseModal from "../../hooks/useOpenCloseModal";

export default function TicketsValidation() {
  const { isOpenModal, handleOpenClose } = useOpenCloseModal();
  const location = useLocation();
  const navigate = useNavigate();
  // Extract query parameter for eventType
  const params = new URLSearchParams(location.search);
  const validationType = params.get("validation-type");
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

  return (
    <div className="flex flex-col flex-1 gap-3">
      <header className="bg-white h-[68px] w-full px-6 flex items-center rounded-md shadow-sm">
        <img
          src={logo}
          alt="EventCove Logo"
          className="h-8"
          loading="lazy"
          aria-hidden="true"
        />
      </header>
      <div className="flex-1 h-full md:p-6 p-4 w-full flex lg:gap-16 gap-4 lg:flex-row flex-col justify-between gap">
        <div className="lg:w-3/5 w-full flex flex-col gap-2">
          <h4 className="text-dark_200 md:text-base text-sm font-bold">
            Validate tickets using
          </h4>
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
                  onClick={() =>
                    navigate(`/tickets-validation?validation-type=${d?.key}`)
                  }
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
        {validationType === "scan" && <QRscan handleOpenClose={handleOpenClose}  />}
        {validationType === "ticket_id_entry" && (
          <TicketIdEntry handleOpenClose={handleOpenClose} />
        )}
      </div>
      <ModalPopup isOpen={isOpenModal}>
        <SignupSuccess
          text="Congrats, you’re all set! 🎉 Time to vibe. 🚀"
          handleOpenClose={handleOpenClose}
          handleFunction={handleOpenClose}
          buttonText="Proceed"
        />
      </ModalPopup>
    </div>
  );
}
