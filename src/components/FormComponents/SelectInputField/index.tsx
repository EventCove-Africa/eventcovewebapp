/* eslint-disable @typescript-eslint/no-explicit-any */
import Select, { Props as ReactSelectProps, GroupBase } from "react-select";
import CustomOption from "./CustomOption";

// Define the type for options
export type Option = {
  value: any;
  label: string;
  icon?: string; // Optional icon for each option
};

// Props for the Select component
export interface CustomSelectProps<
  OptionType extends Option = Option,
  IsMulti extends boolean = false
> extends ReactSelectProps<OptionType, IsMulti, GroupBase<OptionType>> {
  label?: string;
  errors?: any;
  value?: any;
  defaultValue?: any;
  touched?: any;
  name?: string;
}

const CustomSelect = <
  OptionType extends Option = Option,
  IsMulti extends boolean = false
>({
  options = [],
  label,
  name,
  errors,
  touched,
  isMulti,
  placeholder = "",
  value,
  defaultValue,
  defaultInputValue,
  ...props
}: CustomSelectProps<OptionType, IsMulti>) => {
  // Find the corresponding option object for the given defaultValue string
  const computedDefaultValue = options.find(
    (opt: any) => opt.value === defaultValue
  );

  return (
    <div>
      {label && (
        <label className="text-xs text-dark_200 leading-5">{label}</label>
      )}
      <Select
        options={options}
        isMulti={isMulti}
        name={name}
        value={value || computedDefaultValue} // Use computed default value when value is not provided
        components={{ Option: CustomOption }}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? "none" : "none",
            cursor: "pointer",
            height: 40,
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
              ? "#A30162"
              : state.isFocused
              ? "#A30162"
              : undefined,
            cursor: "pointer",
            marginBottom: "3px",
            color: state.isSelected
              ? "white"
              : state.isFocused
              ? "white"
              : "#A30162",
            "&:hover": {
              backgroundColor: "#A30162",
              color: "white",
            },
          }),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          border: "none",
          colors: {
            ...theme.colors,
            primary25: "white",
            primary: "#A30162",
          },
        })}
        placeholder={placeholder}
        defaultInputValue={defaultInputValue}
        {...props}
      />
      {errors && touched ? (
        <div className="text-xs text-red font-medium text-red-500">
          {errors}
        </div>
      ) : null}
    </div>
  );
};

export default CustomSelect;
