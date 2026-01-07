// src/hooks/useBookingAvailability.js

import { useQuery } from "@tanstack/react-query";
import { checkAvailability } from "../services/bookingService.js";

/**
 * Belirli bir tekne için tarih aralığında müsaitlik kontrolü yapar
 * @param {number} tekneId - Tekne ID
 * @param {string} girisTarihi - Giriş tarihi (ISO 8601 formatında)
 * @param {string} cikisTarihi - Çıkış tarihi (ISO 8601 formatında)
 * @param {number} excludeBookingId - Kontrol dışı bırakılacak rezervasyon ID (güncelleme için)
 * @param {boolean} enabled - Query'nin aktif olup olmayacağı
 * @returns {Object} { available, conflictingBookings, isLoading, error }
 */
export function useBookingAvailability(
    tekneId,
    girisTarihi,
    cikisTarihi,
    excludeBookingId = null,
    enabled = true
) {
    const {
        data,
        isLoading,
        error,
    } = useQuery({
        queryKey: [
            "bookingAvailability",
            tekneId,
            girisTarihi,
            cikisTarihi,
            excludeBookingId,
        ],
        queryFn: () =>
            checkAvailability(tekneId, girisTarihi, cikisTarihi, excludeBookingId),
        enabled:
            enabled &&
            !!tekneId &&
            !!girisTarihi &&
            !!cikisTarihi &&
            girisTarihi < cikisTarihi, // Tarih validasyonu
        staleTime: 1 * 60 * 1000, // 1 dakika (müsaitlik kontrolü daha sık yapılabilir)
    });

    return {
        available: data?.available ?? false,
        conflictingBookings: data?.conflictingBookings ?? [],
        isLoading,
        error,
    };
}