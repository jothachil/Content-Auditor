import * as React from "react";
import { TbFilter, TbEye, TbEyeOff, TbTypography } from "react-icons/tb";
import FilterDropdown from "./FilterDropdown";
import { FilterType, VisibilityFilterType } from "../types";

interface HeaderProps {
  textLayerCount: number;
  filterType: FilterType;
  setFilterType: (type: FilterType) => void;
  visibilityFilter: VisibilityFilterType;
  setVisibilityFilter: (type: VisibilityFilterType) => void;
}

const Header: React.FC<HeaderProps> = ({
  textLayerCount,
  filterType,
  setFilterType,
  visibilityFilter,
  setVisibilityFilter,
}) => {
  const [isFilterOpen, setIsFilterOpen] = React.useState<boolean>(false);
  const [isVisibilityFilterOpen, setIsVisibilityFilterOpen] =
    React.useState<boolean>(false);

  return (
    <div className="flex items-center justify-between px-3 py-3 border-b border-slate-300 bg-slate-50">
      <div className="flex items-center gap-1 text-slate-700 text-xss">
        <div className="">
          <TbTypography className="text-scarlet-600 w-4 h-4 my-1" />
        </div>
        {textLayerCount} text layer
        {textLayerCount !== 1 ? "s" : ""}
      </div>
      <div className="flex gap-2">
        {/* Filter for style/guidelines */}
        <FilterDropdown
          isOpen={isFilterOpen}
          setIsOpen={setIsFilterOpen}
          currentValue={filterType}
          icon={<TbFilter className="w-4 h-4" />}
          options={[
            { value: "all", label: "All" },
            { value: "unstyledOnly", label: "Unstyled" },
            { value: "failingOnly", label: "Failing" },
          ]}
          onSelect={(value) => setFilterType(value as FilterType)}
          closeOther={() => setIsVisibilityFilterOpen(false)}
        />

        {/* Filter for visibility */}
        <FilterDropdown
          isOpen={isVisibilityFilterOpen}
          setIsOpen={setIsVisibilityFilterOpen}
          currentValue={visibilityFilter}
          icon={
            visibilityFilter === "visible" ? (
              <TbEye className="w-4 h-4" />
            ) : visibilityFilter === "hidden" ? (
              <TbEyeOff className="w-4 h-4" />
            ) : (
              <TbEye className="w-4 h-4" />
            )
          }
          options={[
            { value: "all", label: "All" },
            { value: "visible", label: "Visible" },
            { value: "hidden", label: "Hidden" },
          ]}
          onSelect={(value) =>
            setVisibilityFilter(value as VisibilityFilterType)
          }
          closeOther={() => setIsFilterOpen(false)}
        />
      </div>
    </div>
  );
};

export default Header;
