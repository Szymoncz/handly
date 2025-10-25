import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react/dist';
// @ts-ignore
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/handly/', // Match repo name
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './dist'),
    },
  },
});
