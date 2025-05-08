import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import { version } from "react";


export default defineConfig([
  //react/prop-typesを優先させるため、上へ移動。
  pluginReact.configs.flat.recommended, //↓ESLint の "React用の推奨設定"
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        process: "readonly", // const.js。ビルドツールで内部的にprocess.env展開
      }
    },
    settings: {
      react: {
        version: "19.0.0"
      }
    },
    rules: { //rules:を記載すると、pluginReactが必要
      "react/prop-types": "off" ////ES Lintのflat configでは下の設定が優先。
    },
    plugins: {
      js,
      react: pluginReact //FlatConfigで必要。react:ESLintでreactを認識させるプラグイン名の変数割当ラベル。Reactの構文チェック
    },
    extends: ["js/recommended"]
  },

]);