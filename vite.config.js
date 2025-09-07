import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },

  // ✅ 추가: Spring Boot 백엔드에 프록시
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',  // 백엔드 주소
        changeOrigin: true,
        secure: false,
      }
    }
  },
})
