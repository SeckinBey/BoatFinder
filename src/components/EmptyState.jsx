import { Link } from "react-router-dom";
import { ROUTES } from "../constants/index.js";

export default function EmptyState({
  title = "İçerik bulunamadı",
  message,
  actionLabel = "Ana Sayfaya Dön",
  actionLink = ROUTES.HOME,
  showAction = true,
  fullScreen = false,
}) {
  const containerClass = fullScreen
    ? "min-h-screen flex items-center justify-center"
    : "flex items-center justify-center py-12";

  return (
    <div className={containerClass}>
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        {message && <p className="text-gray-600 mb-4">{message}</p>}
        {showAction && (
          <Link to={actionLink} className="text-indigo-600 hover:underline">
            {actionLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
