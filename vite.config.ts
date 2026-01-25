
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // REPO NOMINI TEKSHIRING: Agar repo 'million-km-' bo'lsa, bu to'g'ri. 
  // Agar repo nomi shunchaki 'million-km' bo'lsa, base ni '/million-km/' qiling.
  base: '/million-km-/', 
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    // Build vaqtida xatolarni kamaytirish uchun
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
