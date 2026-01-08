import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  CubeIcon,
  DocumentIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  CubeIcon as CubeIconSolid,
  DocumentIcon as DocumentIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
  CalendarIcon as CalendarIconSolid,
} from "@heroicons/react/24/solid";
import { useAuth } from "../../context/AuthContext.jsx";
import { ROUTES } from "../../constants/index.js";

export default function AdminSidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.SIGN_IN);
  };

  const handleLinkClick = () => {
    // Mobile'da link'e tıklandığında sidebar'ı kapat
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const menuItems = [
    {
      path: "/admin",
      label: "Dashboard",
      icon: HomeIcon,
      iconSolid: HomeIconSolid,
    },
    {
      path: "/admin/products",
      label: "Ürünler",
      icon: CubeIcon,
      iconSolid: CubeIconSolid,
    },
    {
      path: "/admin/data",
      label: "Veriler",
      icon: DocumentIcon,
      iconSolid: DocumentIconSolid,
    },
    {
      path: "/admin/bookings",
      label: "Rezervasyonlar",
      icon: CalendarIcon,
      iconSolid: CalendarIconSolid,
    },
    {
      path: "/admin/settings",
      label: "Ayarlar",
      icon: Cog6ToothIcon,
      iconSolid: Cog6ToothIconSolid,
    },
  ];

  // user?.email yerine direkt user.email kullanabiliriz çünkü logout olduğunda user null olacak ve ProtectedRoute redirect edecek
  const userEmail = user?.email || "admin@example.com";

  return (
    <>
      {/* Overlay - Sadece mobile'da görünür */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-linear-to-b from-gray-900 to-gray-800 text-white flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Logo/Brand Section with Close Button */}
        <div className="px-6 py-6 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white font-semibold">
              TF
            </div>
            <div>
              <h1 className="text-lg font-bold">TripFinder</h1>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          </div>
          {/* Close Button - Sadece mobile'da görünür */}
          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors"
            aria-label="Close sidebar"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const active = isActive(item.path);
            const IconComponent = active ? item.iconSolid : item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleLinkClick}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  active
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <IconComponent className="h-5 w-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Logout */}
        <div className="border-t border-gray-700 p-4">
          <div className="flex items-center gap-3 px-3 py-2 mb-3 rounded-lg bg-gray-700/50">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-semibold">
              {userEmail.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {userEmail.split("@")[0]}
              </p>
              <p className="text-xs text-gray-400 truncate">Admin</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-200"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            <span className="text-sm font-medium">Çıkış Yap</span>
          </button>
        </div>
      </aside>
    </>
  );
}
