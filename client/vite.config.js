import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 4002 // Change this to your desired port
  },
  plugins: [react()],
})
