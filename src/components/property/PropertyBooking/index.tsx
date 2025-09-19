"use client";

import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { addDays, subDays } from "date-fns";
import { PropertyQueryResult } from "@/sanity/queries/documents/property";
import { getBookingPrice } from "@/utils/getBookingPrice";

import "react-datepicker/dist/react-datepicker.css";
import "./styles.scss";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

const PropertyBooking = ({
  pricingTable,
  maxGuests,
}: {
  pricingTable: PropertyQueryResult["pricingTable"];
  maxGuests: number;
}) => {
  const [checkInData, setCheckInData] = useState<Date | null>(null);
  const [checkOutData, setCheckOutData] = useState<Date | null>(null);
  const [totalNights, setTotalNights] = useState<number | null>(null);
  const [bookingPrice, setBookingPrice] = useState<number | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);

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

  console.log({ checkInData, checkOutData });

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

      <div className="relative flex flex-row gap-4 z-[2]">
        <div className="bg-gray-100 rounded-2xl p-3 flex-1">
          <div className="body-xxs-bold uppercase mb-2">Check-in</div>
          <div className="body-16 bold text-black">
            {!checkInData && <span className="absolute ">Pick a date</span>}
            <div className="kta-datepicker z-[100]">
              <DatePicker
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

      <div className="relative mt-4 mb-6 _z-[1]">
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
            absolute top-[calc(100%-13px)] p-3 z-[2] w-full bg-white border-b border-x border-gray-300 rounded-b-2xl shadow-lg
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
                    prev + 1 <= maxGuests ? prev + 1 : prev
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

      <div className={`${!bookingPrice ? "hidden" : "block"}`}>
        <div className="body-xxs-bold uppercase mb-4">Detaild Price</div>

        <ul className="body-16 mt-2 mb-4 ">
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

      <div className={`mb-4 ${!bookingPrice ? "hidden" : "block"}`}>
        <p className="body-xs text-center">
          You won&apos;t be charged yet. All bookings are subject to
          availability and confirmation.
        </p>
      </div>

      <div className="z-[1]">
        <Button
          className="w-full"
          type="primary"
          label={bookingPrice ? "Request a booking" : "Request an estimate"}
          state={checkInData && checkOutData ? "idle" : "disabled"}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default PropertyBooking;
