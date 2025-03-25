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

    // Process each selected node
    for (const node of selection) {
      // If the node is a frame or a group, find text layers inside it
      if (
        node.type === "FRAME" ||
        node.type === "GROUP" ||
        node.type === "SECTION"
      ) {
        findTextLayersInNode(node, textLayers);
      }
      // If the node itself is a text layer, add it directly
      else if (node.type === "TEXT") {
        textLayers.push({
          id: node.id,
          name: node.name,
          characters: node.characters,
          fontName: node.fontName,
          fontSize: node.fontSize,
        });
      }
    }

    return textLayers;
  },
});

// Helper function to recursively find text layers in a node
function findTextLayersInNode(node, textLayers) {
  if ("children" in node) {
    for (const child of node.children) {
      if (child.type === "TEXT") {
        textLayers.push({
          id: child.id,
          name: child.name,
          characters: child.characters,
          fontName: child.fontName,
          fontSize: child.fontSize,
        });
      } else if ("children" in child) {
        findTextLayersInNode(child, textLayers);
      }
    }
  }
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
