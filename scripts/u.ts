import fs from 'fs'; // 导入 Node.js 的文件系统模块
import path from 'path'; // 导入 Node.js 的路径处理模块

// 定义一个名为 removeDir 的函数，接收一个 dirpath 字符串参数
export const removeDir = (dirpath: string) => {
  if (!fs.existsSync(dirpath)) { // 如果目录不存在，则直接返回
    return;
  }
  const fileList = fs.readdirSync(dirpath); // 读取目录下的文件列表
  fileList.forEach((x) => { // 遍历文件列表
    const p = path.resolve(dirpath, x); // 获取文件的完整路径
    const pinfo = fs.statSync(p); // 获取文件的状态信息
    if (pinfo.isFile()) { // 如果是文件，则删除文件
      fs.unlinkSync(p);
    } else if (pinfo.isDirectory()) { // 如果是目录，则递归调用 removeDir 函数删除目录
      removeDir(p);
    }
  });
  fs.rmdirSync(dirpath); // 删除空目录
};
