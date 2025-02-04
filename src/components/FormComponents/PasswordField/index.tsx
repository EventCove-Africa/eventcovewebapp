import { useState } from "react";
import { Eye, EyeSlash } from "iconsax-react";
import { PasswordInputFieldProps } from "../../../types";

export default function PasswordInputField({
  handleChange,
  labelName = "Password",
  className = "",
  name = "password",
  placeholder = "Enter your password",
  labelClassName = "",
  value = "",
  errors = "",
  touched = false,
  type = 'text',
  ...rest
}: PasswordInputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const inputId = name || "password";
  const errorId = `${inputId}-error`;

  return (
    <div className="password-input-field">
      {labelName && (
        <label
          htmlFor={inputId}
          className={`text-xs leading-4 text-dark_200 font-normal ${labelClassName}`}
        >
          {labelName}
        </label>
      )}
      <div className="relative w-full">
        <input
          type={showPassword ? type : "password"}
          name={inputId}
          id={inputId}
          className={`block w-full h-[44px] text-dark_200 text-sm px-2 border border-border_color rounded-lg outline-none ${className}`}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          aria-label={labelName}
          aria-describedby={errors && touched ? errorId : undefined}
          {...rest}
        />
        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          aria-hidden="true"
        >
          {showPassword ? (
            <Eye
              size="32"
              color="#767779"
              className="h-5 w-5 text-grey_100 cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          ) : (
            <EyeSlash
              size="32"
              color="#767779"
              className="h-5 w-5 text-grey_100 cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
      </div>
      {errors && touched && (
        <div
          id={errorId}
          className="text-xs font-medium text-red-500 mt-1"
          role="alert"
        >
          {errors}
        </div>
      )}
    </div>
  );
}
