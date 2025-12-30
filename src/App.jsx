import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import { ROUTES } from "./constants/index.js";
import { ToastProvider, useToastContext } from "./context/ToastContext.jsx";
import { ToastContainer } from "./components/Toast.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { FilterProvider } from "./context/FilterContext.jsx";

// QueryClient instance oluştur
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: true,
    },
  },
});

// ✅ Lazy load public routes
const Home = lazy(() => import("./app/Home.jsx"));
const Explore = lazy(() => import("./app/Explore.jsx"));
const ProductDetail = lazy(() => import("./app/ProductDetail.jsx"));
const SignIn = lazy(() => import("./app/admin/auth/SignIn.jsx"));

// ✅ Lazy load admin routes (bunlar daha büyük ve nadiren kullanılıyor)
const AdminLayout = lazy(() => import("./app/admin/AdminLayout.jsx"));
const AdminDashboard = lazy(() => import("./app/admin/AdminDashboard.jsx"));
const AdminProducts = lazy(() => import("./app/admin/AdminProducts.jsx"));
const AdminProductsNew = lazy(() => import("./app/admin/AdminProductsNew.jsx"));
const AdminProductsEdit = lazy(() =>
  import("./app/admin/AdminProductsEdit.jsx")
);
const AdminData = lazy(() => import("./app/admin/AdminData.jsx"));
const AdminSettings = lazy(() => import("./app/admin/AdminSettings.jsx"));

function ToastWrapper() {
  const { toasts, removeToast } = useToastContext();
  return <ToastContainer toasts={toasts} onRemove={removeToast} />;
}

// Route loading fallback component
function RouteLoader() {
  return <LoadingSpinner fullScreen={true} message="Sayfa yükleniyor..." />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastProvider>
          <FilterProvider>
            <ToastWrapper />
            <ScrollToTop />
            <Suspense fallback={<RouteLoader />}>
              <Routes>
                {/* Public Routes */}
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route
                  path={`${ROUTES.EXPLORE}/:locationName?`}
                  element={<Explore />}
                />
                <Route
                  path={ROUTES.PRODUCT_DETAIL}
                  element={<ProductDetail />}
                />

                {/* Admin Sign In Route - Public Route */}
                <Route path={ROUTES.SIGN_IN} element={<SignIn />} />

                {/* Admin Routes - Protected */}
                <Route
                  path={ROUTES.ADMIN}
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="data" element={<AdminData />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="products/new" element={<AdminProductsNew />} />
                  <Route
                    path="products/edit/:id"
                    element={<AdminProductsEdit />}
                  />
                </Route>
              </Routes>
            </Suspense>
          </FilterProvider>
        </ToastProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
