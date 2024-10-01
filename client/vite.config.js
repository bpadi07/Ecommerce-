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
      
      "/api": "https://ecommerceapp1-lfnc.onrender.com",
      "/upload": "https://ecommerceapp1-lfnc.onrender.com"
    },
  },})
