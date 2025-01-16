import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  proxy: {
    '/api': {
      target: 'http://localhost:4000',
      changeOrigin: true,
      secure : false,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
  server: {
    port: 3000 // Change this to your desired port
  },
  plugins: [react()],
})
