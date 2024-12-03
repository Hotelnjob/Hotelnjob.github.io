import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';
import { createHtmlPlugin } from 'vite-plugin-html';

// ----------------------------------------------------------------------

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      jsconfigPaths(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            kakaoApiKey: env.VITE_KAKAO_API_KEY, // Use the loaded environment variable
          },
        },
      }),
    ],
    build: {
      chunkSizeWarningLimit: 2500,
    },
    base: '/hotelnjob.github.io/', // Hard coding the base path here
    define: {
      global: 'window',
    },
    resolve: {
      alias: [
        {
          find: /^~(.+)/,
          replacement: path.join(process.cwd(), 'node_modules/$1'),
        },
        {
          find: /^src(.+)/,
          replacement: path.join(process.cwd(), 'src/$1'),
        },
      ],
    },
    server: {
      open: true,
      port: 3000,
    },
    preview: {
      open: true,
      port: 3000,
    },
  };
});
