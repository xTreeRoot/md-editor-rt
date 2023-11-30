import path from 'path'; // 导入 Node.js 的 path 模块，用于处理文件路径
import { createServer } from 'vite'; // 导入 Vite 中创建服务器的函数
import { fileURLToPath } from 'url'; // 导入 Node.js 的 url 模块中的 fileURLToPath 方法
import react from '@vitejs/plugin-react'; // 导入 Vite 的 React 插件
import markdown from '@vavt/vite-plugin-import-markdown'; // 导入自定义的 Markdown 导入插件

import nodeService from './plugins/nodeService'; // 导入自定义的 nodeService 插件

// 获取当前文件所在目录的绝对路径，并赋值给 __dirname 变量
const __dirname = fileURLToPath(new URL('..', import.meta.url));

// 定义一个辅助函数，将相对路径解析为绝对路径
const resolvePath = (p: string) => path.resolve(__dirname, p);

!(async () => {
  // 创建 Vite 服务器实例，并进行配置
  const server = await createServer({
    base: '/', // 配置基本路径
    publicDir: resolvePath('dev/public'), // 配置公共文件目录的路径
    resolve: {
      alias: {
        '@': resolvePath('dev'), // 设置别名 '@'，指向 dev 目录
        '~~': resolvePath('packages'), // 设置别名 '~~'，指向 packages 目录
        '~': resolvePath('packages/MdEditor') // 设置别名 '~'，指向 packages/MdEditor 目录
      }
    },
    plugins: [react(), nodeService(), markdown()], // 使用插件，包括 React 插件、自定义的 nodeService 插件和自定义的 Markdown 导入插件
    css: {
      modules: {
        localsConvention: 'camelCase' // 配置 CSS 模块，将类名转换为驼峰命名方式
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true // 配置 Less 预处理器选项，启用 JavaScript 支持
        }
      }
    }
  });

  // 启动服务器
  await server.listen();

  // 打印服务器的访问地址
  server.printUrls();
})();
