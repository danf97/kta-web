"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formFieldsValidationSchema } from "@/utils/formFieldsValidationSchema";
import { useYupValidationResolver } from "@/utils/useYupValidationResolver";
import { useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { stringsData } from "./data";
import { contactRequestTemplate } from "@/email_templates/contactRequest";
import { createContactRequest } from "@/actions/createContactRequest";
import ReCAPTCHA from "react-google-recaptcha";

export type GetInTouchFormFieldsType = {
  first_last_name: string;
  email: string;
  phone: string;
  message: string;
  // terms_agree: boolean;
};

const GetInTouchForm = ({ lang }: { lang: "en" | "pt" }) => {
  const recaptcha = useRef<ReCAPTCHA>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: useYupValidationResolver(
      formFieldsValidationSchema({
        fields: ["first_last_name", "email", "phone", "message"],
        lang,
      })
    ),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [apiErrors, setApiErrors] = useState<{ message: string }[]>([]);
  // const [newsletterAgree, setNewsletterAgree] = useState(false);
  // const [termsAgree, setTermsAgree] = useState(false);

  const first_last_name = watch("first_last_name");
  const email = watch("email");
  const phone = watch("phone");
  const message = watch("message");
  // const terms_agree = watch("terms_agree");

  console.log("apiErrors", apiErrors);

  const submitHandler = async (fields: FieldValues) => {
    if (isLoading) return;

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

    const template = contactRequestTemplate({
      first_last_name: fields.first_last_name,
      email: fields.email,
      phone: fields.phone,
      message: fields.message,
    });

    const state = "ok";
    const emailBody = template;
    const emailData = {
      language: lang,
      guestFullName: fields.first_last_name,
      email: fields.email,
      phone: fields.phone,
      message: fields.message,
    };
    const resendResponse = {
      status: "Unknown",
      message: "null",
    };

    console.log("Submitting contact request:", {
      state,
      emailBody,
      emailData,
      resendResponse,
      recaptchaToken,
    });

    try {
      const createBookingRequestServer = createContactRequest.bind(
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

  // useEffect(() => {
  //   setApiErrors([]);
  // }, [first_last_name, email, phone, message]);

  return (
    <div className="relative">
      <form
        className={`${submitSuccess ? "invisible opacity-0" : "visible opacity-100"}`}
        onSubmit={handleSubmit((data) => submitHandler(data))}
      >
        <div className="flex flex-col gap-2">
          <Input
            name="first_last_name"
            register={{
              ...register("first_last_name"),
            }}
            label={stringsData.first_last_name[lang]}
            type="text"
            error={errors.first_last_name?.message as string}
          />
          <Input
            name="email"
            register={{
              ...register("email"),
            }}
            label={stringsData.email[lang]}
            type="text"
            error={errors.email?.message as string}
          />
          <Input
            name="phone"
            register={{
              ...register("phone"),
            }}
            label={stringsData.phone[lang]}
            type="text"
            error={errors.phone?.message as string}
          />
          <Input
            name="message"
            label={stringsData.message[lang]}
            register={{
              ...register("message"),
            }}
            type="text"
            error={errors.message?.message as string}
            asTextArea
          />

          {/* <CheckBoxField
          initialValue={false}
          name="newsletter_agree"
          label="Subscribe to receive our latest updates, exclusive offers, and tailored content. You may opt out at any time."
          register={{
            ...register("newsletter_agree"),
          }}
          onChange={(val: boolean) => {
            setNewsletterAgree(val);
          }}
          error={null}
        /> */}

          {/* <CheckBoxField
          initialValue={false}
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
          onChange={(val: boolean) => {
            setTermsAgree(val);
          }}
          error={errors.terms_agree?.message as string}
        /> */}
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY!}
            ref={recaptcha}
          />

          <span
            dangerouslySetInnerHTML={{
              __html: stringsData.terms_agree[lang],
            }}
          />

          {apiErrors.length > 0 && (
            <div className="p-4 bg-red-100 border border-red-300 text-red-800 rounded">
              {apiErrors.map((err, index) => (
                <p key={index}>{err.message}</p>
              ))}
            </div>
          )}

          <Button
            label={stringsData.submit[lang]}
            type="secondary"
            isLoading={isLoading}
          />
        </div>
      </form>

      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 px-2">
        {submitSuccess && (
          <div className="p-4 bg-green-100 border border-green-300 text-green-800 rounded">
            {stringsData.successMessage[lang]}
          </div>
        )}
      </div>
    </div>
  );
};

export default GetInTouchForm;
