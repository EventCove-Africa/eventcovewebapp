import { ButtonProps } from "../../../types";

const Button = ({
  backgroundColor,
  disabled = false,
  isLoading = false,
  textColor = "",
  title,
  onClick,
  className,
  textClassName = "",
  style,
  type = "button",
  loadingText = "Please wait...",
  renderIconRight,
}: ButtonProps) => {
  return (
    <button
      className={`
            flex flex-row gap-2 rounded-md items-center justify-center p-4 md:h-[40px] h-[39px] hover:bg-opacity-90 font-medium leading-5 md:text-base text-xs ${className}
            ${backgroundColor || "bg-primary_100"}
            ${disabled ? "opacity-[0.3]" : "opacity-100"}
            ${isLoading ? "opacity-[0.3]" : "opacity-100"}
            ${textColor || "text-[#FFFFFF]"}
        `}
      onClick={onClick}
      style={style}
      type={type}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <circle
              className="opacity-75"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray="80"
              strokeDashoffset="60"
            ></circle>
          </svg>
          <span className={`font-medium leading-5 text-base ${textClassName}`}>
            {loadingText}
          </span>
        </div>
      ) : (
        <p
          className={`font-medium leading-5 text-base ${
            textColor || "text-[#FFFFFF]"
          } ${textClassName}`}
        >
          {title}
        </p>
      )}
      {renderIconRight ? (
        <div className="flex flex-grow justify-end items-center">
          {renderIconRight}
        </div>
      ) : null}
    </button>
  );
};

export default Button;
