import * as React from "react";
import { TextStyleStats } from "../types";

interface TextStyleStatsSummaryProps {
  textStyleStats: TextStyleStats | null;
}

const TextStyleStatsSummary: React.FC<TextStyleStatsSummaryProps> = ({
  textStyleStats,
}) => {
  if (!textStyleStats || textStyleStats.total === 0) {
    return null;
  }

  return (
    <div className="px-4 py-2 border-b border-slate-300 bg-slate-50">
      <div className="flex items-center justify-between">
        <div className="text-xss text-slate-600">Text Style Usage</div>
        <div className="flex gap-3">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xss text-green-700">
              {textStyleStats.withStyle} styled
            </span>
          </div>
          {textStyleStats.withoutStyle > 0 && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-xss text-red-700">
                {textStyleStats.withoutStyle} unstyled
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="mt-1.5 w-full bg-slate-200 rounded-full h-1.5">
        <div
          className={`h-full rounded-full ${
            textStyleStats.withoutStyle === 0 ? "bg-green-500" : "bg-slate-900"
          }`}
          style={{
            width: `${
              (textStyleStats.withStyle / textStyleStats.total) * 100
            }%`,
            transition: "width 0.3s ease-in-out",
          }}
        ></div>
      </div>
    </div>
  );
};

export default TextStyleStatsSummary;
