import { logError } from "../services/errorService.js";

/**
 * Error'ı normalize eder ve loglar
 * @param {Error|string|unknown} error - Hata
 * @param {Object} context - Ek bağlam
 * @returns {Error} Normalize edilmiş error
 */
export function handleError(error, context = {}) {
  let normalizedError;

  if (error instanceof Error) {
    normalizedError = error;
  } else if (typeof error === "string") {
    normalizedError = new Error(error);
  } else {
    normalizedError = new Error("Unknown error occurred");
    normalizedError.originalError = error;
  }

  // Error'ı logla
  logError(normalizedError, context);

  return normalizedError;
}

/**
 * Kullanıcı dostu hata mesajı üretir
 * @param {Error} error - Hata objesi
 * @returns {string} Kullanıcı dostu mesaj
 */
export function getUserFriendlyErrorMessage(error) {
  if (!error) return "Beklenmeyen bir hata oluştu";

  // Supabase hata kodlarına göre mesajlar
  if (error.code) {
    switch (error.code) {
      case "PGRST116":
        return "Aradığınız kayıt bulunamadı";
      case "42501":
      case "PGRST301":
        return "Bu işlem için yetkiniz yok";
      case "23505":
        return "Bu kayıt zaten mevcut";
      case "42P01":
        return "Veritabanı hatası oluştu";
      default:
        break;
    }
  }

  // Hata mesajına göre
  const message = error.message?.toLowerCase() || "";

  if (message.includes("network") || message.includes("fetch")) {
    return "Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin";
  }

  if (message.includes("unauthorized") || message.includes("permission")) {
    return "Bu işlem için yetkiniz yok";
  }

  if (message.includes("not found")) {
    return "Aradığınız kayıt bulunamadı";
  }

  // Varsayılan mesaj veya orijinal mesaj
  return error.message || "Bir hata oluştu. Lütfen tekrar deneyin";
}
