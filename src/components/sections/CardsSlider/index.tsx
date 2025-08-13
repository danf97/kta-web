"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { cardsSliderSectionQueryResult } from "@/sanity/queries/sections/cards-slider";
import { SectionType } from "@/sanity/queries/sections";
import PropertyCard from "@/components/cards/PropertyCard";

import "swiper/css";
import "./styles.css";

const CardsSlider = ({
  section,
  index,
}: {
  section: SectionType<cardsSliderSectionQueryResult>;
  index: number;
}) => {
  console.log("CardsSlider section:", section);
  return (
    <div key={section._key || index} className="cards-slider">
      <Swiper
        spaceBetween={22}
        // slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => {
          swiper.slideTo(3, 0, false);
        }}
        centeredSlides={section.layout === "centered"}
        slidesPerView={"auto"}
      >
        {section.cards.map((card, cardIndex) => (
          <SwiperSlide key={card._key || cardIndex} className="!w-fit">
            <PropertyCard property={card} />
          </SwiperSlide>
        ))}
        ...
      </Swiper>
    </div>
  );
};

export default CardsSlider;
