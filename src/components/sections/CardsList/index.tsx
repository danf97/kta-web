import { SectionType } from "@/sanity/queries/sections";
import PropertyCard from "@/components/cards/PropertyCard";
import { cardsListSectionQueryResult } from "@/sanity/queries/sections/cards-list";
import { Row } from "@/components/ui/Row";
import { Col } from "@/components/ui/Col";

const CardsList = ({
  section,
  index,
}: {
  section: SectionType<cardsListSectionQueryResult>;
  index: number;
}) => {
  const { title, cards } = section;
  console.log("🚀 CardsList section:", section);
  return (
    <div key={section._key || index} className="cards-list vertical-space">
      <Row>
        <Col className="w-full">
          <h2 className="h6 mb-10">{title}</h2>
        </Col>
      </Row>
      <Row className="gap-y-4">
        {cards?.map((card, cardIndex) => (
          <Col
            className="flex w-full tablet:w-6/12 smallDesktop:w-4/12 desktop:w-3/12"
            key={cardIndex}
          >
            <PropertyCard property={card} width="full" />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CardsList;
