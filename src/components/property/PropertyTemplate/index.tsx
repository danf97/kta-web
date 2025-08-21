"use client";

import { Row } from "@/components/ui/Row";

import { Col } from "@/components/ui/Col";
import { Button } from "@/components/ui/Button";
import { pageHeadObjectType } from "@/sanity/queries/objects/pageHeadObject";
import { PropertyQueryResult } from "@/sanity/queries/documents/property";
import Image from "next/image";
import PropertyIconSummary from "../PropertyIconSummary";
import PropertyDescription from "../PropertyDescription";

const PropertyTemplate = ({ property }: { property: PropertyQueryResult }) => {
  const {
    // Meta
    meta: { slug, lang },
    // Main
    title,
    mainImage,
    propertyLocation,
    propertyType,
    // Overview
    maxGuests,
    wc,
    singleBeds,
    doubleBeds,
    bedrooms,
    sofaBeds,
    mainDescription,
    fullDescription,
    license,
  } = property;

  const spaceStyles = `my-12`;

  return (
    <div className="bg-sand z-[1] relative h-[500vh]">
      <div className="relative h-screen border-b border-black">
        <div className="absolute top-0 left-0 leading-0 w-[calc(100vw+4px)] h-full pointer-events-none z-[-1]">
          {mainImage?.url ? (
            <Image
              alt=""
              src={mainImage?.url}
              width={2048}
              height={1040}
              sizes="100vw"
              className="absolute leading-0 top-0 left-0 w-full h-full object-cover"
            />
          ) : null}
          <div className="bg-sand w-full h-[10%] absolute left-0 top-0" />
          <div className="bg-linear-to-t from-transparent to-sand w-full h-[70%] absolute top-[10%]" />

          <Row className="relative justify-center pt-56 z-[1]">
            <Col className="w-full text-center">
              <h1>{title}</h1>
              <p className="body-s uppercase">
                {propertyLocation} &#x2022; {propertyType}
              </p>
            </Col>
          </Row>
        </div>
      </div>

      <div className="h-[76px] border-b border-black flex items-center justify-center sticky top-0">
        <Row>
          <Col className="w-full">
            <nav>
              <ul className="flex gap-4">
                <li>
                  <a href="#">Link 1</a>
                </li>
                <li>
                  <a href="#">Link 2</a>
                </li>
                <li>
                  <a href="#">Link 3</a>
                </li>
                <li>
                  <a href="#">Link 3</a>
                </li>
                <li>
                  <a href="#">Link 3</a>
                </li>
                <li>
                  <a href="#">Link 3</a>
                </li>
              </ul>
            </nav>
          </Col>
        </Row>
      </div>

      <Row>
        <Col className="w-7/12">
          <div className={spaceStyles}>
            <PropertyIconSummary
              maxGuests={maxGuests}
              wc={wc}
              singleBeds={singleBeds}
              doubleBeds={doubleBeds}
              bedrooms={bedrooms}
              sofaBeds={sofaBeds}
              lang={lang}
            />
          </div>
          <div className={spaceStyles}>
            <PropertyDescription
              mainDescription={mainDescription}
              fullDescription={fullDescription}
              license={license}
              lang={lang}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PropertyTemplate;
