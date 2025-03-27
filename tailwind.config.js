/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xsss: ["10px", { lineHeight: "16px" }],
      xss: ["12px", { lineHeight: "18px" }],
      xs: ["14px", { lineHeight: "24px" }],
      sm: ["16px", { lineHeight: "28px" }],
      lg: ["18px", { lineHeight: "28px" }],
      xl: ["24px", { lineHeight: "36px" }],
      "2xl": ["32px", { lineHeight: "48px" }],
      "3xl": ["40px", { lineHeight: "52px" }],
      "4xl": ["56px", { lineHeight: "64px" }],
    },
    extend: {
      colors: {
        scarlet: {
          50: "#fff4ec",
          100: "#ffe6d3",
          200: "#ffc8a5",
          300: "#ffa26d",
          400: "#ff7032",
          500: "#ff490a",
          600: "#ff2e00",
          700: "#cc1c02",
          800: "#a1180b",
          900: "#82170c",
          950: "#460704",
        },
      },
      boxShadow: {
        button:
          "inset 0px 1px 0px 0px #fff,0px 0px 0px 1px rgba(0,0,0,.06),0px 1px 0px 0px rgba(0,0,0,.08),0px 2px 2px 0px rgba(0,0,0,.04),0px 3px 3px 0px rgba(0,0,0,.02),0px 4px 4px 0px rgba(0,0,0,.01);",
        "button-dark":
          "0px -1px 0px 0px hsla(0,0%,100%,.04),0px 0px 0px 1px hsla(0,0%,100%,.12),0px 0px 1px 0px rgba(0,0,0,.04),0px 2px 2px 0px rgba(0,0,0,.04),0px 4px 2px 0px rgba(0,0,0,.04),0px 6px 3px 0px rgba(0,0,0,.04)",
        "button-base":
          "0px 1px 1px -1px rgba(0,0,0,.08),0px 2px 2px -1px rgba(0,0,0,.08),0px 0px 0px 1px rgba(0,0,0,.06),inset 0px 1px 0px #fff,inset 0px 1px 2px 1px #fff,inset 0px 1px 2px rgba(0,0,0,.06)",
      },
    },
  },
  plugins: [],
};
