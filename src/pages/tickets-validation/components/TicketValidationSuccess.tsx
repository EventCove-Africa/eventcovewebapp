import checked_suceess from "../../../assets/icons/checked_suceess.svg";
import Button from "../../../components/FormComponents/Button";
import { User, Ticket, Calendar, Clock } from "iconsax-react";

type Props = {
  handleOpenClose: () => void;
  buttonText?: string;
  attendeeDetails: {
    fullName: string;
    ticketType: string;
    date: string;
    time: string;
  };
  setAttendeeDetails: (details: null) => void;
};

export default function TicketValidationSuccess({
  handleOpenClose,
  buttonText,
  attendeeDetails,
  setAttendeeDetails,
}: Props) {
  return (
    <div className="bg-white w-full md:w-[400px] rounded-xl p-3 shadow-lg">
      {/* Icon */}
      <div className="flex justify-center mt-2">
        <img
          src={checked_suceess}
          alt="success"
          className="w-[50px] h-[50px]"
        />
      </div>

      {/* Title */}
      <h4 className="text-dark_200 text-base font-medium text-center my-4">
        Ticket validation successful 🚀
      </h4>

      {/* Details Card */}
      <div className="bg-[#EDF9EE] rounded-lg p-3 text-sm grid grid-cols-2 gap-6">
        {/* Name */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500">
            <User size="16" color="#34C759" />
            <span>Name:</span>
            <span className="font-medium text-dark_200 text-xs">
              {attendeeDetails?.fullName}
            </span>
          </div>
        </div>

        {/* Ticket Type */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500">
            <Ticket size="16" color="#34C759" />
            <span>Ticket Type:</span>
            <span className="font-medium text-dark_200 text-xs">
              {attendeeDetails?.ticketType}
            </span>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500">
            <Calendar size="16" color="#34C759" />
            <span>Date:</span>
            <span className="font-medium text-dark_200 text-xs">
              {attendeeDetails?.date}
            </span>
          </div>
        </div>

        {/* Time */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500">
            <Clock size="16" color="#34C759" />
            <span>Time:</span>
            <span className="font-medium text-dark_200 text-xs">
              {attendeeDetails?.time}
            </span>
          </div>
        </div>
      </div>
        <Button
          title={buttonText}
          className="w-full h-[42px] mt-4 text-center"
          type="button"
          onClick={() => {
            handleOpenClose?.();
            setAttendeeDetails?.(null);
          }}
        />
    </div>
  );
}
