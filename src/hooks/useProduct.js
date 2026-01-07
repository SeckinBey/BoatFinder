import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "../services/productService.js";
import { safeParseInt } from "../utils/helpers.js";

/**
 * Tek bir ürünü ID'ye göre getirir ve detayları ile birlikte döner
 * React Query ile otomatik cache ve refetch yönetimi
 * @param {number|string|null} id - Ürün ID (opsiyonel, useParams'ten alınabilir)
 * @returns {Object} { data: product, isLoading, error }
 */
export function useProduct(id = null) {
  const params = useParams();
  const productId = id !== null ? safeParseInt(id) : safeParseInt(params?.id);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
    enabled: !!productId, // Sadece productId varsa fetch et
    staleTime: 5 * 60 * 1000, // 5 dakika - ürün detayı biraz daha sık güncellenebilir
  });

  return { product, isLoading, error };
}
