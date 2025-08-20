"use client";

import { PropertyCardType } from "@/sanity/queries/objects/propertyCardObject";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const PropertyCard = ({ property }: { property: PropertyCardType }) => {
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

  if (!mainImage || !mainImage.url) {
    return <div>Missing image</div>; // Handle case where mainImage is not available
  }

  const fromPriceMoney = fromPrice.toLocaleString("pt-PT", {
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

      Array.from(listItems).forEach((item, index) => {
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

  return (
    <Link
      href={`/properties/${slug.current}`}
      className="bg-sand-light block w-[298px] border border-black rounded-3xl overflow-hidden hover:bg-sand-dark"
    >
      <div className="flex flex-col">
        <Image
          src={mainImage.url}
          alt={title}
          width={298}
          height={194}
          className="rounded-b-3xl object-cover border-b border-black"
        />

        <div className="p-5 gap-6 flex flex-col">
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
              {mainFacilities.map((facility, index) => (
                <li key={index} className="inline-block pb-1">
                  {facility.featureType}
                  {index === mainFacilities.length - 1 ? (
                    ""
                  ) : (
                    <span className="px-1">&#x2022;</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="card-caps pb-2">Starting from</p>
            <p className="body-l">
              {fromPriceMoney}
              <span className="body-xs">/night</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
