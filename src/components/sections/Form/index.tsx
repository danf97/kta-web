import { SectionType } from "@/sanity/queries/sections";
import { Row } from "@/components/ui/Row";
import { Col } from "@/components/ui/Col";
import { BannerQueryResult } from "@/sanity/queries/sections/banner";
import GetInTouchForm from "@/components/forms/GetInTouchForm";
import { SectionZoneProps } from "../SectionZone";

const Form = ({
  section,
  index,
  context,
}: {
  section: SectionType<BannerQueryResult>;
  index: number;
  context: SectionZoneProps["context"];
}) => {
  const { title } = section;
  const { lang } = context;

  return (
    <div
      key={section._key || index}
      className="vertical-space overflow-hidden max-w-screen"
    >
      <Row>
        <Col className="w-1/2 mx-auto">
          <GetInTouchForm lang={lang} />
        </Col>
      </Row>
    </div>
  );
};

export default Form;
