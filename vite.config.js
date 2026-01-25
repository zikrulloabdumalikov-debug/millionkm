import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // GitHub Pages uchun kerak
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});