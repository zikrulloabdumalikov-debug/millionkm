import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // REPO NOMINI TEKSHIRING: Agar repo 'million-km-' bo'lsa, bu to'g'ri.
  // Bu subfolderdagi 404 xatolarini to'liq hal qiladi.
  base: '/million-km-/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    minify: 'terser',
    rollupOptions: {
      output: {
        // GitHub Pages uchun barcha resurslarni bitta joyga yig'ish
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
});