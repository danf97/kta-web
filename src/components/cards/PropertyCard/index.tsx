"use client";

import { PropertyCardType } from "@/sanity/queries/sections/cards-slider";
import Image from "next/image";
import Link from "next/link";

const PropertyCard = ({ property }: { property: PropertyCardType }) => {
  const { title, mainImage, maxGuests, wc, bedrooms, slug } = property;

  console.log("PropertyCard property:", property);
  if (!mainImage || !mainImage.url) {
    return <div>Missing image</div>; // Handle case where mainImage is not available
  }

  return (
    <Link
      href={`/property/${slug.current}`}
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
            <p className="card-caps pb-2">Armação de Pêra &#x2022; Villa</p>
            <h2 className="body-l">{title}</h2>
          </div>
          <div>
            <p className="body-xs pb-1">
              {maxGuests} guests &#x2022; {bedrooms} dedrooms &#x2022; {wc} wc
            </p>
            <ul className="body-xs flex flex-wrap">
              {property.mainFacilities.map((facility, index) => (
                <li key={index} className="inline-block pb-1">
                  {facility.featureType}
                  {index === property.mainFacilities.length - 1 ? (
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
              159€<span className="body-xs">/night</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
