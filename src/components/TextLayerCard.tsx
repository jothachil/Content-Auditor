import * as React from "react";
import {
  TbArrowRight,
  TbEye,
  TbEyeOff,
  TbAlertSquareRounded,
} from "react-icons/tb";
import { guidelines } from "../guidelines";
import { TextLayer } from "../types";

interface TextLayerCardProps {
  layer: TextLayer;
  onSelect: (id: string) => void;
}

const TextLayerCard: React.FC<TextLayerCardProps> = ({ layer, onSelect }) => {
  return (
    <div className="shadow-button-base bg-white transition-all flex flex-col text-slate-900 rounded text-xs overflow-hidden">
      <div
        className="flex items-start justify-between border-b py-2 px-2.5 cursor-pointer"
        onClick={() => onSelect(layer.id)}
      >
        <div className="flex items-start gap-2">
          <div className="flex-1 py-1">
            {layer.visible ? (
              <TbEye className="text-slate-400 w-4 h-4" />
            ) : (
              <TbEyeOff className="text-slate-400 w-4 h-4" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-xss" title={layer.characters}>
              {layer.characters}
            </span>
            <span className="text-xsss text-slate-500">
              {layer.fontName?.family} • {layer.fontSize}px
              {layer.textStyleName && <> • {layer.textStyleName}</>}
            </span>
          </div>
        </div>
        <div className="hover:bg-slate-200 px-1 rounded-md">
          <TbArrowRight className="text-scarlet-600 w-4 h-4 my-1" />
        </div>
      </div>

      {/* Guidelines Status */}
      <div className="flex flex-col gap-[1px] border-b bg-neutral-200">
        {guidelines.map((guideline) => {
          const passes = layer.guidelineResults?.[guideline.id] ?? false;
          return (
            <div
              key={guideline.id}
              className={`
                flex items-center gap-1 px-1.5
                ${
                  passes
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }
              `}
              title={`${guideline.description}${
                !passes ? "\nFailed validation" : ""
              }`}
            >
              <span className="text-[10px]">
                {passes ? "✓" : "✕"} {guideline.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Summary Status */}
    </div>
  );
};

export default TextLayerCard;
