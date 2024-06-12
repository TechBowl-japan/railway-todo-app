/* eslint-disable import/no-anonymous-default-export */
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";


export default [
  {languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.es2021,
      ...globals.node,
      ...globals.jquery,
    },
  }},
  pluginJs.configs.recommended,
  pluginReactConfig,
  { files: ["**/*.jsx"], languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  {
    files: ["**/*.{jsx,js}"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": "off",
      "react/prop-types": "off",
    },
  },
];