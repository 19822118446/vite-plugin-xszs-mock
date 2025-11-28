import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vitePluginXszsMock from './src/index';

export default defineConfig({
  plugins: [
    vue(),
    vitePluginXszsMock({
      port: 3001,
    }),
  ],
  // 设置 playground 为根目录
  root: './playground',
});

