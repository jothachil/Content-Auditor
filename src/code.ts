figma.showUI(__html__, { themeColors: true, height: 450, width: 350 });

import * as api from "./api";

figma.on("selectionchange", () => {
  api.uiApi.selectionChanged(figma.currentPage.selection);
});

figma.on("currentpagechange", () => {
  api.uiApi.pageChanged(figma.currentPage);
});
