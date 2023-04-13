import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), tsconfigPaths(), svgr()],
  build: {
    rollupOptions: {
      // Build two separate bundles, one for each app.
      input: {
        client: path.resolve(__dirname, 'index.html'),
        dashboard: path.resolve(__dirname, 'dashboard/index.html'),
      },
    },
  },
});
