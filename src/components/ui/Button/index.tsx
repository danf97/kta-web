"use client";

// import { linkResolverClient } from "@/lib/utils";
import { LinkGlobalObjectQueryResult } from "@/sanity/queries/objects/linkGlobalObject";
import { sanityLinkResolver } from "@/sanity/lib/utils";
import Link from "next/link";
import { cleanClassName } from "@/utils/cleanClassName";
import { useRouter } from "next/navigation";
import { CookiesContext } from "@/app/context/CookiesContext";
import { useContext } from "react";

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
    active: "bg-gray text-white rounded-3xl",
    disabled: "bg-neutral-400 text-white pointer-events-none rounded-3xl",
  },
  secondary: {
    idle: "cursor-pointer bg-orange-light text-black rounded-3xl hover:bg-orange",
    active: "bg-orange text-black rounded-3xl",
    disabled: "bg-orange text-black rounded-3xl pointer-events-none",
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  const { setShowPreferences } = useContext(CookiesContext);

  const actionResolvers = {
    open_cookie_preferences: () => {
      console.log("Opening cookie preferences");
      setShowPreferences(true);
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

      {isLoading && (
        <div role="status" className="absolute">
          <svg
            aria-hidden="true"
            className="w-6 h-6 text-[#ffffff66] animate-spin fill-white"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </>
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onClickHandler = (e: any) => {
    console.log("click", link);
    if (isLoading) return null;

    // if (!disablePageLoadAnimation) {
    //   setPageLoading(true)
    // }

    if (LinkData?.onClick) {
      LinkData.onClick(e);
    }

    if (onClick) {
      onClick(e);
    }
  };

  return hasUrl || href ? (
    <Link
      href={LinkData?.url || href || "#"}
      target={LinkData?.target || "_self"}
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
