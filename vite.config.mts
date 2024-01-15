import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist/react-client"
  },
  publicDir: "src/public",
  resolve: {
    alias: {
      "@/client": path.resolve(__dirname, "./src/react-client")
    }
  }
});
