
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/million-km-/', // GitHub repozitoriyangiz nomiga mos bo'lishi shart
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
