import dynamic from "next/dynamic";
export * from "./SectionZone";

export const sanitySections = {
  cardsSlider: dynamic(() => import("./CardsSlider")),
} as const;
