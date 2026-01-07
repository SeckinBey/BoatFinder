import { Link } from "react-router-dom";
import { ROUTES } from "../constants/index.js";

export default function ErrorMessage({
  error,
  title = "Hata oluştu",
  message,
  showHomeLink = true,
  fullScreen = false,
}) {
  const errorMessage = message || error?.message || "Bir hata oluştu";
  const containerClass = fullScreen
    ? "min-h-screen flex items-center justify-center"
    : "flex items-center justify-center py-12";

  return (
    <div className={containerClass}>
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <p className="text-gray-600 mb-4">{errorMessage}</p>
        {showHomeLink && (
          <Link to={ROUTES.HOME} className="text-indigo-600 hover:underline">
            Ana Sayfaya Dön
          </Link>
        )}
      </div>
    </div>
  );
}
