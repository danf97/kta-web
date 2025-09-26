"use server";

import { Resend } from "resend";

export async function createBookRequest(data: string) {
  const { state, emailBody, emailData, resendResponse, recaptchaToken } =
    JSON.parse(data);

  // ReCapthca
  const secret = process.env.CAPTCHA_SECRET;

  const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";
  const res = await fetch(verifyUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${secret}&response=${recaptchaToken}`,
  });

  const reCapchaData = await res.json();

  if (!reCapchaData.success) {
    console.log("❌ Spam detected");
    return {
      error: `Failed to send email. Spam detected.`,
    };
  }

  const body = { emailBody, state, emailData, resendResponse };

  const requiredFields = ["state", "emailBody", "emailData", "resendResponse"];

  // Check if all required fields are present
  for (const field of requiredFields) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(body as any)[field]) {
      return { error: `Missing required field: ${field}` };
    }
  }

  try {
    // Send email
    const subject =
      "Pedido de Reserva - Webiste Keys to Algarve" +
      // Date and time
      " - " +
      new Date()
        .toLocaleString("en-GB", {
          timeZone: "Europe/Lisbon",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
        .replace(",", "");

    const resend = new Resend(process.env.RESEND_KEY);

    try {
      const resendResponse = await resend.emails.send({
        from: "Website - Keys to Algarve <website@keystoalgarve.com>",
        to: ["info@keystoalgarve.com"],
        subject,
        html: body.emailBody,
        replyTo: body.emailData.email,
      });

      // Return the created booking request
      return { success: true, message: "Success", resendResponse };
    } catch (error: unknown) {
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message: string }).message
          : "Unknown error";
      return {
        error: `Failed to send email: ${errorMessage}`,
      };
    }
  } catch (e: unknown) {
    console.error(e);
    return {
      error:
        typeof e === "object" && e !== null && "message" in e
          ? (e as { message: string }).message
          : "Unknown error",
    };
  }
}
