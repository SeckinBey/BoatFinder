import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    // React bağımlılıklarını önceden optimize et
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      '@headlessui/react',
      '@heroicons/react',
      'react-hook-form',
      '@hookform/resolvers',
      'react-day-picker',
    ],
    // React bağımlılıklarını vendor chunk'ından çıkar
    exclude: [],
  },
  build: {
    // Ensure proper module resolution
    modulePreload: {
      polyfill: true,
    },
    // Minification ayarları - daha iyi hata mesajları için
    minify: 'esbuild',
    // Source maps - production'da da hata ayıklama için
    sourcemap: false,
    rollupOptions: {
      output: {
        // Ensure proper initialization order
        format: 'es',
        // Chunk yükleme sırasını garanti altına al
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks: (id) => {
          // Ensure supabaseClient stays in main bundle to avoid initialization issues
          if (id.includes("lib/supabaseClient")) {
            return undefined; // Keep in main bundle
          }
          
          // React ve React-DOM'u ayrı chunk'a ayır (EN ÖNCE - initialization order için kritik)
          // Bu chunk her zaman önce yüklenecek
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/")
          ) {
            return "react-vendor";
          }

          // React bağımlılıklarını ayrı chunk'lara ayır (React'ten sonra yüklenecek)
          // React Router'ı ayrı chunk'a ayır
          if (id.includes("node_modules/react-router")) {
            return "router-vendor";
          }

          // React Query'yi ayrı chunk'a ayır
          if (id.includes("node_modules/@tanstack/react-query")) {
            return "query-vendor";
          }

          // UI kütüphanelerini birleştir (React bağımlı)
          if (
            id.includes("node_modules/@headlessui") ||
            id.includes("node_modules/@heroicons")
          ) {
            return "ui-vendor";
          }

          // Form kütüphanelerini birleştir (React bağımlı)
          if (
            id.includes("node_modules/react-hook-form") ||
            id.includes("node_modules/@hookform/resolvers") ||
            id.includes("node_modules/zod")
          ) {
            return "form-vendor";
          }

          // React Day Picker (React bağımlı)
          if (id.includes("node_modules/react-day-picker")) {
            return "date-picker-vendor";
          }

          // Swiper'ı ayrı chunk'a ayır (büyük bir kütüphane, React bağımlı değil)
          if (id.includes("node_modules/swiper")) {
            return "swiper-vendor";
          }

          // Supabase'i ayrı chunk'a ayır (React bağımlı değil)
          if (id.includes("node_modules/@supabase")) {
            return "supabase-vendor";
          }

          // Date utilities (React bağımlı değil)
          if (id.includes("node_modules/date-fns")) {
            return "date-vendor";
          }

          // Browser-image-compression gibi React bağımlı olmayan kütüphaneler
          if (id.includes("node_modules/browser-image-compression")) {
            return "utils-vendor";
          }

          // Diğer node_modules'leri vendor chunk'ına koy
          // ÖNEMLİ: React bağımlılıklarını vendor chunk'ından çıkar
          // Çünkü React henüz yüklenmeden erişmeye çalışabilirler
          if (id.includes("node_modules")) {
            // React bağımlılıklarını vendor chunk'ından çıkar
            // Yukarıda belirtilen tüm React bağımlılıkları zaten ayrı chunk'lara ayrıldı
            
            // Ek kontrol: Eğer bu kütüphane React'e bağımlıysa (package.json'da peerDependencies veya dependencies'de react varsa)
            // vendor chunk'ına koyma, undefined döndür (ana bundle'a dahil et)
            // Bu, React'in her zaman önce yüklendiğini garanti eder
            
            // Not: Bu kontrol runtime'da yapılamaz, bu yüzden yukarıdaki explicit kontroller kritik
            return "vendor";
          }
        },
      },
    },
    // Chunk size uyarı limitini artır (manuel chunking yaptığımız için)
    chunkSizeWarningLimit: 600,
    // CommonJS dönüşümünü optimize et
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
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
