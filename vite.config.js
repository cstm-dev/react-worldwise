import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      app: "/src/App/app",
      root: "/src/App/root",
      pricing: "/src/App/pricing",
      product: "/src/App/product",
      login: "/src/App/login",
      utilities: "/src/Utilities",
      hooks: "/src/Hooks",
      contexts: "/src/Contexts",
    },
  },
});
