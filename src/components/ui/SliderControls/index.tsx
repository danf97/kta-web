"use client";

import React, { useEffect, useState } from "react";
import { useSwiper } from "swiper/react";
import { Button } from "../Button";
import ArrowLeftIcon from "@heroicons/react/24/outline/ArrowLeftIcon";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const SliderControls = () => {
  const swiper = useSwiper();

  const [disableSlider, setDisableSlider] = useState<boolean>(
    swiper.isBeginning && swiper.isEnd
  );
  const [allowSlidePrev, setAllowSlidePrev] = useState<boolean>(
    !swiper.isBeginning
  );
  const [allowSlideNext, setAllowSlideNext] = useState<boolean>(!swiper.isEnd);

  useEffect(() => {
    updateSliderControls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swiper]);

  const updateSliderControls = () => {
    setTimeout(() => {
      setDisableSlider(swiper.isBeginning && swiper.isEnd);
      setAllowSlidePrev(!swiper.isBeginning);
      setAllowSlideNext(!swiper.isEnd);
    }, 200);
  };

  if (disableSlider) {
    return <></>;
  }

  return (
    <div className="flex items-center mt-dim_6 justify-center">
      <Button
        type="primary"
        size="icon"
        state={allowSlidePrev ? "idle" : "disabled"}
        onClick={() => {
          updateSliderControls();
          swiper.slidePrev();
        }}
        leftIcon={<ArrowLeftIcon />}
      />
      <div className="pl-1" />
      <Button
        type="primary"
        size="icon"
        state={allowSlideNext ? "idle" : "disabled"}
        onClick={() => {
          updateSliderControls();
          swiper.slideNext();
        }}
        leftIcon={<ArrowRightIcon />}
      />
    </div>
  );
};

export default SliderControls;
