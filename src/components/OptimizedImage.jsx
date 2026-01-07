// src/components/OptimizedImage.jsx
import { useState, useRef, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorSrc, setErrorSrc] = useState(null); // Hata olan src'yi state ile tut

  const isUsingPlaceholderRef = useRef(false);
  const errorHandlerCalledRef = useRef(false);
  const prevSrcRef = useRef(src);

  const finalPlaceholder = placeholder || placeholderImage;

  // src değiştiğinde, eğer bu src'de hata varsa state'i resetle
  useEffect(() => {
    if (src !== prevSrcRef.current) {
      prevSrcRef.current = src;
      // Eğer yeni src, hata olan src değilse, error state'ini temizle
      if (errorSrc !== src) {
        setErrorSrc(null);
        setIsLoading(true);
        setHasError(false);
        isUsingPlaceholderRef.current = false;
        errorHandlerCalledRef.current = false;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]); // errorSrc dependency'ye eklenmedi çünkü sadece src değiştiğinde kontrol etmek istiyoruz

  // src prop'unu direkt kullan, sadece error durumunda placeholder'a geç
  const imageSrc = errorSrc === src ? finalPlaceholder : src;

  const handleError = (e) => {
    if (errorHandlerCalledRef.current && isUsingPlaceholderRef.current) {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    if (!isUsingPlaceholderRef.current) {
      errorHandlerCalledRef.current = true;
      isUsingPlaceholderRef.current = true;
      setErrorSrc(src); // Hata olan src'yi kaydet
      setIsLoading(true);
      return;
    }

    setHasError(true);
    setIsLoading(false);
    if (onError) onError(e);
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
