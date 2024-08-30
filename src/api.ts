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
});

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
