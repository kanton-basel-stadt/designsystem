"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/core/configs/colors.ts
var colors_exports = {};
__export(colors_exports, {
  colors: () => colors,
  default: () => colors_default
});
module.exports = __toCommonJS(colors_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  colors
});
