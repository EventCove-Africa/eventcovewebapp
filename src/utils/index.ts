export const openNewTabWithUrl = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

export function redirectUrls(route: string) {
  if (typeof window !== "undefined") {
    window.location.href = route;
  }
}
// Framer Motion animation variants
export const animationVariants = {
  hidden: { opacity: 0, y: 20 }, // Initial state: slightly below and invisible
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }, // Ease-in animation
};
