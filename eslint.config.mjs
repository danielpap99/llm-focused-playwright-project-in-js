import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.node
    },
    rules: {
      "semi": ["error", "always"],               // require semicolons
      "indent": ["error", 2],                   // enforce 2-space indentation
      "no-console": "warn",                       // warn on console statements
      "comma-dangle": ["error", "never"],       // disallow trailing commas
      "no-unused-vars": ["warn"]               // warn on unused variables
    }
  }
]);
