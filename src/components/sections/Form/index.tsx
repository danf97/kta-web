import { SectionType } from "@/sanity/queries/sections";
import { featuredCardsQueryResult } from "@/sanity/queries/sections/featured-cards";
import { Row } from "@/components/ui/Row";
import { Col } from "@/components/ui/Col";
import { Button } from "@/components/ui/Button";
import BigPropertyCard from "@/components/cards/BigPropertyCard";
import { BannerQueryResult } from "@/sanity/queries/sections/banner";
import Image from "next/image";
import { Input } from "@/components/ui/Input";

const Form = ({
  section,
  index,
}: {
  section: SectionType<BannerQueryResult>;
  index: number;
}) => {
  const { title } = section;

  return (
    <div
      key={section._key || index}
      className="vertical-space overflow-hidden max-w-screen"
    >
      <Row>
        <Col className="w-1/2">
          <Input label="Your Email" isRequired />
        </Col>
      </Row>
    </div>
  );
};

export default Form;
