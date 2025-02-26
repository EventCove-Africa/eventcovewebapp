/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";

function checkBoolean(arr: any[]): boolean {
  return arr[0] === true; // Returns true if the first element is true, otherwise false
}

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Password is required"),
});

export const signupAddBankSchema = Yup.object().shape({
  accountNumber: Yup.string().required("Account number is required"),
  bankName: Yup.mixed().required("Bank name is required"),
});

export const addBvnNinSchema = Yup.object().shape({
  bvn: Yup.string().required("Bvn is required"),
  nin: Yup.string().required("Nin is required"),
});

export const signupSchema = Yup.object().shape({
  lastName: Yup.string().required("Lastname is required"),
  firstName: Yup.string().required("Firstname is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required...."),
});

export const signupResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required...."),
});

export const createPinSchema = Yup.object().shape({
  pin: Yup.string()
    .min(4, "Too Short!")
    .max(4, "PIN must be 4 digits!")
    .required("PIN is required"),
  confirm_pin: Yup.string()
    .oneOf([Yup.ref("pin")], "PIN must match")
    .required("Confirm PIN is required...."),
});

export const forgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const addTicketSchema = Yup.object().shape({
  ticket_category: Yup.mixed().required("Category is required"),
  ticket_type: Yup.string().required("Ticket type is required"),
  ticket_details: Yup.boolean(), // Must be defined as a boolean
  seat_name: Yup.string().when("ticket_details", (ticketDetails, schema) =>
    checkBoolean(ticketDetails)
      ? schema.required("Seat name is required")
      : schema.notRequired()
  ),
  price: Yup.string().when("ticket_type", ([ticketType], schema) => {
    if (ticketType !== "free") {
      return schema.required("Price is required");
    }
    return schema.notRequired();
  }),
  sales_end_date_time: Yup.date().when(
    "ticket_details",
    (ticketDetails, schema) =>
      checkBoolean(ticketDetails)
        ? schema.required("Sales end date and time are required")
        : schema.notRequired()
  ),
  ticket_perks: Yup.string().nullable(), // Optional field
  capacity: Yup.string().nullable(), // Optional field
  purchase_limit: Yup.string().nullable(),
});

export const addEventSchema = Yup.object().shape({
  event_image: Yup.mixed().required("Image is required"),
  event_name: Yup.string().required("Name is required"),
  venue_type: Yup.string().required("Venue type is required"),
  states: Yup.string().when("venue_type", ([venueType], schema) => {
    if (venueType === "Physical") {
      return schema.required("State is required");
    }
    return schema.notRequired();
  }),
  category: Yup.string().required("Category is required"),
  location: Yup.string().required("Location is required"),
  start_date_time: Yup.date()
    .min(new Date(), "Date cannot be in the past")
    .required("Start date and time is required"),
  end_date_time: Yup.date()
    .min(new Date(), "Date cannot be in the past")
    .required("End date and time is required"),
  event_privacy: Yup.string().required("Event privacy is required"),
  event_description: Yup.string().required("Event description is required"),
  organizer_phone_number: Yup.string()
    .matches(/^\d+$/, "Phone number must contain only digits") // Ensures only digits
    .min(11, "Phone number must be at least 10 digits") // Adjust as needed
    .max(15, "Phone number cannot exceed 15 digits") // Adjust as needed
    .required("Phone number is required"), // Required field
});

export const withdrawalsSchema = (maxValue: number) =>
  Yup.object().shape({
    amount: Yup.string()
      .required("Amount is required")
      .test(
        "is-valid-number",
        "Invalid amount format",
        (value) => value !== undefined && /^[0-9,]+$/.test(value)
      )
      .test(
        "is-not-zero",
        "Amount cannot be zero",
        (value) =>
          value !== undefined && parseInt(value.replace(/,/g, ""), 10) > 0
      )
      .test(
        "max-value",
        `Amount cannot exceed ${maxValue.toLocaleString()}`,
        (value) =>
          value !== undefined &&
          parseInt(value.replace(/,/g, ""), 10) <= maxValue
      ),
    transaction_pin: Yup.string()
      .min(4, "Too Short!")
      .max(4, "PIN must be 4 digits!")
      .required("PIN is required"),
  });

export const ticketValidationSchema = Yup.object().shape({
  ticked_id: Yup.mixed().required("Ticket is required"),
  // reference_number: Yup.string().required("Reference is required"),
});
