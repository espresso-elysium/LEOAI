import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
  // Required for SPA routing to work on Render
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
