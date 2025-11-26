import type { Plugin } from 'vite';
import { MockServer, type MockServerOptions } from './utils/mockServer';

export interface XszsMockOptions {
  // 在这里定义你的插件选项类型
  enabled?: boolean;
  // Mock 服务器端口
  port?: number;
  // Mock 数据配置
  mockData?: Record<string, any>;
  // 添加其他配置选项...
}

let mockServer: MockServer | null = null;

export default function vitePluginXszsMock(options: XszsMockOptions = {}): Plugin {
  const { enabled = true, port, mockData } = options;

  return {
    name: 'vite-plugin-xszs-mock',
    enforce: 'pre', // 或 'post'，取决于你的需求

    // 配置钩子
    configResolved(config) {
      // 插件配置解析后的钩子
      if (enabled) {
        console.log('[vite-plugin-xszs-mock] 插件已启用');
      }
    },

    // 开发服务器钩子
    configureServer(server) {
      // 配置开发服务器
      if (enabled) {
        // 启动 Mock 服务器
        mockServer = new MockServer({
          port,
          mockData,
        });

        mockServer.start().catch((error) => {
          console.error('[vite-plugin-xszs-mock] Mock 服务器启动失败:', error);
        });

        // 当 Vite 服务器关闭时，也关闭 Mock 服务器
        server.httpServer?.on('close', () => {
          if (mockServer) {
            mockServer.stop().catch((error) => {
              console.error('[vite-plugin-xszs-mock] Mock 服务器关闭失败:', error);
            });
          }
        });
      }
    },

    // 构建钩子
    buildStart() {
      // 构建开始时的钩子
    },

    // 插件关闭时的清理
    buildEnd() {
      if (mockServer) {
        mockServer.stop().catch((error) => {
          console.error('[vite-plugin-xszs-mock] Mock 服务器关闭失败:', error);
        });
      }
    },
  };
}
