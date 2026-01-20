// src/app/admin/AdminBookingsCalendar.jsx

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { tr } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useBookings } from "../../hooks/useBookings.js";
import DataWrapper from "../../components/DataWrapper.jsx";
import {
  getAdminBookingEditRoute,
  BOOKING_STATUS,
} from "../../constants/index.js";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/index.js";

// date-fns localizer oluştur
const localizer = {
  format: (date, formatStr) => format(date, formatStr, { locale: tr }),
  parse: (str, formatStr) => parse(str, formatStr, new Date()),
  startOfWeek: (date) => startOfWeek(date, { locale: tr, weekStartsOn: 1 }), // Pazartesi başlangıç
  getDay: (date) => getDay(date),
  locales: { tr },
};

export default function AdminBookingsCalendar() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month");

  // Tüm rezervasyonları getir
  const { bookings, isLoading, error } = useBookings();

  // Rezervasyonları calendar event formatına çevir
  const events = useMemo(() => {
    return bookings.map((booking) => {
      const startDate = new Date(booking.girisTarihi);
      const endDate = new Date(booking.cikisTarihi);

      // End date'i dahil etmek için 1 gün ekle (calendar'da end date exclusive)
      endDate.setDate(endDate.getDate() + 1);

      // Durum renklerini belirle
      const getEventStyle = (status) => {
        switch (status) {
          case BOOKING_STATUS.ONAYLANDI:
            return {
              backgroundColor: "#10b981", // green-500
              borderColor: "#059669", // green-600
              color: "#ffffff",
            };
          case BOOKING_STATUS.OPSIYONEL:
            return {
              backgroundColor: "#f59e0b", // yellow-500
              borderColor: "#d97706", // yellow-600
              color: "#ffffff",
            };
          case BOOKING_STATUS.TAMAMLANDI:
            return {
              backgroundColor: "#3b82f6", // blue-500
              borderColor: "#2563eb", // blue-600
              color: "#ffffff",
            };
          case BOOKING_STATUS.IPTAL_EDILDI:
            return {
              backgroundColor: "#ef4444", // red-500
              borderColor: "#dc2626", // red-600
              color: "#ffffff",
            };
          default:
            return {
              backgroundColor: "#6b7280", // gray-500
              borderColor: "#4b5563", // gray-600
              color: "#ffffff",
            };
        }
      };

      return {
        id: booking.id,
        title: `${booking.boat?.name || `Tekne #${booking.tekneId}`} - ${
          booking.musteriAdSoyad
        }`,
        start: startDate,
        end: endDate,
        resource: booking, // Tüm booking verisi
        style: getEventStyle(booking.durum),
      };
    });
  }, [bookings]);

  // Event tıklandığında rezervasyon detay sayfasına git
  const handleSelectEvent = (event) => {
    navigate(getAdminBookingEditRoute(event.id));
  };

  // Tarih değiştiğinde
  const handleNavigate = (newDate) => {
    setCurrentDate(newDate);
  };

  // Görünüm değiştiğinde
  const handleViewChange = (newView) => {
    setView(newView);
  };

  // Custom event style
  const eventStyleGetter = (event) => {
    return {
      style: {
        ...event.style,
        borderRadius: "4px",
        border: `2px solid ${event.style.borderColor}`,
        padding: "2px 4px",
        fontSize: "12px",
        fontWeight: "500",
      },
    };
  };

  // Custom toolbar (Türkçe butonlar için)
  const CustomToolbar = ({ label, onNavigate, onView, view }) => {
    return (
      <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate("PREV")}
            className="rounded-lg border border-gray-300 bg-white p-2 hover:bg-gray-50"
            aria-label="Önceki"
          >
            <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={() => onNavigate("TODAY")}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Bugün
          </button>
          <button
            onClick={() => onNavigate("NEXT")}
            className="rounded-lg border border-gray-300 bg-white p-2 hover:bg-gray-50"
            aria-label="Sonraki"
          >
            <ChevronRightIcon className="h-5 w-5 text-gray-600" />
          </button>
          <h2 className="ml-4 text-xl font-semibold text-gray-900">{label}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onView("month")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              view === "month"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Ay
          </button>
          <button
            onClick={() => onView("week")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              view === "week"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Hafta
          </button>
          <button
            onClick={() => onView("day")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              view === "day"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Gün
          </button>
          <Link
            to={ROUTES.ADMIN_BOOKINGS_NEW}
            className="ml-2 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Yeni Rezervasyon</span>
          </Link>
        </div>
      </div>
    );
  };

  // Türkçe mesajlar
  const messages = {
    allDay: "Tüm Gün",
    previous: "Önceki",
    next: "Sonraki",
    today: "Bugün",
    month: "Ay",
    week: "Hafta",
    day: "Gün",
    agenda: "Ajanda",
    date: "Tarih",
    time: "Saat",
    event: "Etkinlik",
    noEventsInRange: "Bu aralıkta rezervasyon bulunmuyor.",
    showMore: (total) => `+${total} daha fazla`,
  };

  return (
    <DataWrapper
      isLoading={isLoading}
      error={error}
      data={bookings}
      loadingProps={{ message: "Rezervasyonlar yükleniyor..." }}
      emptyMessage="Henüz rezervasyon eklenmemiş"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Rezervasyon Takvimi
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {bookings.length} rezervasyon görüntüleniyor
            </p>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div style={{ height: "700px" }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "100%" }}
              view={view}
              onView={handleViewChange}
              date={currentDate}
              onNavigate={handleNavigate}
              onSelectEvent={handleSelectEvent}
              eventPropGetter={eventStyleGetter}
              messages={messages}
              components={{
                toolbar: CustomToolbar,
              }}
              culture="tr"
              formats={{
                dayFormat: "EEEE d", // "Pazartesi 15"
                weekdayFormat: "EEEEEE", // "Pzt"
                monthHeaderFormat: "MMMM yyyy", // "Ocak 2024"
                dayHeaderFormat: "EEEE d MMMM", // "Pazartesi 15 Ocak"
                dayRangeHeaderFormat: ({ start, end }) =>
                  `${format(start, "d MMMM", { locale: tr })} - ${format(
                    end,
                    "d MMMM",
                    { locale: tr }
                  )}`,
              }}
            />
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Durum Renkleri
          </h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-green-500"></div>
              <span className="text-sm text-gray-700">Onaylandı</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-yellow-500"></div>
              <span className="text-sm text-gray-700">Opsiyonel</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-blue-500"></div>
              <span className="text-sm text-gray-700">Tamamlandı</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-red-500"></div>
              <span className="text-sm text-gray-700">İptal Edildi</span>
            </div>
          </div>
        </div>
      </div>
    </DataWrapper>
  );
}
