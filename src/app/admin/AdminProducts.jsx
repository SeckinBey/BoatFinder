import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  EyeIcon,
  TrashIcon,
  PlusIcon,
  FunnelIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { useStaticData } from "../../hooks/useStaticData.js";
import {
  formatPrice,
  getBoatTypeName,
  getLocationName,
} from "../../utils/helpers.js";
import {
  CONFIRM_TEXTS,
  DEFAULTS,
  ERROR_MESSAGES,
  getAdminProductEditRoute,
  getProductDetailRoute,
  ROUTES,
} from "../../constants/index.js";
import { useConfirm } from "../../hooks/useConfirm.js";
import ConfirmDialog from "../../components/ConfirmDialog.jsx";
import { useFilteredProducts } from "../../hooks/useFilteredProducts.js";
import DataWrapper from "../../components/DataWrapper.jsx";
import { deleteProduct } from "../../services/productService.js";
import { useToastContext } from "../../context/ToastContext.jsx";
import placeholderImage from "../../assets/images/placeholder.svg";
import OptimizedImage from "../../components/OptimizedImage.jsx";

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState(DEFAULTS.ALL_FILTER);
  const [selectedLocation, setSelectedLocation] = useState(DEFAULTS.ALL_FILTER);

  const {
    locations,
    boatTypes,
    isLoading: isStaticDataLoading,
  } = useStaticData();

  // Confirm hook kullanımı
  const { confirm, confirmState, handleConfirm, handleCancel } = useConfirm();

  // Toast hook kullanımı
  const { success, error: showError } = useToastContext();

  // Filtreleme ve arama
  const {
    products: filteredProducts,
    isLoading,
    error,
    refetch,
  } = useFilteredProducts({
    searchTerm,
    selectedType,
    selectedLocation,
  });

  const handleDelete = async (id) => {
    const result = await confirm({
      title: "Ürünü Sil",
      message: CONFIRM_TEXTS.DELETE_PRODUCT,
      variant: "danger",
      confirmText: "Sil",
      cancelText: "İptal",
    });

    if (!result) {
      return;
    }

    // API çağrısı yap
    try {
      await deleteProduct(id);
      success("Ürün başarıyla silindi");
      refetch(); // ✅ Verileri yenile
    } catch (err) {
      console.error("Error deleting product:", err);

      // ✅ Daha detaylı hata mesajı
      let errorMessage = "Ürün silinirken bir hata oluştu";

      if (err.message) {
        errorMessage = err.message;
      } else if (err.code) {
        errorMessage = `Hata kodu: ${err.code}`;
      }

      // ✅ RLS veya permission hatası kontrolü
      if (
        err.message?.includes("permission") ||
        err.message?.includes("policy") ||
        err.code === "42501" || // PostgreSQL permission denied
        err.code === "PGRST301"
      ) {
        // PostgREST permission error
        errorMessage =
          "Bu işlem için yetkiniz yok. Lütfen Supabase RLS politikalarını kontrol edin.";
      }

      showError(errorMessage);
    }
  };

  return (
    <>
      <DataWrapper
        isLoading={isLoading || isStaticDataLoading}
        error={error}
        data={filteredProducts}
        loadingProps={{ message: "Ürünler yükleniyor..." }}
        emptyMessage="Henüz ürün eklenmemiş"
      >
        <ConfirmDialog
          isOpen={confirmState.isOpen}
          onClose={handleCancel}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          title={confirmState.title}
          message={confirmState.message}
          variant={confirmState.variant}
          confirmText={confirmState.confirmText}
          cancelText={confirmState.cancelText}
        />
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Ürün Yönetimi
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {filteredProducts.length} ürün bulundu
              </p>
            </div>
            <Link
              to={ROUTES.ADMIN_PRODUCTS_NEW}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Yeni Ürün Ekle</span>
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Ürün ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Type Filter */}
              <div className="relative">
                <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
                >
                  <option value={DEFAULTS.ALL_FILTER}>Tüm Tekne Tipleri</option>
                  {boatTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div className="relative">
                <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
                >
                  <option value={DEFAULTS.ALL_FILTER}>Tüm Lokasyonlar</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Products Table */}

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Desktop Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ürün
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tip
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lokasyon
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kapasite
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Uzunluk
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Süre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fiyat
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((boat) => (
                    <tr
                      key={boat.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* Product Info with Image */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="shrink-0 h-12 w-12">
                            <OptimizedImage
                              src={boat.images[0] || placeholderImage}
                              alt={boat.name}
                              className="h-12 w-12 rounded-lg object-cover"
                              loading="lazy"
                              sizes="48px"
                            />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {boat.name}
                            </div>
                            <div className="text-sm text-gray-500 line-clamp-1">
                              {boat.title}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                          {getBoatTypeName(boat.typeId, boatTypes)}
                        </span>
                      </td>

                      {/* Location */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getLocationName(boat.locationId, locations)}
                      </td>

                      {/* Capacity */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {boat.travelCapacity} kişi
                      </td>

                      {/* Length */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {boat.length}
                      </td>

                      {/* Duration */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {boat.durationType}
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-indigo-600">
                          {formatPrice(boat.price, "€")}
                        </div>
                        <div className="text-xs text-gray-500">
                          /{boat.durationType === "Saatlik" ? "saat" : "gün"}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={getProductDetailRoute(boat.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="Detay Görüntüle"
                          >
                            <EyeIcon className="h-4 w-4" />
                            <span className="hidden lg:inline">Detay</span>
                          </Link>
                          <Link
                            to={getAdminProductEditRoute(boat.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Düzenle"
                          >
                            <PencilIcon className="h-4 w-4" />
                            <span className="hidden lg:inline">Düzenle</span>
                          </Link>
                          <button
                            onClick={() => handleDelete(boat.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
                            title="Sil"
                          >
                            <TrashIcon className="h-4 w-4" />
                            <span className="hidden lg:inline">Sil</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View (Hidden on desktop) */}
            <div className="md:hidden divide-y divide-gray-200">
              {filteredProducts.map((boat) => (
                <div key={boat.id} className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <OptimizedImage
                      src={boat.images[0] || placeholderImage}
                      alt={boat.name}
                      className="h-16 w-16 rounded-lg object-cover shrink-0"
                      loading="lazy"
                      sizes="64px"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900">
                        {boat.name}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                        {boat.title}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                    <div>
                      <span className="text-gray-500">Tip:</span>
                      <span className="ml-1 font-medium text-gray-900">
                        {getBoatTypeName(boat.typeId, boatTypes)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Lokasyon:</span>
                      <span className="ml-1 font-medium text-gray-900">
                        {getLocationName(boat.locationId, locations)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Kapasite:</span>
                      <span className="ml-1 font-medium text-gray-900">
                        {boat.travelCapacity} kişi
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Fiyat:</span>
                      <span className="ml-1 font-semibold text-indigo-600">
                        {formatPrice(boat.price, "€")}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={getProductDetailRoute(boat.id)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    >
                      <EyeIcon className="h-4 w-4" />
                      <span>Detay</span>
                    </Link>
                    <Link
                      to={getAdminProductEditRoute(boat.id)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                    >
                      <PencilIcon className="h-4 w-4" />
                      <span>Düzenle</span>
                    </Link>
                    <button
                      onClick={() => handleDelete(boat.id)}
                      className="flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DataWrapper>
    </>
  );
}
