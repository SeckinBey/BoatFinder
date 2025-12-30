// src/components/OptimizedImage.jsx
import { useState, useLayoutEffect, useRef } from "react";
import placeholderImage from "../assets/images/placeholder.svg";

/**
 * OptimizedImage - Optimize edilmiş image component
 *
 * Özellikler:
 * - Lazy loading (default)
 * - Error handling (placeholder fallback) - Infinite loop önleme ile
 * - Loading state
 * - Responsive images (sizes attribute)
 *
 * @param {Object} props
 * @param {string} props.src - Image URL (required)
 * @param {string} props.alt - Alt text (required)
 * @param {string} props.className - CSS classes
 * @param {string} props.loading - "lazy" | "eager" (default: "lazy")
 * @param {number} props.width - Image width (optional, aspect ratio için)
 * @param {number} props.height - Image height (optional, aspect ratio için)
 * @param {string} props.placeholder - Placeholder image URL (optional)
 * @param {string} props.sizes - Responsive sizes attribute (optional)
 * @param {Function} props.onError - Custom error handler (optional)
 * @param {Function} props.onLoad - Custom load handler (optional)
 * @param {string} props.fetchPriority - "high" | "low" | "auto" (optional)
 */
export default function OptimizedImage({
  src,
  alt,
  className = "",
  loading = "lazy",
  width,
  height,
  placeholder,
  sizes,
  onError,
  onLoad,
  fetchPriority,
  ...restProps
}) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // ✅ Infinite loop önleme: Şu anki src'nin original mi placeholder mı olduğunu track et
  const originalSrcRef = useRef(src);
  const isUsingPlaceholderRef = useRef(false);
  const errorHandlerCalledRef = useRef(false);

  const finalPlaceholder = placeholder || placeholderImage;

  // src prop'u değiştiğinde resetle
  // useLayoutEffect kullanıyoruz çünkü prop değişikliğini senkron olarak state'e yansıtmamız gerekiyor
  // Bu, React'in yeni kurallarına göre effect içinde setState kullanımı için uygun bir durum
  useLayoutEffect(() => {
    if (src !== originalSrcRef.current) {
      originalSrcRef.current = src;
      setImageSrc(src);
      setIsLoading(true);
      setHasError(false);
      isUsingPlaceholderRef.current = false;
      errorHandlerCalledRef.current = false;
    }
  }, [src]);

  const handleError = (e) => {
    // ✅ Eğer error handler zaten çağrıldıysa (placeholder denendi ama başarısız oldu), durdur
    if (errorHandlerCalledRef.current && isUsingPlaceholderRef.current) {
      // Placeholder da başarısız oldu, bir daha deneme
      setHasError(true);
      setIsLoading(false);
      return;
    }

    // ✅ İlk hata: Original src başarısız, placeholder'a geç
    if (!isUsingPlaceholderRef.current) {
      errorHandlerCalledRef.current = true;
      isUsingPlaceholderRef.current = true;
      setImageSrc(finalPlaceholder);
      setIsLoading(true);
      // Custom error handler'ı şimdi çağırma, placeholder deneniyor
      return;
    }

    // ✅ Bu noktaya gelinmemeli ama güvenlik için
    setHasError(true);
    setIsLoading(false);
    if (onError) {
      onError(e);
    }
  };

  const handleLoad = (e) => {
    setIsLoading(false);
    setHasError(false);

    // ✅ Başarılı yükleme oldu, flag'leri temizle (sadece yeni src gelirse reset edilir)

    if (onLoad) {
      onLoad(e);
    }
  };

  // Loading skeleton için className
  const containerClassName = `
    ${className}
    ${isLoading ? "bg-gray-200 animate-pulse" : ""}
    ${hasError ? "bg-gray-100" : ""}
  `.trim();

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={containerClassName}
      loading={loading}
      width={width}
      height={height}
      sizes={sizes}
      fetchPriority={fetchPriority}
      onError={handleError}
      onLoad={handleLoad}
      decoding="async"
      {...restProps}
    />
  );
}
