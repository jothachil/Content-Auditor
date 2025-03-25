import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./ui.css";
import { pluginApi, setEventCallback } from "./api";
import { Button } from "react-figma-plugin-ds";
import "react-figma-plugin-ds/figma-plugin-ds.css";

interface TextLayer {
  id: string;
  name: string;
  characters: string;
  fontName: any;
  fontSize: number;
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

  return (
    <main className="bg-white h-[100vh] flex flex-col p-4">
      <h2 className="text-xl font-bold mb-4">Text Layers in Selection</h2>

      <div className="mb-4">
        <Button onClick={fetchTextLayers} isDisabled={isLoading}>
          {isLoading ? "Loading..." : "Refresh Text Layers"}
        </Button>
      </div>

      {textLayers.length === 0 ? (
        <div className="text-center p-4 text-gray-500">
          {isLoading
            ? "Loading..."
            : "No text layers found in selection. Select frames containing text layers."}
        </div>
      ) : (
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-[1fr,1fr] gap-2 font-bold mb-2 p-2 bg-gray-100">
            <div>Content</div>
            <div>Font Size</div>
          </div>

          {textLayers.map((layer) => (
            <div
              key={layer.id}
              className="grid grid-cols-[1fr,1fr] gap-2 p-2 border-b border-gray-200 hover:bg-gray-50"
            >
              <div className="truncate" title={layer.characters}>
                {truncateText(layer.characters)}
              </div>
              <div>{layer.fontSize}px</div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500">
        Total: {textLayers.length} text layer
        {textLayers.length !== 1 ? "s" : ""}
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
