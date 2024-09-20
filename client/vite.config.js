import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist', // Should be 'dist' or your desired build directory
  },
  plugins: [react()],

  server: {
    port: 3000,
    proxy: {
      
      "/api": "http://localhost:5000",
      "/upload": "http://localhost:5000"
    },
  },})
