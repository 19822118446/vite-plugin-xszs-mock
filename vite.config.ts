import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vitePluginXszsMock from './dist/index.js';

export default defineConfig({
  plugins: [
    vue(),
    vitePluginXszsMock({
      enabled: true,
      port: 3001,
      mockData: {
        '/api/user': {
          name: 'John Doe',
          age: 30,
        },
      },
    }),
  ],
  // 设置 playground 为根目录
  root: './playground',
});

