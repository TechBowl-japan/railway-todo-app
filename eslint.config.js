import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import pluginReactJSXRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginReactHooks from "eslint-plugin-react-hooks";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      "no-unused-vars": ["error", { varsIgnorePattern: "^React$", argsIgnorePattern: "^_" }],
      "react/prop-types": "off",
      "react/no-deprecated": "off",
    },
  },
  { languageOptions: { globals: globals.browser } },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  pluginJs.configs.recommended,
  pluginReactConfig,
  pluginReactJSXRuntime,
  eslintConfigPrettier,
];