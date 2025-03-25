import * as api from "./api";

// Set the UI size
figma.showUI(__html__, { themeColors: true, height: 600, width: 400 });

figma.on("selectionchange", () => {
  api.uiApi.selectionChanged(figma.currentPage.selection);
});

figma.on("currentpagechange", () => {
  api.uiApi.pageChanged(figma.currentPage);
});
