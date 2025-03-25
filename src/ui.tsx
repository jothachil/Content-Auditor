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
} from "react-icons/tb";

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
}

function App() {
  const [textLayers, setTextLayers] = React.useState<TextLayer[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // Function to fetch text layers from the current selection
  const fetchTextLayers = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const layers = await pluginApi.getTextLayersInSelection();
      setTextLayers(layers);
    } catch (error) {
      console.error("Error fetching text layers:", error);
      pluginApi.notify("Error fetching text layers");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Set up selection change handler
  React.useEffect(() => {
    // Remove the automatic refresh on selection change
    setEventCallback("selectionChanged", () => {
      // No longer calling fetchTextLayers here
    });

    // Initial fetch
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

  return (
    <main className="bg-white h-[100vh] flex flex-col ">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-300 bg-white">
        <div className="flex items-center gap-1 text-slate-700 text-xss">
          <div className="">
            <TbTypography className="text-scarlet-600  w-4 h-4 my-1" />
          </div>
          {textLayers.length} text layer
          {textLayers.length !== 1 ? "s" : ""}
        </div>
        <div className=" text-center  flex justify-center items-center gap-1">
          <a
            href="https://buymeacoffee.com/jothachil"
            target="_blank"
            className="flex items-center gap-1 text-slate-400 hover:text-slate-500 text-xss  px-2 py-1 rounded-md transition-all"
          >
            <div className="flex items-center gap-1">
              Donate <TbHeartFilled className="text-red-600 w-4 h-4" />
            </div>
          </a>
        </div>
      </div>
      {textLayers.length === 0 ? (
        <div className="text-center p-4 text-gray-500">
          {isLoading
            ? "Loading..."
            : "No text layers found in selection. Select frames containing text layers."}
        </div>
      ) : (
        <div className="p-2 relative bg-slate-200 grid-image h-[650px] overflow-y-scroll">
          <div className="absolute top-0 translate-y-2 left-16 w-[230px] h-[10px] blur-xl bg-scarlet-500 z-20"></div>
          <div className="absolute top-0  left-16 w-[200px] h-[1.5px]  bg-gradient-to-r from-slate-100/0 via-scarlet-600 to-slate-100/0 z-20"></div>
          <div className="flex flex-col gap-2 relative z-40  ">
            {textLayers.map((layer) => (
              <div
                key={layer.id}
                className="shadow-button-base bg-white hover:bg-slate-50 transition-all flex items-start justify-between text-slate-900 py-2 px-2.5 rounded cursor-pointer text-xs"
              >
                <div className="flex items-start gap-2">
                  <div className="flex-1 py-1">
                    {layer.visible ? (
                      <TbEye className="text-slate-400 w-4 h-4" />
                    ) : (
                      <TbEyeOff className="text-slate-400 w-4 h-4" />
                    )}
                  </div>
                  <div title={layer.characters}>{layer.characters}</div>
                </div>

                <div
                  className="hover:bg-slate-200 px-1 rounded-md"
                  onClick={() => selectAndZoomToLayer(layer.id)}
                >
                  <TbArrowRight className="text-scarlet-600 w-4 h-4 my-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="bg-white   flex justify-between items-center  p-2 border-t border-slate-300 ">
        <button
          className=" bg-scarlet-600 text-white  text-xss py-2.5 rounded hover:bg-scarlet-700 w-full flex items-center justify-center gap-1 transition-all"
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
