import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        mob: { max: "640px" },
      },
      gridTemplateRows: {
        fixed: "repeat(auto-fill, minmax(9rem, 9rem))",
        mobFixed: "repeat(auto-fill, minmax(auto, auto))",
      },
      backgroundImage: {
        "main-gradient": "url('/backgrounds/gradient_green_5.jpg')",
        "persona-bg": "url('/backgrounds/backdrop_light.png')",
        "dark-mode": "url('/backgrounds/backdrop_dark.png')",
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
        "prompt-admin-large": "url('/img/prompt_admin_large.png')",
        "prompt-hr-large": "url('/img/prompt_hr_large.png')",
        "prompt-intern-large": "url('/img/prompt_intern_large.png')",
        "prompt-law-large": "url('/img/prompt_law_large.png')",
        "prompt-marketing-large": "url('/img/prompt_marketing_large.png')",
        "prompt-teacher-large": "url('/img/prompt_teacher_large.png')",
        "prompt-admin-small": "url('/img/prompt_admin_small.png')",
        "prompt-hr-small": "url('/img/prompt_hr_small.png')",
        "prompt-intern-small": "url('/img/prompt_intern_small.png')",
        "prompt-law-small": "url('/img/prompt_law_small.png')",
        "prompt-marketing-small": "url('/img/prompt_marketing_small.png')",
        "prompt-teacher-small": "url('/img/prompt_teacher_small.png')",
      },
      fontFamily: {
        zain: ["Zain"],
      },
      colors: {
        "airis-primary": "#2A849E",
        "password-v-weak": "#EE4035",
        "password-weak": "#F37736",
        "password-strong": "#FDF498",
        "password-v-strong": "#7BC043",
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
      shimmer: {
        "100%": { transform: "translateX(100%)" },
      },
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
    animation: {
      shimmer: "shimmer 5s infinite",
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
