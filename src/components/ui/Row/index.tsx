import React from "react";

export const Row = ({
  children,
  className = "",
  as: Component = "div",
  ref,
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  ref?: React.Ref<HTMLElement>;
}) => {
  return (
    <Component
      ref={ref}
      className={`m-auto flex w-full max-w-[1440px] flex-row flex-wrap px-[calc(24px-8px)] smallDesktop:px-[calc(80px-16px)] ${className}`}
    >
      {children}
    </Component>
  );
};
