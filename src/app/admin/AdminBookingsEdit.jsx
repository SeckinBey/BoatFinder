// src/app/admin/AdminBookingsEdit.jsx

import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { bookingFormSchema } from "../../schemas/bookingSchemas.js";
import { useBookingMutations } from "../../hooks/useBookingMutations.js";
import { useBooking } from "../../hooks/useBooking.js";
import { useBookingAvailability } from "../../hooks/useBookingAvailability.js";
import { useToastContext } from "../../context/ToastContext.jsx";
import { ROUTES, BOOKING_STATUS, PARA_BIRIMI } from "../../constants/index.js";
import DataWrapper from "../../components/DataWrapper.jsx";
import BookingFormFields from "./components/BookingFormFields.jsx";
import AvailabilityStatus from "./components/AvailabilityStatus.jsx";
import FinancialSummary from "./components/FinancialSummary.jsx";
import BookingFormHeader from "./components/BookingFormHeader.jsx";

export default function AdminBookingsEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { success, error: showError } = useToastContext();
    const { updateMutation } = useBookingMutations();
    const { booking, isLoading: isLoadingBooking, error: bookingError } = useBooking();

    const [selectedBoatId, setSelectedBoatId] = useState(null);
    const [girisTarihi, setGirisTarihi] = useState("");
    const [cikisTarihi, setCikisTarihi] = useState("");

    const form = useForm({
        resolver: zodResolver(bookingFormSchema),
    });

    const { watch, reset } = form;

    // Müsaitlik kontrolü (mevcut rezervasyonu hariç tut)
    const { available, conflictingBookings, isLoading: isCheckingAvailability } =
        useBookingAvailability(
            selectedBoatId,
            girisTarihi,
            cikisTarihi,
            id ? parseInt(id) : null, // Mevcut rezervasyonu hariç tut
            !!selectedBoatId && !!girisTarihi && !!cikisTarihi
        );

    // Rezervasyon verisini yükle ve form'u doldur
    useEffect(() => {
        if (booking) {
            // ISO datetime'ı datetime-local formatına çevir
            const formatDateTimeLocal = (isoString) => {
                if (!isoString) return "";
                const date = new Date(isoString);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                const hours = String(date.getHours()).padStart(2, "0");
                const minutes = String(date.getMinutes()).padStart(2, "0");
                return `${year}-${month}-${day}T${hours}:${minutes}`;
            };

            setSelectedBoatId(booking.tekneId);
            setGirisTarihi(formatDateTimeLocal(booking.girisTarihi));
            setCikisTarihi(formatDateTimeLocal(booking.cikisTarihi));

            reset({
                tekneId: booking.tekneId,
                girisTarihi: formatDateTimeLocal(booking.girisTarihi),
                cikisTarihi: formatDateTimeLocal(booking.cikisTarihi),
                durum: booking.durum || BOOKING_STATUS.OPSIYONEL,
                musteriAdSoyad: booking.musteriAdSoyad || "",
                musteriTelefon: booking.musteriTelefon || "",
                musteriEposta: booking.musteriEposta || "",
                yolcuSayisi: booking.yolcuSayisi || 1,
                bazFiyat: booking.bazFiyat || 0,
                ekstralarToplam: booking.ekstralarToplam || 0,
                paraBirimi: booking.paraBirimi || PARA_BIRIMI.EUR,
                odemeYontemi: booking.odemeYontemi || null,
                alinanDepozito: booking.alinanDepozito || 0,
                ozelIstekler: booking.ozelIstekler || "",
            });
        }
    }, [booking, reset]);

    // Rezervasyon bulunamazsa yönlendir
    useEffect(() => {
        if (!isLoadingBooking && !booking && !bookingError) {
            showError("Rezervasyon bulunamadı");
            navigate(ROUTES.ADMIN_BOOKINGS);
        }
    }, [booking, isLoadingBooking, bookingError, navigate, showError]);

    const onSubmit = async (data) => {
        // Müsaitlik kontrolü (sadece tarih veya tekne değiştiyse)
        const tarihDegisti =
            data.girisTarihi !== girisTarihi ||
            data.cikisTarihi !== cikisTarihi;
        const tekneDegisti = data.tekneId !== selectedBoatId;

        if ((tarihDegisti || tekneDegisti) && !available && conflictingBookings.length > 0) {
            showError(
                `Bu tekne seçilen tarihler arasında müsait değil. Çakışan rezervasyonlar: ${conflictingBookings.map((b) => b.musteriAdSoyad).join(", ")}`
            );
            return;
        }

        // datetime-local formatını ISO formatına çevir
        const formatToISO = (dateTimeLocal) => {
            if (!dateTimeLocal) return "";
            return new Date(dateTimeLocal).toISOString();
        };

        const updateData = {
            ...data,
            girisTarihi: formatToISO(data.girisTarihi),
            cikisTarihi: formatToISO(data.cikisTarihi),
        };

        updateMutation.mutate(
            { id: parseInt(id), data: updateData },
            {
                onSuccess: () => {
                    success("Rezervasyon başarıyla güncellendi");
                    navigate(ROUTES.ADMIN_BOOKINGS);
                },
                onError: (err) => {
                    console.error("Error updating booking:", err);
                    showError(err.message || "Rezervasyon güncellenirken bir hata oluştu");
                },
            }
        );
    };

    // Tarih değişikliklerini izle
    const watchedGirisTarihi = watch("girisTarihi");
    const watchedCikisTarihi = watch("cikisTarihi");
    const watchedTekneId = watch("tekneId");

    useEffect(() => {
        if (watchedGirisTarihi) {
            setGirisTarihi(watchedGirisTarihi);
        }
        if (watchedCikisTarihi) {
            setCikisTarihi(watchedCikisTarihi);
        }
        if (watchedTekneId) {
            setSelectedBoatId(watchedTekneId);
        }
    }, [watchedGirisTarihi, watchedCikisTarihi, watchedTekneId]);

    return (
        <DataWrapper
            isLoading={isLoadingBooking}
            error={bookingError}
            data={booking}
            loadingProps={{ message: "Rezervasyon yükleniyor..." }}
            emptyMessage="Rezervasyon bulunamadı"
        >
            {booking && (
                <div className="max-w-4xl mx-auto space-y-6">
                    <BookingFormHeader
                        title="Rezervasyon Düzenle"
                        subtitle={`Rezervasyon #${booking.id} - ${booking.musteriAdSoyad}`}
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
                                    disabled={
                                        updateMutation.isPending ||
                                        (!available && selectedBoatId && girisTarihi && cikisTarihi)
                                    }
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {updateMutation.isPending
                                        ? "Güncelleniyor..."
                                        : "Rezervasyonu Güncelle"}
                                </button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            )}
        </DataWrapper>
    );
}