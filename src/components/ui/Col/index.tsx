export const Col = ({
  children,
  className = "",
  as: Component = "div",
}: {
  children?: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) => {
  return <Component className={`px-[8px] ${className}`}>{children}</Component>;
};
