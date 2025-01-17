import React, { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styles

const CalendarComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    } else if (Array.isArray(value) && value.length > 0) {
      setSelectedDate(value[0]);
    } else {
      setSelectedDate(null);
    }
  };

  const tileClassName: CalendarProps["tileClassName"] = ({ date }) => {
    if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
      return "bg-primary_100 text-white"; // Apply TailwindCSS classes for the selected day
    }
    return "";
  };

  return (
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        minDate={new Date()}
        tileClassName={tileClassName} // Apply the custom tile class
      />
  );
};

export default CalendarComponent;
