import DOMPurify from "dompurify";
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
  isRequired = false,
  tooltipContent = "",
  ...props
}: TextInputFieldProps) {
  // Sanitize free-text inputs that may be rendered as HTML elsewhere (e.g., tooltips).
  const sanitizedTooltip = typeof tooltipContent === "string"
    ? DOMPurify.sanitize(tooltipContent, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] })
    : "";

  // Limit input type to a safe whitelist to avoid unexpected behaviors.
  const allowedTypes = [
    "text",
    "email",
    "password",
    "number",
    "tel",
    "url",
    "search",
    "date",
    "datetime-local",
    "time",
    "checkbox",
    "radio",
    "file",
    "hidden",
  ];
  const inputType = allowedTypes.includes(String(type)) ? (type as string) : "text";

  // Sanitize id/htmlFor/name to safe attribute characters only.
  const sanitizeAttr = (v?: string) =>
    typeof v === "string" ? v.replace(/[^A-Za-z0-9_\-:.]/g, "") : "";

  const safeId = sanitizeAttr(id ?? "");
  const safeHtmlFor = sanitizeAttr(htmlFor ?? "");
  const safeName = sanitizeAttr(name ?? "");

  // Prevent prototype pollution or injection via spread props.
  const prohibited = new Set([
    "dangerouslySetInnerHTML",
    "innerHTML",
    "__proto__",
    "prototype",
    "constructor",
  ]);
  const safeProps = Object.keys(props).reduce<Record<string, unknown>>((acc, key) => {
    if (!prohibited.has(key)) acc[key] = (props as Record<string, unknown>)[key];
    return acc;
  }, {});

  // Accessibility / security hints
  const ariaInvalid = !!(errors && touched);

  // sensible autoComplete defaults for password fields
  const autoComplete =
    inputType === "password"
      ? (/(new|confirm)/i.test(safeName) ? "new-password" : "current-password")
      : undefined;

  return (
    <>
      <div className="flex flex-col">
        {labelName && (
          <label
            htmlFor={safeHtmlFor || safeId}
            className={`text-xs text-dark_200 leading-5 ${labelStyle} flex items-center`}
          >
            {labelName}
            {isRequired && <span className="text-red_100 text-lg mr-1">*</span>}
            {sanitizedTooltip && (
              <CustomTooltip dataTooltipId={sanitizedTooltip} content={sanitizedTooltip} />
            )}
          </label>
        )}
        <input
          type={inputType}
          name={safeName || undefined}
          id={safeId || undefined}
          maxLength={typeof maxLength === "number" ? maxLength : undefined}
          placeholder={typeof placeholder === "string" ? placeholder : undefined}
          className={`h-[44px] w-full bg-white border border-border_color accent-primary text-dark_200 text-sm rounded-md outline-none px-2 placeholder:text-grey_100 placeholder:text-sm ${inputClassName}`}
          onChange={handleChange}
          onInput={onInput}
          onBlur={onBlur}
          checked={checked}
          value={value ?? ""}
          style={style}
          readOnly={readOnly}
          onKeyPress={onKeyPress}
          aria-invalid={ariaInvalid}
          autoComplete={autoComplete}
          {...safeProps}
        />
        {errors && touched ? (
          <div className="text-xs text-red font-medium text-red-500" role="alert">
            {errors}
          </div>
        ) : null}
      </div>
    </>
  );
}