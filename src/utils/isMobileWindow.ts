export const isMobileWindow = () => {
  return typeof window !== 'undefined' && window.innerWidth < 1024
}
