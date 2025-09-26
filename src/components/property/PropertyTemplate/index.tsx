"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Row } from "@/components/ui/Row";
import { Col } from "@/components/ui/Col";
import { PropertyQueryResult } from "@/sanity/queries/documents/property";
import PropertyIconSummary from "../PropertyIconSummary";
import PropertyDescription from "../PropertyDescription";
import PropertyHr from "../PropertyHr";
import PropertyPhotos from "../PropertyPhotos";
import PropertyFacilities from "../PropertyFacilities";
import PropertyLocation from "../PropertyLocation";
import PropertyImportantDetails from "../PropertyImportantDetails";
import { Button } from "@/components/ui/Button";
import { mainStringsResolver } from "@/libs/mainStrings";
import PropertyBooking from "../PropertyBooking";
import { RateOutput } from "@/utils/expandRates";

const PropertyTemplate = ({
  property,
  priceRate,
}: {
  property: PropertyQueryResult;
  priceRate: RateOutput[];
}) => {
  console.log({ property });
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
    // Photos
    photos,
    // Facilities
    mainFacilities,
    facilities,
    // Location
    map,
    closeBy,
    // Rules
    checkinHour,
    checkoutEnd,
    checkoutStart,
    childrenWelcome,
    holdParties,
    otherRules,
    petsAllowed,
    smokingAllowed,
    useDefaultRules,
    defaultRules,
    valorCaucao,
    checkInGreenTime,
    checkInOrangeTime,
    checkInRedTime,
    checkOutTime,
  } = property;

  const rules = {
    valorCaucao,
    checkinHour,
    checkoutEnd,
    checkoutStart,
    childrenWelcome,
    holdParties,
    otherRules,
    petsAllowed,
    smokingAllowed,
    useDefaultRules,
    defaultRules,
    checkInGreenTime,
    checkInOrangeTime,
    checkInRedTime,
    checkOutTime,
  };

  const spaceStyles = `my-12`;

  const [photoSliderIsOpen, setPhotoSliderIsOpen] = useState(false);

  const togglePhotoSlider = () => {
    setPhotoSliderIsOpen((prev) => !prev);
  };

  const [activeSection, setActiveSection] = useState("");

  const activeSectionHandler = (section: string) => {
    setActiveSection(section);
    const sectionElement = document.getElementById(section);
    const sectionElementTop = (sectionElement?.offsetTop || 0) - (76 + 48);
    if (sectionElement) {
      window.scrollTo({
        top: sectionElementTop,
        behavior: "smooth",
      });
    }
  };

  // Track scroll to change active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 76 + 48 + 1; // +1 to avoid edge case

      const sections = [
        "start",
        "overview",
        "photos",
        "facilities",
        "location",
        "important-details",
      ];

      let currentSection = "";

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionElement = document.getElementById(section);
        if (sectionElement) {
          const sectionTop = sectionElement.offsetTop;
          if (scrollPosition >= sectionTop) {
            currentSection = section;
          }
        }
      }

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-sand z-[1] relative">
      <div
        id="start"
        className="relative h-screen border-b border-black overflow-hidden w-full"
      >
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

      <div className="h-[76px] border-b border-black flex items-center justify-center sticky top-0 z-[2] bg-sand overflow-auto">
        <Row>
          <Col className="w-full">
            <nav>
              <ul className="flex">
                <li>
                  <Button
                    className="w-max"
                    type="ghost"
                    label={mainStringsResolver("Overview", lang)}
                    state={activeSection === "overview" ? "active" : "idle"}
                    onClick={() => activeSectionHandler("overview")}
                  />
                </li>
                <li>
                  <Button
                    className="w-max"
                    type="ghost"
                    label={mainStringsResolver("Photos", lang)}
                    state={activeSection === "photos" ? "active" : "idle"}
                    onClick={() => activeSectionHandler("photos")}
                  />
                </li>
                <li>
                  <Button
                    className="w-max"
                    type="ghost"
                    label={mainStringsResolver("facilities", lang)}
                    state={activeSection === "facilities" ? "active" : "idle"}
                    onClick={() => activeSectionHandler("facilities")}
                  />
                </li>
                <li>
                  <Button
                    className="w-max"
                    type="ghost"
                    label={mainStringsResolver("location", lang)}
                    state={activeSection === "location" ? "active" : "idle"}
                    onClick={() => activeSectionHandler("location")}
                  />
                </li>
                <li>
                  <Button
                    className="w-max"
                    type="ghost"
                    label={mainStringsResolver("Important Details", lang)}
                    state={
                      activeSection === "important-details" ? "active" : "idle"
                    }
                    onClick={() => activeSectionHandler("important-details")}
                  />
                </li>
              </ul>
            </nav>
          </Col>
        </Row>
      </div>

      <Row>
        <Col className="w-full smallDesktop:w-7/12">
          <div className={spaceStyles} id="overview">
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

          <PropertyHr />

          <div className={spaceStyles} id="photos">
            <PropertyPhotos
              photos={photos}
              lang={lang}
              photoSliderIsOpen={photoSliderIsOpen}
              togglePhotoSlider={togglePhotoSlider}
            />
          </div>

          <PropertyHr />

          <div className={spaceStyles} id="facilities">
            <PropertyFacilities
              mainFacilities={mainFacilities}
              facilities={facilities}
              lang={lang}
            />
          </div>

          <PropertyHr />

          <div className={spaceStyles} id="location">
            <PropertyLocation map={map} closeBy={closeBy} lang={lang} />
          </div>

          <PropertyHr />

          <div className={spaceStyles} id="important-details">
            <PropertyImportantDetails rules={rules} lang={lang} />
          </div>
        </Col>

        <Col className="w-full pb-12 smallDesktop:w-5/12 smallDesktop:pl-8 sticky top-[76px] self-start smallDesktop:py-12 smallDesktop:max-w-[408px] ml-auto">
          <div>
            <PropertyBooking
              slug={slug}
              priceRate={priceRate}
              maxGuests={maxGuests}
              lang={lang}
            />
          </div>

          <div className="border border-black rounded-3xl p-6 bg-sand-light mt-10">
            <h2 className="body-xl mb-6">
              {mainStringsResolver("Entre em contacto", lang)}
            </h2>
            <p>{mainStringsResolver("contact message", lang)}</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Button
                type="primary"
                label={"WhatsApp"}
                size="medium"
                onClick={() => {
                  window.open("https://wa.me/351966367564", "_blank");
                }}
              />
              <Button
                type="primary"
                label={"+351 966 367 564"}
                size="medium"
                onClick={() => {
                  window.open("tel:00351966367564", "_blank");
                }}
              />
              <Button
                type="primary"
                label={"info@keystoalgarve.com"}
                size="medium"
                onClick={() => {
                  window.open("mailto:info@keystoalgarve.com", "_blank");
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PropertyTemplate;
