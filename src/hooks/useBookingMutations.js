// src/hooks/useBookingMutations.js

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    createBooking,
    updateBooking,
    deleteBooking,
} from "../services/bookingService.js";

/**
 * Rezervasyon CRUD işlemleri için mutation hook'ları
 * @returns {Object} { createMutation, updateMutation, deleteMutation }
 */
export function useBookingMutations() {
    const queryClient = useQueryClient();

    // Create mutation
    const createMutation = useMutation({
        mutationFn: createBooking,
        onSuccess: () => {
            // Tüm booking query'lerini invalidate et
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            queryClient.invalidateQueries({ queryKey: ["booking"] });
            queryClient.invalidateQueries({ queryKey: ["bookingAvailability"] });
        },
        onError: (error) => {
            console.error("Error creating booking:", error);
        },
    });

    // Update mutation
    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => updateBooking(id, data),
        onSuccess: (data, variables) => {
            // Tüm booking query'lerini invalidate et
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            // Spesifik booking'i invalidate et
            queryClient.invalidateQueries({ queryKey: ["booking", variables.id] });
            queryClient.invalidateQueries({ queryKey: ["bookingAvailability"] });
        },
        onError: (error) => {
            console.error("Error updating booking:", error);
        },
    });

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: deleteBooking,
        onSuccess: () => {
            // Tüm booking query'lerini invalidate et
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            queryClient.invalidateQueries({ queryKey: ["booking"] });
            queryClient.invalidateQueries({ queryKey: ["bookingAvailability"] });
        },
        onError: (error) => {
            console.error("Error deleting booking:", error);
        },
    });

    return {
        createMutation,
        updateMutation,
        deleteMutation,
    };
}