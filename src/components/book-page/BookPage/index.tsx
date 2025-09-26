"use client";

import PropertyCard from "@/components/cards/PropertyCard";
import { LogoKta } from "@/components/icons/LogoKta";
import { Button } from "@/components/ui/Button";
import { Col } from "@/components/ui/Col";
import { Row } from "@/components/ui/Row";
import { PropertyQueryResult } from "@/sanity/queries/documents/property";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BookSummary from "../BookSummary";
import PropertyHr from "@/components/property/PropertyHr";
import BookPayment from "../BookPayment";
import BookForm from "../BookForm";
import { mainStringsResolver } from "@/libs/mainStrings";
import { getBookingPrice } from "@/utils/getBookingPrice";
import DepositMessage from "@/components/modals/DepositMessage";
import { RateOutput } from "@/utils/expandRates";

const BookPage = ({
  property,
  priceRate,
  lang,
}: {
  property: PropertyQueryResult;
  priceRate: RateOutput[];
  lang: "pt" | "en";
}) => {
  const { slug, valorCaucao, maxGuests, title } = property;
  const [showDepositModal, setShowDepositModal] = useState<boolean>(false);
  console.log({ property });
  const router = useRouter();
  const propertyUrl = `/${lang}/properties/${slug.current}`;

  // const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useState<URLSearchParams>();
  const [checkInData, setCheckInData] = useState<Date | null>(null);
  const [checkOutData, setCheckOutData] = useState<Date | null>(null);
  const [totalNights, setTotalNights] = useState<number | null>(null);
  const [totalAdults, setTotalAdults] = useState(0);
  const [totalChildren, setTotalChildren] = useState(0);
  const [totalBabies, setTotalBabies] = useState(0);
  const [peopleString, setPeopleString] = useState("");
  const [bookingPrice, setBookingPrice] = useState<number | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);

  const valorCaucaoMoney = valorCaucao
    ? `${valorCaucao.toLocaleString("pt-PT", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      })}`
    : null;

  const bookingPriceMoney = bookingPrice
    ? `${bookingPrice.toLocaleString("pt-PT", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      })}`
    : null;

  const pricePerNight =
    bookingPrice && totalNights ? bookingPrice / totalNights : null;
  const pricePerNightMoney = pricePerNight
    ? `${pricePerNight.toLocaleString("pt-PT", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      })}`
    : null;

  useEffect(() => {
    const windowSearchParams = new URLSearchParams(window.location.search);
    setSearchParams(windowSearchParams);

    const checkInParam = windowSearchParams.get("checkIn");
    const checkOutParam = windowSearchParams.get("checkOut");
    if (checkInParam) {
      const parsedCheckIn = new Date(checkInParam);
      if (!isNaN(parsedCheckIn.getTime())) {
        setCheckInData(parsedCheckIn);
      }
    }
    if (checkOutParam) {
      const parsedCheckOut = new Date(checkOutParam);
      if (!isNaN(parsedCheckOut.getTime())) {
        setCheckOutData(parsedCheckOut);
      }
    }
    if (checkInParam && checkOutParam) {
      const timeDiff = Math.abs(
        new Date(checkOutParam).getTime() - new Date(checkInParam).getTime()
      );
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setTotalNights(diffDays);
    }
    const adultsParam = windowSearchParams.get("adults");
    const childrenParam = windowSearchParams.get("children");
    const babiesParam = windowSearchParams.get("babies");
    setTotalAdults(adultsParam ? parseInt(adultsParam) : 0);
    setTotalChildren(childrenParam ? parseInt(childrenParam) : 0);
    setTotalBabies(babiesParam ? parseInt(babiesParam) : 0);
  }, []);

  useEffect(() => {
    if (!checkInData || !checkOutData) return;

    // Calculate booking price
    const totalPrice = getBookingPrice(
      checkInData,
      checkOutData,
      priceRate,
      lang
    );
    setBookingPrice(
      totalPrice?.reason ? null : (totalPrice.totalPrice ?? null)
    );
    setBookingError(totalPrice?.reason ?? null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkInData, checkOutData]);

  useEffect(() => {
    if (totalAdults + totalChildren > maxGuests) {
      setTotalAdults(maxGuests);
      setTotalChildren(0);
    }

    setPeopleString(
      `${totalAdults} ${mainStringsResolver("adults", lang)} + 
      ${totalChildren} ${mainStringsResolver("children", lang)} + 
      ${totalBabies} ${mainStringsResolver("babies", lang)}`
    );
  }, [maxGuests, totalAdults, totalChildren, totalBabies]);

  const spaceStyles = `my-12`;

  useEffect(() => {
    const windowSearchParams = new URLSearchParams(window.location.search);
    setSearchParams(windowSearchParams);
  }, []);

  return (
    <div className="z-60 bg-sand min-h-screen pb-20">
      <Row>
        <Col className="w-full">
          <div className="relative my-10 text-center tablet:text-left">
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
              lang={lang}
              bookingPriceMoney={bookingPriceMoney}
              checkInData={checkInData}
              checkOutData={checkOutData}
              pricePerNightMoney={pricePerNightMoney}
              totalNights={totalNights}
              valorCaucaoMoney={valorCaucaoMoney}
              peopleString={peopleString}
              setShowDepositModal={setShowDepositModal}
            />
          </div>

          <PropertyHr />

          <div className={spaceStyles}>
            <h3 className="body-l mb-10">
              {mainStringsResolver("payment_terms", lang)}
            </h3>

            <BookPayment
              totalPrice={bookingPrice}
              depositValue={valorCaucao}
              setShowDepositModal={setShowDepositModal}
              lang={lang}
            />
          </div>

          <PropertyHr />

          <div className={spaceStyles}>
            <h3 className="body-l mb-10">
              {mainStringsResolver("personal_details", lang)}
            </h3>

            <BookForm
              propertyName={title}
              bookingPriceMoney={bookingPriceMoney}
              checkInData={checkInData}
              checkOutData={checkOutData}
              totalNights={totalNights}
              valorCaucaoMoney={valorCaucaoMoney}
              peopleString={peopleString}
              lang={lang}
            />
          </div>
        </Col>
      </Row>

      <DepositMessage
        lang={lang}
        setShowModal={setShowDepositModal}
        showModal={showDepositModal}
      />
    </div>
  );
};

export default BookPage;
