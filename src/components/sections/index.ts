import dynamic from "next/dynamic";
export * from "./SectionZone";

export const sanitySections = {
  cardsSlider: dynamic(() => import("./CardsSlider")),
  featuredCards: dynamic(() => import("./FeaturedCards")),
  banner: dynamic(() => import("./Banner")),
} as const;
