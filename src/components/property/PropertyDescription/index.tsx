import { mainStringsResolver } from "@/libs/mainStrings";
import { translatableTextObjectType } from "@/sanity/queries/objects/translatableTextObject";
import { multilangFieldResolver } from "@/utils/multilangFieldResolver";
import Link from "next/link";

const PropertyDescription = ({
  mainDescription,
  fullDescription,
  license,
  lang = "en",
}: {
  mainDescription: translatableTextObjectType;
  fullDescription: translatableTextObjectType;
  license?: string;
  lang?: string;
}) => {
  const licenseUrl = `https://rnt.turismodeportugal.pt/rnt/RNAL.aspx?nr=${license?.replace(
    "/AL",
    ""
  )}`;

  return (
    <div className="flex flex-col gap-8">
      <h2 className="body-xl">
        {multilangFieldResolver(mainDescription, lang)}
      </h2>

      <p>{multilangFieldResolver(fullDescription, lang)}</p>

      <p>
        {mainStringsResolver("license", lang)}
        <Link
          href={licenseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {license}
        </Link>
      </p>
    </div>
  );
};

export default PropertyDescription;
