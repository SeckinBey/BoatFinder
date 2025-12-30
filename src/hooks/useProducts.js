import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/productService.js";

/**
 * Tüm ürünleri getirir (ilişkisel verilerle birlikte)
 * React Query ile otomatik cache yönetimi
 * @returns {Object} { products, isLoading, error }
 */
export function useProducts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000, // 5 dakika
  });

  // null veya undefined kontrolü - her zaman array döndür
  const products = data ?? [];

  return { products, isLoading, error };
}
