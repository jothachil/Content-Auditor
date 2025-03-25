import { createPluginAPI, createUIAPI } from "figma-jsonrpc";

export const pluginApi = createPluginAPI({
  exit() {
    figma.closePlugin();
  },
  notify(message: string) {
    figma.notify(message);
  },
  createRectangle(
    count: number,
    rotationIncrement: number,
    color: string,
    sizeIncrement: number
  ) {
    const nodes = [];

    for (let i = 0; i < count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{ type: "SOLID", color: figma.util.rgb(color) }];
      rect.rotation = i * rotationIncrement;
      rect.resize(100 + i * sizeIncrement, 100 + i * sizeIncrement);
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  },
  getTextLayersInSelection() {
    const selection = figma.currentPage.selection;
    const textLayers = [];

    for (const node of selection) {
      if (
        node.type === "FRAME" ||
        node.type === "GROUP" ||
        node.type === "SECTION"
      ) {
        findTextLayersInNode(node, textLayers);
      } else if (node.type === "TEXT") {
        textLayers.push({
          id: node.id,
          name: node.name,
          characters: node.characters,
          fontName: isFontName(node.fontName)
            ? {
                family: node.fontName.family,
                style: node.fontName.style,
              }
            : null,
          fontSize: node.fontSize,
          visible: isNodeVisible(node),
        });
      }
    }

    return textLayers;
  },
  async selectAndZoomToNode(nodeId: string) {
    try {
      console.log("API: Selecting node with ID:", nodeId);
      // Use the async version of getNodeById
      const node = await figma.getNodeByIdAsync(nodeId);

      if (!node || !("parent" in node)) {
        console.log("API: Node not found or not selectable with ID:", nodeId);
        return false;
      }

      console.log("API: Node found, type:", node.type);
      // Cast to SceneNode since we've verified it has a parent (is a SceneNode)
      figma.currentPage.selection = [node as SceneNode];
      figma.viewport.scrollAndZoomIntoView([node as SceneNode]);
      return true;
    } catch (error) {
      console.error("API: Error in selectAndZoomToNode:", error);
      return false;
    }
  },
});

// Helper function to check if a node and all its parents are visible
function isNodeVisible(node: BaseNode): boolean {
  let current: BaseNode | null = node;
  while (current && "visible" in current) {
    if (!current.visible) return false;
    current = current.parent;
  }
  return true;
}

function findTextLayersInNode(node, textLayers) {
  if ("children" in node) {
    for (const child of node.children) {
      if (child.type === "TEXT") {
        textLayers.push({
          id: child.id,
          name: child.name,
          characters: child.characters,
          fontName: isFontName(child.fontName)
            ? {
                family: child.fontName.family,
                style: child.fontName.style,
              }
            : null,
          fontSize: child.fontSize,
          visible: isNodeVisible(child),
        });
      } else if ("children" in child) {
        findTextLayersInNode(child, textLayers);
      }
    }
  }
}

// Add this helper function at the top of the file
function isFontName(font: any): font is FontName {
  return typeof font === "object" && "family" in font && "style" in font;
}

let eventCallback = {
  selectionChanged: (selection) => {},
  pageChanged: (page) => {},
};

export const setEventCallback = (name: string, callback: Function) => {
  eventCallback[name] = callback;
};

export const uiApi = createUIAPI({
  selectionChanged(selection) {
    eventCallback.selectionChanged(selection.map((item) => item.id));
  },
  pageChanged(page) {
    eventCallback.pageChanged(page);
  },
});
