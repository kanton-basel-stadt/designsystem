"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/core/configs/tailwind.config.ts
var tailwind_config_exports = {};
__export(tailwind_config_exports, {
  default: () => tailwind_config_default
});
module.exports = __toCommonJS(tailwind_config_exports);
var import_node_path = __toESM(require("path"), 1);
var import_node_fs = __toESM(require("fs"), 1);
var import_plugin = __toESM(require("tailwindcss/plugin.js"), 1);

// src/core/configs/colors.ts
var colors = {
  green: {
    50: "#F2F7F3",
    100: "#DDECDE",
    200: "#B8D6BE",
    300: "#7BB589",
    400: "#469A5D",
    500: "#2A9749",
    600: "#32834A",
    700: "#2A713F",
    800: "#245333",
    900: "#1F402A"
  },
  blue: {
    50: "#F2FDFF",
    100: "#DBF9FF",
    200: "#B6EDFA",
    300: "#85D4EE",
    400: "#51b9da",
    500: "#079BCA",
    600: "#0E81A7",
    700: "#146C8B",
    800: "#1B5268",
    900: "#1E4557"
  },
  purple: {
    50: "#F9F6FD",
    100: "#F4EDFA",
    200: "#E8DAF4",
    300: "#D7BDEA",
    400: "#C196DC",
    500: "#A56CC9",
    600: "#9156B4",
    700: "#723D8E",
    800: "#5F3375",
    900: "#512E61"
  },
  red: {
    50: "#FFF1EF",
    100: "#FFE0DC",
    200: "#FFC7BF",
    300: "#FF9F92",
    400: "#FF6854",
    500: "#FF3A1F",
    600: "#FF1E00",
    700: "#DB1A00",
    800: "#B81600",
    900: "#941908"
  },
  gray: {
    20: "#F8F8F8",
    50: "#F2F2F2",
    100: "#EBEBEB",
    200: "#E3E3E3",
    300: "#BABABA",
    400: "#A5A5A5",
    500: "#949494",
    600: "#777777",
    700: "#535353",
    800: "#403F3F",
    900: "#333333"
  },
  brown: {
    50: "#FAF6F4",
    100: "#F0E4DD",
    200: "#DCC3B0",
    300: "#BF9A7A",
    400: "#A57251",
    500: "#8B5734",
    600: "#73472A",
    700: "#5B3821",
    800: "#45301B",
    900: "#362718"
  },
  yellow: {
    50: "#FFFDF2",
    100: "#FFF5CC",
    200: "#FFE699",
    300: "#FFCF4D",
    400: "#FFBB1A",
    500: "#FFAA00",
    600: "#E69500",
    700: "#B37700",
    800: "#805900",
    900: "#664700"
  },
  teal: {
    50: "#F2FCFA",
    100: "#CFF5EF",
    200: "#9AEADC",
    300: "#5BDCC5",
    400: "#29C9A9",
    500: "#00B590",
    600: "#009A79",
    700: "#007D63",
    800: "#005F4A",
    900: "#004C3B"
  }
};
var colors_default = colors;

// src/core/configs/tailwind.config.ts
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
var colorsShaded = Object.keys(colors_default).reduce(
  (acc, color) => {
    const shades = colors_default[color];
    Object.entries(shades).forEach(([shade, hex]) => {
      acc[color + "-" + shade] = hex;
    });
    return acc;
  },
  {}
);
var projectRoot = import_node_path.default.resolve(".");
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
    ...dirCandidates.map((d) => `${path2}/${d}`).filter((d) => import_node_fs.default.existsSync(d)).map((d) => `${d}/**/*.{${fileEndings}}`),
    ...fileCandidates.map((f) => `${path2}/${f}`).filter((f) => import_node_fs.default.existsSync(f))
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
    (0, import_plugin.default)(function({ addVariant }) {
      addVariant(
        "mobile-only",
        "@media screen and (max-width: theme('screens.md'))"
      );
      addVariant("not-last", "&:not(:last-child)");
      addVariant("not-first", "&:not(:first-child)");
    }),
    (0, import_plugin.default)(function({ matchUtilities, theme }) {
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
      ...colorsShaded,
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
