// 定义 ImportMetaEnv 接口，表示 import.meta.env 对象的类型
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // 更多环境变量...
  [x: string]: any;
}

// 定义 ImportMeta 接口，表示 import.meta 对象的类型
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// 声明一个模块为 .md 后缀的文件的导入类型
declare module '*.md' {
  const Component: ComponentOptions; // 导入的组件类型为 ComponentOptions
  export default Component; // 默认导出 Component
}
