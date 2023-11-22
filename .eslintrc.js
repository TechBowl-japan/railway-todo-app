module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended", // Prettierとの連携
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["prettier", "react-hooks"], // プラグインの追加
  rules: {
    "prettier/prettier": "error", // Prettierのルールをエラーとして扱う
    "react-hooks/rules-of-hooks": "error", // react-hooksのルールを追加
    "react-hooks/exhaustive-deps": "warn", // react-hooksのルールを追加
  },
};
