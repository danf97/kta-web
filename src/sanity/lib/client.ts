import "server-only";

import { createClient, QueryOptions, type QueryParams } from "next-sanity";

import { getSanityReadToken } from "./token";
import { draftMode } from "next/headers";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01", // https://www.sanity.io/docs/api-versioning
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  stega: {
    enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === "preview",
    studioUrl:
      process.env.NODE_ENV === "production"
        ? "https://sapphire-dust.sanity.studio/"
        : "https://sapphire-dust.sanity.studio/",
  },
});

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  revalidate = 300, // default revalidation time in seconds
  tags = ["sanity"],
}: {
  query: QueryString;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}) {
  const isDraftMode = (await draftMode()).isEnabled;
  const sanityReadToken = await getSanityReadToken();

  if (isDraftMode && !sanityReadToken) {
    throw new Error("Missing environment variable SANITY_API_READ_TOKEN");
  }

  const queryOptions: QueryOptions = {};
  let maybeRevalidate = revalidate;

  if (isDraftMode) {
    queryOptions.token = sanityReadToken;
    queryOptions.perspective = "previewDrafts";
    queryOptions.stega = true;

    maybeRevalidate = 0; // Do not cache in Draft Mode
  } else if (tags.length) {
    maybeRevalidate = false; // Cache indefinitely if tags supplied
  }

  return sanityClient.fetch(query, params, {
    ...queryOptions,
    next: {
      revalidate: maybeRevalidate,
      tags,
    },
  });
}
