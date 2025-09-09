import { LogoKta } from "@/components/icons/LogoKta";
import { Button } from "@/components/ui/Button";
import { Col } from "@/components/ui/Col";
import { Row } from "@/components/ui/Row";
import { SettingsQueryResult } from "@/sanity/queries/documents/settings";
import { LanguageIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Footer = ({ settings }: { settings: SettingsQueryResult }) => {
  const { footer } = settings;
  const navigation = footer?.navigation || [];

  console.log({ footer });

  return (
    <footer className="bg-sand-light text-black border-t border-black py-15">
      <Row>
        <Col className="w-full">
          <div className="flex items-center justify-between">
            <Link href="/">
              <LogoKta className="h-7 w-auto hover:opacity-60" />
            </Link>

            <fieldset className="flex">
              <label htmlFor="language">
                <span className="sr-only">Select language</span>
                <div className="w-5">
                  <LanguageIcon />
                </div>
              </label>
              <select name="language" id="language" className="body-16 pr-1">
                <option value="en">English</option>
                <option value="pt">Português</option>
              </select>
            </fieldset>
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
