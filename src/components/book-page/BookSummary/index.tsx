import { mainStringsResolver } from "@/libs/mainStrings";
import { PropertyQueryResult } from "@/sanity/queries/documents/property";
import { getBookingPrice } from "@/utils/getBookingPrice";
import {
  ArrowRightIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const BookSummary = ({
  property,
  setTotalPrice,
  lang,
}: {
  property: PropertyQueryResult;
  setTotalPrice: (price: number | null) => void;
  lang: "pt" | "en";
}) => {
  const { slug, pricingTable, valorCaucao, maxGuests } = property;
  const [searchParams, setSearchParams] = useState<URLSearchParams>();
  const [checkInData, setCheckInData] = useState<Date | null>(null);
  const [checkOutData, setCheckOutData] = useState<Date | null>(null);
  const [totalNights, setTotalNights] = useState<number | null>(null);
  const [totalAdults, setTotalAdults] = useState(0);
  const [totalChildren, setTotalChildren] = useState(0);
  const [totalBabies, setTotalBabies] = useState(0);
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
    const totalPrice = getBookingPrice(checkInData, checkOutData, pricingTable);
    setBookingPrice(totalPrice?.error ? null : (totalPrice.totalPrice ?? null));
    setTotalPrice(totalPrice?.error ? null : (totalPrice.totalPrice ?? null));
    setBookingError(totalPrice?.error ?? null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkInData, checkOutData]);

  useEffect(() => {
    if (totalAdults + totalChildren > maxGuests) {
      setTotalAdults(maxGuests);
      setTotalChildren(0);
    }
  }, [maxGuests, totalAdults, totalChildren]);

  return (
    <div className="relative grid grid-cols-2 gap-24 mt-10">
      <div>
        <div className="relative flex items-center justify-between mb-9">
          <div className="">
            <div className="body-xxs-bold uppercase mb-2">Check-in</div>

            <div className="body-16 bold text-black">
              <span>
                {checkInData
                  ? checkInData.toLocaleDateString("pt-PT", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : ""}
              </span>
            </div>
          </div>

          <span className="mx-4">
            <ArrowRightIcon className="w-6" />
          </span>

          <div className="">
            <div className="body-xxs-bold uppercase mb-2">Check-out</div>
            <div className="body-16 bold text-black">
              <span>
                {checkOutData
                  ? checkOutData.toLocaleDateString("pt-PT", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : ""}
              </span>
            </div>
          </div>
        </div>
        <div className="mb-9">
          <div className="flex-1">
            <div className="body-xxs-bold uppercase mb-2">
              {mainStringsResolver("total_of_nights", lang)}
            </div>

            <div className="body-16 bold text-black">
              <span>
                {totalNights
                  ? `${totalNights}  ${mainStringsResolver("nights", lang)}`
                  : ""}
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex-1">
            <div className="body-xxs-bold uppercase mb-2">
              {mainStringsResolver("total_of_guests", lang)}
            </div>

            <div className="body-16 bold text-black">
              <span>
                {totalAdults} {mainStringsResolver("adults", lang)} +{" "}
                {totalChildren} {mainStringsResolver("children", lang)} +{" "}
                {totalBabies} {mainStringsResolver("babies", lang)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <span className="absolute left-1/2 top-0 h-full border-r " />

      <div>
        <div>
          <div className="body-xxs-bold uppercase mb-4">
            {mainStringsResolver("detaild_price", lang)}
          </div>

          <ul className="body-16 mt-2">
            <li className="flex flex-row justify-between gap-2 mb-2">
              <span>{mainStringsResolver("bed_sheets_towels", lang)}</span>
              <span>{mainStringsResolver("included", lang)}</span>
            </li>
            <li className="flex flex-row justify-between gap-2 mb-2">
              <span>
                {pricePerNightMoney} x {totalNights}{" "}
                {mainStringsResolver("nights", lang)}
              </span>
              <span>{bookingPriceMoney}</span>
            </li>
            <li className="flex flex-row justify-between gap-2 mt-4 body-16-bold">
              <span>Total</span>
              <span>{bookingPriceMoney}</span>
            </li>
            {valorCaucaoMoney && (
              <li className="flex flex-row justify-between gap-2 mt-4 body-16">
                <span>
                  {mainStringsResolver("deposit", lang)}{" "}
                  <InformationCircleIcon className="w-5 inline-block ml-1" />
                </span>

                <span>{valorCaucaoMoney}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookSummary;
