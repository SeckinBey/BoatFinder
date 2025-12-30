import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getProducts } from "../services/productService.js";

/**
 * Belirli sayıda ürün getirir (slice için)
 * React Query ile cache yönetimi
 * @param {number} limit - Getirilecek ürün sayısı
 * @param {number} offset - Başlangıç index'i (default: 0)
 * @returns {Object} { products, isLoading, error }
 */
export function useProductSlice(limit = 8, offset = 0) {
  // Önce tüm ürünleri çek (cache'den gelebilir)
  const {
    data: allProducts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000, // 5 dakika
  });

  // Client-side slice (memoized)
  const products = useMemo(() => {
    return allProducts.slice(offset, offset + limit);
  }, [allProducts, offset, limit]);

  return { products, isLoading, error };
}
