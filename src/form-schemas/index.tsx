/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
import { checkLowercase, checkUppercase, containsNumber } from "../utils";

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
  bvn: Yup.string()
    .matches(
      /^\d{11}$/,
      "BVN must be exactly 11 digits and contain only numbers"
    )
    .required("BVN is required"),
  nin: Yup.string()
    .matches(
      /^\d{11}$/,
      "NIN must be exactly 11 digits and contain only numbers"
    )
    .required("NIN is required"),
});

export const signupSchema = (setPasswordCharacterCheck: any) =>
  Yup.object().shape({
    lastName: Yup.string().required("Lastname is required"),
    firstName: Yup.string().required("Firstname is required"),
    email: Yup.string()
      .trim()
      .email("Invalid email address")
      // .matches(
      //   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      //   "Invalid email format"
      // )
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .required("Password is required")
      .test("password", "", function (password) {
        if (!password?.trim())
          return this.createError({ message: "Password is required" });
        const isLengthValid = password.length >= 8;
        const hasUppercase = checkUppercase(password);
        const hasLowercase = checkLowercase(password);
        const hasNumber = containsNumber(password);
        const hasSpecialChar = /\W/.test(password);
        setPasswordCharacterCheck((prev: any) => ({
          ...prev,
          password_length: isLengthValid,
          contains_uppercase: hasUppercase,
          contains_lowercase: hasLowercase,
          contains_number: hasNumber,
          unique_character: hasSpecialChar,
        }));

        if (!isLengthValid)
          return this.createError({
            message: "Password must be at least 8 characters long",
          });
        if (!hasUppercase)
          return this.createError({
            message: "Password must contain at least one uppercase letter",
          });
        if (!hasLowercase)
          return this.createError({
            message: "Password must contain at least one lowercase letter",
          });
        if (!hasNumber)
          return this.createError({
            message: "Password must contain at least one number",
          });
        if (!hasSpecialChar)
          return this.createError({
            message: "Password must contain at least one special character",
          });
        return true; // Passes validation
      }),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required...."),
  });

