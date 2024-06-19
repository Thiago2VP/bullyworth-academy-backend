// eslint.config.js
const js = require("@eslint/js");
const { default: eslintConfig } = require("./eslint.config.mjs");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = [
  (js.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  }),
  eslintPluginPrettierRecommended,
];
