import dynamic from "next/dynamic";
export * from "./SectionZone";

export const sanitySections = {
  banner: dynamic(() => import("./Banner")),
  cardsList: dynamic(() => import("./CardsList")),
  cardsSlider: dynamic(() => import("./CardsSlider")),
  featuredCards: dynamic(() => import("./FeaturedCards")),
  form: dynamic(() => import("./Form")),
} as const;
