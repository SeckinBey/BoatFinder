import { describe, it, expect, vi, beforeEach } from "vitest";
import { handleError, getUserFriendlyErrorMessage } from "./errorHandler.js";

// errorService'i mock'la - Mock tanımı import'lardan ÖNCE olmalı
vi.mock("../services/errorService.js", () => ({
  logError: vi.fn(),
}));

// Mock'u import et (mock tanımından sonra)
import { logError } from "../services/errorService.js";

describe("errorHandler", () => {
  beforeEach(() => {
    // Her test öncesi mock'u temizle
    vi.clearAllMocks();
  });

  describe("handleError", () => {
    it("should normalize Error objects", () => {
      const error = new Error("Test error");
      const normalized = handleError(error);

      expect(normalized).toBeInstanceOf(Error);
      expect(normalized.message).toBe("Test error");
      expect(vi.mocked(logError)).toHaveBeenCalledWith(normalized, {});
    });

    it("should normalize string errors", () => {
      const normalized = handleError("String error");

      expect(normalized).toBeInstanceOf(Error);
      expect(normalized.message).toBe("String error");
      expect(vi.mocked(logError)).toHaveBeenCalled();
    });

    it("should normalize unknown errors", () => {
      const normalized = handleError(null);

      expect(normalized).toBeInstanceOf(Error);
      expect(normalized.message).toBe("Unknown error occurred");
      expect(normalized.originalError).toBe(null);
      expect(vi.mocked(logError)).toHaveBeenCalled();
    });

    it("should preserve original error for unknown types", () => {
      const originalError = { custom: "data" };
      const normalized = handleError(originalError);

      expect(normalized).toBeInstanceOf(Error);
      expect(normalized.originalError).toBe(originalError);
    });

    it("should include context in log", () => {
      const error = new Error("Test");
      const context = { action: "testAction" };

      handleError(error, context);

      expect(vi.mocked(logError)).toHaveBeenCalledWith(
        expect.any(Error),
        context
      );
    });
  });

  describe("getUserFriendlyErrorMessage", () => {
    it("should return friendly message for PGRST116", () => {
      const error = { code: "PGRST116", message: "Not found" };
      const message = getUserFriendlyErrorMessage(error);

      expect(message).toBe("Aradığınız kayıt bulunamadı");
    });

    it("should return friendly message for 42501 (permission denied)", () => {
      const error = { code: "42501", message: "Permission denied" };
      const message = getUserFriendlyErrorMessage(error);

      expect(message).toBe("Bu işlem için yetkiniz yok");
    });

    it("should return friendly message for PGRST301 (permission error)", () => {
      const error = { code: "PGRST301", message: "Permission error" };
      const message = getUserFriendlyErrorMessage(error);

      expect(message).toBe("Bu işlem için yetkiniz yok");
    });

    it("should return friendly message for 23505 (unique violation)", () => {
      const error = { code: "23505", message: "Duplicate key" };
      const message = getUserFriendlyErrorMessage(error);

      expect(message).toBe("Bu kayıt zaten mevcut");
    });

    it("should return friendly message for 42P01 (undefined table)", () => {
      const error = { code: "42P01", message: "Table does not exist" };
      const message = getUserFriendlyErrorMessage(error);

      expect(message).toBe("Veritabanı hatası oluştu");
    });

    it("should return friendly message for network errors (message matching)", () => {
      const error = new Error("Network error occurred");
      const message = getUserFriendlyErrorMessage(error);

      expect(message).toBe(
        "Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin"
      );
    });

    it("should return friendly message for fetch errors", () => {
      const error = new Error("Failed to fetch");
      const message = getUserFriendlyErrorMessage(error);

      expect(message).toBe(
        "Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin"
      );
    });

    it("should return friendly message for unauthorized (message matching)", () => {
      const error = new Error("Unauthorized access");
      const message = getUserFriendlyErrorMessage(error);

      expect(message).toBe("Bu işlem için yetkiniz yok");
    });

    it("should return friendly message for permission (message matching)", () => {
      const error = new Error("Permission denied");
      const message = getUserFriendlyErrorMessage(error);

      expect(message).toBe("Bu işlem için yetkiniz yok");
    });

    it("should return friendly message for not found (message matching)", () => {
      const error = new Error("Resource not found");
      const message = getUserFriendlyErrorMessage(error);

      expect(message).toBe("Aradığınız kayıt bulunamadı");
    });

    it("should return default message for unknown errors", () => {
      const error = null;
      const message = getUserFriendlyErrorMessage(error);

      expect(message).toBe("Beklenmeyen bir hata oluştu");
    });

    it("should return original error message if no match", () => {
      const error = new Error("Custom error message");
      const message = getUserFriendlyErrorMessage(error);

      expect(message).toBe("Custom error message");
    });

    it("should handle error without message property", () => {
      const error = {};
      const message = getUserFriendlyErrorMessage(error);

      expect(message).toBe("Bir hata oluştu. Lütfen tekrar deneyin");
    });
  });
});
