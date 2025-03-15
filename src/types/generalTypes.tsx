/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormikHelpers } from "formik";
import { FormEvent, ReactNode } from "react";

export interface apiUrlsType {
  LOGIN_URL: string;
  CREATE_ORGANIZER_ACCOUNT_URL: string;
  GET_USER_DETAILS_URL: string;
  OTP_URL: string;
  GET_BANK_LIST_URL: string;
  WALLET_URL: string;
  FORGET_PASSWORD_URL: string;
  RESET_PASSWORD_URL: string;
  EVENT_URL: string;
  EXPORT_URL: string;
  LOCATIONS_URL: string;
  IMAGE_UPLOAD_URL: string;
  TICKET_URL: string;
  TICKET_TYPE_URL: string;
  TICKET_VALIDATION_URL: string;
  EVENT_TICKET_SALES_URL: string;
  PROFILE_URL: string;
}

export interface ButtonProps {
  backgroundColor?: string;
  disabled?: boolean;
  showPlus?: boolean;
  showDownload?: boolean;
  showMinus?: boolean;
  isLoading?: boolean;
  textColor?: string;
  title?: string;
  onClick?: () => void;
  className?: any;
  style?: any;
  size?: string;
  type?: "button" | "submit";
  loadingText?: string;
  textClassName?: string;
  renderIconRight?: JSX.Element | any;
}

export interface TextInputFieldProps {
  name: string;
  handleChange?: (value: FormEvent) => void;
  value: string | boolean | any;
  htmlFor?: string;
  labelName?: string;
  type?: string;
  id?: string;
  errors?: any;
  touched?: any;
  labelStyle?: string;
  inputClassName?: string;
  placeholder?: string;
  tooltipContent?: string;
  maxLength?: number;
  onInput?: any;
  onBlur?: any;
  style?: any;
  props?: any;
  readOnly?: boolean;
  checked?: boolean;
  onKeyPress?: any;
}

export interface PasswordInputFieldProps {
  handleChange?: any;
  labelName?: string;
  className?: string;
  name: string;
  placeholder?: string;
  type?: string;
  labelClassName?: string;
  value: string;
  errors?: any;
  touched?: any;
  rest?: any;
}

export type UserDetailsProviderProps = {
  children: ReactNode;
};

export type LoginData = {
  email: string;
  password: string;
  eventId?: string | null;
};

export type SignUpData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type LoginProps = {
  payload: LoginData;
  actions: FormikHelpers<LoginData>;
  from: string;
};

export type userDetailsProps = {
  fullName: string;
  email: string;
  id: string;
  eventId?: string | null;
};

export type SignupProps = {
  payload: SignUpData;
  actions: FormikHelpers<SignUpData>;
  handleOpenClose?: () => void;
};

export interface useUserProps {
  login: (props: LoginProps) => void;
  signup: (props: SignupProps) => void;
  handleGetUserDetails: () => any;
  loadingDetails: boolean;
  userDetails: userDetailsProps;
  logout: (query?: string) => void;
}

export type OTPVerifyProps = {
  nextPath?: string;
  transactionType: any;
  handleOpenClose: () => void;
  handleNextFunction?: () => void;
  email?: string | null;
  showCancelButton?: boolean;
  allowResendOTPOnRender?: boolean;
};

export type AddBankWalletProps = {
  bankName: any;
  accountNumber: string;
  nin?: string;
  bvn?: string;
  walletId?: string;
};

export type eventSalesStatsProps = {
  totalTicketBuyers: number;
  totalTicketNotValidated: number;
  totalTicketSales: number;
  totalTicketSold: number;
  totalTicketValidated: number;
};