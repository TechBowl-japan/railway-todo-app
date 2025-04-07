import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";


export default defineConfig([
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser, // ← ブラウザ環境の変数をOKにする
        ...globals.jest,
        process: "readonly" // ← Node.js の process も読み取りだけOKにする
      }
    },
    plugins: {
      js,
      react: pluginReact,
    },
    settings: {
      react: {
        version: "detect", //自動でReactバージョンを検出
      },
    },
    rules: {
      "react/prop-types": "off", //追記 eslint対策
      // "no-unused-vars": "warn",
      // "react/react-in-jsx-scope": "off",
    },
    extends: ["js/recommended"]
  },

]);