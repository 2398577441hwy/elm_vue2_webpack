module.exports = {
  // 继承 Eslint 规则
  extends: ["eslint:recommended"],
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
  },
  parserOptions: {
    ecmaVersion: 2022, // es6
    sourceType: "module", // es module
  },
  rules: {
    "no-var": 0, // 不能使用 var 定义变量
    // 禁止未使用的变量
    'no-unused-vars':0,
    'no-useless-escape':0,
    'no-empty':0,
    'getter-return':0,
    'no-compare-neg-zero':0,
    'no-undef':0
  },
};
