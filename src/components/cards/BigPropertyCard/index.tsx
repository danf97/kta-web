"use client";

import { Button } from "@/components/ui/Button";
import { PropertyCardType } from "@/sanity/queries/objects/propertyCardObject";
import { multilangFieldResolver } from "@/utils/multilangFieldResolver";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const BigPropertyCard = ({
  key,
  property,
  align,
  lang,
}: {
  key: number;
  property: PropertyCardType;
  align: "left" | "right";
  lang: string;
}) => {
  const { title, mainImage, propertyLocation, propertyType, mainDescription } =
    property;

  if (!mainImage || !mainImage.url) {
    return <div>Missing image</div>; // Handle case where mainImage is not available
  }

  return (
    <div className="mt-10" key={key}>
      <div
        className={`flex flex-row min-h-[593px] z-[1] relative overflow-hidden rounded-3xl border border-black ${
          align === "left" ? "" : "justify-end"
        }`}
      >
        <Image
          src={mainImage.url}
          alt={title}
          width={890}
          height={539}
          className={`absolute z-[-1] w-[calc(66.66%+40px)] h-full object-cover top-0 ${
            align === "left" ? "right-0" : "left-0"
          }`}
        />
        <div className="bg-blue-light w-1/3 m-[-1px] rounded-3xl border border-black p-10 flex flex-col justify-between">
          <div>
            <p className="card-caps pb-2 body-xxs">
              {propertyLocation} &#x2022; {propertyType}
            </p>
            <h3 className="h2">{title}</h3>
          </div>

          <div>
            <p className="body-s">
              {multilangFieldResolver(mainDescription, lang)}
            </p>
          </div>

          <div>
            <Button type="primary" size="medium" label="View details" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigPropertyCard;
