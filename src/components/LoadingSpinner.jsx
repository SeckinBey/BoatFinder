export default function LoadingSpinner({
  message = "Yükleniyor...",
  fullScreen = false,
  size = "md", // sm, md, lg
}) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  const containerClass = fullScreen
    ? "min-h-screen flex items-center justify-center"
    : "flex items-center justify-center py-12";

  return (
    <div className={containerClass}>
      <div className="text-center">
        <div
          className={`animate-spin rounded-full border-b-2 border-indigo-600 mx-auto ${sizeClasses[size]}`}
        ></div>
        {message && <p className="mt-4 text-gray-600">{message}</p>}
      </div>
    </div>
  );
}
