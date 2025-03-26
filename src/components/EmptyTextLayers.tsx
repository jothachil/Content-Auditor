import * as React from "react";
import { TbTypography } from "react-icons/tb";

interface EmptyTextLayersProps {
  isLoading: boolean;
}

const EmptyTextLayers: React.FC<EmptyTextLayersProps> = ({ isLoading }) => {
  return (
    <div className="bg-slate-200 text-xss flex-1 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <TbTypography className="text-gray-400 w-20 h-20 my-1" />
        <div className="text-center text-gray-500 w-[300px]">
          {isLoading
            ? "Loading..."
            : "No text layers found in selection. Select frames containing text layers and click refresh."}
        </div>
      </div>
    </div>
  );
};

export default EmptyTextLayers;
