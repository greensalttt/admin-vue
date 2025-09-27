// // 백엔드에서 포스트 요청시 처리

import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'  // Node.js의 path 모듈

export default defineConfig({
  base: '/admin',  // Spring Boot에서 /admin으로 접근할 수 있도록 base 경로 설정
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/images': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    },
    historyApiFallback: true
  },
  build: {
    outDir: path.resolve(__dirname, '../greenSpringBoot/src/main/resources/static/admin'), // ✅ 빌드 경로 설정
    emptyOutDir: true  // 기존 파일을 제거하고 새로 빌드 (기존 static/admin 안의 파일을 지움)
  }
})
