import { staticTextDefault } from '~/config';

export {
  config, // 导出 config
  iconfontClassUrl, // 导出 iconfontClassUrl
  iconfontSvgUrl, // 导出 iconfontSvgUrl
  allToolbar, // 导出 allToolbar
  allFooter // 导出 allFooter
} from '~/config';

export const zh_CN = staticTextDefault['zh-CN']; // 导出 staticTextDefault 中的 'zh-CN' 字段赋值给 zh_CN
export const en_US = staticTextDefault['en-US']; // 导出 staticTextDefault 中的 'en-US' 字段赋值给 en_US
