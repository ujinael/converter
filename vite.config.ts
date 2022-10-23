import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
export default defineConfig(({mode})=>{
  const env = loadEnv(mode,fileURLToPath(new URL(".", import.meta.url)))
const PORT = env.VITE_SERVER_PORT || 5173
const HOST = env.VITE_REMOTE_SERVER_HOST || 'https://www.cbr-xml-daily.ru'
const REMOTE_PORT = env.VITE_REMOTE_SERVER_PORT || ''
  return {
  plugins: [vue()],
  envDir:fileURLToPath(new URL(".", import.meta.url)),
  server: {
    port: +PORT,
    hmr:{overlay:false},
    proxy: {
      "/api": {
        target: `${HOST}:${REMOTE_PORT}` ,
        rewrite: (path) => {          
         return path.replace(/^\/api/, "")
      
      }
        ,
        changeOrigin:true
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@stores":fileURLToPath(new URL("./src/stores", import.meta.url))
    },
  },
}});
