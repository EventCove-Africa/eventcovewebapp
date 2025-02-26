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
  LOCATIONS_URL: "/locations"
};
