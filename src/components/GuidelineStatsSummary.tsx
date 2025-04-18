import * as React from "react";
import { GuidelineStats } from "../types";

interface GuidelineStatsSummaryProps {
  guidelineStats: GuidelineStats | null;
}

const GuidelineStatsSummary: React.FC<GuidelineStatsSummaryProps> = ({
  guidelineStats,
}) => {
  if (!guidelineStats || guidelineStats.total === 0) {
    return null;
  }

  return (
    <div className="px-4 py-2 border-b border-t border-slate-300 bg-slate-50">
      <div className="flex items-center justify-between">
        <div className="text-xss text-slate-600">Guidelines Summary</div>
        <div className="flex gap-3">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xss text-green-700">
              {guidelineStats.passing} passing
            </span>
          </div>
          {guidelineStats.failing > 0 && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-xss text-red-700">
                {guidelineStats.failing} failing
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="mt-1.5 w-full bg-slate-200 rounded-full h-1.5">
        <div
          className={`h-full rounded-full ${
            guidelineStats.failing === 0 ? "bg-green-500" : "bg-slate-900"
          }`}
          style={{
            width: `${(guidelineStats.passing / guidelineStats.total) * 100}%`,
            transition: "width 0.3s ease-in-out",
          }}
        ></div>
      </div>
    </div>
  );
};

export default GuidelineStatsSummary;
