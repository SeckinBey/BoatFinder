import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";
import AdminSidebar from "./AdminSidebar.jsx";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Mobile Header with Hamburger Button */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30 flex items-center px-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle sidebar"
        >
          <Bars3Icon className="h-6 w-6 text-gray-700" />
        </button>
        <div className="ml-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-semibold text-sm">
            TF
          </div>
          <span className="text-lg font-bold text-gray-900">TripFinder</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-16 mt-6 md:pt-0 md:ml-64 p-4 md:p-8 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}