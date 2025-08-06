"use server";

export const getSanityReadToken = async (): Promise<string> =>
  process.env.SANITY_API_READ_TOKEN as string;

if (!getSanityReadToken) {
  throw new Error("Missing SANITY_API_READ_TOKEN");
}
