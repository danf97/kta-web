import { SectionType } from "@/sanity/queries/sections";
import { featuredCardsQueryResult } from "@/sanity/queries/sections/featured-cards";
import { Row } from "@/components/ui/Row";
import { Col } from "@/components/ui/Col";
import { Button } from "@/components/ui/Button";
import BigPropertyCard from "@/components/cards/BigPropertyCard";
import { BannerQueryResult } from "@/sanity/queries/sections/banner";
import Image from "next/image";

const Banner = ({
  section,
  index,
}: {
  section: SectionType<BannerQueryResult>;
  index: number;
}) => {
  const { title, message, cta, image } = section;
  console.log("Banner Section:", section);

  return (
    <div key={section._key || index} className="vertical-space">
      <div className="w-full background-pattern-orange border-t border-b">
        <Row>
          <Col className="w-6/12">
            <div className="flex flex-col justify-between min-h-[480px] p-10">
              <p className="body-m">{title}</p>
              <p className="h5">{message}</p>
              <div>
                <Button type="primary" label={cta?.title || "Learn More"} />
              </div>
            </div>
          </Col>

          {image?.url ? (
            <Col className="w-6/12">
              <div className="relative w-full h-full">
                <Image
                  src={image?.url}
                  alt={title}
                  width={1040}
                  height={480}
                  className="absolute left-0 top-0 object-cover rounded-l-3xl border border-black m-[-1px] h-[calc(100%+2px)] min-w-[50vw]"
                />
              </div>
            </Col>
          ) : null}
        </Row>
      </div>
    </div>
  );
};

export default Banner;
