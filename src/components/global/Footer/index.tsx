import { LogoKta } from "@/components/icons/LogoKta";
import { Button } from "@/components/ui/Button";
import { Col } from "@/components/ui/Col";
import { Row } from "@/components/ui/Row";
import { SettingsQueryResult } from "@/sanity/queries/documents/settings";
import Link from "next/link";
import LanguageSelector from "../LanguageSelector/LanguageSelector";

const Footer = ({ settings }: { settings: SettingsQueryResult }) => {
  const { footer } = settings;
  const navigation = footer?.navigation || [];

  return (
    <footer className="bg-sand-light text-black border-t border-black py-15">
      <Row>
        <Col className="w-full">
          <div className="flex tablet:items-start tablet:justify-between flex-col tablet:flex-row">
            <Link href="/" className="mb-10">
              <LogoKta className="h-7 w-auto hover:opacity-60" />
            </Link>

            <LanguageSelector />
          </div>
          <div className="">
            <ul className="my-10 -ml-3">
              {navigation.length > 0
                ? navigation.map((item, index) => {
                    if (item._type === "linkGroup") return null;
                    return (
                      <li key={index}>
                        <Button
                          type="ghost"
                          size="small"
                          label={item.title}
                          link={item}
                        />
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
          <div>
            {footer?.copy?.replace(
              "{current_year}",
              new Date().getFullYear().toString()
            )}
          </div>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
