import { mainStringsResolver } from "@/libs/mainStrings";
import { Amenities } from "@/sanity/queries/documents/property";
import { translatableTextObjectType } from "@/sanity/queries/objects/translatableTextObject";
import { multilangFieldResolver } from "@/utils/multilangFieldResolver";

const PropertyLocation = ({
  map,
  closeBy,
  lang = "en",
}: {
  map: string;
  closeBy?: {
    title: translatableTextObjectType;
    distance: string;
  }[];
  lang?: string;
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-12">
        <h2 className="body-l">{mainStringsResolver("location", lang)}</h2>
      </div>
      <div>
        <iframe
          src={map}
          width="600"
          height="450"
          loading="lazy"
          className="w-full border border-gray-200"
        />
      </div>

      <ul className="relative tablet:columns-2 gap-x-10 mt-8">
        {closeBy?.map((place, index) => (
          <li key={index} className="flex justify-between mb-2">
            <p>{multilangFieldResolver(place.title, lang)}</p>
            <p>{place.distance}</p>
          </li>
        ))}
        <span className="h-full absolute w-0 left-1/2 top-0 border-l border-black hidden tablet:block" />
      </ul>
    </div>
  );
};

export default PropertyLocation;
