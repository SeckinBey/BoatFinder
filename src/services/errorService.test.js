import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import * as errorService from "./errorService.js";

describe("errorService", () => {
  const originalLocalStorage = globalThis.localStorage;

  beforeEach(() => {
    // default: production davranışı
    globalThis.__APP_RUNTIME_MODE__ = "production";
  
    errorService.clearErrorLogs();
  
    vi.spyOn(console, "group").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "info").mockImplementation(() => {});
    vi.spyOn(console, "groupEnd").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
  
    const store = {};
    globalThis.localStorage = {
      getItem: vi.fn((key) => store[key] || null),
      setItem: vi.fn((key, value) => {
        store[key] = value;
      }),
      removeItem: vi.fn((key) => {
        delete store[key];
      }),
      clear: vi.fn(() => {
        Object.keys(store).forEach((key) => delete store[key]);
      }),
    };
  });
  
 

  afterEach(() => {
    vi.restoreAllMocks();
    // localStorage'ı restore et
    globalThis.localStorage = originalLocalStorage;
  });

  describe("logError", () => {
    it("should log error with correct structure", () => {
      const error = new Error("Test error");
      const context = { component: "TestComponent" };

      
      errorService.logError(error, context);

      const logs = errorService.getErrorLogs();
      expect(logs.length).toBeGreaterThan(0);
      expect(logs[0].message).toBe("Test error");
      expect(logs[0].context.component).toBe("TestComponent");
      expect(logs[0].level).toBe(errorService.ERROR_LOG_LEVELS.ERROR);
      expect(logs[0].timestamp).toBeDefined();
      expect(logs[0].stack).toBeDefined();
      expect(logs[0].name).toBe("Error");
    });

    it("should log error in development mode with console", () => {
      globalThis.__APP_RUNTIME_MODE__ = "development";
    
      const error = new Error("Test error");
      const context = { component: "TestComponent" };
    
      errorService.logError(error, context);
    
      expect(console.group).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith("Error:", error);
      expect(console.info).toHaveBeenCalledWith("Context:", context);
      expect(console.groupEnd).toHaveBeenCalled();
    });

    it("should handle null error gracefully", () => {
      
      expect(() => {
        errorService.logError(null, {});
      }).not.toThrow();

      const logs = errorService.getErrorLogs();
      expect(logs.length).toBeGreaterThan(0);
      expect(logs[0].message).toBe("Unknown error");
    });

    it("should include error info correctly", () => {
      
      const error = new Error("Test error");
      error.stack = "Error stack trace";
      const context = { action: "testAction" };

      errorService.logError(error, context);

      const logs = errorService.getErrorLogs();
      expect(logs[0].message).toBe("Test error");
      expect(logs[0].stack).toBe("Error stack trace");
      expect(logs[0].name).toBe("Error");
      expect(logs[0].context.action).toBe("testAction");
    });

    it("should use custom log level", () => {
      
      const error = new Error("Test error");
      errorService.logError(error, {}, errorService.ERROR_LOG_LEVELS.WARNING);

      const logs = errorService.getErrorLogs();
      expect(logs[0].level).toBe(errorService.ERROR_LOG_LEVELS.WARNING);
    });

    it("should limit logs to 50 entries", () => {
      
      // 55 error ekle
      for (let i = 0; i < 55; i++) {
        errorService.logError(new Error(`Error ${i}`));
      }

      const logs = errorService.getErrorLogs();
      expect(logs.length).toBe(50);
      expect(logs[0].message).toBe("Error 54"); // En yeni en başta
    });

    it("should handle localStorage errors gracefully", () => {
      
      // localStorage.setItem'ı hata fırlatacak şekilde mock'la
      const originalSetItem = globalThis.localStorage.setItem;
      globalThis.localStorage.setItem = vi.fn(() => {
        throw new Error("Storage quota exceeded");
      });

      const error = new Error("Test error");
      expect(() => errorService.logError(error)).not.toThrow();
      expect(console.warn).toHaveBeenCalled();

      // Restore
      globalThis.localStorage.setItem = originalSetItem;
    });

    it("should set userAgent/url to null when navigator/window are not available", () => {
      

      const originalNavigator = globalThis.navigator;
      const originalWindow = globalThis.window;

      // Force the fallback branch in errorService
      // (jsdom normally provides these globals)
      globalThis.navigator = undefined;
      globalThis.window = undefined;

      errorService.logError(new Error("UA/URL test"));
      const logs = errorService.getErrorLogs();
      expect(logs[0].userAgent).toBeNull();
      expect(logs[0].url).toBeNull();

      // Restore globals
      globalThis.navigator = originalNavigator;
      globalThis.window = originalWindow;
    });

    it("should handle invalid JSON in localStorage during production logging", () => {
      

      const originalGetItem = globalThis.localStorage.getItem;
      globalThis.localStorage.getItem = vi.fn(() => "invalid json");

      expect(() => errorService.logError(new Error("Invalid JSON test"))).not.toThrow();
      expect(console.warn).toHaveBeenCalled();

      globalThis.localStorage.getItem = originalGetItem;
    });
  });

  describe("logWarning", () => {
    it("should log warning with WARNING level", () => {
      
      errorService.logWarning("Warning message", { component: "Test" });

      const logs = errorService.getErrorLogs();
      expect(logs.length).toBeGreaterThan(0);
      expect(logs[0].message).toBe("Warning message");
      expect(logs[0].level).toBe(errorService.ERROR_LOG_LEVELS.WARNING);
      expect(logs[0].context.component).toBe("Test");
    });
  });

  describe("logInfo", () => {
    it("should log info with INFO level", () => {
      
      errorService.logInfo("Info message", { component: "Test" });

      const logs = errorService.getErrorLogs();
      expect(logs.length).toBeGreaterThan(0);
      expect(logs[0].message).toBe("Info message");
      expect(logs[0].level).toBe(errorService.ERROR_LOG_LEVELS.INFO);
      expect(logs[0].context.component).toBe("Test");
    });
  });

  describe("getErrorLogs", () => {
    it("should return empty array if no logs", () => {
      const logs = errorService.getErrorLogs();
      expect(logs).toEqual([]);
    });

    it("should return stored logs", () => {
      
      errorService.logError(new Error("Test error"));
      const logs = errorService.getErrorLogs();
      expect(logs.length).toBe(1);
      expect(logs[0].message).toBe("Test error");
    });

    it("should handle localStorage parse errors", () => {
      // localStorage.getItem'ı invalid JSON döndürecek şekilde mock'la
      const originalGetItem = globalThis.localStorage.getItem;
      globalThis.localStorage.getItem = vi.fn(() => "invalid json");

      const logs = errorService.getErrorLogs();
      expect(logs).toEqual([]);

      // Restore
      globalThis.localStorage.getItem = originalGetItem;
    });
  });

  describe("clearErrorLogs", () => {
    it("should clear error logs", () => {
      
      const error = new Error("Test error");
      errorService.logError(error);

      expect(errorService.getErrorLogs().length).toBeGreaterThan(0);

      errorService.clearErrorLogs();
      const logs = errorService.getErrorLogs();
      expect(logs.length).toBe(0);
    });

    it("should handle localStorage removeItem errors", () => {
      // localStorage.removeItem'ı hata fırlatacak şekilde mock'la
      const originalRemoveItem = globalThis.localStorage.removeItem;
      globalThis.localStorage.removeItem = vi.fn(() => {
        throw new Error("Storage error");
      });

      expect(() => errorService.clearErrorLogs()).not.toThrow();

      // Restore
      globalThis.localStorage.removeItem = originalRemoveItem;
    });
  });

  describe("getRuntimeMode", () => {
    it("should return value from globalThis.__APP_RUNTIME_MODE__ when set", () => {
      globalThis.__APP_RUNTIME_MODE__ = "custom-mode";
      expect(errorService.getRuntimeMode()).toBe("custom-mode");
    });

    it("should fallback to import.meta.env.MODE when globalThis override is not set", () => {
      // Temporarily remove the override set in beforeEach
      const originalMode = globalThis.__APP_RUNTIME_MODE__;
      delete globalThis.__APP_RUNTIME_MODE__;

      // getRuntimeMode should fallback to import.meta.env.MODE (which is "test" in test environment)
      const mode = errorService.getRuntimeMode();
      expect(mode).toBeDefined();
      // In test environment, this will be "test"
      expect(typeof mode).toBe("string");

      // Restore for other tests
      globalThis.__APP_RUNTIME_MODE__ = originalMode;
    });
  });
});
