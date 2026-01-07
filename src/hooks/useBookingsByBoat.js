// src/hooks/useBookingsByBoat.js

import { useQuery } from "@tanstack/react-query";
import { getBookingsByBoat } from "../services/bookingService.js";

/**
 * Belirli bir tekne için tüm rezervasyonları getirir
 * @param {number} tekneId - Tekne ID
 * @param {Object} options - Ek filtreleme seçenekleri
 * @returns {Object} { bookings, isLoading, error, refetch }
 */
export function useBookingsByBoat(tekneId, options = {}) {
    const {
        data,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["bookings", "boat", tekneId, options],
        queryFn: () => getBookingsByBoat(tekneId, options),
        enabled: !!tekneId, // Sadece tekneId varsa fetch et
        staleTime: 2 * 60 * 1000, // 2 dakika
    });

    const bookings = data ?? [];

    return { bookings, isLoading, error, refetch };
}