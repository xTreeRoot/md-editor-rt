module.exports = {
  // 设置环境，指定在浏览器、ES2021 和 Node.js 环境下进行检查
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  // 继承的规则配置
  extends: [
    'eslint:recommended', // 使用 ESLint 推荐的规则
    'plugin:react/recommended', // 使用 React 插件的推荐规则
    'plugin:@typescript-eslint/recommended' // 使用 TypeScript ESLint 推荐的规则
  ],
  // 针对特定文件的覆盖规则配置，这里为空
  overrides: [],
  // 指定解析器为 @typescript-eslint/parser
  parser: '@typescript-eslint/parser',
  // 解析器选项配置
  parserOptions: {
    ecmaVersion: 'latest', // 使用最新的 ECMAScript 版本
    sourceType: 'module' // 使用模块化的语法
  },
  // 使用的插件
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  // 规则配置
  rules: {
    'linebreak-style': ['error', 'unix'], // 强制使用 Unix 格式的换行符
    quotes: ['error', 'single'], // 强制使用单引号
    semi: ['error', 'always'], // 强制使用分号
    '@typescript-eslint/no-explicit-any': 'off', // 允许使用 any 类型
    '@typescript-eslint/no-empty-function': 'off', // 允许空函数
    'react/display-name': 'off', // 允许匿名组件
    'react/react-in-jsx-scope': 'error', // 要求在 JSX 中引入 React
    'react-hooks/rules-of-hooks': 'error', // 强制执行 Hooks 的规则
    'react-hooks/exhaustive-deps': 'warn', // 提示缺少依赖项的 Hooks
    '@typescript-eslint/no-non-null-assertion': 'off' // 允许使用非空断言操作符
  }
};
