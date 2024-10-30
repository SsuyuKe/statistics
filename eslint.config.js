import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    rules: {
      "react/react-in-jsx-scope": "off", // 禁用 JSX 需要导入 React 的规则
      "react/jsx-uses-react": "off", // 禁用 React 的未使用变量报错
      "react/prop-types": "off", // 禁用 prop-types 检查
      "no-undef": "off",
      "no-unused-vars": "off",
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier,
];
