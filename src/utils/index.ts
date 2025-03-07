/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { userDetailsProps } from "../types";
import { api } from "../services/api";
import { appUrls } from "../services/urls";

export const openNewTabWithUrl = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

export function redirectUrls(route: string) {
  if (typeof window !== "undefined") {
    window.location.href = route;
  }
}
// Framer Motion animation variants
export const animationVariants = {
  hidden: { opacity: 0, y: 20 }, // Initial state: slightly below and invisible
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }, // Ease-in animation
};

export function formatToNaira(amount: number): string {
  if (isNaN(amount)) {
    throw new Error("Invalid amount provided. Please provide a valid number.");
  }

  return `₦${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export const eventTypeStyles: Record<string, string> = {
  upcoming: "bg-yellow_100 text-yellow_200",
  completed: "bg-green_300 text-green_200",
  deleted: "bg-primary_300 text-primary_100",
};

export const formatNumberWithCommas = (value: string) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function checkBoolean(arr: any[]): boolean {
  return arr[0] === true; // Returns true if the first element is true, otherwise false
}

export const handleNumberInput = (value: string) => {
  // Remove any non-digit and non-comma characters
  const cleanedValue = value.replace(/[^0-9,]/g, "");
  // Remove any extra commas
  const sanitizedValue = cleanedValue.replace(/,/g, "");
  // Check if the sanitized value starts with '0' and has more than one digit
  const nonZeroSanitizedValue =
    sanitizedValue.startsWith("0") && sanitizedValue.length > 1
      ? sanitizedValue.slice(1)
      : sanitizedValue;
  // Format the number with commas
  return formatNumberWithCommas(nonZeroSanitizedValue);
};

export function formatDateTime(dateTime: any): string {
  const date = new Date(dateTime);
  // Format the day and month
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are 0-based
  const year = date.getFullYear();
  // Format the time
  let hours = date.getHours();
  // const minutes = date.getMinutes();
  const amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format
  // Format the date and time into the desired format
  return `${day}/${month}/${year} | ${hours}${amPm}`;
}

export function convertToAsterisks(value: number | string): string {
  // Convert the value to a string to determine its length
  const strValue = value.toString();
  const asterisksValue = `₦ ${"*".repeat(strValue.length)}`;
  // Return a string of asterisks with the same length as the input
  return asterisksValue;
}

export const isValidOptionalDetails = (
  details: Record<string, any>,
  requiredFields: any
): boolean => {
  for (const field of requiredFields) {
    if (
      details[field] === "" ||
      details[field] === null ||
      details[field] === undefined
    ) {
      toast.error(`${field.replace(/_/g, " ")} is required`);
      return false;
    }
  }
  return true;
};

export function _handleThrowErrorMessage(message: string) {
  const err = message || "Something went wrong, please try again later";
  return err;
}

export function _handleClearCookiesAndSession(...cookieNames: string[]) {
  cookieNames.forEach((name) => Cookies.remove(name));
  sessionStorage.clear();
}

export function setAuthCookies(tokens: Record<string, string>) {
  Object.entries(tokens).forEach(([key, value]) => {
    Cookies.set(key, value, {
      expires: 3, // Expires in 3 days
      secure: true, // Only send over HTTPS
      sameSite: "strict", // Protection against CSRF
    });
  });
}

export const validateUserDetails = (user: userDetailsProps): boolean => {
  const { fullName, email, id } = user;
  // Check required fields are not empty, null, or undefined
  if (!fullName?.trim() || !email?.trim() || !id?.trim()) return false;
  return true;
};

export const isObjectEmpty = (obj: Record<string, unknown>): boolean => {
  return Object?.keys(obj)?.length === 0;
};

export const isArrayEmpty = (arr: any[]): boolean => arr.length === 0;

export function convertDateTimeRangeForEventCreation(
  startDateTime: any,
  endDateTime: any
) {
  if (startDateTime || endDateTime) {
    const formatDate = (date: Date) =>
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(date.getDate()).padStart(2, "0")}`;
    const formatTime = (date: Date) =>
      `${String(date.getHours()).padStart(2, "0")}:${String(
        date.getMinutes()
      ).padStart(2, "0")}`;
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);
    return {
      startDate: startDateTime ? formatDate(start) : "",
      startTime: startDateTime ? formatTime(start) : "",
      endDate: endDateTime ? formatDate(end) : "",
      endTime: endDateTime ? formatTime(end) : "",
    };
  }

  return {
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  };
}

export const handleImageUpload = async (payload: any) => {
  if (!payload) {
    console.error("No file provided");
    return;
  }
  const formdata = new FormData();
  formdata.append("file", payload);
  try {
    const res = await api.post(appUrls.IMAGE_UPLOAD_URL, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const status_code = [200, 201].includes(res?.status);
    if (status_code) {
      const image_url = res?.data?.data;
      return image_url;
    }
  } catch (error) {
    console.error("Upload failed", error);
    toast.error("Upload failed");
  }
};

export function arrayToFormattedDate([year, month, day]: [
  number,
  number,
  number
]): string {
  const date = new Date(year, month - 1, day); // Month is 0-based in JavaScript Date
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
  const formattedDate = date.toLocaleDateString("en-GB", options);
  return formattedDate.replace(
    /\d+/,
    (d) => `${d}${getOrdinalSuffix(Number(d))}`
  );
}
// Function to get the ordinal suffix (st, nd, rd, th)
function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return "th"; // Special case for 11, 12, 13
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function truncateString(str: string, maxLength: number = 20): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}

export const arrayToFormattedDateWithYear = (
  dateArray: [number, number, number]
): string => {
  const [year, month, day] = dateArray;
  const date = new Date(year, month - 1, day); // Month is zero-based
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatTimeToshowAmPm = (timeString: string): string => {
  const [hours, minutes] = timeString.split(":").map(Number);
  const period = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12; // Convert 24-hour format to 12-hour format

  return `${formattedHours}:${minutes.toString().padStart(2, "0")}${period}`;
};

export const extractEmails = (data: any) =>
  data?.map((item: any) => item?.email);

export const formatDateTimeToStringDATE = (
  startDate: [number, number, number] = [1800, 1, 1],
  startTime: string = "00:00"
): any => {
  const [year, month, day] = startDate;
  const [hours, minutes] = startTime?.split(":")?.map(Number);
  // Create a Date object (JavaScript months are 0-based)
  const date = new Date(year, month - 1, day, hours, minutes);
  return date.toString(); // Converts to local time zone format
};

export function parseNumber(str: string): number {
  return parseFloat(str.replace(/,/g, ""));
}

export const formatDateArrayToString = (
  dateArray: [number, number, number]
): string => {
  const [year, month, day] = dateArray;
  const formattedMonth = month.toString().padStart(2, "0"); // Ensure 2 digits
  const formattedDay = day.toString().padStart(2, "0"); // Ensure 2 digits
  return `${formattedMonth}/${formattedDay}/${year}`;
};
