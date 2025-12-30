/**
 * Error logging ve tracking servisi
 * Production'da Sentry gibi bir servise entegre edilebilir
 */

export const ERROR_LOG_LEVELS = {
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

export function getRuntimeMode() {
  // Testler için override (örn: globalThis.__APP_RUNTIME_MODE__ = "production")
  if (typeof globalThis !== "undefined" && globalThis.__APP_RUNTIME_MODE__) {
    return globalThis.__APP_RUNTIME_MODE__;
  }

  // Vite: import.meta.env.MODE => "development" | "production" | "test"
  return import.meta?.env?.MODE;
}

/**
 * Error loglama fonksiyonu
 * @param {Error} error - Hata objesi
 * @param {Object} context - Ek bağlam bilgileri (component, action, user, vb.)
 * @param {string} level - Log seviyesi
 */
export function logError(error, context = {}, level = ERROR_LOG_LEVELS.ERROR) {
  const mode = getRuntimeMode();
  const errorInfo = {
    message: error?.message || "Unknown error",
    stack: error?.stack,
    name: error?.name,
    timestamp: new Date().toISOString(),
    level,
    context,
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : null,
    url: typeof window !== "undefined" ? window.location.href : null,
  };

  // Development mode'da console'a yaz
  if (mode === "development") {
    console.group(`[${level.toUpperCase()}] Error Log`);
    console.error("Error:", error);
    console.info("Context:", context);
    console.info("Error Info:", errorInfo);
    console.groupEnd();
  }

  // Production'da burada error tracking servisine gönderilebilir
  // Örnek: Sentry, LogRocket, vb.
  if (mode === "production") {
    // TODO: Production error tracking servisi entegrasyonu
    // Sentry.captureException(error, { extra: context });

    // Şimdilik localStorage'da geçici olarak sakla (son 50 hata)
    try {
      const logs = JSON.parse(localStorage.getItem("error_logs") || "[]");
      logs.unshift(errorInfo);
      // Son 50 hatayı sakla
      const limitedLogs = logs.slice(0, 50);
      localStorage.setItem("error_logs", JSON.stringify(limitedLogs));
    } catch (e) {
      // localStorage hatası olursa sessizce devam et
      console.warn("Could not save error log to localStorage:", e);
    }
  }
}

/**
 * Warning loglama
 */
export function logWarning(message, context = {}) {
  const error = new Error(message);
  logError(error, context, ERROR_LOG_LEVELS.WARNING);
}

/**
 * Info loglama
 */
export function logInfo(message, context = {}) {
  const error = new Error(message);
  logError(error, context, ERROR_LOG_LEVELS.INFO);
}

/**
 * Error loglarını getir (debug için)
 */
export function getErrorLogs() {
  try {
    return JSON.parse(localStorage.getItem("error_logs") || "[]");
  } catch {
    return [];
  }
}

/**
 * Error loglarını temizle
 */
export function clearErrorLogs() {
  try {
    localStorage.removeItem("error_logs");
  } catch {
    // Sessizce devam et
  }
}
