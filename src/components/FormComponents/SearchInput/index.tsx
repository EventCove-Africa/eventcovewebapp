import { SearchNormal1 } from "iconsax-react";
import { FC } from "react";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const SearchInput: FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search",
  className = "",
}) => {
  return (
    <div className={`my-2`}>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`bg-background_100 cursor-text rounded-md px-3 py-2 pl-10 md:w-[255px] w-full placeholder:text-xs placeholder:text-dark_200 outline-none focus:outline-none ${className}`}
        />
        <SearchNormal1
          size="16"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark_200"
        />
      </div>
    </div>
  );
};

export default SearchInput;
