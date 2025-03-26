import * as React from "react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentValue: string;
  icon: React.ReactNode;
  options: FilterOption[];
  onSelect: (value: string) => void;
  closeOther: () => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  isOpen,
  setIsOpen,
  currentValue,
  icon,
  options,
  onSelect,
  closeOther,
}) => {
  return (
    <div className="relative filter-dropdown">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          closeOther();
        }}
        className="flex items-center gap-1 text-slate-600 hover:text-slate-700 text-xss px-2 py-2 rounded transition-all shadow-button-base w-24 bg-white"
      >
        {icon}
        {options.find((option) => option.value === currentValue)?.label ||
          "Filter"}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 bg-white rounded-md shadow-lg border border-slate-200 py-1 z-50">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onSelect(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-1.5 text-xss hover:bg-slate-100 ${
                currentValue === option.value
                  ? "text-scarlet-600"
                  : "text-slate-600"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
