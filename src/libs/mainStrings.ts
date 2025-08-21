const mainStrings = {
  // Property
  people: {
    en: "people",
    pt: "pessoas",
  },
  bedrooms: {
    en: "bedrooms",
    pt: "quartos",
  },
  double_beds: {
    en: "double beds",
    pt: "camas de casal",
  },
  single_beds: {
    en: "single beds",
    pt: "camas de solteiro",
  },
  sofa_beds: {
    en: "sofa beds",
    pt: "sofás-camas",
  },
  wc: {
    en: "wc",
    pt: "wc",
  },
} as const;

type MainStringsType = typeof mainStrings;

export const mainStringsResolver = (
  key: keyof MainStringsType,
  lang: string
) => {
  // @ts-expect-error
  return mainStrings?.[key]?.[lang] || `{${key}}`;
};
