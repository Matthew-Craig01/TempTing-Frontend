import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/shadcn"),
      "@web": path.resolve(__dirname, "./src/web"),
      "@gleam": path.resolve(__dirname, "./src/parser"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
  },
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 5173
  }
});
