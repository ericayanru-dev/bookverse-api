const js = require("@eslint/js");
const globals = require("globals");
const prettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = [
  js.configs.recommended,
  prettierRecommended,

  {
    files: ["**/*.js"],

    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "script",
      globals: {
        ...globals.node,
  
      },
    },

    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      // Do NOT define prettier rules here → let .prettierrc handle them
    },
  },

  {
    ignores: ["node_modules/**", "dist/**", ".github/**"],
  },
];
