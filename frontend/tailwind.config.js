/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        sacri: {
          "primary": "#34D399",
          "secondary": "#2DB3C7",
          "accent": "#CDECF9",
          "neutral": "#1f2937",
          "base-100": "#ffffff",
          "info": "#A8E6A3",
          "success": "#A8E6A3",
          "warning": "#fbbf24",
          "error": "#ef4444"
        }
      },
      "light"
    ]
  }
};
