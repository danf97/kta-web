import { LogoKta } from "@/components/icons/LogoKta";
import { Button } from "@/components/ui/Button";
import { Col } from "@/components/ui/Col";
import { Row } from "@/components/ui/Row";
import { SettingsQueryResult } from "@/sanity/queries/documents/settings";
import { LanguageIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Header = ({ settings }: { settings: SettingsQueryResult }) => {
  const { header } = settings;
  const navigation = header?.navigation || [];

  return (
    <header className="absolute top-10 left-0 z-50 w-full">
      <Row className="">
        <Col className="w-full">
          <div className="bg-sand-light text-black border border-black rounded-3xl flex justify-between items-center">
            <div className="px-4 py-3">
              <Link href="/" className="">
                <LogoKta className="h-6 w-auto hover:opacity-60" />
              </Link>
            </div>

            <nav>
              <ul className="flex px-[5px]">
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
            </nav>
          </div>
        </Col>
      </Row>
    </header>
  );
};

export default Header;
