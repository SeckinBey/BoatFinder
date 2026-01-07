// src/hooks/useBooking.js

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../services/bookingService.js";
import { safeParseInt } from "../utils/helpers.js";

/**
 * Tek bir rezervasyonu ID'ye göre getirir
 * React Query ile otomatik cache ve refetch yönetimi
 * @param {number|string|null} id - Rezervasyon ID (opsiyonel, useParams'ten alınabilir)
 * @returns {Object} { booking, isLoading, error }
 */
export function useBooking(id = null) {
    const params = useParams();
    const bookingId = id !== null ? safeParseInt(id) : safeParseInt(params?.id);

    const {
        data: booking,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["booking", bookingId],
        queryFn: () => getBooking(bookingId),
        enabled: !!bookingId, // Sadece bookingId varsa fetch et
        staleTime: 2 * 60 * 1000, // 2 dakika
    });

    return { booking, isLoading, error };
}