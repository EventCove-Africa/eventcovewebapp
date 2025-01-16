/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent } from "react";

export interface apiUrlsType {
  LOGIN_URL: string;
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
  labelClassName?: string;
  value: string;
  errors?: any;
  touched?: any;
  rest?: any;
}
