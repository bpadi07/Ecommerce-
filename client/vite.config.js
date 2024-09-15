import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000,
    proxy: {
      
      "/api": "https://ecommerce-8-lcx4.onrender.com",
      "/upload": "https://ecommerce-8-lcx4.onrender.com"
    },
  },})
