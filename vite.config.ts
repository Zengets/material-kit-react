import path from 'path';
import checker from 'vite-plugin-checker';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// ----------------------------------------------------------------------

const PORT = 3039;

// 静态资源公共路径配置 (publicPath)
// 相当于 webpack 的 publicPath
const PUBLIC_PATH = '/teach/';

export default defineConfig(({ mode }) => ({
  // base 用于配置静态资源的加载路径
  // 开发环境使用根路径，生产环境使用自定义路径
  base: mode === 'production' ? PUBLIC_PATH : '/',
  
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: {
        useFlatConfig: true,
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
        dev: { logLevel: ['error'] },
      },
      overlay: {
        position: 'tl',
        initialIsOpen: false,
      },
    }),
  ],
  
  resolve: {
    alias: [
      {
        find: /^src(.+)/,
        replacement: path.resolve(process.cwd(), 'src/$1'),
      },
    ],
  },
  
  build: {
    // 静态资源输出目录
    assetsDir: 'assets',
    // 静态资源内联阈值（小于此值会被内联为 base64）
    assetsInlineLimit: 4096,
  },
  
  server: { 
    port: PORT, 
    host: true,
  },
  
  preview: { 
    port: PORT, 
    host: true,
  },
}));
