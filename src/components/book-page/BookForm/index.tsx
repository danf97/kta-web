import { createBookRequest } from "@/actions/createBookRequest";
import { stringsData } from "@/components/forms/GetInTouchForm/data";
import { Button } from "@/components/ui/Button";
import { CheckBoxField } from "@/components/ui/CheckBoxField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { bookRequestTemplate } from "@/email_templates/bookRequest";
import { countries } from "@/libs/countries";
import { mainStringsResolver } from "@/libs/mainStrings";
import { formFieldsValidationSchema } from "@/utils/formFieldsValidationSchema";
import { useYupValidationResolver } from "@/utils/useYupValidationResolver";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FieldValues, useForm } from "react-hook-form";

export type BookFormFieldsType = {
  submitDate: string;
  checkIn: string;
  checkOut: string;
  totalNights: string;
  totalPrice: string;
  totalGuests: string;
  depositPrice: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  tax_number: string;
  book_message: string;
  propertyName: string;
  propertyNameURL: string;
  langString: string;
};

const BookForm = ({
  lang,
  checkInData,
  checkOutData,
  totalNights,
  bookingPriceMoney,
  valorCaucaoMoney,
  peopleString,
  propertyName,
}: {
  lang: "pt" | "en";
  checkInData: Date | null;
  checkOutData: Date | null;
  totalNights: number | null;
  bookingPriceMoney: string | null;
  valorCaucaoMoney: string | null;
  peopleString: string | null;
  propertyName: string | null;
}) => {
  const recaptcha = useRef<ReCAPTCHA>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      terms_agree: false,
      phone: "",
      tax_number: "",
      book_message: "",
    },
    resolver: useYupValidationResolver(
      formFieldsValidationSchema({
        fields: [
          "first_name",
          "last_name",
          "email",
          "phone",
          "tax_number",
          "terms_agree",
          "book_message",
        ],
        lang,
      })
    ),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [termsAgree, setTermsAgree] = useState(false);
  const [country, setCountry] = useState("PT");
  const [apiErrors, setApiErrors] = useState<{ message: string }[]>([]);

  const submitHandler = async (fields: FieldValues) => {
    if (isLoading) return;
    setApiErrors([]);

    setIsLoading(true);

    if (!recaptcha.current || !recaptcha.current?.getValue()) {
      setIsLoading(false);
      setApiErrors([
        {
          message:
            lang === "pt"
              ? "Por favor, complete o captcha."
              : "Please complete the captcha.",
        },
      ]);
      return null;
    }
    const recaptchaToken = recaptcha.current?.getValue();

    if (!termsAgree) {
      setIsLoading(false);
      setApiErrors([
        {
          message: mainStringsResolver("agree_terms_message", lang),
        },
      ]);
    }

    const templateData = {
      submitDate: new Date().toISOString(),
      checkIn: checkInData ? checkInData.toISOString().split("T")[0] : "",
      checkOut: checkOutData ? checkOutData.toISOString().split("T")[0] : "",
      totalPrice: bookingPriceMoney || "",
      totalGuests: peopleString || "",
      depositPrice: valorCaucaoMoney || "",
      full_name: `${fields.first_name} ${fields.last_name}`,
      email: fields.email,
      phone: fields.phone,
      tax_number: fields.tax_number,
      book_message: fields.book_message,
      country: country,
      propertyName: propertyName || "",
      totalNights: totalNights ? totalNights.toString() : "",
      propertyNameURL: window.location.href,
      langString: lang === "pt" ? "Portugês" : "English",
    };

    console.log("templateData", templateData);
    const template = bookRequestTemplate(templateData);

    const state = "ok";
    const emailBody = template;
    const emailData = {
      language: lang,
      guestFullName: `${fields.first_name} ${fields.last_name}`,
      email: fields.email,
      phone: fields.phone,
      message: fields.message,
    };
    const resendResponse = {
      status: "Unknown",
      message: "null",
    };

    try {
      const createBookingRequestServer = createBookRequest.bind(
        null,
        JSON.stringify({
          state,
          emailBody,
          emailData,
          resendResponse,
          recaptchaToken,
        })
      );

      await createBookingRequestServer();
      setSubmitSuccess(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating booking request:", error);
      alert("Erro ao enviar o email. Por favor, tente novamente.");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <form
        className={`flex flex-wrap gap-4 ${submitSuccess ? "invisible opacity-0" : "visible opacity-100"}`}
        onSubmit={handleSubmit((data) => submitHandler(data))}
      >
        <div className="grid tablet:grid-cols-2 gap-4 w-full">
          <div>
            <Input
              label={`${mainStringsResolver("first_name", lang)}*`}
              name="first_name"
              register={{
                ...register("first_name"),
              }}
              error={errors.first_name?.message as string}
            />
          </div>
          <div>
            <Input
              label={`${mainStringsResolver("last_name", lang)}*`}
              name="last_name"
              register={{
                ...register("last_name"),
              }}
              error={errors.last_name?.message as string}
            />
          </div>
        </div>
        <div className="grid tablet:grid-cols-2 gap-4 w-full">
          <div>
            <Input
              label="Email*"
              name="email"
              type="email"
              register={{
                ...register("email"),
              }}
              error={errors.email?.message as string}
            />
          </div>
          <div>
            <Input
              label={`${mainStringsResolver("phone_number", lang)}*`}
              name="phone"
              register={{
                ...register("phone"),
              }}
              error={errors.phone?.message as string}
            />
          </div>
        </div>
        <div className="grid tablet:grid-cols-2 gap-4 w-full">
          <div>
            <Select
              label={`${mainStringsResolver("country", lang)}*`}
              options={countries}
              defaultOption={country}
              onChange={setCountry}
            />
          </div>
          <div>
            <Input
              label={`${mainStringsResolver("tax_number", lang)}`}
              name="tax_number"
              register={{
                ...register("tax_number"),
              }}
              error={errors.tax_number?.message as string}
            />
          </div>
        </div>
        <div className="w-full">
          <Input
            label={`${mainStringsResolver("book_message", lang)}`}
            name="book_message"
            asTextArea
            register={{
              ...register("book_message"),
            }}
            error={errors.book_message?.message as string}
          />
        </div>

        <div>
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY!}
            ref={recaptcha}
          />
          <p className="body-xs mb-4">
            {mainStringsResolver("mandatory_fields", lang)}
          </p>
          <CheckBoxField
            initialValue={termsAgree}
            name="terms_agree"
            label={
              <span
                dangerouslySetInnerHTML={{
                  __html: stringsData.terms_agree[lang],
                }}
              />
            }
            register={{
              ...register("terms_agree"),
            }}
            error={errors.terms_agree?.message as string}
            onChange={(val: boolean) => {
              setTermsAgree(val);
            }}
          />
        </div>
        {apiErrors.length > 0 && (
          <ul className="p-4 bg-red-100 border border-red-300 text-red-800 rounded list-disc">
            {apiErrors.map((err, index) => (
              <li key={index} className="ml-4">
                {err.message}
              </li>
            ))}
          </ul>
        )}
        <div className="w-full">
          <Button
            label={mainStringsResolver("request_booking", lang)}
            type="primary"
            size="large"
            className="w-full"
            state={isLoading ? "disabled" : "idle"}
            isLoading={isLoading}
          />
        </div>
      </form>

      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 px-2">
        {submitSuccess && (
          <>
            <div className="p-4 bg-green-100 border border-green-300 text-green-800 rounded">
              {lang === "en"
                ? "Thank you for reaching out! We'll get back to you as soon as possible — usually within 24 hours."
                : "Obrigado pelo seu contacto! Responderemos o mais breve possível — normalmente dentro de 24 horas."}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookForm;
