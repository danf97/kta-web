import PropertyTemplate from "@/components/property/PropertyTemplate";
import { getSanityProperty } from "@/sanity/services/getSanityProperty";
import { expandRates } from "@/utils/expandRates";

export default async function Property({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const property = await getSanityProperty({ slug, lang: locale });
  const priceRate = expandRates(property.pricingTable);

  return <PropertyTemplate property={property} priceRate={priceRate} />;
}
