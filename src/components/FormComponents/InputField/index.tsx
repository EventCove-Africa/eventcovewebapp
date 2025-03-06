import { TextInputFieldProps } from "../../../types";
import CustomTooltip from "../../TooltipComponent";

export default function TextInputField({
  handleChange,
  value,
  htmlFor,
  labelName,
  type,
  name,
  labelStyle,
  inputClassName,
  placeholder,
  maxLength,
  onBlur,
  onInput,
  id,
  errors,
  touched,
  checked,
  style,
  onKeyPress,
  readOnly = false,
  tooltipContent = "",
  ...props
}: TextInputFieldProps) {
  return (
    <>
      <div className="flex flex-col">
        {labelName && (
          <label
            htmlFor={htmlFor}
            className={`text-xs text-dark_200 leading-5 ${labelStyle} flex gap-1 items-center`}
          >
            {labelName}
            {tooltipContent && (
              <CustomTooltip
                dataTooltipId={tooltipContent}
                content={tooltipContent}
              />
            )}
          </label>
        )}
        <input
          type={type}
          name={name}
          id={id}
          maxLength={maxLength}
          placeholder={placeholder}
          className={`h-[44px] w-full bg-white border border-border_color accent-primary text-dark_200 text-sm rounded-md outline-none px-2 placeholder:text-grey_100 placeholder:text-sm ${inputClassName}`}
          onChange={handleChange}
          onInput={onInput}
          onBlur={onBlur}
          checked={checked}
          value={value}
          style={style}
          readOnly={readOnly}
          onKeyPress={onKeyPress}
          {...props}
        />
        {errors && touched ? (
          <div className="text-xs text-red font-medium text-red-500">
            {errors}
          </div>
        ) : null}
      </div>
    </>
  );
}
