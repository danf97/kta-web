import PageTemplate from "@/components/global/PageTemplate";
import PageTop from "@/components/global/PageTop";
import { Col } from "@/components/ui/Col";
import { Row } from "@/components/ui/Row";
import { getSanityHomePage } from "@/sanity/services";
import Image from "next/image";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const home = await getSanityHomePage(locale);
  const pageTopImage = home.pageSettings?.image?.url;

  return (
    <PageTemplate pageTopImage={pageTopImage}>
      <div>ola</div>
      <Row>
        <Col></Col>
      </Row>
    </PageTemplate>
  );
}
