/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

//vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  test: { environment: 'jsdom', globals: true },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  envDir: './env',
  server: {
    port: 3000,
    strictPort: true,
  },
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
}));
