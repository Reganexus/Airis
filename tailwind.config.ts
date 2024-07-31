import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "main-gradient": "url('/backgrounds/gradient_green_5.jpg')",
        "persona-bg": "url('/backgrounds/backdrop_light.png')",
        feature1: "url('/img/feature_1.png')",
        feature2: "url('/img/feature_2.png')",
        feature3: "url('/img/feature_3.png')",
        flog1: "url('/img/feature_1_small.png')",
        flog2: "url('/img/feature_2_small.png')",
        flog3: "url('/img/feature_3_small.png')",
        pricing: "url('/backgrounds/backdrop_dark.png')",
        plus: "url('/backgrounds/gradient_green_4.jpg')",
        premium: "url('/backgrounds/gradient_3.jpg')",
        entry: "url('/backgrounds/backdrop_entry.png')",
      },
      fontFamily: {
        zain: ["Zain"],
      },
      colors: {
        "ai-intern": "#3CA2D1",
        "ai-marketing": "#AE729F",
        "ai-hr": "#532B48",
        "ai-law": "#5BA4AF",
        "ai-admin": "#912937",
        "ai-teacher": "#D16F50",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "#305F8C",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },

    keyframes: {
      "accordion-down": {
        from: {
          height: "0",
        },
        to: {
          height: "var(--radix-accordion-content-height)",
        },
      },
      "accordion-up": {
        from: {
          height: "var(--radix-accordion-content-height)",
        },
        to: {
          height: "0",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
