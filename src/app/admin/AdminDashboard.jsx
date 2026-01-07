import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { subDays } from "date-fns";
import {
  ChatBubbleLeftRightIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  EyeIcon,
  PhotoIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  DeviceTabletIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
// ✅ Static import kaldırıldı
import { useProducts } from "../../hooks/useProducts.js";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";

// Mock data - Gerçek uygulamada API'den gelecek
const mockRequests = [
  {
    id: 1,
    date: new Date(2024, 0, 15, 14, 30),
    productId: 1,
    productName: "Mavi Rüya",
    message: "Merhaba, bu tekne için fiyat bilgisi alabilir miyim?",
    status: "yeni",
    whatsappClicks: 5,
  },
  {
    id: 2,
    date: new Date(2024, 0, 15, 12, 15),
    productId: 2,
    productName: "Ege Yıldızı",
    message: "Kaş'tan çıkış yapabilir miyiz?",
    status: "cevaplandı",
    whatsappClicks: 3,
  },
  {
    id: 3,
    date: subDays(new Date(), 1),
    productId: 3,
    productName: "Hızlı Dalga",
    message: "Hafta sonu için müsait mi?",
    status: "takipte",
    whatsappClicks: 8,
  },
  {
    id: 4,
    date: subDays(new Date(), 2),
    productId: 1,
    productName: "Mavi Rüya",
    message: "Rezervasyon yapmak istiyorum",
    status: "kapandı",
    whatsappClicks: 12,
  },
  {
    id: 5,
    date: subDays(new Date(), 3),
    productId: 4,
    productName: "Liman Kraliçesi",
    message: "Etkinlik için uygun mu?",
    status: "yeni",
    whatsappClicks: 2,
  },
];

// Mock session devices data
const mockSessionDevices = [
  { device: "Desktop", sessions: 1247, percentage: 58, color: "bg-indigo-500" },
  { device: "Mobile", sessions: 723, percentage: 34, color: "bg-blue-500" },
  { device: "Tablet", sessions: 178, percentage: 8, color: "bg-purple-500" },
];

// Mock top channels data
const mockTopChannels = [
  { channel: "Organic Search", sessions: 892, percentage: 42, change: +12.5 },
  { channel: "Direct", sessions: 534, percentage: 25, change: +8.2 },
  { channel: "Social Media", sessions: 423, percentage: 20, change: -3.1 },
  { channel: "Referral", sessions: 178, percentage: 8, change: +5.4 },
  { channel: "Email", sessions: 121, percentage: 5, change: -2.3 },
];

export default function AdminDashboard() {
  const [timeFilter, setTimeFilter] = useState("7"); // 7 veya 30 gün

  // ✅ useProducts hook'u ile gerçek data'yı al
  const {
    products,
    isLoading: isProductsLoading,
    error: productsError,
  } = useProducts();

  // Bugünkü durum hesaplamaları
  const todayStats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayRequests = mockRequests.filter((req) => req.date >= today);

    const last7Days = subDays(new Date(), 7);
    const last7DaysRequests = mockRequests.filter(
      (req) => req.date >= last7Days
    );

    const unanswered = mockRequests.filter(
      (req) => req.status === "yeni" || req.status === "takipte"
    );

    const oldUnanswered = mockRequests.filter((req) => {
      const hoursDiff = (new Date() - req.date) / (1000 * 60 * 60);
      return (
        (req.status === "yeni" || req.status === "takipte") && hoursDiff > 24
      );
    });

    return {
      todayWhatsAppClicks: todayRequests.reduce(
        (sum, req) => sum + req.whatsappClicks,
        0
      ),
      last7DaysTotal: last7DaysRequests.length,
      unansweredCount: unanswered.length,
      oldUnansweredCount: oldUnanswered.length,
    };
  }, []);

  // ✅ En çok ilgi gören ürünler - products kullanıyor
  const topProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    const days = parseInt(timeFilter);
    const cutoffDate = subDays(new Date(), days);

    const productStats = products.map((product) => {
      const relevantRequests = mockRequests.filter(
        (req) => req.productId === product.id && req.date >= cutoffDate
      );
      const clicks = relevantRequests.reduce(
        (sum, req) => sum + req.whatsappClicks,
        0
      );

      return {
        ...product,
        clicks,
        requestCount: relevantRequests.length,
      };
    });

    return productStats.sort((a, b) => b.clicks - a.clicks).slice(0, 5);
  }, [products, timeFilter]);

  // ✅ İçerik durumu - products kullanıyor
  const contentStatus = useMemo(() => {
    if (!products || products.length === 0) {
      return {
        active: 0,
        withoutImages: 0,
      };
    }

    const activeProducts = products.length;
    const productsWithoutImages = products.filter(
      (product) => !product.images || product.images.length === 0
    ).length;

    return {
      active: activeProducts,
      withoutImages: productsWithoutImages,
    };
  }, [products]);

  // Trafik özeti (mock)
  const trafficStats = {
    detailViews: 1247,
    whatsappClicks: 89,
    clickRate: ((89 / 1247) * 100).toFixed(1),
  };

  // Toplam session hesapla
  const totalSessions = mockSessionDevices.reduce(
    (sum, device) => sum + device.sessions,
    0
  );

  const getDeviceIcon = (device) => {
    switch (device) {
      case "Desktop":
        return <ComputerDesktopIcon className="h-5 w-5" />;
      case "Mobile":
        return <DevicePhoneMobileIcon className="h-5 w-5" />;
      case "Tablet":
        return <DeviceTabletIcon className="h-5 w-5" />;
      default:
        return <ComputerDesktopIcon className="h-5 w-5" />;
    }
  };

  const getChannelIcon = (channel) => {
    if (channel.includes("Search")) {
      return <MagnifyingGlassIcon className="h-5 w-5" />;
    } else if (channel.includes("Direct")) {
      return <GlobeAltIcon className="h-5 w-5" />;
    } else if (channel.includes("Social")) {
      return <ShareIcon className="h-5 w-5" />;
    } else {
      return <ChartBarIcon className="h-5 w-5" />;
    }
  };

  // ✅ Loading state
  if (isProductsLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Genel bakış ve talep yönetimi
          </p>
        </div>
        <LoadingSpinner message="Veriler yükleniyor..." />
      </div>
    );
  }

  // ✅ Error state
  if (productsError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Genel bakış ve talep yönetimi
          </p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">
            Ürünler yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Genel bakış ve talep yönetimi
        </p>
      </div>

      {/* 1. Bugünkü Durum - Üst Özet Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* WhatsApp Tıklama */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Bugün WhatsApp</p>
              <p className="text-2xl font-bold text-gray-900">
                {todayStats.todayWhatsAppClicks}
              </p>
              <p className="text-xs text-gray-400 mt-1">tıklama</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Son 7 Gün Toplam Talep */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Son 7 Gün</p>
              <p className="text-2xl font-bold text-gray-900">
                {todayStats.last7DaysTotal}
              </p>
              <p className="text-xs text-gray-400 mt-1">toplam talep</p>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
        </div>

        {/* Cevapsız/Takip Bekleyen */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Cevapsız/Takip</p>
              <p className="text-2xl font-bold text-gray-900">
                {todayStats.unansweredCount}
              </p>
              <p className="text-xs text-gray-400 mt-1">mesaj</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* 24 Saat+ Cevapsız */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">24 Saat+ Cevapsız</p>
              <p className="text-2xl font-bold text-red-600">
                {todayStats.oldUnansweredCount}
              </p>
              <p className="text-xs text-gray-400 mt-1">acil</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Session Devices */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Session Devices
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Cihaz türlerine göre oturum dağılımı
            </p>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-gray-900">
                  {totalSessions.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500">Toplam Session</span>
              </div>
            </div>
            <div className="space-y-4">
              {mockSessionDevices.map((device) => (
                <div key={device.device}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                        {getDeviceIcon(device.device)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {device.device}
                        </p>
                        <p className="text-xs text-gray-500">
                          {device.sessions.toLocaleString()} sessions
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      %{device.percentage}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${device.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${device.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. En Çok İlgi Gören Ürünler */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                En Çok İlgi Görenler
              </h2>
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="text-xs border border-gray-300 rounded px-2 py-1"
              >
                <option value="7">Son 7 Gün</option>
                <option value="30">Son 30 Gün</option>
              </select>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {topProducts.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                Henüz ürün bulunmuyor
              </div>
            ) : (
              topProducts.map((product, index) => (
                <div key={product.id} className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${product.id}`}
                        className="text-sm font-medium text-gray-900 hover:text-indigo-600 block truncate"
                      >
                        {product.title || product.name || `Ürün ${product.id}`}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">
                          {product.clicks} tıklama
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">
                          {product.requestCount} talep
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Top Channel */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Top Channel</h2>
          <p className="text-sm text-gray-500 mt-1">
            Trafik kaynaklarına göre session dağılımı
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {mockTopChannels.map((channel, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                  {getChannelIcon(channel.channel)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900">
                      {channel.channel}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-gray-900">
                        {channel.sessions.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500">
                        %{channel.percentage}
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          channel.change >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {channel.change >= 0 ? "+" : ""}
                        {channel.change}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${channel.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. İçerik Durumu & 6. Trafik Özeti */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* İçerik Durumu */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            İçerik Durumu
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-700">Aktif Ürünler</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">
                {contentStatus.active}
              </span>
            </div>
            {contentStatus.withoutImages > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <PhotoIcon className="h-5 w-5 text-yellow-600" />
                  <span className="text-sm text-gray-700">Görseli Olmayan</span>
                </div>
                <span className="text-lg font-semibold text-yellow-600">
                  {contentStatus.withoutImages}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Trafik Özeti */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Trafik Özeti
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <EyeIcon className="h-5 w-5 text-indigo-600" />
                <span className="text-sm text-gray-700">
                  Detay Sayfası Görüntüleme
                </span>
              </div>
              <span className="text-lg font-semibold text-gray-900">
                {trafficStats.detailViews.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ChatBubbleLeftRightIcon className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-700">WhatsApp Tıklama</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">
                {trafficStats.whatsappClicks}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
              <span className="text-sm text-gray-700">Tıklama Oranı</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-indigo-600">
                  %{trafficStats.clickRate}
                </span>
                <ArrowTrendingUpIcon className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
