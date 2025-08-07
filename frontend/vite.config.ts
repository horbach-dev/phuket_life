import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';
import { ngrok } from 'vite-plugin-ngrok';
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return ({
    base: '/',
    plugins: [
      react(),
      tsconfigPaths(),
      process.env.HTTPS && mkcert(),
      env.VITE_USE_NGROK && ngrok({
        authtoken: env.VITE_NGROK_TOKEN,
        domain: env.VITE_NGROK_DOMAIN,
        port: 5173,
      }),
      visualizer({
        filename: 'stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true
      })
    ],
    publicDir: './public',
    server: {
      host: true,
    },
    build: {
      target: 'esnext',
    }
  })
});

