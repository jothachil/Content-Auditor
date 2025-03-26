import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./ui.css";
import { pluginApi, setEventCallback } from "./api";
import { Button } from "react-figma-plugin-ds";
import "react-figma-plugin-ds/figma-plugin-ds.css";
import {
  TbArrowRight,
  TbRefresh,
  TbHeartFilled,
  TbTypography,
  TbEye,
  TbEyeOff,
  TbAlertSquareRounded,
  TbFilter,
} from "react-icons/tb";
import { validateText, guidelines } from "./guidelines";

interface TextLayer {
  id: string;
  name: string;
  characters: string;
  fontName: {
    family: string;
    style: string;
  };
  fontSize: number;
  visible: boolean;
  guidelineResults?: Record<string, boolean>;
  textStyleId?: string;
  textStyleName?: string;
}

type FilterType = "all" | "unstyledOnly" | "failingOnly";

function App() {
  const [textLayers, setTextLayers] = React.useState<TextLayer[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [hasSelection, setHasSelection] = React.useState<boolean>(true);
  const [filterType, setFilterType] = React.useState<FilterType>("all");
  const [isFilterOpen, setIsFilterOpen] = React.useState<boolean>(false);

  // Function to fetch text layers from the current selection
  const fetchTextLayers = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const layers = await pluginApi.getTextLayersInSelection();
      // Check if there's any selection when refresh is clicked
      setHasSelection(layers.length > 0);
      setTextLayers(layers);
    } catch (error) {
      console.error("Error fetching text layers:", error);
      pluginApi.notify("Error fetching text layers");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch on mount
  React.useEffect(() => {
    fetchTextLayers();
  }, [fetchTextLayers]);

  // Function to truncate long text
  const truncateText = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Function to select and zoom to a text layer
  const selectAndZoomToLayer = async (layerId: string) => {
    try {
      console.log("Attempting to select layer with ID:", layerId);
      const success = await pluginApi.selectAndZoomToNode(layerId);
      if (!success) {
        console.log("Node not found with ID:", layerId);
        pluginApi.notify("Could not find the text layer");
      }
    } catch (error) {
      console.error("Error selecting text layer:", error);
      pluginApi.notify("Error selecting text layer");
    }
  };

  // Calculate summary statistics
  const calculateStats = () => {
    if (textLayers.length === 0) return null;

    const stats = {
      total: textLayers.length,
      passing: 0,
      failing: 0,
    };

    textLayers.forEach((layer) => {
      const allPassing = Object.values(layer.guidelineResults || {}).every(
        (result) => result
      );
      if (allPassing) {
        stats.passing++;
      } else {
        stats.failing++;
      }
    });

    return stats;
  };

  // Add this helper function near other stat calculations
  const calculateTextStyleStats = () => {
    if (textLayers.length === 0) return null;

    const stats = {
      total: textLayers.length,
      withStyle: 0,
      withoutStyle: 0,
    };

    textLayers.forEach((layer) => {
      if (layer.textStyleId) {
        stats.withStyle++;
      } else {
        stats.withoutStyle++;
      }
    });

    return stats;
  };

  const guidelineStats = calculateStats();
  const textStyleStats = calculateTextStyleStats();

  // Sort text layers with failing ones at top
  const sortedTextLayers = React.useMemo(() => {
    return [...textLayers].sort((a, b) => {
      const aAllPassing = Object.values(a.guidelineResults || {}).every(
        (result) => result
      );
      const bAllPassing = Object.values(b.guidelineResults || {}).every(
        (result) => result
      );

      if (aAllPassing === bAllPassing) return 0;
      return aAllPassing ? 1 : -1; // Failing layers go to top
    });
  }, [textLayers]);

  const filteredLayers = React.useMemo(() => {
    return sortedTextLayers.filter((layer) => {
      if (filterType === "unstyledOnly") {
        return !layer.textStyleId;
      }
      if (filterType === "failingOnly") {
        return !Object.values(layer.guidelineResults || {}).every(
          (result) => result
        );
      }
      return true;
    });
  }, [sortedTextLayers, filterType]);

  // Add this effect in your App component
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".relative")) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <main className="bg-white h-[100vh] flex flex-col">
      <div className="flex items-center justify-between px-3 py-3 border-b border-slate-300 bg-slate-50">
        <div className="flex items-center gap-1 text-slate-700 text-xss">
          <div className="">
            <TbTypography className="text-scarlet-600  w-4 h-4 my-1" />
          </div>
          {textLayers.length} text layer
          {textLayers.length !== 1 ? "s" : ""}
        </div>
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-1 text-slate-600 hover:text-slate-700 text-xss px-2 py-2 rounded transition-all shadow-button-base w-24 bg-white "
          >
            <TbFilter className="w-4 h-4" />
            {filterType === "all"
              ? "All"
              : filterType === "unstyledOnly"
              ? "Unstyled"
              : "Failing"}
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 top-full mt-1 bg-white rounded-md shadow-lg border border-slate-200 py-1 z-50">
              <button
                onClick={() => {
                  setFilterType("all");
                  setIsFilterOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 text-xss hover:bg-slate-100 ${
                  filterType === "all" ? "text-scarlet-600" : "text-slate-600"
                }`}
              >
                All
              </button>
              <button
                onClick={() => {
                  setFilterType("unstyledOnly");
                  setIsFilterOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 text-xss hover:bg-slate-100 ${
                  filterType === "unstyledOnly"
                    ? "text-scarlet-600"
                    : "text-slate-600"
                }`}
              >
                Unstyled
              </button>
              <button
                onClick={() => {
                  setFilterType("failingOnly");
                  setIsFilterOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 text-xss hover:bg-slate-100 ${
                  filterType === "failingOnly"
                    ? "text-scarlet-600"
                    : "text-slate-600"
                }`}
              >
                Failing
              </button>
            </div>
          )}
        </div>
      </div>

      {!hasSelection ? (
        <div className="bg-slate-200 text-xss flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <TbTypography className="text-gray-400 w-20 h-20 my-1" />
            <div className="text-center text-gray-500 w-[300px]">
              No frame selected. Select a frame and click refresh to start
              auditing text layers.
            </div>
          </div>
        </div>
      ) : textLayers.length === 0 ? (
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
      ) : (
        <div className="flex-1 p-2 relative bg-slate-200 grid-image overflow-y-scroll">
          <div className="absolute top-0 translate-y-2 left-16 w-[230px] h-[10px] blur-xl bg-scarlet-500 z-20"></div>
          <div className="absolute top-0  left-16 w-[200px] h-[1.5px]  bg-gradient-to-r from-slate-100/0 via-scarlet-600 to-slate-100/0 z-20"></div>
          <div className="flex flex-col gap-2 relative z-40">
            {filteredLayers.map((layer) => (
              <div
                key={layer.id}
                className="shadow-button-base bg-white transition-all flex flex-col text-slate-900  rounded text-xs"
              >
                {/* Layer Header */}
                <div
                  className="flex items-start justify-between border-b py-2 px-2.5  cursor-pointer"
                  onClick={() => selectAndZoomToLayer(layer.id)}
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
                      <span title={layer.characters}>{layer.characters}</span>
                      <span className="text-xss text-slate-500">
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
                <div className=" flex flex-col gap-[1px]  border-b bg-neutral-200">
                  {guidelines.map((guideline) => {
                    const passes =
                      layer.guidelineResults?.[guideline.id] ?? false;
                    return (
                      <div
                        key={guideline.id}
                        className={`
                        flex items-center gap-1  px-1.5
                        ${
                          passes
                            ? "bg-green-50 text-green-700  "
                            : "bg-red-50 text-red-700  "
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
                <div className=" text-xss text-slate-500 py-2 px-2.5">
                  {Object.values(layer.guidelineResults || {}).every(
                    (result) => result
                  ) ? (
                    "✨ All guidelines passed"
                  ) : (
                    <div className=" flex items-center gap-2">
                      <TbAlertSquareRounded className="text-scarlet-600  w-4 h-4 my-1" />
                      <div>Needs attention</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {guidelineStats && textLayers.length > 0 && (
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
                guidelineStats.failing === 0 ? "bg-green-500" : "bg-scarlet-500"
              }`}
              style={{
                width: `${
                  (guidelineStats.passing / guidelineStats.total) * 100
                }%`,
                transition: "width 0.3s ease-in-out",
              }}
            ></div>
          </div>
        </div>
      )}
      {textStyleStats && textLayers.length > 0 && (
        <div className="px-4 py-2 border-b border-slate-300 bg-slate-50">
          <div className="flex items-center justify-between">
            <div className="text-xss text-slate-600">Text Style Usage</div>
            <div className="flex gap-3">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-scarlet-500"></div>
                <span className="text-xss text-scarlet-700">
                  {textStyleStats.withStyle} styled
                </span>
              </div>
              {textStyleStats.withoutStyle > 0 && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                  <span className="text-xss text-slate-700">
                    {textStyleStats.withoutStyle} unstyled
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-1.5 w-full bg-slate-200 rounded-full h-1.5">
            <div
              className="h-full rounded-full bg-scarlet-500"
              style={{
                width: `${
                  (textStyleStats.withStyle / textStyleStats.total) * 100
                }%`,
                transition: "width 0.3s ease-in-out",
              }}
            ></div>
          </div>
        </div>
      )}
      <div className="bg-white flex justify-between items-center p-2 ">
        <button
          className="bg-scarlet-600 text-white text-xss py-2.5 rounded hover:bg-scarlet-700 w-full flex items-center justify-center gap-1 transition-all"
          onClick={fetchTextLayers}
        >
          <TbRefresh className="w-4 h-4" />
          <span>{isLoading ? "Loading..." : "Refresh Text Layers"}</span>
        </button>
      </div>
    </main>
  );
}

// Replace the old render method with the new createRoot API
const container = document.getElementById("react-page");
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}
