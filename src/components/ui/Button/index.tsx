"use client";

// import { linkResolverClient } from "@/lib/utils";
import { LinkGlobalObjectQueryResult } from "@/sanity/queries/objects/linkGlobalObject";
import { sanityLinkResolver } from "@/sanity/lib/utils";
import Link from "next/link";
import { cleanClassName } from "@/utils/cleanClassName";
import { useRouter } from "next/navigation";

export type ButtonStyles = {
  primary: {
    idle: string;
    active: string;
    disabled: string;
  };
  secondary: {
    idle: string;
    active: string;
    disabled: string;
  };
  ghost: {
    idle: string;
    active: string;
    disabled: string;
  };
};

export const buttonStyles = {
  primary: {
    idle: "cursor-pointer bg-black text-white rounded-3xl hover:bg-gray",
    active: "bg-gray text-white rounded-md rounded-3xl",
    disabled: "bg-neutral-400 text-white pointer-events-none rounded-3xl",
  },
  secondary: {
    idle: "cursor-pointer bg-orange-light text-black rounded-3xl hover:bg-orange",
    active: "bg-orange text-black rounded-md rounded-3xl",
    disabled: "bg-neutral-400 text-white pointer-events-none rounded-3xl",
  },
  ghost: {
    idle: "cursor-pointer bg-transperant text-black rounded-3xl hover:bg-orange",
    active:
      "cursor-pointer bg-orange-light text-black rounded-3xl hover:bg-orange",
    disabled: "bg-transperant text-black rounded-3xl hover:bg-orange",
  },
} as ButtonStyles;

export const buttonSizesStyles = {
  large: "h-16 py-3 px-5 body-m",
  medium: "py-3 px-5 body-s-bold pt-[9px]",
  small:
    "py-3 px-3 body-16 pt-[9px] flex justify-center items-center [&>svg]:w-4 [&>svg]:h-4",
  icon: "h-8 w-8 flex justify-center items-center [&>svg]:w-4 [&>svg]:h-4",
};

export const Button = ({
  className = "",
  type = "primary",
  state = "idle",
  size = "medium",
  onClick,
  href,
  link,
  leftIcon,
  rightIcon,
  isLoading,
  label,
  disablePageLoadAnimation,
}: {
  className?: string;
  type: "primary" | "secondary" | "ghost";
  state?: "idle" | "active" | "disabled";
  size?: "large" | "medium" | "small" | "icon";
  onClick?: (e: any) => void;
  link?: LinkGlobalObjectQueryResult;
  href?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  label?: string;
  disablePageLoadAnimation?: boolean;
}) => {
  const router = useRouter();
  // const { setPageLoading, handleMiniCart } = useContext(AppContext)
  // const { setShowPreferences } = useContext(CookiesContext)

  const actionResolvers = {
    test: () => {
      console.log("test");
    },
  };

  const LinkData =
    link && "linkType" in link
      ? sanityLinkResolver(link, actionResolvers)
      : null;

  const hasUrl = LinkData && "url" in LinkData && LinkData.url !== null;
  const classNames = cleanClassName(
    `
    group/btn
    relative z-[1]
    inline-flex items-center justify-center
    ` +
      (" " + buttonSizesStyles[size]) +
      (" " + buttonStyles[type][isLoading ? "active" : state]) +
      (" " + className)
  );

  const ButtonContent = () => (
    <>
      {leftIcon ? leftIcon : null}
      {label ? (
        <span
          className={`mb-[-2px] transition-opacity duration-100 ${
            isLoading ? "opacity-0" : ""
          }`}
        >
          {label}
        </span>
      ) : null}
      {rightIcon ? rightIcon : null}
    </>
  );

  const onClickHandler = (e: any) => {
    if (isLoading) return null;

    // if (!disablePageLoadAnimation) {
    //   setPageLoading(true)
    // }

    if (onClick) {
      onClick(e);
    }
  };

  return hasUrl || href ? (
    <Link
      href={"#"}
      className={classNames}
      role="button"
      onClick={onClickHandler}
    >
      {ButtonContent()}
    </Link>
  ) : (
    <button
      className={classNames}
      onClick={onClickHandler}
      disabled={state === "disabled"}
    >
      {ButtonContent()}
    </button>
  );
};
