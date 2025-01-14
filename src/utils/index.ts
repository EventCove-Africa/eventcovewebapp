export const openNewTabWithUrl = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  
  export function redirectUrls(route: string) {
    if (typeof window !== "undefined") {
      window.location.href = route;
    }
  }
  