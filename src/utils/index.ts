import { toast } from "react-hot-toast";

/* eslint-disable @typescript-eslint/no-explicit-any */
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
  cancelled: "bg-primary_300 text-primary_100",
};

export const formatNumberWithCommas = (value: string) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

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
  details: Record<string, any>
): boolean => {
  const requiredFields = [
    "seat_name",
    "price",
    "capacity",
    "sales_end_date_time",
  ];

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
