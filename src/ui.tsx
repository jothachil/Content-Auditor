import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./ui.css";
import { pluginApi } from "./api";
import "react-figma-plugin-ds/figma-plugin-ds.css";
import { validateText } from "./guidelines";
import {
  TextLayer,
  FilterType,
  VisibilityFilterType,
  GuidelineStats,
  TextStyleStats,
} from "./types";

// Import components
import Header from "./components/Header";
import TextLayerCard from "./components/TextLayerCard";
import GuidelineStatsSummary from "./components/GuidelineStatsSummary";
import TextStyleStatsSummary from "./components/TextStyleStatsSummary";
import NoSelectionMessage from "./components/NoSelectionMessage";
import EmptyTextLayers from "./components/EmptyTextLayers";
import RefreshButton from "./components/RefreshButton";

function App() {
  const [textLayers, setTextLayers] = React.useState<TextLayer[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [hasSelection, setHasSelection] = React.useState<boolean>(true);
  const [filterType, setFilterType] = React.useState<FilterType>("all");
  const [visibilityFilter, setVisibilityFilter] =
    React.useState<VisibilityFilterType>("all");

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
  const calculateStats = (): GuidelineStats | null => {
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

  // Calculate text style stats
  const calculateTextStyleStats = (): TextStyleStats | null => {
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
      // Style/Guidelines filter
      if (filterType === "unstyledOnly" && layer.textStyleId) {
        return false;
      }
      if (
        filterType === "failingOnly" &&
        Object.values(layer.guidelineResults || {}).every((result) => result)
      ) {
        return false;
      }

      // Visibility filter
      if (visibilityFilter === "visible" && !layer.visible) {
        return false;
      }
      if (visibilityFilter === "hidden" && layer.visible) {
        return false;
      }

      return true;
    });
  }, [sortedTextLayers, filterType, visibilityFilter]);

  // Add this effect to handle clicking outside filters
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".filter-dropdown")) {
        // Our FilterDropdown component now handles open/close state
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <main className="bg-white h-[100vh] flex flex-col">
      <Header
        textLayerCount={textLayers.length}
        filterType={filterType}
        setFilterType={setFilterType}
        visibilityFilter={visibilityFilter}
        setVisibilityFilter={setVisibilityFilter}
      />

      {!hasSelection ? (
        <NoSelectionMessage hasSelection={hasSelection} isLoading={isLoading} />
      ) : textLayers.length === 0 ? (
        <EmptyTextLayers isLoading={isLoading} />
      ) : (
        <div className="flex-1 p-2 relative bg-slate-200 grid-image overflow-y-scroll">
          <div className="absolute top-0 translate-y-2 left-16 w-[230px] h-[10px] blur-xl bg-scarlet-500 z-20"></div>
          <div className="absolute top-0  left-16 w-[200px] h-[1.5px]  bg-gradient-to-r from-slate-100/0 via-scarlet-600 to-slate-100/0 z-20"></div>
          <div className="flex flex-col gap-2 relative z-40">
            {filteredLayers.map((layer) => (
              <TextLayerCard
                key={layer.id}
                layer={layer}
                onSelect={selectAndZoomToLayer}
              />
            ))}
          </div>
        </div>
      )}

      <>
        <GuidelineStatsSummary guidelineStats={guidelineStats} />
        <TextStyleStatsSummary textStyleStats={textStyleStats} />
      </>

      <RefreshButton onRefresh={fetchTextLayers} isLoading={isLoading} />
    </main>
  );
}

// Replace the old render method with the new createRoot API
const container = document.getElementById("react-page");
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}
