import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React ve React-DOM'u ayrı chunk'a ayır
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/")
          ) {
            return "react-vendor";
          }

          // React Router'ı ayrı chunk'a ayır
          if (id.includes("node_modules/react-router")) {
            return "router-vendor";
          }

          // React Query'yi ayrı chunk'a ayır
          if (id.includes("node_modules/@tanstack/react-query")) {
            return "query-vendor";
          }

          // Swiper'ı ayrı chunk'a ayır (büyük bir kütüphane)
          if (id.includes("node_modules/swiper")) {
            return "swiper-vendor";
          }

          // UI kütüphanelerini birleştir
          if (
            id.includes("node_modules/@headlessui") ||
            id.includes("node_modules/@heroicons")
          ) {
            return "ui-vendor";
          }

          // Form kütüphanelerini birleştir
          if (
            id.includes("node_modules/react-hook-form") ||
            id.includes("node_modules/zod") ||
            id.includes("node_modules/@hookform/resolvers")
          ) {
            return "form-vendor";
          }

          // Supabase'i ayrı chunk'a ayır
          if (id.includes("node_modules/@supabase")) {
            return "supabase-vendor";
          }

          // Date utilities
          if (id.includes("node_modules/date-fns")) {
            return "date-vendor";
          }

          // React Day Picker
          if (id.includes("node_modules/react-day-picker")) {
            return "date-picker-vendor";
          }

          // Diğer node_modules'leri vendor chunk'ına koy
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
    // Chunk size uyarı limitini artır (manuel chunking yaptığımız için)
    chunkSizeWarningLimit: 600,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/test/",
        "**/*.config.js",
        "**/*.config.mjs",
      ],
    },
  },
});
