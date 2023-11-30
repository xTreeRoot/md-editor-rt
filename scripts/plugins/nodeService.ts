import { Plugin, ViteDevServer } from 'vite'; // 导入 vite 中的 Plugin 和 ViteDevServer 类型
import multiparty from 'multiparty'; // 导入 multiparty 模块
import fs from 'fs'; // 导入 Node.js 的文件系统模块
import path from 'path'; // 导入 Node.js 的路径处理模块
import { fileURLToPath } from 'url'; // 导入 Node.js 的 URL 模块中的 fileURLToPath 函数

const __dirname = fileURLToPath(new URL('..', import.meta.url)); // 获取当前文件所在目录的完整路径
const LOCAL_IMG_PATH = path.resolve(__dirname, '../dev/public/temp.local'); // 定义本地图片存储路径

export default (): Plugin => {
  return {
    name: 'node-service', // 插件名称
    configureServer: (server: ViteDevServer) => {
      server.middlewares.use(async (req, res, next) => {
        if (/^\/api\/img\/upload$/.test(req.url)) { // 匹配图片上传接口
          if (!fs.existsSync(LOCAL_IMG_PATH)) { // 如果本地图片存储路径不存在，则创建
            fs.mkdirSync(LOCAL_IMG_PATH, {
              recursive: true
            });
          }

          const form = new multiparty.Form({ // 创建 multiparty 表单对象，用于处理文件上传
            uploadDir: LOCAL_IMG_PATH // 设置文件上传目录为本地图片存储路径
          });

          form.parse(req, (err, fields, files) => { // 解析表单数据
            const filename = files.file[0].path
              .replace(/\\/g, '/')
              .split('md-editor-rt/dev/public')[1]; // 处理文件路径

            res.end( // 返回上传结果
              JSON.stringify({
                code: 0,
                url: filename
              })
            );
          });
        } else {
          next(); // 转到下一个中间件
        }
      });
    }
  };
};
