import * as React from "react";
import { TbTypography } from "react-icons/tb";

interface NoSelectionMessageProps {
  hasSelection: boolean;
  isLoading: boolean;
}

const NoSelectionMessage: React.FC<NoSelectionMessageProps> = ({
  hasSelection,
  isLoading,
}) => {
  if (hasSelection) {
    return null;
  }

  return (
    <div className="bg-slate-200 text-xss flex-1 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <TbTypography className="text-gray-400 w-20 h-20 my-1" />
        <div className="text-center text-gray-500 w-[300px]">
          {isLoading
            ? "Loading..."
            : "No frame selected. Select a frame and click refresh to start auditing text layers."}
        </div>
      </div>
    </div>
  );
};

export default NoSelectionMessage;
