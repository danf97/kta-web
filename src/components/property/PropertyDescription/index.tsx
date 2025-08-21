import { translatableTextObjectType } from "@/sanity/queries/objects/translatableTextObject";
import { multilangFieldResolver } from "@/utils/multilangFieldResolver";

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
  const itemsStyles = "flex flex-col justify-end items-center mr-4 p-2 gap-3";

  return (
    <div className="flex flex-col gap-8">
      <h2 className="body-xl">
        {multilangFieldResolver(mainDescription, lang)}
      </h2>

      <p>{multilangFieldResolver(fullDescription, lang)}</p>

      <p>{license}</p>
    </div>
  );
};

export default PropertyDescription;
