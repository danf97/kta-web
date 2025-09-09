import PropertyTemplate from "@/components/property/PropertyTemplate";
import { getSanityProperty } from "@/sanity/services/getSanityProperty";

export default async function Property({
  params,
}: {
  params: Promise<{ locale: string; uid: string }>;
}) {
  const { locale, uid } = await params;
  const property = await getSanityProperty({ slug: uid, lang: locale });

  console.log("property:", property);

  return <PropertyTemplate property={property} />;
}
