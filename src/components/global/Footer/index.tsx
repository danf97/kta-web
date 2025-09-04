import { LogoKta } from "@/components/icons/LogoKta";
import { Col } from "@/components/ui/Col";
import { Row } from "@/components/ui/Row";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-sand-light text-black border-t border-black py-15">
      <Row>
        <Col>
          <div>
            <Link href="/">
              <LogoKta className="h-7 w-auto hover:opacity-60" />
            </Link>
          </div>
          <div></div>© {new Date().getFullYear()} My Website. All rights
          reserved.
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
