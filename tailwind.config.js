/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xss: ["12px", { lineHeight: "24px" }],
      xs: ["14px", { lineHeight: "24px" }],
      sm: ["16px", { lineHeight: "28px" }],
      lg: ["18px", { lineHeight: "28px" }],
      xl: ["24px", { lineHeight: "36px" }],
      "2xl": ["32px", { lineHeight: "48px" }],
      "3xl": ["40px", { lineHeight: "52px" }],
      "4xl": ["56px", { lineHeight: "64px" }],
    },
    extend: {
      boxShadow: {
        "border-figma": "0 2px 0px 0 rgba(0,0, 0, 1)", // New custom box shadow
      },
      boxShadow: {
        button:
          "inset 0px 1px 0px 0px #fff,0px 0px 0px 1px rgba(0,0,0,.06),0px 1px 0px 0px rgba(0,0,0,.08),0px 2px 2px 0px rgba(0,0,0,.04),0px 3px 3px 0px rgba(0,0,0,.02),0px 4px 4px 0px rgba(0,0,0,.01);",
        "button-dark":
          "0px -1px 0px 0px hsla(0,0%,100%,.04),0px 0px 0px 1px hsla(0,0%,100%,.12),0px 0px 1px 0px rgba(0,0,0,.04),0px 2px 2px 0px rgba(0,0,0,.04),0px 4px 2px 0px rgba(0,0,0,.04),0px 6px 3px 0px rgba(0,0,0,.04)",
      },
    },
  },
  plugins: [],
};
