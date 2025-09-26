import { mainStringsResolver } from "@/libs/mainStrings";

import {
  ArrowRightIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const BookSummary = ({
  lang,
  checkInData,
  checkOutData,
  totalNights,
  pricePerNightMoney,
  bookingPriceMoney,
  valorCaucaoMoney,
  peopleString,
  setShowDepositModal,
}: {
  lang: "pt" | "en";
  checkInData: Date | null;
  checkOutData: Date | null;
  totalNights: number | null;
  pricePerNightMoney: string | null;
  bookingPriceMoney: string | null;
  valorCaucaoMoney: string | null;
  peopleString: string | null;
  setShowDepositModal: (val: boolean) => void;
}) => {
  return (
    <div className="relative grid tablet:grid-cols-2 gap-9 tablet:gap-24 mt-10">
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
              <span>{peopleString}</span>
            </div>
          </div>
        </div>
      </div>

      <span className="absolute left-1/2 top-0 h-full border-r hidden tablet:block" />

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
                {pricePerNightMoney ?? "--"} x {totalNights}{" "}
                {mainStringsResolver("nights", lang)}
              </span>
              <span>
                {bookingPriceMoney ??
                  mainStringsResolver("pending_estimate", lang)}
              </span>
            </li>
            <li className="flex flex-row justify-between gap-2 mt-4 body-16-bold">
              <span>Total</span>
              <span>
                {bookingPriceMoney ??
                  mainStringsResolver("pending_estimate", lang)}
              </span>
            </li>
            {valorCaucaoMoney && (
              <li
                className="flex flex-row justify-between gap-2 mt-4 body-16 cursor-pointer"
                onClick={() => {
                  setShowDepositModal(true);
                }}
              >
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
