// src/app/admin/AdminBookingsNew.jsx

import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { bookingFormSchema } from "../../schemas/bookingSchemas.js";
import { useBookingMutations } from "../../hooks/useBookingMutations.js";
import { useBookingAvailability } from "../../hooks/useBookingAvailability.js";
import { useToastContext } from "../../context/ToastContext.jsx";
import { ROUTES, BOOKING_STATUS, PARA_BIRIMI } from "../../constants/index.js";
import BookingFormFields from "./components/BookingFormFields.jsx";
import AvailabilityStatus from "./components/AvailabilityStatus.jsx";
import FinancialSummary from "./components/FinancialSummary.jsx";
import BookingFormHeader from "./components/BookingFormHeader.jsx";

export default function AdminBookingsNew() {
  const navigate = useNavigate();
  const { success, error: showError } = useToastContext();
  const { createMutation } = useBookingMutations();

  const [selectedBoatId, setSelectedBoatId] = useState(null);
  const [girisTarihi, setGirisTarihi] = useState("");
  const [cikisTarihi, setCikisTarihi] = useState("");

  const form = useForm({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      tekneId: undefined,
      girisTarihi: "",
      cikisTarihi: "",
      durum: BOOKING_STATUS.OPSIYONEL,
      musteriAdSoyad: "",
      musteriTelefon: "",
      musteriEposta: "",
      yolcuSayisi: 1,
      bazFiyat: 0,
      ekstralarToplam: 0,
      paraBirimi: PARA_BIRIMI.EUR,
      odemeYontemi: null,
      alinanDepozito: 0,
      ozelIstekler: "",
    },
  });

  const { watch } = form;

  // Müsaitlik kontrolü
  const {
    available,
    conflictingBookings,
    isLoading: isCheckingAvailability,
  } = useBookingAvailability(
    selectedBoatId,
    girisTarihi,
    cikisTarihi,
    null,
    !!selectedBoatId && !!girisTarihi && !!cikisTarihi
  );

  const onSubmit = async (data) => {
    

    // datetime-local formatını ISO formatına çevir
    const formatToISO = (dateTimeLocal) => {
      if (!dateTimeLocal) return "";
      return new Date(dateTimeLocal).toISOString();
    };

    const bookingData = {
      ...data,
      girisTarihi: formatToISO(data.girisTarihi),
      cikisTarihi: formatToISO(data.cikisTarihi),
    };

    createMutation.mutate(bookingData, {
      onSuccess: () => {
        success("Rezervasyon başarıyla oluşturuldu");
        navigate(ROUTES.ADMIN_BOOKINGS);
      },
      onError: (err) => {
        console.error("Error creating booking:", err);
        showError(err.message || "Rezervasyon oluşturulurken bir hata oluştu");
      },
    });
  };

  // Tarih değişikliklerini izle
  const watchedGirisTarihi = watch("girisTarihi");
  const watchedCikisTarihi = watch("cikisTarihi");
  const watchedTekneId = watch("tekneId");

  useEffect(() => {
    setGirisTarihi(watchedGirisTarihi || "");
    setCikisTarihi(watchedCikisTarihi || "");
    setSelectedBoatId(watchedTekneId || null);
  }, [watchedGirisTarihi, watchedCikisTarihi, watchedTekneId]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <BookingFormHeader
        title="Yeni Rezervasyon Ekle"
        subtitle="Yeni bir rezervasyon oluşturun"
      />

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white rounded-lg border border-gray-200 p-6 space-y-6"
        >
          <BookingFormFields />

          {selectedBoatId && girisTarihi && cikisTarihi && (
            <AvailabilityStatus
              available={available}
              conflictingBookings={conflictingBookings}
              isLoading={isCheckingAvailability}
            />
          )}

          <FinancialSummary />

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t">
            <Link
              to={ROUTES.ADMIN_BOOKINGS}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              İptal
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createMutation.isPending
                ? "Kaydediliyor..."
                : "Rezervasyon Oluştur"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
