"use client";

import PropertyCard from "@/components/cards/PropertyCard";
import { LogoKta } from "@/components/icons/LogoKta";
import { Button } from "@/components/ui/Button";
import { Col } from "@/components/ui/Col";
import { Row } from "@/components/ui/Row";
import { PropertyQueryResult } from "@/sanity/queries/documents/property";
import { getBookingPrice } from "@/utils/getBookingPrice";
import { ArrowRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BookSummary from "../BookSummary";
import PropertyHr from "@/components/property/PropertyHr";
import BookPayment from "../BookPayment";
import BookForm from "../BookForm";
import { mainStringsResolver } from "@/libs/mainStrings";

const BookPage = ({
  property,
  lang,
}: {
  property: PropertyQueryResult;
  lang: "pt" | "en";
}) => {
  const { slug, valorCaucao } = property;
  console.log({ property });
  const router = useRouter();
  const propertyUrl = `/${lang}/properties/${slug.current}`;
  const [searchParams, setSearchParams] = useState<URLSearchParams>();

  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  const spaceStyles = `my-12`;

  useEffect(() => {
    const windowSearchParams = new URLSearchParams(window.location.search);
    setSearchParams(windowSearchParams);
  }, []);

  return (
    <div className="z-60 bg-sand min-h-screen text-center tablet:text-left pb-20">
      <Row>
        <Col className="w-full">
          <div className="relative my-10">
            <Button
              className="mt-20 tablet:mt-0"
              type="secondary"
              label={mainStringsResolver("back", lang)}
              leftIcon={<ChevronLeftIcon className="w-5" />}
              onClick={() =>
                router.push(propertyUrl + `?${searchParams?.toString()}`)
              }
            />

            <div className="absolute left-1/2 top-0 -translate-x-1/2 p-2">
              <LogoKta className="h-6 w-auto" />
            </div>
          </div>
        </Col>
      </Row>

      <Row className="justify-between">
        <Col className="mx-auto w-full smallDesktop:w-9/12 desktop:w-8/12">
          <h2 className="h6 mt-20">
            {mainStringsResolver("booking_request", lang)}
          </h2>

          <div className="py-10">
            <PropertyCard property={property} width="horizontal" />
          </div>

          <div className={spaceStyles}>
            <h3 className="body-l my-10">
              {mainStringsResolver("summary", lang)}
            </h3>
            <BookSummary
              property={property}
              setTotalPrice={setTotalPrice}
              lang={lang}
            />
          </div>

          <PropertyHr />

          <div className={spaceStyles}>
            <h3 className="body-l mb-10">
              {mainStringsResolver("payment_terms", lang)}
            </h3>

            <BookPayment
              totalPrice={totalPrice}
              depositValue={valorCaucao}
              lang={lang}
            />
          </div>

          <PropertyHr />

          <div className={spaceStyles}>
            <h3 className="body-l mb-10">
              {mainStringsResolver("personal_details", lang)}
            </h3>

            <BookForm lang={lang} />
          </div>
        </Col>

        {/* <Col className="w-4/12 hidden smallDesktop:block">
          <div className="sticky top-20 pb-20">
            <PropertyCard property={property} width="card" />
          </div>
        </Col> */}
      </Row>
    </div>
  );
};

export default BookPage;
