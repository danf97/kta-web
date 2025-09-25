import BookPage from "@/components/book-page/BookPage";
import { getSanityProperty } from "@/sanity/services/getSanityProperty";

export default async function Property({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const property = await getSanityProperty({ slug, lang: locale });

  return <BookPage property={property} lang={locale as "pt" | "en"} />;
}
