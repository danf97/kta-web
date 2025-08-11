"use client";

import { Row } from "@/components/ui/Row";
import PageTop from "../PageTop";
import { Col } from "@/components/ui/Col";
import { Button } from "@/components/ui/Button";

const PageTemplate = ({
  pageTopImage,
  children,
}: {
  pageTopImage?: string | null;
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-sand relative h-[200vh] z-[1]">
      {pageTopImage && pageTopImage !== null ? (
        <PageTop image={pageTopImage} />
      ) : null}

      <Row className="justify-center pt-56">
        <Col className="tablet:w-7/12 desktop:w-7/12 flex flex-col gap-10 items-center">
          <h1 className="h2 text-center">Opening doors across the Algarve</h1>
          <p className="body-m text-center">
            Staying in the Algarve? We deliver keys across Armação de Pêra,
            Guia, Salgados, Albufeira, and Alporchinhos, so your check-in is
            always smooth and stress-free.
          </p>
          <div>
            <Button
              type="primary"
              size="large"
              onClick={() => {
                console.log("ola");
              }}
              label="See our properties"
            />
          </div>
        </Col>
      </Row>

      {children}
    </div>
  );
};

export default PageTemplate;
