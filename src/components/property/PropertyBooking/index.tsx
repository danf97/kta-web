import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./styles.scss";
import { addDays, subDays } from "date-fns";
import { PropertyQueryResult } from "@/sanity/queries/documents/property";
import { getBookingPrice } from "@/utils/getBookingPrice";

const PropertyBooking = ({
  pricingTable,
}: {
  pricingTable: PropertyQueryResult["pricingTable"];
}) => {
  const [checkInData, setCheckInData] = useState<Date | null>(null);
  const [checkOutData, setCheckOutData] = useState<Date | null>(null);

  console.log({ checkInData, checkOutData });

  useEffect(() => {
    if (!checkInData || !checkOutData) return;
    const totalPrice = getBookingPrice(checkInData, checkOutData, pricingTable);
    console.log({ totalPrice });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkInData, checkOutData]);

  return (
    <div className="border border-black rounded-3xl p-6 bg-white">
      <div className="mb-5">
        {checkInData && checkOutData ? (
          <>
            <span className="body-l">159€</span>/night
          </>
        ) : (
          <span className="body-l">Get an estimate</span>
        )}
      </div>

      <div className="flex flex-row gap-4">
        <div className="bg-gray-100 rounded-2xl p-3 flex-1">
          <div className="body-xxs-bold uppercase mb-2">Check-in</div>
          <div className="body-16 bold text-black">
            {!checkInData && <span className="absolute ">Pick a date</span>}
            <div className="kta-datepicker">
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

      {checkInData && (
        <div className="body-xs my-4">
          <p>Please note:</p>
          <ul className="list-disc ml-5">
            <li>Minimum stay: 7 nights</li>
            <li>Check-in only on: Mondays</li>
            <li>Check-out only on: Mondays</li>
          </ul>
        </div>
      )}

      <div className="bg-gray-100 rounded-2xl p-3 mb-6 flex-1">
        <div className="body-xxs-bold uppercase mb-2">Total of guests</div>
        <div className="body-16 bold">2 Adults + 1 Child + 1 Infant</div>
      </div>

      <div>
        <div className="body-xxs-bold uppercase mb-4">Detaild Price</div>

        <ul className="body-16 mt-2 mb-4 ">
          <li className="flex flex-row justify-between gap-2 mb-2">
            <span>Bed sheets and towels</span>
            <span>Included</span>
          </li>
          <li className="flex flex-row justify-between gap-2 mb-2">
            <span>147€ x 7 nights</span>
            <span>1 029 €</span>
          </li>
          <li className="flex flex-row justify-between gap-2 mb-2">
            <span>Service fee</span>
            <span>30 €</span>
          </li>
          <li className="flex flex-row justify-between gap-2 mt-4 body-16-bold">
            <span>Total</span>
            <span>1 029 €</span>
          </li>
        </ul>
      </div>

      <p className="body-xs text-center mb-4">
        You won&apos;t be charged yet. All bookings are subject to availability
        and confirmation.
      </p>

      <Button
        className="w-full"
        type="primary"
        label="Request a booking"
        onClick={() => {}}
      />
    </div>
  );
};

export default PropertyBooking;
