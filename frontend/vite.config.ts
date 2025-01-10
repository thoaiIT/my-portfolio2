import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // Các thư viện lớn cần pre-bundle
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/], // Bao gồm tất cả module node_modules,
    },
    sourcemap: false,
  },
});
