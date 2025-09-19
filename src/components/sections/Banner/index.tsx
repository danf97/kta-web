import { SectionType } from "@/sanity/queries/sections";
import { Row } from "@/components/ui/Row";
import { Col } from "@/components/ui/Col";
import { Button } from "@/components/ui/Button";
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

  return (
    <div
      key={section._key || index}
      className="vertical-space overflow-hidden max-w-screen"
    >
      <div className="w-full background-pattern-orange border-t border-b">
        <Row>
          <Col className="w-full tablet:w-6/12 order-2 tablet:order-1">
            <div className="flex flex-col justify-between min-h-[480px] p-10">
              <p className="body-m">{title}</p>
              <p className="h5">{message}</p>
              <div>
                <Button type="primary" label={cta?.title || "Learn More"} />
              </div>
            </div>
          </Col>

          {image?.url ? (
            <Col className="w-full tablet:w-6/12 order-1 tablet:order-2">
              <div className="relative w-full h-full">
                <Image
                  src={image?.url}
                  alt={title}
                  width={1040}
                  height={480}
                  className="tablet:absolute min-w-screen ml-[-24px] tablet:ml-0 left-0 top-0 object-cover tablet:rounded-l-3xl border-t border-b tablet:border-x border-black m-[-1px] h-[calc(100%+2px)] tablet:min-w-[50vw]"
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
