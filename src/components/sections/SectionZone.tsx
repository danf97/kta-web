import { Fragment, jsx } from "react/jsx-runtime";
import { sanitySections } from ".";
import { sectionsQueryResult } from "@/sanity/queries/sections";

type SectionZoneProps = {
  sections?: sectionsQueryResult;
  context?: null | Record<string, unknown>;
};

export const SectionZone = ({ sections, context = {} }: SectionZoneProps) => {
  if (!sections || !Array.isArray(sections) || sections.length === 0) {
    return <div>No sections available.</div>;
  }
  const renderedSections = sections.map((section, index) => {
    const type = "_type" in section ? section._type : undefined;

    if (!type || !(type in sanitySections)) {
      return (
        <div key={"missing" + index}>
          Missing section type &quot;{type ? type : "undefined"}&quot; component
        </div>
      );
    }

    // @ts-expect-error TypeScript doesn't know about dynamic imports
    const Comp = sanitySections[type];
    const key =
      "_key" in section && section._key
        ? section._key
        : `${index}-${JSON.stringify(section)}`;
    if (Comp) {
      return /* @__PURE__ */ jsx(
        Comp,
        { section, index, sections, context },
        key
      );
    }
  });
  return /* @__PURE__ */ jsx(Fragment, { children: renderedSections });
};
