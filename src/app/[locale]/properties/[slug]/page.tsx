import PropertyTemplate from "@/components/property/PropertyTemplate";
import { getSanityProperty } from "@/sanity/services/getSanityProperty";

export default async function Property({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const property = await getSanityProperty({ slug, lang: locale });

  return <PropertyTemplate property={property} />;
}
