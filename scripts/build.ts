import path from 'path'; // 导入 Node.js 的路径处理模块
import { fileURLToPath } from 'url'; // 导入 Node.js 的 URL 模块中的 fileURLToPath 函数
import { build, LibraryFormats } from 'vite'; // 导入 vite 中的 build 和 LibraryFormats
import react from '@vitejs/plugin-react'; // 导入 vite-plugin-react 插件
import dts from 'vite-plugin-dts'; // 导入 vite-plugin-dts 插件
import { removeDir } from './u'; // 导入当前目录下的 u 模块

const __dirname = fileURLToPath(new URL('..', import.meta.url)); // 获取当前文件所在目录的完整路径
const resolvePath = (p: string) => path.resolve(__dirname, p); // 定义一个函数用于将相对路径转换为绝对路径

!(async () => {
  const moduleEntry = { // 定义一个对象，包含多个模块的入口路径
    index: resolvePath('packages'), // packages 模块的入口路径
    MdEditor: resolvePath('packages/MdEditor'), // MdEditor 模块的入口路径
    MdPreview: resolvePath('packages/MdPreview'), // MdPreview 模块的入口路径
    NormalToolbar: resolvePath('packages/NormalToolbar'), // NormalToolbar 模块的入口路径
    DropdownToolbar: resolvePath('packages/DropdownToolbar'), // DropdownToolbar 模块的入口路径
    ModalToolbar: resolvePath('packages/ModalToolbar'), // ModalToolbar 模块的入口路径
    MdCatalog: resolvePath('packages/MdCatalog'), // MdCatalog 模块的入口路径
    MdModal: resolvePath('packages/MdEditor/components/Modal'), // MdModal 模块的入口路径
    config: resolvePath('packages/config') // config 模块的入口路径
  };
  const formats: LibraryFormats[] = ['es', 'cjs', 'umd']; // 定义一个数组，包含要构建的多种格式

  const entries = {
    es: {
      ...moduleEntry,
      // 这里只有利用 vite 构建的 assetFileNames 为文件名的特性构建样式文件
      preview: resolvePath('packages/MdEditor/styles/preview.less'), // 需要构建的样式文件路径
      style: resolvePath('packages/MdEditor/styles/style.less') // 需要构建的样式文件路径
    },
    cjs: moduleEntry, // CommonJS 格式的入口路径
    umd: resolvePath('packages') // UMD 格式的入口路径
  };

  const extnames = {
    es: 'mjs', // es 格式的文件后缀名
    cjs: 'cjs' // cjs 格式的文件后缀名
  };

  removeDir(resolvePath('lib')); // 删除 lib 目录

  await Promise.all(
    formats.map((t) => {
      return build({
        base: '/',
        publicDir: false,
        resolve: {
          alias: {
            '~~': resolvePath('packages'), // ~~/path 的别名解析为 packages/path
            '~': resolvePath('packages/MdEditor') // ~/path 的别名解析为 packages/MdEditor/path
          }
        },
        plugins: [
          react(),
          t === 'es' &&
          dts({
            outputDir: resolvePath('lib/types'),
            include: [resolvePath('packages')]
          })
        ],
        css: {
          modules: {
            localsConvention: 'camelCase' // 默认只支持驼峰，修改为同时支持横线和驼峰
          },
          preprocessorOptions: {
            less: {
              javascriptEnabled: true
            }
          }
        },
        build: {
          emptyOutDir: false,
          cssCodeSplit: true,
          outDir: resolvePath('lib'),
          lib: {
            entry: entries[t],
            name: 'MdEditorRT',
            formats: [t],
            fileName(format) {
              switch (format) {
                case 'es': {
                  return 'es/[name].mjs'; // es 格式的文件名
                }
                case 'cjs': {
                  return 'cjs/[name].cjs'; // cjs 格式的文件名
                }
                default: {
                  return 'umd/index.js'; // umd 格式的文件名
                }
              }
            }
          },
          rollupOptions: {
            external:
              t === 'umd'
                ? ['react'] // UMD 格式的外部依赖
                : [
                  'react',
                  'medium-zoom',
                  'lru-cache',
                  'copy-to-clipboard',
                  'codemirror',
                  '@vavt/util',
                  /@codemirror\/.*/,
                  /@lezer\/.*/,
                  /markdown-it.*/
                ], // es 和 cjs 格式的外部依赖
            output: {
              chunkFileNames: `${t}/chunks/[name].${extnames[t]}`, // 输出的 chunk 文件名
              assetFileNames: '[name][extname]', // 输出的资源文件名
              globals:
                t === 'umd'
                  ? {
                    react: 'React' // UMD 格式的全局变量名
                  }
                  : {} // es 和 cjs 格式没有全局变量
            }
          }
        }
      });
    })
  );
})();
