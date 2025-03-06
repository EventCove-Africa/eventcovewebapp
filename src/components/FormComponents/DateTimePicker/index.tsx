/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomTooltip from "../../TooltipComponent";

interface DateTimePickerProps {
  labelName?: string;
  htmlFor?: string;
  value?: Date | null;
  defaultValue?: Date | null;
  onChange: (date: Date | null) => void;
  showTime?: boolean;
  minDate?: Date;
  className?: string;
  tooltipContent?: string;
  name?: string;
  errors: any;
  touched: any;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  labelName,
  name,
  htmlFor,
  value,
  defaultValue,
  onChange,
  errors,
  touched,
  showTime = true,
  tooltipContent,
  minDate = new Date(),
  className = "",
}) => {
  const selectedDate =
    value instanceof Date
      ? value
      : defaultValue instanceof Date
      ? defaultValue
      : defaultValue
      ? new Date(defaultValue)
      : null;

  // Calculate maxDate (5 years from today)
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 5);

  // Get today's date (without time)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check if the selected date is today
  const isToday =
    selectedDate &&
    selectedDate.toDateString() === today.toDateString();

  // If today, restrict the time to the future
  const now = new Date();
  const minTime = isToday ? now : new Date(0, 0, 0, 0, 0, 0); // Midnight for non-today dates
  const maxTime = new Date(0, 0, 0, 23, 59, 59); // Always allow up to 11:59 PM

  return (
    <div className={`date-time-picker ${className} flex flex-col gap-1`}>
      {labelName && (
        <label
          htmlFor={htmlFor}
          className="text-xs text-dark_200 leading-5 flex gap-1 items-center"
        >
          {labelName}
          {tooltipContent && <CustomTooltip dataTooltipId={tooltipContent} content={tooltipContent} />}
        </label>
      )}
      <ReactDatePicker
        selected={selectedDate}
        name={name}
        onChange={onChange}
        showTimeSelect={showTime}
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat={showTime ? "MMMM d, yyyy h:mm aa" : "MMMM d, yyyy"}
        minDate={minDate}
        maxDate={maxDate}
        minTime={minTime}
        maxTime={maxTime} // Always required when minTime is set
        className="h-[44px] w-full bg-white border border-border_color accent-primary text-dark_200 text-sm rounded-md outline-none px-2 placeholder:text-grey_100 placeholder:text-sm"
      />
      {errors && touched ? (
        <div className="text-xs text-red font-medium text-red-500">
          {errors}
        </div>
      ) : null}
    </div>
  );
};

export default DateTimePicker;
