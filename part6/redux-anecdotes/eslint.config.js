import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    languageOptions: { globals: globals.browser },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"]
    }
  },
  pluginReact.configs.flat.recommended,
];
