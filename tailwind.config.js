/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        primary_100: "#A30162",
        primary_200: "#FFF0FB",
        primary_300: "#FFF0FB",
        secondary_100: "#F57B00",
        secondary_200: "#600034",
        secondary_300: "#FF9500",
        grey_100: "#767779",
        grey_200: "#868B90",
        dark_100: "#000000",
        dark_200: "#0D080B",
        dark_300: "#0A162D",
        background_100: "#F1F5F8",
        blue_100: "#007AFF",
        green_100: "#34C759",
        pink_100: "#FAF5F8",
        border_color: "#0000001F",
        MODAL_BACKGROUND: "rgba(11, 12, 14, 0.77)",
      },
    },
  },
  plugins: [],
}

