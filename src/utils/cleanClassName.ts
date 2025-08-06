export const cleanClassName = (className: string): string => {
  const classes = className
    .trim() // Remove leading and trailing spaces
    .replace(/\r?\n|\r/g, '') // Remove new lines
    .replace(/\s{2,}/g, ' ') // Remove multiple spaces

  return classes
}
