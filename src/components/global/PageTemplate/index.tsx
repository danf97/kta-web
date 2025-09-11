"use client";

import { Row } from "@/components/ui/Row";
import PageTop from "../PageTop";
import { Col } from "@/components/ui/Col";
import { Button } from "@/components/ui/Button";
import { pageHeadObjectType } from "@/sanity/queries/objects/pageHeadObject";
import Footer from "../Footer";

const PageTemplate = ({
  pageTopImage,
  pageHead,
  children,
}: {
  pageTopImage?: string | null;
  pageHead: pageHeadObjectType;
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-sand relative min-h-[100vh] z-[1]">
      {pageTopImage && pageTopImage !== null ? (
        <PageTop image={pageTopImage} />
      ) : null}

      <Row className="justify-center pt-56">
        <Col className="w-full tablet:w-7/12 desktop:w-7/12 flex flex-col gap-10 items-center">
          <h1 className="h3 tablet:h2 text-center">{pageHead.title}</h1>
          {pageHead.description !== null ? (
            <p className="body-m text-center">{pageHead.description}</p>
          ) : null}
          {pageHead.cta &&
          pageHead?.cta?.linkType !== null &&
          pageHead?.cta?.linkType !== "disabled" ? (
            <div>
              <Button
                type="primary"
                size="medium"
                link={pageHead.cta}
                label={pageHead?.cta?.title}
              />
            </div>
          ) : null}
        </Col>
      </Row>

      {children}
    </div>
  );
};

export default PageTemplate;
