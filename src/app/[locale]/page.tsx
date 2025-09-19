import PageTemplate from "@/components/global/PageTemplate";
import { SectionZone } from "@/components/sections";
import { getSanityHomePage } from "@/sanity/services";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const home = await getSanityHomePage(locale);
  const pageTopImage = home.pageSettings?.image?.url;
  const sections = home.sections;

  return (
    <PageTemplate
      pageTopImage={pageTopImage}
      pageHead={{
        title: home.title,
        description: home.description,
        cta: home.cta,
      }}
    >
      <div>
        {sections ? (
          <SectionZone
            sections={sections}
            context={{
              lang: locale as "en" | "pt",
            }}
          />
        ) : null}
      </div>
    </PageTemplate>
  );
}