export const updateProfileSchema = Yup.object().shape({
  lastName: Yup.string().required("Lastname is required"),
  firstName: Yup.string().required("Firstname is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const signupResetPasswordSchema = (setPasswordCharacterCheck: any) =>
  Yup.object().shape({
    password: Yup.string()
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .required("Password is required")
      .test("password", "", function (password) {
        if (!password?.trim())
          return this.createError({ message: "Password is required" });
        const isLengthValid = password.length >= 8;
        const hasUppercase = checkUppercase(password);
        const hasLowercase = checkLowercase(password);
        const hasNumber = containsNumber(password);
        const hasSpecialChar = /\W/.test(password);
        setPasswordCharacterCheck((prev: any) => ({
          ...prev,
          password_length: isLengthValid,
          contains_uppercase: hasUppercase,
          contains_lowercase: hasLowercase,
          contains_number: hasNumber,
          unique_character: hasSpecialChar,
        }));

        if (!isLengthValid)
          return this.createError({
            message: "Password must be at least 8 characters long",
          });
        if (!hasUppercase)
          return this.createError({
            message: "Password must contain at least one uppercase letter",
          });
        if (!hasLowercase)
          return this.createError({
            message: "Password must contain at least one lowercase letter",
          });
        if (!hasNumber)
          return this.createError({
            message: "Password must contain at least one number",
          });
        if (!hasSpecialChar)
          return this.createError({
            message: "Password must contain at least one special character",
          });
        return true; // Passes validation
      }),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required...."),
  });

export const resetPasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old Password is required"),
  newPassword: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("New Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required...."),
});

export const createPinSchema = Yup.object().shape({
  pin: Yup.string()
    .min(6, "Too Short!")
    .max(6, "PIN must be 6 digits!")
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
  // classification: Yup.mixed().required("Classification is required"),
  classification: Yup.string().when("all_values", ([all_values], schema) => {
    if (all_values.length >= 1) {
      return schema.notRequired();
    }
    return schema.required("Classification is required");
  }),
  // category: Yup.string().required("Category is required"),
  category: Yup.string().when("all_values", ([all_values], schema) => {
    if (all_values.length >= 1) {
      return schema.notRequired();
    }
    return schema.required("Category is required");
  }),
  // name: Yup.string().required("Seat name is required"),
  name: Yup.string().when("all_values", ([all_values], schema) => {
    if (all_values.length >= 1) {
      return schema.notRequired();
    }
    return schema.required("Seat name is required");
  }),
  groupTicketLimit: Yup.string(),
  colour: Yup.string(),
  all_values: Yup.mixed(),
  ticket_details: Yup.boolean(), // Must be defined as a boolean
  transferTransactionFeeToBuyer: Yup.boolean(), // Must be defined as a boolean
  price: Yup.string().when(
    ["category", "all_values"],
    ([category, all_values], schema) => {
      if (all_values.length >= 1) {
        return schema.notRequired();
      }
      if (category && category?.toLowerCase() !== "free") {
        return schema.required("Price is required");
      }
      return schema.notRequired();
    }
  ),

  // sales_end_date_time: Yup.date().when(
  //   "ticket_details",
  //   (ticketDetails, schema) =>
  //     checkBoolean(ticketDetails)
  //       ? schema.required("Sales end date and time are required")
  //       : schema.notRequired()
  // ),
  sales_end_date_time: Yup.date().nullable(), // Optional field
  sales_start_date_time: Yup.date().nullable(), // Optional field
  perks: Yup.string().nullable(), // Optional field
  capacity: Yup.string().nullable(), // Optional field
  purchaseLimit: Yup.string().nullable(), // Optional field
});

export const editTicketSchema = Yup.object().shape({
  classification: Yup.mixed().required("Classification is required"),
  category: Yup.string().required("Category is required"),
  name: Yup.string().required("Seat name is required"),
  groupTicketLimit: Yup.string(),
  colour: Yup.string(),
  all_values: Yup.mixed(),
  ticket_details: Yup.boolean(), // Must be defined as a boolean
  transferTransactionFeeToBuyer: Yup.boolean(), // Must be defined as a boolean
  price: Yup.string().when(["category"], ([category], schema) => {
    if (category && category?.toLowerCase() !== "free") {
      return schema.required("Price is required");
    }
    return schema.notRequired();
  }),

  sales_end_date_time: Yup.date().nullable(), // Optional field
  sales_start_date_time: Yup.date().nullable(), // Optional field
  perks: Yup.string().nullable(), // Optional field
  capacity: Yup.string().nullable(), // Optional field
  purchaseLimit: Yup.string().nullable(), // Optional field
});

export const addEventSchema = Yup.object().shape({
  eventImageUrl: Yup.mixed().required("Image is required"),
  eventName: Yup.string().required("Name is required"),
  eventVenueType: Yup.string().required("Venue type is required"),
  city: Yup.string().when("eventVenueType", ([eventVenueType], schema) => {
    if (eventVenueType === "Physical") {
      return schema.required("State is required");
    }
    return schema.notRequired();
  }),
  eventCategory: Yup.string().required("Category is required"),
  location: Yup.string().required("Location is required"),
  start_date_time: Yup.date()
    .min(new Date(), "Date cannot be in the past")
    .required("Start date and time is required"),
  end_date_time: Yup.date()
    .min(new Date(), "Date cannot be in the past")
    .required("End date and time is required"),
  eventPrivacy: Yup.string().required("Event privacy is required"),
  eventDescription: Yup.string().required("Event description is required"),
  phoneNumber: Yup.string()
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
      .min(6, "Too Short!")
      .max(6, "PIN must be 6 digits!")
      .required("PIN is required"),
    transaction_otp: Yup.string()
      .min(6, "Too Short!")
      .max(6, "OTP must be 6 digits!")
      .required("OTP is required"),
  });

export const ticketValidationSchema = Yup.object().shape({
  ticketNumber: Yup.mixed().required("Ticket Id is required"),
});
