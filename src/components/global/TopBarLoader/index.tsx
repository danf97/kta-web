"use client";

import { AppContext } from "@/app/context/AppContext";
import { useContext, useEffect, useState } from "react";

const TopBarLoader = () => {
  const { pageLoading } = useContext(AppContext);
  const [width, setWidth] = useState("0%");
  const [forceHide, setForceHide] = useState(false);

  useEffect(() => {
    setForceHide(false);

    if (!pageLoading) {
      setWidth("100%");

      setTimeout(() => {
        setWidth("0");
      }, 300);
    } else {
      setWidth("0");
      setTimeout(() => {
        setWidth("90%");
      }, 10);
    }

    if (pageLoading) {
      setTimeout(() => {
        setForceHide(true);
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageLoading]);

  return (
    <div
      className={`fixed w-full top-0 left-0 z-[999] transition-opacity duration-200 ${pageLoading && !forceHide ? "opacity-100" : "opacity-0 delay-200 "}`}
    >
      <div
        className={`relative h-[3px] bg-black transition-[width] pointer-events-none ${pageLoading && !forceHide ? "duration-[2s] opacity-100" : "duration-200 w-full "} `}
        style={{ width: width }}
      />
    </div>
  );
};

export default TopBarLoader;
