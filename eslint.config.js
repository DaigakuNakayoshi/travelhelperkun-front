import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import typescriptParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, reactPlugin.configs.flat.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: typescriptParser,
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
  eslintConfigPrettier
);
