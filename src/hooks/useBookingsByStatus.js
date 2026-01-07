// src/hooks/useBookingsByStatus.js

import { useQuery } from "@tanstack/react-query";
import { getBookingsByStatus } from "../services/bookingService.js";

/**
 * Belirli bir durumdaki rezervasyonları getirir
 * @param {string} durum - Rezervasyon durumu ('Opsiyonel', 'Onaylandı', 'Tamamlandı', 'İptal Edildi')
 * @param {Object} options - Ek filtreleme seçenekleri
 * @returns {Object} { bookings, isLoading, error, refetch }
 */
export function useBookingsByStatus(durum, options = {}) {
    const {
        data,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["bookings", "status", durum, options],
        queryFn: () => getBookingsByStatus(durum, options),
        enabled: !!durum, // Sadece durum varsa fetch et
        staleTime: 2 * 60 * 1000, // 2 dakika
    });

    const bookings = data ?? [];

    return { bookings, isLoading, error, refetch };
}