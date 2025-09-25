"use client";

import { PropertyQueryResult } from "@/sanity/queries/documents/property";
import { PropertyCardType } from "@/sanity/queries/objects/propertyCardObject";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const PropertyCard = ({
  property,
  width = "card",
}: {
  property: PropertyCardType | PropertyQueryResult;
  width?: "full" | "card" | "horizontal";
}) => {
  const {
    title,
    mainImage,
    maxGuests,
    wc,
    bedrooms,
    slug,
    fromPrice,
    mainFacilities,
    propertyLocation,
    propertyType,
  } = property;

  const fromPriceMoney = fromPrice?.toLocaleString("pt-PT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  const bulletsRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (bulletsRef.current) {
      const listItems = bulletsRef.current.children;

      let lastTopHeight: number | null = null;
      let lastItem: Element | null = null;

      Array.from(listItems).forEach((item) => {
        const itemTop = item.getBoundingClientRect().top;

        if (lastTopHeight === null) {
          lastTopHeight = itemTop;
        } else {
          const diff = itemTop - lastTopHeight;

          if (diff > 0) {
            // find span and do opacity 0
            const span = lastItem?.querySelector("span");
            if (span) {
              span.style.opacity = "0";
            }
          }

          lastItem = item;
          lastTopHeight = itemTop;
        }
      });
    }
  }, [bulletsRef]);

  if (!mainImage || !mainImage.url) {
    return <div>Missing image</div>; // Handle case where mainImage is not available
  }

  const Component = width === "horizontal" ? "div" : Link;

  return (
    <Component
      href={`/properties/${slug.current}`}
      className={`flex bg-sand-light border border-black rounded-3xl overflow-hidden text-left
        ${width === "full" || width === "horizontal" ? "w-full" : "w-[298px]"}
        ${width === "horizontal" ? "" : "hover:bg-sand-dark"}
      `}
      target="_blank"
    >
      <div
        className={`flex w-full ${width === "horizontal" ? "flex-col tablet:flex-row" : "flex-col"}`}
      >
        <Image
          src={mainImage.url}
          alt={title}
          width={310}
          height={208}
          className={`
            object-cover border-black 
            ${
              width === "horizontal"
                ? "border-b rounded-b-3xl w-full tablet:w-auto tablet:border-b-0 tablet:h-full tablet:border-r tablet:rounded-r-3xl"
                : "border-b rounded-b-3xl w-full"
            }
          `}
        />

        <div className="p-5 gap-6 flex flex-col flex-1">
          <div>
            <p className="card-caps pb-2">
              {propertyLocation} &#x2022; {propertyType}
            </p>
            <h2 className="body-l">{title}</h2>
          </div>
          <div>
            <p className="body-xs pb-1">
              {maxGuests} guests &#x2022; {bedrooms} bedrooms &#x2022; {wc} wc
            </p>
            <ul className="body-xs flex flex-wrap" ref={bulletsRef}>
              {mainFacilities?.slice(0, 6).map((facility, index) => (
                <li key={index} className="inline-block pb-1 group">
                  {facility.featureType}
                  {index === mainFacilities.length - 1 ? (
                    ""
                  ) : (
                    <span className="px-1 group-[:last-of-type]:hidden">
                      &#x2022;
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {width !== "horizontal" && (
            <div className="mt-auto">
              <p className="card-caps pb-2">Starting from</p>
              <p className="body-l">
                {fromPriceMoney}
                <span className="body-xs">/night</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </Component>
  );
};

export default PropertyCard;
