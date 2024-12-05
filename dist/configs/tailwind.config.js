import {
  colors_default
} from "../chunk-GSDZ27FW.js";
import "../chunk-3RG5ZIWI.js";

// src/core/configs/tailwind.config.ts
import path from "node:path";
import fs from "node:fs";
import plugin from "tailwindcss/plugin.js";
var customContent = {
  "arrow-east": '"\u2192"',
  "arrow-west": '"\u2190"',
  "arrow-north-east": '"\u2197"',
  "arrow-south": '"\u2193"',
  "underscore-long": '"\uE08A"',
  cross: '"\u2717"',
  plus: '"\uE09D"',
  reload: '"\u21BB"',
  check: '"\u2713"',
  "caret-south": '"\u2304"',
  "caret-north": '"\u2303"',
  dot: '"\u2022"',
  empty: '""'
};
var zIndex = ["app-top", "alva", "search-input-suggestions"].reduce((acc, key, index) => {
  acc[key] = (300 + index * 10).toString();
  return acc;
}, {});
var fontSize = {
  "9xl": ["128px", "128px"],
  "8xl": ["96px", "96px"],
  "7xl": ["72px", "72px"],
  "6xl": ["60px", "60px"],
  "5xl": ["48px", "48px"],
  "4xl": ["36px", "40px"],
  "3xl": ["30px", "34px"],
  "2xl": ["24px", "32px"],
  xl: ["20px", "28px"],
  lg: ["18px", "24px"],
  base: ["16px", "22px"],
  sm: ["14px", "20px"],
  xs: ["12px", "18px"]
};
var colors = Object.keys(colors_default).reduce(
  (acc, color) => {
    const shades = colors_default[color];
    Object.entries(shades).forEach(([shade, hex]) => {
      acc[color + "-" + shade] = hex;
    });
    return acc;
  },
  {}
);
var projectRoot = path.resolve(".");
function getContentDependencies(path2) {
  const fileEndings = [
    "html",
    "js",
    "ts",
    "jsx",
    "tsx",
    "vue",
    "astro",
    "svelte",
    "mdx"
  ].join(",");
  const dirCandidates = [
    "components",
    "pages",
    "layouts",
    "helpers",
    "stories",
    "dist",
    "src"
  ];
  const fileCandidates = [
    // We also need to check the Formkit config to not
    // purge classes away that are only used there.
    // This _would_ offer Formkit support, if any project
    // decides to use it. We won't support any other form
    // framework for the time being, as this is meant to
    // be otherwise framework-agnostic.
    "/formkit.config.ts"
  ];
  return [
    `./*.{${fileEndings}`,
    ...dirCandidates.map((d) => `${path2}/${d}`).filter((d) => fs.existsSync(d)).map((d) => `${d}/**/*.{${fileEndings}}`),
    ...fileCandidates.map((f) => `${path2}/${f}`).filter((f) => fs.existsSync(f))
  ];
}
var config = {
  content: getContentDependencies(projectRoot),
  safelist: ["h-0"],
  blocklist: [],
  plugins: [
    /**
     * Various additional variants
     */
    plugin(function({ addVariant }) {
      addVariant(
        "mobile-only",
        "@media screen and (max-width: theme('screens.md'))"
      );
      addVariant("not-last", "&:not(:last-child)");
      addVariant("not-first", "&:not(:first-child)");
    }),
    plugin(function({ matchUtilities, theme }) {
      matchUtilities(
        {
          "animation-rotation": (value) => ({
            "--animation-rotation": value
          })
        },
        {
          values: theme("rotate"),
          type: "any"
        }
      );
      matchUtilities(
        {
          "animation-duration": (value) => ({
            "--animation-duration": value
          })
        },
        {
          values: theme("transitionDuration"),
          type: "any"
        }
      );
      matchUtilities(
        {
          content: (content) => {
            return {
              // `/ ""` acts as an alt text for the `content`, which is then read by screen readers instead.
              // If empty, the content will be ignored. See https://developer.mozilla.org/en-US/docs/Web/CSS/content
              // Defining an array here will create two CSS content properties, where the first one is the fallback
              // for browsers that don't support the syntax with alt text.
              content: [content, `${content} / ""`]
            };
          }
        },
        {
          values: theme("customContent")
        }
      );
    })
  ],
  corePlugins: {
    textOpacity: false,
    container: false,
    // Disabled because we have our own implementation that adds a fallback.
    content: false
  },
  theme: {
    customContent,
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1210px",
      xxl: "1920px"
    },
    spacing: {
      220: "220px",
      140: "140px",
      120: "120px",
      100: "100px",
      90: "90px",
      80: "80px",
      70: "70px",
      60: "60px",
      50: "50px",
      40: "40px",
      35: "35px",
      30: "30px",
      25: "25px",
      20: "20px",
      15: "15px",
      10: "10px",
      8: "8px",
      6: "6px",
      5: "5px",
      3: "3px",
      2: "2px",
      1: "1px",
      0: "0px",
      "sticky-top": "var(--base-sticky-top)"
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px"
    },
    maxWidth: {
      reduced: "970px",
      // @todo: Consolidate sizing with container, max-width and other layout classes.
      prose: "836px",
      box: "610px",
      fit: "fit-content"
    },
    lineHeight: {
      none: "1",
      tight: "1.2",
      snug: "1.3",
      normal: "1.4"
    },
    fontSize,
    fontFamily: {
      sans: [
        "Inter",
        "Inter Fallback",
        "Helvetica Neue",
        "Helvetica",
        "Arial",
        "sans-serif"
      ]
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      bold: "700"
    },
    borderRadius: {
      none: "0px",
      full: "9999px",
      large: "10px",
      DEFAULT: "4px"
    },
    colors: {
      // Monochrome colors.
      white: "#ffffff",
      current: "currentColor",
      transparent: "transparent",
      body: "black",
      ...colors,
      // The dynamic CSS variable based primary color which is overriden by the Bettingen site at runtime.
      primary: {
        50: "rgb(var(--color-primary-50) / <alpha-value>)",
        100: "rgb(var(--color-primary-100) / <alpha-value>)",
        200: "rgb(var(--color-primary-200) / <alpha-value>)",
        300: "rgb(var(--color-primary-300) / <alpha-value>)",
        400: "rgb(var(--color-primary-400) / <alpha-value>)",
        500: "rgb(var(--color-primary-500) / <alpha-value>)",
        600: "rgb(var(--color-primary-600) / <alpha-value>)",
        700: "rgb(var(--color-primary-700) / <alpha-value>)",
        800: "rgb(var(--color-primary-800) / <alpha-value>)",
        900: "rgb(var(--color-primary-900) / <alpha-value>)"
      }
    },
    extend: {
      zIndex,
      gap: {
        DEFAULT: "20px"
      },
      transitionDuration: {
        250: "250ms"
      },
      transitionTimingFunction: {
        swing: "cubic-bezier(0.56, 0.04, 0.25, 1)",
        momentum: "cubic-bezier(1,-0.76,.46,1.01)"
      },
      boxShadow: {
        "purple-600": "0 0 10px 0 #9156B4",
        none: "0 0 0 0 #000"
      },
      keyframes: {
        "jump-x": {
          "0%": {
            // eslint-disable-next-line sonarjs/no-duplicate-string
            transform: "translateX(0)"
          },
          "20%": {
            transform: "translateX(0.15em)"
          },
          "60%": {
            transform: "translateX(-0.15em)"
          },
          "100%": {
            transform: "translateX(0)"
          }
        },
        "jump-y": {
          "0%": {
            transform: "translateY(0)"
          },
          "20%": {
            transform: "translateY(0.15em)"
          },
          "60%": {
            transform: "translateY(-0.15em)"
          },
          "100%": {
            transform: "translateY(0)"
          }
        },
        "jump-x-reverse": {
          "0%": {
            transform: "translateX(0)"
          },
          "20%": {
            transform: "translateX(-0.15em)"
          },
          "60%": {
            transform: "translateX(0.15em)"
          },
          "100%": {
            transform: "translateX(0)"
          }
        },
        "jump-xy": {
          "0%": {
            transform: "translate(0, 0)"
          },
          "20%": {
            transform: "translate(0.15em, -0.15em)"
          },
          "60%": {
            transform: "translate(-0.1em, 0.1em)"
          },
          "100%": {
            transform: "translate(0, 0)"
          }
        },
        "jump-scale": {
          "0%": {
            transform: "scale(1)"
          },
          "20%": {
            transform: "scale(1.3)"
          },
          "60%": {
            transform: "scale(0.9)"
          },
          "100%": {
            transform: "scale(1)"
          }
        },
        wiggle: {
          "0%": {
            // eslint-disable-next-line sonarjs/no-duplicate-string
            transform: "rotate(0deg)"
          },
          "20%": {
            transform: "rotate(var(--animation-rotation, 15deg))"
          },
          "40%": {
            transform: "rotate(calc(-1 * var(--animation-rotation, 15deg)))"
          },
          "60%": {
            transform: "rotate(var(--animation-rotation, 15deg))"
          },
          "80%": {
            transform: "rotate(calc(-1 * var(--animation-rotation, 15deg)))"
          },
          "100%": {
            transform: "rotate(0deg)"
          }
        },
        rotate: {
          from: {
            transform: "rotate(0deg)"
          },
          to: {
            transform: "rotate(var(--animation-rotation, 360deg))"
          }
        }
      },
      animation: {
        "jump-x": `jump-x var(--animation-duration, 0.4s) ease-in-out`,
        "jump-y": `jump-y var(--animation-duration, 0.5s) ease-in-out`,
        "jump-scale": `jump-scale var(--animation-duration, 0.5s) ease-in-out`,
        "jump-x-reverse": "jump-x-reverse var(--animation-duration, 0.5s) ease-in-out",
        "jump-xy": "jump-xy var(--animation-duration, 0.5s) ease-in-out",
        wiggle: "wiggle var(--animation-duration, 0.5s) linear",
        rotate: "rotate var(--animation-duration, 0.5s) ease-in-out",
        "rotate-infinite": "rotate var(--animation-duration, 0.5s) linear infinite"
      }
    }
  }
};
var tailwind_config_default = config;
export {
  tailwind_config_default as default
};
