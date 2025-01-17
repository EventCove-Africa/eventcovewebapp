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

export function formatToNaira(amount: number): string {
  if (isNaN(amount)) {
    throw new Error("Invalid amount provided. Please provide a valid number.");
  }

  return `₦${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export const eventTypeStyles: Record<string, string> = {
  upcoming: "bg-yellow_100 text-yellow_200",
  completed: "bg-green_300 text-green_200",
  cancelled: "bg-primary_300 text-primary_100",
};
