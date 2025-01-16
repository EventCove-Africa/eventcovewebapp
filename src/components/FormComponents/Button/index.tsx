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
      <p
        className={`font-medium leading-5 text-base ${
          textColor || "text-[#FFFFFF]"
        } ${textClassName}`}
      >
        {isLoading ? loadingText : title}
      </p>
      {renderIconRight ? (
        <div className="flex flex-grow justify-end items-center">
          {renderIconRight}
        </div>
      ) : null}
    </button>
  );
};

export default Button;
