import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      prettier: require("eslint-plugin-prettier"),
    },
    rules: {
      ...js.configs.recommended.rules,
      "prettier/prettier": [
        "error",
        {
          singleQuote: false,
          semi: true,
          endOfLine: "lf",
          trailingComma: "es5",
          tabWidth: 2,
          printWidth: 100,
        },
      ],
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
  },
]);
