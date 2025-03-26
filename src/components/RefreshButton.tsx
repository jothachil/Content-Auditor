import * as React from "react";
import { TbRefresh } from "react-icons/tb";

interface RefreshButtonProps {
  onRefresh: () => void;
  isLoading: boolean;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({
  onRefresh,
  isLoading,
}) => {
  return (
    <div className="bg-white flex justify-between items-center p-2">
      <button
        className="bg-scarlet-600 text-white text-xss py-2.5 rounded hover:bg-scarlet-700 w-full flex items-center justify-center gap-1 transition-all"
        onClick={onRefresh}
        disabled={isLoading}
      >
        <TbRefresh className="w-4 h-4" />
        <span>{isLoading ? "Loading..." : "Refresh Text Layers"}</span>
      </button>
    </div>
  );
};

export default RefreshButton;
