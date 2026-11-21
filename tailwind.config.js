// The CSS variables in src/index.css hold complete colours, e.g. --primary: oklch(0.205 0 0).
// color-mix lets Tailwind's opacity modifiers (bg-primary/80, outline-ring/50) work with them:
// <alpha-value> becomes 0.8 for "/80", and 1 when there is no modifier.
const themeColor = (name) =>
  `color-mix(in oklch, var(--${name}) calc(<alpha-value> * 100%), transparent)`;

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: themeColor("background"),
        foreground: themeColor("foreground"),
        card: {
          DEFAULT: themeColor("card"),
          foreground: themeColor("card-foreground"),
        },
        popover: {
          DEFAULT: themeColor("popover"),
          foreground: themeColor("popover-foreground"),
        },
        primary: {
          DEFAULT: themeColor("primary"),
          foreground: themeColor("primary-foreground"),
        },
        secondary: {
          DEFAULT: themeColor("secondary"),
          foreground: themeColor("secondary-foreground"),
        },
        muted: {
          DEFAULT: themeColor("muted"),
          foreground: themeColor("muted-foreground"),
        },
        accent: {
          DEFAULT: themeColor("accent"),
          foreground: themeColor("accent-foreground"),
        },
        destructive: {
          DEFAULT: themeColor("destructive"),
          foreground: themeColor("destructive-foreground"),
        },
        border: themeColor("border"),
        input: themeColor("input"),
        ring: themeColor("ring"),
        chart: {
          1: themeColor("chart-1"),
          2: themeColor("chart-2"),
          3: themeColor("chart-3"),
          4: themeColor("chart-4"),
          5: themeColor("chart-5"),
        },
      },
    },
  },
  plugins: [],
};
