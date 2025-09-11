import { SectionType } from "@/sanity/queries/sections";
import { featuredCardsQueryResult } from "@/sanity/queries/sections/featured-cards";
import { Row } from "@/components/ui/Row";
import { Col } from "@/components/ui/Col";
import { Button } from "@/components/ui/Button";
import BigPropertyCard from "@/components/cards/BigPropertyCard";
import { SectionZoneProps } from "../SectionZone";

const FeaturedCards = ({
  section,
  index,
  context,
}: {
  section: SectionType<featuredCardsQueryResult>;
  index: number;
  context: SectionZoneProps["context"];
}) => {
  const { title, cta, cards, _key } = section;
  const { lang } = context;

  return (
    <div key={_key || index} className="featured-cards vertical-space">
      <Row>
        <Col className="w-full tablet:w-1/2">
          <h2 className="h6">{title}</h2>
        </Col>
        <Col className="hidden tablet:block tablet:w-1/2 text-center tablet:text-right">
          <Button type="primary" size="medium" label={cta.title} />
        </Col>
      </Row>

      <Row className="">
        <Col className="w-full">
          {cards.map((card, index) => (
            <BigPropertyCard
              key={index}
              property={card}
              align={index % 2 === 0 ? "left" : "right"}
              lang={lang}
            />
          ))}
        </Col>

        <Col className="w-full mt-6 text-center tablet:hidden">
          <Button type="primary" size="medium" label={cta.title} />
        </Col>
      </Row>
    </div>
  );
};

export default FeaturedCards;
