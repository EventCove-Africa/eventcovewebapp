import { apiUrlsType } from "../../types";

const USER_PATH = "/user";

export const appUrls: apiUrlsType = {
  LOGIN_URL: "/auth",
  CREATE_ORGANIZER_ACCOUNT_URL: USER_PATH,
  GET_USER_DETAILS_URL: `${USER_PATH}/details`,
  OTP_URL: `${USER_PATH}/otp`,
  GET_BANK_LIST_URL: "/banks",
  WALLET_URL: "/wallet",
  FORGET_PASSWORD_URL: `${USER_PATH}/reset/password`,
  RESET_PASSWORD_URL: `${USER_PATH}/update/password`,
  EVENT_URL: "/event",
  EXPORT_URL: "/export",
  LOCATIONS_URL: "/locations",
  IMAGE_UPLOAD_URL: "/images/upload",
  TICKET_URL: "/ticket",
  TICKET_TYPE_URL: "/tickets",
  TICKET_VALIDATION_URL: "/validate",
  EVENT_TICKET_SALES_URL: "/details",
};
