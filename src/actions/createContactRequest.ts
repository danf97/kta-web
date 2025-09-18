"use server";

import { Resend } from "resend";

export async function createContactRequest(data: string) {
  const { state, emailBody, emailData, resendResponse } = JSON.parse(data);

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
      "Pedido de Contacto - Webiste Keys to Algarve" +
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
