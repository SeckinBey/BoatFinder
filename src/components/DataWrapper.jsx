// src/components/DataWrapper.jsx
import LoadingSpinner from "./LoadingSpinner.jsx";
import ErrorMessage from "./ErrorMessage.jsx";
import EmptyState from "./EmptyState.jsx";

/**
 * Loading, error ve empty state'leri handle eden wrapper component
 * @param {Object} props
 * @param {boolean} props.isLoading - Loading durumu
 * @param {Error|null} props.error - Error objesi
 * @param {any} props.data - Data (null/undefined/empty array kontrolü için)
 * @param {React.ReactNode} props.children - Render edilecek içerik
 * @param {Object} props.loadingProps - LoadingSpinner için props
 * @param {Object} props.errorProps - ErrorMessage için props
 * @param {Object} props.emptyProps - EmptyState için props
 * @param {string} props.emptyMessage - Empty state için mesaj
 */
export default function DataWrapper({
  isLoading,
  error,
  data,
  children,
  loadingProps = {},
  errorProps = {},
  emptyProps = {},
  emptyMessage = "İçerik bulunamadı",
}) {
  // Loading durumu
  if (isLoading) {
    return <LoadingSpinner fullScreen {...loadingProps} />;
  }

  // Error durumu
  if (error) {
    return <ErrorMessage error={error} fullScreen {...errorProps} />;
  }

  // Empty/Not Found durumu
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return <EmptyState message={emptyMessage} fullScreen {...emptyProps} />;
  }

  // Data varsa children'ı render et
  return children;
}
