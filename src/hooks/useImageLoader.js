import { useState, useCallback } from "react";

/**
 * Tüm kritik görsellerin yüklenmesini takip eden hook
 * @param {Array<string>} imageUrls - Yüklenmesi gereken görsel URL'leri
 * @returns {Object} { allImagesLoaded, registerImage, registerFailedImage, loadedCount, totalCount }
 */
export function useImageLoader(imageUrls = []) {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [failedImages, setFailedImages] = useState(new Set());

  const registerImage = useCallback((url) => {
    setLoadedImages((prev) => {
      const newSet = new Set(prev);
      newSet.add(url);
      return newSet;
    });
  }, []);

  const registerFailedImage = useCallback((url) => {
    setFailedImages((prev) => {
      const newSet = new Set(prev);
      newSet.add(url);
      return newSet;
    });
  }, []);

  // Tüm görseller yüklendi mi veya başarısız oldu mu kontrol et
  const allImagesLoaded =
    imageUrls.length > 0 &&
    loadedImages.size + failedImages.size >= imageUrls.length;

  return {
    allImagesLoaded,
    registerImage,
    registerFailedImage,
    loadedCount: loadedImages.size,
    totalCount: imageUrls.length,
  };
}

