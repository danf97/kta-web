import { mainStringsResolver } from "@/libs/mainStrings";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const BookPayment = ({
  totalPrice,
  depositValue,
  setShowDepositModal,
  lang,
}: {
  totalPrice: number | null;
  depositValue?: number;
  setShowDepositModal: (val: boolean) => void;
  lang: "en" | "pt";
}) => {
  const firstPayment = totalPrice ? Math.ceil(totalPrice * 0.3) : 0;
  const firstPaymentMoney = firstPayment
    ? firstPayment.toLocaleString("pt-PT", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      })
    : "--";
  const secondPayment = totalPrice ? totalPrice - firstPayment! : null;
  const secondPaymentMoney = secondPayment
    ? secondPayment.toLocaleString("pt-PT", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      })
    : "--";
  const depositValueMoney = depositValue
    ? depositValue.toLocaleString("pt-PT", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      })
    : "--";

  return (
    <div>
      {/* <div className="_flex items-start gap-4 text-primary [&_svg]:w-6 hidden">
        <div className={itemStyles}>
          <ArrowUpTrayIcon />
          <p>Booking request</p>
          <span className="body-xs block opacity-50">(You are here)</span>
        </div>
        <div className="flex items-center justify-center self-center">
          <ArrowRightIcon className="w-6" />
        </div>
        <div className={itemStyles}>
          <DocumentCheckIcon />
          <p>Booking validation</p>
        </div>
        <div className="flex items-center justify-center self-center">
          <ArrowRightIcon className="w-6" />
        </div>
        <div className={itemStyles}>
          <AtSymbolIcon />
          <p>Email with payment details</p>
        </div>
        <div className="flex items-center justify-center self-center">
          <ArrowRightIcon className="w-6" />
        </div>
        <div className={itemStyles}>
          <BanknotesIcon />
          <p>Payment confirmation</p>
        </div>
        <div className="flex items-center justify-center self-center">
          <ArrowRightIcon className="w-6" />
        </div>
        <div className={itemStyles}>
          <CheckCircleIcon />
          <p>Booking completed!</p>
        </div>
      </div> */}

      <div className="relative grid tablet:grid-cols-2 gap-9 tablet:gap-24 mt-10">
        <div>
          <div>
            <h3 className="body-16-bold mb-4">
              {mainStringsResolver("first_payment", lang)}
            </h3>

            <p>{mainStringsResolver("first_payment_text", lang)}</p>

            {firstPaymentMoney !== "--" && (
              <p className="body-xl mt-5">{firstPaymentMoney}</p>
            )}
          </div>
        </div>
        <div>
          <div>
            <h3 className="body-16-bold mb-4">
              {mainStringsResolver("second_payment", lang)}
            </h3>

            <p>{mainStringsResolver("second_payment_text", lang)}</p>

            {secondPaymentMoney !== "--" && (
              <p className="body-xl flex items-center gap-2 mt-5 flex-wrap">
                {secondPaymentMoney}

                <span
                  className="body-16 cursor-pointer"
                  onClick={() => {
                    setShowDepositModal(true);
                  }}
                >
                  {depositValueMoney
                    ? ` + ${depositValueMoney} ${mainStringsResolver("of_deposit", lang)}`
                    : ""}
                  <InformationCircleIcon className="w-5 inline-block ml-1" />
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPayment;
