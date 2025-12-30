import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useConfirm } from "./useConfirm.js";

describe("useConfirm", () => {
  it("should initialize with closed state", () => {
    const { result } = renderHook(() => useConfirm());

    expect(result.current.confirmState.isOpen).toBe(false);
  });

  it("should open confirm dialog when confirm is called", async () => {
    const { result } = renderHook(() => useConfirm());

    act(() => {
      result.current.confirm({
        title: "Test Title",
        message: "Test message",
      });
    });

    expect(result.current.confirmState.isOpen).toBe(true);
    expect(result.current.confirmState.title).toBe("Test Title");
    expect(result.current.confirmState.message).toBe("Test message");
    expect(result.current.confirmState.variant).toBe("danger"); // default
    expect(result.current.confirmState.confirmText).toBe("Evet"); // default
    expect(result.current.confirmState.cancelText).toBe("İptal"); // default

    // Cleanup
    act(() => {
      result.current.handleCancel();
    });
  });

  it("should use default title/message when not provided", async () => {
    const { result } = renderHook(() => useConfirm());

    act(() => {
      result.current.confirm({});
    });

    expect(result.current.confirmState.isOpen).toBe(true);
    expect(result.current.confirmState.title).toBe("Emin misiniz?");
    expect(result.current.confirmState.message).toBe("Bu işlem geri alınamaz.");

    // Cleanup
    act(() => {
      result.current.handleCancel();
    });
  });

  it("should not throw and should use defaults when confirm() is called without options", () => {
    const { result } = renderHook(() => useConfirm());

    act(() => {
      result.current.confirm();
    });

    expect(result.current.confirmState.isOpen).toBe(true);
    expect(result.current.confirmState.title).toBe("Emin misiniz?");
    expect(result.current.confirmState.message).toBe("Bu işlem geri alınamaz.");

    // Cleanup
    act(() => {
      result.current.handleCancel();
    });
  });

  it("should resolve promise with true when confirmed", async () => {
    const { result } = renderHook(() => useConfirm());

    let confirmPromise;
    act(() => {
      confirmPromise = result.current.confirm({
        title: "Test",
        message: "Test",
      });
    });

    let resolvedValue;
    act(() => {
      result.current.handleConfirm();
    });

    resolvedValue = await confirmPromise;
    expect(resolvedValue).toBe(true);
    expect(result.current.confirmState.isOpen).toBe(false);
  });

  it("should resolve promise with false when cancelled", async () => {
    const { result } = renderHook(() => useConfirm());

    let confirmPromise;
    act(() => {
      confirmPromise = result.current.confirm({
        title: "Test",
        message: "Test",
      });
    });

    let resolvedValue;
    act(() => {
      result.current.handleCancel();
    });

    resolvedValue = await confirmPromise;
    expect(resolvedValue).toBe(false);
    expect(result.current.confirmState.isOpen).toBe(false);
  });

  it("should use custom options", () => {
    const { result } = renderHook(() => useConfirm());

    act(() => {
      result.current.confirm({
        title: "Custom Title",
        message: "Custom Message",
        variant: "info",
        confirmText: "Onayla",
        cancelText: "Vazgeç",
      });
    });

    expect(result.current.confirmState.title).toBe("Custom Title");
    expect(result.current.confirmState.message).toBe("Custom Message");
    expect(result.current.confirmState.variant).toBe("info");
    expect(result.current.confirmState.confirmText).toBe("Onayla");
    expect(result.current.confirmState.cancelText).toBe("Vazgeç");

    // Cleanup
    act(() => {
      result.current.handleCancel();
    });
  });

  it("should close dialog using close method", () => {
    const { result } = renderHook(() => useConfirm());

    act(() => {
      result.current.confirm({
        title: "Test",
        message: "Test",
      });
    });

    expect(result.current.confirmState.isOpen).toBe(true);

    act(() => {
      result.current.close();
    });

    expect(result.current.confirmState.isOpen).toBe(false);
  });

  it("should not throw when handleConfirm is called before confirm()", () => {
    const { result } = renderHook(() => useConfirm());
    expect(result.current.confirmState.isOpen).toBe(false);

    act(() => {
      result.current.handleConfirm();
    });

    expect(result.current.confirmState.isOpen).toBe(false);
  });

  it("should not throw when handleCancel is called before confirm()", () => {
    const { result } = renderHook(() => useConfirm());
    expect(result.current.confirmState.isOpen).toBe(false);

    act(() => {
      result.current.handleCancel();
    });

    expect(result.current.confirmState.isOpen).toBe(false);
  });
});
