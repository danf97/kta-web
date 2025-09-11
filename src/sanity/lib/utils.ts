import { StringsQueryResult } from "../queries/documents/strings";
import { LinkGlobalObjectQueryResult } from "../queries/objects/linkGlobalObject";

export const sanityLinkResolver = (
  link: LinkGlobalObjectQueryResult,
  actionResolvers: {
    [key: string]: (arg: any) => void;
  }
) => {
  if (link.linkType === "internal") {
    return {
      url: link.internalLink?.url,
      target: "_self",
    };
  } else if (link.linkType === "external") {
    return {
      url: link.externalLink?.url as string,
      target: "_blank",
    };
  } else if (link.linkType === "social") {
    return {
      url: link.externalLink?.url as string,
      target: "_blank",
    };
  } else if (link.linkType === "action") {
    if (link.action === "open_cookie_preferences") {
      console.log("Opening cookie preferences");
      return {
        onClick: (e: any) => {
          console.log("on click: Opening cookie preferences");
          actionResolvers.open_cookie_preferences(true);
        },
      };
    }
  }
};

export const sanityStringResolver = (
  name: keyof StringsQueryResult,
  strings: StringsQueryResult
): string => {
  if (!strings) return "- " + name + " -";
  return name in strings ? strings[name] + "" : "- " + name + " -";
};
