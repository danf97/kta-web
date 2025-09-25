"use client";

import { Button } from "@/components/ui/Button";
import { use, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { addDays, subDays } from "date-fns";
import { PropertyQueryResult } from "@/sanity/queries/documents/property";
import { getBookingPrice } from "@/utils/getBookingPrice";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

import "react-datepicker/dist/react-datepicker.css";
import "./styles.scss";

const PropertyBooking = ({
  slug,
  pricingTable,
  maxGuests,
}: {
  slug: string;
  pricingTable: PropertyQueryResult["pricingTable"];
  maxGuests: number;
}) => {
  const router = useRouter();
  const [checkInData, setCheckInData] = useState<Date | null>(null);
  const [checkOutData, setCheckOutData] = useState<Date | null>(null);
  const [totalNights, setTotalNights] = useState<number | null>(null);
  const [bookingPrice, setBookingPrice] = useState<number | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // const serviceFee = bookingPrice ? bookingPrice * 0.03 : null;
  // const serviceFeeMoney = serviceFee
  //   ? `${serviceFee.toLocaleString("pt-PT", {
  //       style: "currency",
  //       currency: "EUR",
  //       maximumFractionDigits: 0,
  //     })}`
  //   : null;

  useEffect(() => {
    if (!checkInData || !checkOutData) return;

    // Calculate total nights
    const diffTime = Math.abs(checkOutData.getTime() - checkInData.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setTotalNights(diffDays);

    // Calculate booking price
    const totalPrice = getBookingPrice(checkInData, checkOutData, pricingTable);
    setBookingPrice(totalPrice?.error ? null : (totalPrice.totalPrice ?? null));
    setBookingError(totalPrice?.error ?? null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkInData, checkOutData]);

  // Person selector
  const [personSelectorIsOpen, setPersonSelectorIsOpen] = useState(false);
  const [totalAdults, setTotalAdults] = useState(2);
  const [totalChildren, setTotalChildren] = useState(0);
  const [totalBabies, setTotalBabies] = useState(0);

  const handleSubmit = () => {
    // Handle booking submission logic here
    console.log("Booking submitted");
    setIsSubmitting(true);

    router.push(
      `/properties/${slug}/book?checkIn=${checkInData?.toISOString()}&checkOut=${checkOutData?.toISOString()}&adults=${totalAdults}&children=${totalChildren}&babies=${totalBabies}`
    );
  };

  // Click outside to close person selector
  useEffect(() => {
    if (personSelectorIsOpen === false) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".person-selector")) {
        setPersonSelectorIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [personSelectorIsOpen]);

  return (
    <div className="border border-black rounded-3xl p-6 bg-white">
      <div className="mb-5">
        {bookingPrice ? (
          <>
            <span className="body-l">{pricePerNightMoney}</span>/night
          </>
        ) : (
          <span className="body-l">Get an estimate</span>
        )}
      </div>

      <div className="relative flex flex-row flex-wrap gap-4 z-[2]">
        <div className="flex flex-col bg-gray-100 rounded-2xl p-3 flex-1">
          <div className="body-xxs-bold uppercase mb-2">Check-in</div>
          <div className="body-16 bold text-black">
            {!checkInData && <span className="absolute ">Pick a date</span>}
            <div className="kta-datepicker">
              <DatePicker
                name="check-in"
                dateFormat="dd/MM/yyyy"
                selected={checkInData}
                onChange={(date) => setCheckInData(date)}
                excludeDateIntervals={[
                  {
                    start: subDays(new Date(), 365),
                    end: addDays(new Date(), 6),
                  },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-2xl p-3 flex-1">
          <div className="body-xxs-bold uppercase mb-2">Check-out</div>
          <div className="body-16 bold text-black">
            {!checkOutData && <span className="absolute ">Pick a date</span>}
            <div className="kta-datepicker">
              <DatePicker
                name="check-out"
                dateFormat="dd/MM/yyyy"
                selected={checkOutData}
                onChange={(date) => setCheckOutData(date)}
                excludeDateIntervals={[
                  {
                    start: subDays(new Date(), 365),
                    end: checkInData ? new Date(checkInData) : new Date(),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {bookingError && (
        <div className="body-xs my-4">
          {/* <p>Please note:</p> */}
          <ul className="list-disc ml-5">
            <li>{bookingError}</li>
          </ul>
        </div>
      )}

      <div className="relative mt-4">
        <button
          className={`w-full text-left cursor-pointer p-3 flex-1 border ${personSelectorIsOpen ? "rounded-t-2xl bg-white border-gray-300" : "rounded-2xl bg-gray-100 border-gray-100"}`}
          onClick={() => setPersonSelectorIsOpen(!personSelectorIsOpen)}
        >
          <div className="body-xxs-bold uppercase mb-2">Total of guests</div>
          <div className="body-16 bold">
            {totalAdults} Adults + {totalChildren} Children + {totalBabies}{" "}
            Babies
          </div>
        </button>

        <div
          className={`
            person-selector absolute top-[calc(100%-13px)] p-3 z-[2] w-full bg-white border-b border-x border-gray-300 rounded-b-2xl shadow-lg
            ${personSelectorIsOpen ? "block" : "hidden"}
          `}
        >
          <span className="block border-gray-300 border-b" />

          <div className="flex flex-row justify-between items-center mb-3 mt-3">
            <div>Adults</div>
            <div className="flex">
              <Button
                type="secondary"
                size="icon"
                leftIcon={<MinusIcon className="w-3" />}
                onClick={() =>
                  setTotalAdults((prev) => (prev > 1 ? prev - 1 : prev))
                }
              />
              <span className="w-10 flex justify-center items-center">
                {totalAdults}
              </span>
              <Button
                type="secondary"
                size="icon"
                leftIcon={<PlusIcon className="w-3" />}
                onClick={() =>
                  setTotalAdults((prev) =>
                    prev + 1 <= maxGuests - totalChildren ? prev + 1 : prev
                  )
                }
              />
            </div>
          </div>

          <div className="flex flex-row justify-between items-center mb-3 mt-3">
            <div>Children</div>
            <div className="flex">
              <Button
                type="secondary"
                size="icon"
                leftIcon={<MinusIcon className="w-3" />}
                onClick={() =>
                  setTotalChildren((prev) => (prev > 0 ? prev - 1 : prev))
                }
              />
              <span className="w-10 flex justify-center items-center">
                {totalChildren}
              </span>
              <Button
                type="secondary"
                size="icon"
                leftIcon={<PlusIcon className="w-3" />}
                onClick={() =>
                  setTotalChildren((prev) =>
                    prev + 1 <= maxGuests - totalAdults ? prev + 1 : prev
                  )
                }
              />
            </div>
          </div>

          <div className="flex flex-row justify-between items-center mb-3 mt-3">
            <div>Babies</div>
            <div className="flex">
              <Button
                type="secondary"
                size="icon"
                leftIcon={<MinusIcon className="w-3" />}
                onClick={() =>
                  setTotalBabies((prev) => (prev > 0 ? prev - 1 : prev))
                }
              />
              <span className="w-10 flex justify-center items-center">
                {totalBabies}
              </span>
              <Button
                type="secondary"
                size="icon"
                leftIcon={<PlusIcon className="w-3" />}
                onClick={() => setTotalBabies((prev) => prev + 1)}
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Button
              className=""
              type="secondary"
              label="Close"
              onClick={() => setPersonSelectorIsOpen(false)}
            />
          </div>
        </div>
      </div>

      <div className={`my-8 ${!bookingPrice ? "hidden" : "block"}`}>
        <div className="body-xxs-bold uppercase mb-4">Detaild Price</div>

        <ul className="body-16 mt-2">
          <li className="flex flex-row justify-between gap-2 mb-2">
            <span>Bed sheets and towels</span>
            <span>Included</span>
          </li>
          <li className="flex flex-row justify-between gap-2 mb-2">
            <span>
              {pricePerNightMoney} x {totalNights} nights
            </span>
            <span>{bookingPriceMoney}</span>
          </li>
          <li className="flex flex-row justify-between gap-2 mb-2">
            <span>Turistic fee</span>
            <span>200€</span>
          </li>
          <li className="flex flex-row justify-between gap-2 mt-4 body-16-bold">
            <span>Total</span>
            <span>{bookingPriceMoney}</span>
          </li>
        </ul>
      </div>

      {checkInData && checkOutData && (
        <>
          <div className="z-[1] mt-6">
            <Button
              className="w-full"
              type="primary"
              label={bookingPrice ? "Request a booking" : "Request an estimate"}
              state={"idle"}
              onClick={() => {
                handleSubmit();
              }}
              isLoading={isSubmitting}
            />
          </div>

          <div className={`mt-4 ${!bookingPrice ? "hidden" : "block"}`}>
            <p className="body-xs text-center">
              You won&apos;t be charged yet. All bookings are subject to
              availability and confirmation.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyBooking;
