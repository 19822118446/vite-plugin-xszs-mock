import type { Plugin } from 'vite';
import { data } from './createServer';


export interface XszsMockOptions {
  // Mock 服务器端口
  port?: number;
}



export default function vitePluginXszsMock(options: XszsMockOptions = {}): Plugin {
  const { port = 3001 } = options;

  return {
    name: 'vite-plugin-xszs-mock',
    enforce: 'pre',

    // 配置钩子
    configResolved(config) {

    },

    // 开发服务器钩子
    configureServer(server) {
      // 配置开发服务器
      console.log("模拟数据",data);
      
    },

    // 构建钩子
    buildStart() {
      // 构建开始时的钩子
    },

    // 插件关闭时的清理
    buildEnd() {

    },
  };
}
