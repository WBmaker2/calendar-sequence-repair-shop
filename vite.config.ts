import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// build·preview(mode=production)에서는 Pages 하위 경로를, dev에서는 루트를 사용한다.
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/calendar-sequence-repair-shop/" : "/",
  plugins: [react()],
  build: {
    sourcemap: false,
    assetsInlineLimit: 4096,
  },
}));
