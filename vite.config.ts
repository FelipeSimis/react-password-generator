/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { webfontDownload } from 'vite-plugin-webfont-dl';
import eslintPlugin from '@nabla/vite-plugin-eslint';

export default defineConfig({
  plugins: [
    react(),
    {
      ...webfontDownload(),
      apply: 'build',
    },
    eslintPlugin(),
  ],
});
