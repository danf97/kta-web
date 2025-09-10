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
      return {
        // @ts-expect-error
        onClick: (e: any) => actionResolvers.open_cookie_preferences(true),
      };
    } else if (link.action === "open_bag") {
      return {
        // @ts-ignore
        onClick: (e: any) => actionResolvers.open_bag(),
      };
    } else if (link.action === "open_my_account") {
      return {
        // @ts-ignore
        onClick: (e: any) => actionResolvers.open_my_account(),
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
