import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import babelParser from "@babel/eslint-parser";


export default defineConfig([
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
      },
      
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest, // test/expect 対策
      },
      ecmaVersion: 2022,
      sourceType: "module",
    },
    plugins: {
      js,
      react: pluginReact,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      "react/react-in-jsx-scope": "off", // React 17以降なら不要
      "react/prop-types": "off", // prop-types使ってないならオフ
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);
