import { useState, useCallback } from "react";

export function useConfirm() {
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
    onCancel: null, // Yeni eklendi
    variant: "danger",
    confirmText: "Evet",
    cancelText: "İptal",
  });

  const confirm = useCallback((options = {}) => {
    return new Promise((resolve) => {
      setConfirmState({
        isOpen: true,
        title: options.title || "Emin misiniz?",
        message: options.message || "Bu işlem geri alınamaz.",
        variant: options.variant || "danger",
        confirmText: options.confirmText || "Evet",
        cancelText: options.cancelText || "İptal",
        onConfirm: () => {
          resolve(true);
        },
        onCancel: () => {
          resolve(false); // veya reject(new Error("Cancelled"))
        },
      });
    });
  }, []);

  const close = useCallback(() => {
    setConfirmState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const handleConfirm = useCallback(() => {
    if (confirmState.onConfirm) {
      confirmState.onConfirm();
    }
    close();
  }, [confirmState, close]);

  const handleCancel = useCallback(() => {
    if (confirmState.onCancel) {
      confirmState.onCancel();
    }
    close();
  }, [confirmState, close]);

  return {
    confirmState,
    confirm,
    close,
    handleConfirm,
    handleCancel, // Yeni eklendi
  };
}
