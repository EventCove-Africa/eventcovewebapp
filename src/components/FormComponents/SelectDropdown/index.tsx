import { ArrowDown2, ArrowUp2 } from "iconsax-react";
import React, { useState, useEffect, useRef } from "react";

interface SelectDropdownProps {
  options: string[];
  onChange: (value: string) => void;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onChange(value);
    setIsOpen(false); // Close dropdown after selecting
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="min-w-[130px] w-auto flex items-center justify-between shadow-md gap-1 text-xs px-4 py-2 rounded-md bg-white text-left focus:outline-none"
      >
        {selectedValue || options?.[0]}
        <span className="float-left">
          {isOpen ? (
            <ArrowUp2 color="#767779" variant="Bold" />
          ) : (
            <ArrowDown2 color="#767779" variant="Bold" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-1 min-w-[130px] w-auto bg-white rounded-md shadow-lg max-h-60 overflow-auto z-10">
          <ul className="py-1 text-sm text-gray-700">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 cursor-pointer hover:bg-primary_100 hover:text-white"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
