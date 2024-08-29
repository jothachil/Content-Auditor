import React from "react";
import { TbChevronDown } from "react-icons/tb";
interface DropdownProps {
  options: { value: string; label: string }[];
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  return (
    <div className="px-3  bg-neutral-100 rounded flex items-center justify-between">
      <select
        className=" py-2 flex w-full  text text-neutral-900 outline-none cursor-pointer text-xss"
        onChange={(e) => onSelect(e.target.value)}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-neutral-200"
          >
            {option.label}
          </option>
        ))}
      </select>
      <TbChevronDown className="h-4 w-4 text-neutral-400" />
    </div>
  );
};

export default Dropdown;
