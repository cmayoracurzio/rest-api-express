module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    Promise: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "@typescript-eslint/parser",
    "eslint:recommended",
    "prettier/@typescript-eslint",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
};
