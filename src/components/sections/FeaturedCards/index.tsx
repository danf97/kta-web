import { SectionType } from "@/sanity/queries/sections";
import { featuredCardsQueryResult } from "@/sanity/queries/sections/featured-cards";
import { Row } from "@/components/ui/Row";
import { Col } from "@/components/ui/Col";
import { Button } from "@/components/ui/Button";
import BigPropertyCard from "@/components/cards/BigPropertyCard";

const FeaturedCards = ({
  section,
  index,
}: {
  section: SectionType<featuredCardsQueryResult>;
  index: number;
}) => {
  const { title, cta, cards } = section;

  console.log("Featured Cards Section:", section);
  return (
    <div key={section._key || index} className="featured-cards vertical-space">
      <Row>
        <Col className="w-1/2">
          <h2 className="h6">{title}</h2>
        </Col>
        <Col className="w-1/2 text-right">
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
            />
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default FeaturedCards;
