import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  TrashIcon,
  PlusIcon,
  FunnelIcon,
  PencilIcon,
  CalendarIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import { useBookings } from "../../hooks/useBookings.js";
import { useBookingMutations } from "../../hooks/useBookingMutations.js";
import { useConfirm } from "../../hooks/useConfirm.js";
import { useToastContext } from "../../context/ToastContext.jsx";
import ConfirmDialog from "../../components/ConfirmDialog.jsx";
import DataWrapper from "../../components/DataWrapper.jsx";
import AdminBookingsCalendar from "./AdminBookingsCalendar.jsx";
import {
  CONFIRM_TEXTS,
  ROUTES,
  getAdminBookingEditRoute,
  BOOKING_STATUS,
  PARA_BIRIMI,
} from "../../constants/index.js";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

export default function AdminBookings() {
  const [view, setView] = useState("list"); // "list" veya "calendar"
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCurrency, setSelectedCurrency] = useState("all");

  const { confirm, confirmState, handleConfirm, handleCancel } = useConfirm();
  const { success, error: showError } = useToastContext();
  const { deleteMutation } = useBookingMutations();

  // Rezervasyonları getir
  const { bookings, isLoading, error, refetch } = useBookings({
    durum: selectedStatus !== "all" ? selectedStatus : undefined,
  });

  // Arama ve filtreleme
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      !searchTerm ||
      booking.musteriAdSoyad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.musteriEposta?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.musteriTelefon.includes(searchTerm);

    const matchesCurrency =
      selectedCurrency === "all" || booking.paraBirimi === selectedCurrency;

    return matchesSearch && matchesCurrency;
  });

  const handleDelete = async (id) => {
    const result = await confirm({
      title: "Rezervasyonu Sil",
      message: CONFIRM_TEXTS.DELETE_BOOKING,
      variant: "danger",
      confirmText: "Sil",
      cancelText: "İptal",
    });

    if (!result) return;

    deleteMutation.mutate(id, {
      onSuccess: () => {
        success("Rezervasyon başarıyla silindi");
        refetch();
      },
      onError: (err) => {
        console.error("Error deleting booking:", err);
        showError(err.message || "Rezervasyon silinirken bir hata oluştu");
      },
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case BOOKING_STATUS.ONAYLANDI:
        return "bg-green-100 text-green-800";
      case BOOKING_STATUS.OPSIYONEL:
        return "bg-yellow-100 text-yellow-800";
      case BOOKING_STATUS.TAMAMLANDI:
        return "bg-blue-100 text-blue-800";
      case BOOKING_STATUS.IPTAL_EDILDI:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount, currency) => {
    const symbols = {
      EUR: "€",
      USD: "$",
      TRY: "₺",
    };
    return `${amount.toLocaleString("tr-TR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} ${symbols[currency] || currency}`;
  };

  // Takvim görünümünde filtreleme yok, tüm rezervasyonlar gösterilir
  if (view === "calendar") {
    return (
      <>
        <div className="space-y-6">
          {/* Header with Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Rezervasyon Yönetimi
              </h1>
              <p className="text-sm text-gray-500 mt-1">Takvim görünümü</p>
            </div>
            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1">
                <button
                  onClick={() => setView("list")}
                  className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    view === "list"
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <TableCellsIcon className="h-5 w-5" />
                  <span>Liste</span>
                </button>
                <button
                  onClick={() => setView("calendar")}
                  className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    view === "calendar"
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <CalendarIcon className="h-5 w-5" />
                  <span>Takvim</span>
                </button>
              </div>
              <Link
                to={ROUTES.ADMIN_BOOKINGS_NEW}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <PlusIcon className="h-5 w-5" />
                <span>Yeni Rezervasyon Ekle</span>
              </Link>
            </div>
          </div>
          <AdminBookingsCalendar />
        </div>
      </>
    );
  }

  // Liste görünümü (varsayılan)
  return (
    <>
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
      <DataWrapper
        isLoading={isLoading}
        error={error}
        data={filteredBookings}
        loadingProps={{ message: "Rezervasyonlar yükleniyor..." }}
        emptyMessage="Henüz rezervasyon eklenmemiş"
        emptyProps={{
          actionLabel: "Yeni Rezervasyon Ekle",
          actionLink: ROUTES.ADMIN_BOOKINGS_NEW,
        }}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Rezervasyon Yönetimi
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {filteredBookings.length} rezervasyon bulundu
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1">
                <button
                  onClick={() => setView("list")}
                  className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    view === "list"
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <TableCellsIcon className="h-5 w-5" />
                  <span>Liste</span>
                </button>
                <button
                  onClick={() => setView("calendar")}
                  className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    view === "calendar"
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <CalendarIcon className="h-5 w-5" />
                  <span>Takvim</span>
                </button>
              </div>
              <Link
                to={ROUTES.ADMIN_BOOKINGS_NEW}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <PlusIcon className="h-5 w-5" />
                <span>Yeni Rezervasyon Ekle</span>
              </Link>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Müşteri ara (ad, e-posta, telefon)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
                >
                  <option value="all">Tüm Durumlar</option>
                  {Object.values(BOOKING_STATUS).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Currency Filter */}
              <div className="relative">
                <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
                >
                  <option value="all">Tüm Para Birimleri</option>
                  {Object.values(PARA_BIRIMI).map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Müşteri
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tekne
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tarih Aralığı
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Durum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Yolcu
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Toplam Tutar
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ödeme
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* Müşteri Bilgileri */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {booking.musteriAdSoyad}
                          </div>
                          {booking.musteriEposta && (
                            <div className="text-sm text-gray-500">
                              {booking.musteriEposta}
                            </div>
                          )}
                          <div className="text-xs text-gray-400">
                            {booking.musteriTelefon}
                          </div>
                        </div>
                      </td>

                      {/* Tekne */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {booking.boat?.name || `Tekne #${booking.tekneId}`}
                        </div>
                      </td>

                      {/* Tarih Aralığı */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-sm text-gray-900">
                          <CalendarIcon className="h-4 w-4 text-gray-400" />
                          <div>
                            <div>
                              {format(
                                new Date(booking.girisTarihi),
                                "dd MMM yyyy",
                                { locale: tr }
                              )}
                            </div>
                            <div className="text-xs text-gray-500">
                              {format(
                                new Date(booking.cikisTarihi),
                                "dd MMM yyyy",
                                { locale: tr }
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Durum */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs font-medium rounded-full ${getStatusColor(
                            booking.durum
                          )}`}
                        >
                          {booking.durum}
                        </span>
                      </td>

                      {/* Yolcu Sayısı */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.yolcuSayisi} kişi
                      </td>

                      {/* Toplam Tutar */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          {formatCurrency(
                            booking.toplamTutar,
                            booking.paraBirimi
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          Depozito:{" "}
                          {formatCurrency(
                            booking.alinanDepozito,
                            booking.paraBirimi
                          )}
                        </div>
                      </td>

                      {/* Ödeme Durumu */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {booking.kalanBakiye > 0 ? (
                            <span className="text-orange-600 font-medium">
                              Kalan:{" "}
                              {formatCurrency(
                                booking.kalanBakiye,
                                booking.paraBirimi
                              )}
                            </span>
                          ) : (
                            <span className="text-green-600 font-medium">
                              Ödendi
                            </span>
                          )}
                        </div>
                        {booking.odemeYontemi && (
                          <div className="text-xs text-gray-500">
                            {booking.odemeYontemi}
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={getAdminBookingEditRoute(booking.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Düzenle"
                          >
                            <PencilIcon className="h-4 w-4" />
                            <span className="hidden lg:inline">Düzenle</span>
                          </Link>
                          <button
                            onClick={() => handleDelete(booking.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
                            title="Sil"
                            disabled={deleteMutation.isPending}
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
          </div>
        </div>
      </DataWrapper>
    </>
  );
}
