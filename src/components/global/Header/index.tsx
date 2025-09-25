"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SettingsQueryResult } from "@/sanity/queries/documents/settings";
import { LogoKta } from "@/components/icons/LogoKta";
import { Button } from "@/components/ui/Button";
import { Col } from "@/components/ui/Col";
import { Row } from "@/components/ui/Row";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import { usePathname } from "next/navigation";

const Header = ({ settings }: { settings: SettingsQueryResult }) => {
  const { header } = settings;
  const navigation = header?.navigation || [];

  const pathname = usePathname();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);

  useEffect(() => {
    const url = window.location.href;
    if (url.includes("/book?")) {
      setHideHeader(true);
    } else {
      setHideHeader(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (menuIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuIsOpen]);

  if (hideHeader) return null;

  return (
    <header className="absolute top-10 left-0 z-50 w-full">
      <Row className="relative z-[2]">
        <Col className="w-full">
          <div className="bg-sand-light text-black border border-black rounded-3xl flex justify-between items-center">
            <div className="px-4 py-3">
              <Link href="/" className="">
                <LogoKta className="h-6 w-auto hover:opacity-60" />
              </Link>
            </div>

            <button
              className="tablet:hidden relative w-12 h-12 mr-4 cursor-pointer"
              onClick={() => {
                setMenuIsOpen(!menuIsOpen);
              }}
            >
              <span
                className={`absolute w-8 bg-black h-0.5 block rounded-full transition-all 
                ${
                  menuIsOpen
                    ? `right-1 top-[23px] rotate-45`
                    : `right-1 top-[18px]`
                }
                `}
              />
              <span
                className={`absolute w-8 bg-black h-0.5 block rounded-full transition-all 
                ${
                  menuIsOpen
                    ? `right-1 top-[23px] -rotate-45`
                    : `right-1 top-[28px]`
                }
                `}
              />
            </button>

            <nav className="hidden tablet:block">
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

      <nav
        className={`
          fixed w-full bg-blue-light h-dvh z-[1] top-0 left-0 flex justify-center items-center
          transition-all
          ${menuIsOpen ? `opacity-100 visible` : `opacity-0 invisible`}  
      `}
      >
        <ul className="flex px-[5px] flex-col justify-center items-center gap-4">
          {navigation.length > 0
            ? navigation.map((item, index) => {
                if (item._type === "linkGroup") return null;
                return (
                  <li key={index}>
                    <Button
                      type="ghost"
                      size="medium"
                      label={item.title}
                      link={item}
                    />
                  </li>
                );
              })
            : null}
        </ul>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <LanguageSelector />
        </div>
      </nav>
    </header>
  );
};

export default Header;
