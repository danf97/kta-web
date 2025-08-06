export const Col = ({
  children,
  className = '',
  as: Component = 'div',
}: {
  children?: React.ReactNode
  className?: string
  as?: React.ElementType
}) => {
  return (
    <Component className={`px-[8px] smallDesktop:px-[12px] ${className}`}>
      {children}
    </Component>
  )
}
