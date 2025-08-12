import { groq } from "next-sanity";

export type ImagesRowQueryResult = {
  title: string;
  images: {
    _key: string;
    url: string;
  }[];
};

export const cardsSlider = groq`
  _type == "cardsSlider" => {
    title,
    layout,
    cards[]->{
          title,
          mainImage,
          maxGuests,
          wc,
          bedrooms,
        }
  }
`;
