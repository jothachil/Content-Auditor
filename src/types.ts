export interface TextLayer {
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

export type FilterType = "all" | "unstyledOnly" | "failingOnly";
export type VisibilityFilterType = "all" | "visible" | "hidden";

export interface GuidelineStats {
  total: number;
  passing: number;
  failing: number;
}

export interface TextStyleStats {
  total: number;
  withStyle: number;
  withoutStyle: number;
}
