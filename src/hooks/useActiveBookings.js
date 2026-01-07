// src/hooks/useActiveBookings.js

import { useQuery } from "@tanstack/react-query";
import { getActiveBookings } from "../services/bookingService.js";

/**
 * Aktif rezervasyonları getirir (İptal Edildi hariç, gelecek tarihli)
 * @param {Object} options - Ek filtreleme seçenekleri
 * @returns {Object} { bookings, isLoading, error, refetch }
 */
export function useActiveBookings(options = {}) {
    const {
        data,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["bookings", "active", options],
        queryFn: () => getActiveBookings(options),
        staleTime: 1 * 60 * 1000, // 1 dakika (aktif rezervasyonlar daha sık güncellenebilir)
    });

    const bookings = data ?? [];

    return { bookings, isLoading, error, refetch };
}