// src/hooks/useBookings.js

import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../services/bookingService.js";

/**
 * Tüm rezervasyonları getirir (filtreleme seçenekleri ile)
 * React Query ile otomatik cache yönetimi
 * @param {Object} options - Filtreleme seçenekleri
 * @param {number} options.tekneId - Tekne ID'ye göre filtreleme
 * @param {string} options.durum - Duruma göre filtreleme
 * @param {string} options.musteriEposta - Müşteri e-postasına göre filtreleme
 * @param {string} options.baslangicTarihi - Başlangıç tarihinden sonraki rezervasyonlar
 * @param {string} options.bitisTarihi - Bitiş tarihinden önceki rezervasyonlar
 * @returns {Object} { bookings, isLoading, error, refetch }
 */
export function useBookings(options = {}) {
    const {
        data,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["bookings", options],
        queryFn: () => getBookings(options),
        staleTime: 2 * 60 * 1000, // 2 dakika (rezervasyonlar daha sık değişebilir)
    });

    const bookings = data ?? [];

    return { bookings, isLoading, error, refetch };
}