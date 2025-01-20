import { components, OptionProps, GroupBase } from "react-select";
import { Option } from "./";

const CustomOption = <OptionType extends Option, IsMulti extends boolean>(
  props: OptionProps<OptionType, IsMulti, GroupBase<OptionType>>
) => {
  const { data } = props;

  return (
    <components.Option {...props}>
      <div className="flex items-center">
        {/* Display icon if available */}
        {data.icon && (
          <span className="mr-2">
            <img
              src={data.icon}
              alt={data.label}
              className="rounded-full w-5 h-5"
            />
          </span>
        )}
        <span className="text-sm font-normal">{data.label}</span>
      </div>
    </components.Option>
  );
};

export default CustomOption;
