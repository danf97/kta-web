"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { cardsSliderSectionQueryResult } from "@/sanity/queries/sections/cards-slider";
import { SectionType } from "@/sanity/queries/sections";
import PropertyCard from "@/components/cards/PropertyCard";

import "swiper/css";
import "./styles.scss";
import { useEffect } from "react";
import SliderControls from "@/components/ui/SliderControls";

const CardsSlider = ({
  section,
  index,
}: {
  section: SectionType<cardsSliderSectionQueryResult>;
  index: number;
}) => {
  useEffect(() => {
    // find all a elements on .cards-slider
    const links = document.querySelectorAll(".cards-slider a");
    links.forEach((link, index) => {
      setTimeout(() => {
        link.classList.add("show");
      }, 150 * index);
    });
  });

  return (
    <div
      key={section._key || index}
      className="cards-slider vertical-space max-w-screen overflow-hidden"
    >
      <Swiper
        spaceBetween={22}
        // slidesPerView={3}
        // onSlideChange={() => {}}
        onSwiper={(swiper) => {
          swiper.slideTo(2, 0, false);
        }}
        centeredSlides={section.layout === "centered"}
        slidesPerView={"auto"}
        className="max-w-screen overflow-hidden"
      >
        {section.cards.map((card, cardIndex) => (
          <SwiperSlide key={card._key || cardIndex} className="!w-fit">
            <PropertyCard property={card} />
          </SwiperSlide>
        ))}
        <SliderControls />
      </Swiper>
    </div>
  );
};

export default CardsSlider;
