import { stringsData } from "@/components/forms/GetInTouchForm/data";
import { Button } from "@/components/ui/Button";
import { CheckBoxField } from "@/components/ui/CheckBoxField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { countries } from "@/libs/countries";
import { mainStringsResolver } from "@/libs/mainStrings";
import { formFieldsValidationSchema } from "@/utils/formFieldsValidationSchema";
import { useYupValidationResolver } from "@/utils/useYupValidationResolver";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const BookForm = ({ lang }: { lang: "pt" | "en" }) => {
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
      message: "",
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
          "message",
        ],
        lang,
      })
    ),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [termsAgree, setTermsAgree] = useState(false);
  const [country, setCountry] = useState("PT");
  const [apiErrors, setApiErrors] = useState<{ message: string }[]>([]);

  const submitHandler = async (fields: FieldValues) => {
    if (isLoading) return;
    setApiErrors([]);

    setIsLoading(true);

    if (!termsAgree) {
      setIsLoading(false);
      setApiErrors([
        {
          message: mainStringsResolver("agree_terms_message", lang),
        },
      ]);
    }

    return null;

    // const template = contactRequestTemplate({
    //   first_last_name: fields.first_last_name,
    //   email: fields.email,
    //   phone: fields.phone,
    //   message: fields.message,
    // });

    // const state = "ok";
    // const emailBody = template;
    // const emailData = {
    //   language: lang,
    //   guestFullName: fields.first_last_name,
    //   email: fields.email,
    //   phone: fields.phone,
    //   message: fields.message,
    // };
    // const resendResponse = {
    //   status: "Unknown",
    //   message: "null",
    // };

    // console.log("Submitting contact request:", {
    //   state,
    //   emailBody,
    //   emailData,
    //   resendResponse,
    // });

    // try {
    //   const createBookingRequestServer = createContactRequest.bind(
    //     null,
    //     JSON.stringify({
    //       state,
    //       emailBody,
    //       emailData,
    //       resendResponse,
    //     })
    //   );

    //   await createBookingRequestServer();
    //   setSubmitSuccess(true);
    //   setIsLoading(false);
    // } catch (error) {
    //   console.error("Error creating booking request:", error);
    //   alert("Erro ao enviar o email. Por favor, tente novamente.");
    //   setIsLoading(false);
    // }
  };

  return (
    <div>
      <form
        className="flex flex-wrap gap-4"
        onSubmit={handleSubmit((data) => submitHandler(data))}
      >
        <div className="grid grid-cols-2 gap-4 w-full">
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
        <div className="grid grid-cols-2 gap-4 w-full">
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
        <div className="grid grid-cols-2 gap-4 w-full">
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
            name="message"
            asTextArea
            register={{
              ...register("message"),
            }}
            error={errors.message?.message as string}
          />
        </div>

        <div>
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
    </div>
  );
};

export default BookForm;
