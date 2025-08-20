"use client";

import { Row } from "@/components/ui/Row";

import { Col } from "@/components/ui/Col";
import { Button } from "@/components/ui/Button";
import { pageHeadObjectType } from "@/sanity/queries/objects/pageHeadObject";

const PropertyTemplate = ({
  pageTopImage,
  pageHead,
  children,
}: {
  pageTopImage?: string | null;
  pageHead: pageHeadObjectType;
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-sand relative h-[200vh] z-[1]">
      <Row className="justify-center pt-56">
        <Col className="tablet:w-7/12 desktop:w-7/12 flex flex-col gap-10 items-center">
          <h1 className="h2 text-center">{pageHead.title}</h1>
          {pageHead.description !== null ? (
            <p className="body-m text-center">{pageHead.description}</p>
          ) : null}
          {pageHead.cta !== null ? (
            <div>
              <Button
                type="primary"
                size="medium"
                onClick={() => {
                  console.log("ola");
                }}
                label="See our properties"
              />
            </div>
          ) : null}
        </Col>
      </Row>

      {children}
    </div>
  );
};

export default PropertyTemplate;
