/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateTimePickerProps {
  labelName?: string;
  htmlFor?: string;
  value?: Date | null;
  defaultValue?: Date | null;
  onChange: (date: Date | null) => void;
  showTime?: boolean;
  minDate?: Date;
  className?: string;
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
  minDate,
  className = "",
}) => {
  const selectedDate = value || defaultValue || null;

  // Calculate maxDate to be 5 years from the current date
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 5);

  return (
    <div className={`date-time-picker ${className} flex flex-col gap-1`}>
      {labelName && (
        <label htmlFor={htmlFor} className={`text-xs text-dark_200 leading-5`}>
          {labelName}
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
        className={`h-[44px] w-full bg-white border border-border_color accent-primary text-dark_200 text-sm rounded-md outline-none px-2 placeholder:text-grey_100 placeholder:text-sm`}
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
