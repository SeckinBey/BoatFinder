// src/app/ProductDetail.jsx
import { useState, useEffect } from "react";
import { useStaticData } from "../hooks/useStaticData.js";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getAmenitiesByIds } from "../utils/helpers.js";
import { ERROR_MESSAGES, SEO_CONFIG } from "../constants/index.js";
import { useProduct } from "../hooks/useProduct.js";
import DataWrapper from "../components/DataWrapper.jsx";
import { useSEO } from "../hooks/useSEO.js";
import OptimizedImage from "../components/OptimizedImage.jsx";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerBookingSchema } from "../schemas/bookingSchemas.js";
import { useToastContext } from "../context/ToastContext.jsx";
import { WHATSAPP } from "../constants/index.js";

export default function ProductDetail() {
  const { product, isLoading, error } = useProduct();
  const {
    amenities: amenitiesList,
    addons,
    faqs,
    isLoading: isStaticDataLoading,
  } = useStaticData();

  useSEO({
    title: product?.title || "Tekne Detayı",
    description: product?.details
      ? `${product.details.substring(0, 160)}...`
      : `${product?.title || "Tekne"} - ${
          product?.location?.name || "Antalya"
        } bölgesinde tekne kiralama. ${product?.price || ""} € ${
          product?.durationType || ""
        }. TripFinder ile unutulmaz bir deniz yolculuğu yapın.`,
    keywords: `tekne kiralama, ${product?.location?.name || "antalya"}, ${
      product?.type?.name || "yacht"
    }, ${product?.price || ""} euro`,
    image: product?.images?.[0] || undefined, // İlk görseli OG image olarak kullan
    url: product ? `/product/${product.id}` : undefined,
    type: "product",
    structuredData: product
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.title,
          description:
            product.details ||
            `${product.title} - ${
              product.location?.name || "Antalya"
            } bölgesinde tekne kiralama hizmeti`,
          image: product.images || [],
          brand: {
            "@type": "Brand",
            name: "TripFinder",
          },
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            url: `${SEO_CONFIG.SITE_URL}/product/${product.id}`,
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.5",
            reviewCount: "10",
          },
        }
      : undefined,
  });

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const { success, error: showError } = useToastContext();

  // Rezervasyon formu
  const bookingForm = useForm({
    resolver: zodResolver(customerBookingSchema),
    defaultValues: {
      tekneId: product?.id || 0,
      girisTarihi: "",
      cikisTarihi: "",
      musteriAdSoyad: "",
      musteriTelefon: "",
      yolcuSayisi: 1,
      ozelIstekler: "",
    },
  });

  // Product yüklendiğinde form'u güncelle
  useEffect(() => {
    if (product?.id) {
      bookingForm.reset({
        tekneId: product.id,
        girisTarihi: "",
        cikisTarihi: "",
        musteriAdSoyad: "",
        musteriTelefon: "",
        yolcuSayisi: 1,
        ozelIstekler: "",
      });
    }
  }, [product?.id, bookingForm]);

  const { handleSubmit: handleBookingSubmit } = bookingForm;

  // Rezervasyon gönderme - WhatsApp'a yönlendirme
  const onBookingSubmit = async (data) => {
    // Form verilerini WhatsApp mesaj formatına çevir
    const bookingData = {
      tekneAdi: product.title || product.name || "Tekne",
      girisTarihi: data.girisTarihi,
      cikisTarihi: data.cikisTarihi,
      yolcuSayisi: data.yolcuSayisi,
      musteriAdSoyad: data.musteriAdSoyad,
      musteriTelefon: data.musteriTelefon,
      ozelIstekler: data.ozelIstekler || "",
    };

    // WhatsApp mesajını oluştur
    const message = WHATSAPP.MESSAGE_TEMPLATE(bookingData);

    // WhatsApp linkini oluştur
    const whatsappUrl = `https://wa.me/${
      WHATSAPP.PHONE_NUMBER
    }?text=${encodeURIComponent(message)}`;

    // WhatsApp'ı yeni sekmede aç
    window.open(whatsappUrl, "_blank");

    // Formu temizle
    bookingForm.reset();
    setIsPaymentModalOpen(false);

    success("WhatsApp üzerinden iletişime geçiliyor...");
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isPaymentModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isPaymentModalOpen]);

  return (
    <DataWrapper
      isLoading={isLoading || isStaticDataLoading}
      error={error}
      data={product}
      emptyMessage={ERROR_MESSAGES.PRODUCT_NOT_FOUND}
    >
      <ProductDetailContent
        product={product}
        addons={addons}
        faqs={faqs}
        amenitiesList={amenitiesList}
        thumbsSwiper={thumbsSwiper}
        setThumbsSwiper={setThumbsSwiper}
        descriptionExpanded={descriptionExpanded}
        setDescriptionExpanded={setDescriptionExpanded}
        showAllAmenities={showAllAmenities}
        setShowAllAmenities={setShowAllAmenities}
        faqOpen={faqOpen}
        setFaqOpen={setFaqOpen}
        isPaymentModalOpen={isPaymentModalOpen}
        setIsPaymentModalOpen={setIsPaymentModalOpen}
        bookingForm={bookingForm}
        handleBookingSubmit={handleBookingSubmit}
        onBookingSubmit={onBookingSubmit}
      />
    </DataWrapper>
  );
}

// İçerik component'i - product kesinlikle var (DataWrapper kontrol etti)
function ProductDetailContent({
  product,
  addons,
  faqs,
  amenitiesList,
  thumbsSwiper,
  setThumbsSwiper,
  descriptionExpanded,
  setDescriptionExpanded,
  showAllAmenities,
  setShowAllAmenities,
  faqOpen,
  setFaqOpen,
  isPaymentModalOpen,
  setIsPaymentModalOpen,
  bookingForm,
  handleBookingSubmit,
  onBookingSubmit,
}) {
  const mappedAmenities = getAmenitiesByIds(product.amenityIds, amenitiesList);

  const focusTags = ["Kaptanlı Kiralama", "%50 Ön Ödeme", "2024 Model"];

  const metaDetails = [
    { label: "Tekne Türü", value: product.name, icon: "⛵" },
    { label: "Kabin Sayısı", value: product.cabinCount || "-", icon: "🛏️" },
    {
      label: "Kapasite",
      value: product.personCapacity || product.travelCapacity,
      icon: "👥",
    },
  ];

  const descriptionText =
    product.details ||
    "Ege ve Akdeniz'in en güzel koylarına açılın. Konforlu güverte, geniş yaşam alanları ve deneyimli kaptan ile güvenli bir yolculuk sizi bekliyor.";

  const displayedDescription =
    descriptionExpanded || descriptionText.length <= 320
      ? descriptionText
      : `${descriptionText.slice(0, 320)}...`;

  const displayedAmenities = showAllAmenities
    ? mappedAmenities
    : mappedAmenities.slice(0, 8);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white shadow-sm">
        <Navbar />
      </header>

      <main className="bg-gray-50 pb-24 lg:pb-0">
        <div className="mx-auto px-6 py-8 lg:px-6 lg:py-12">
          <section className="flex flex-col gap-4 border-b border-gray-200 pb-6 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="mt-1 text-3xl font-bold text-gray-900">
                {product.title}
              </h1>
              <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-500">
                <span className="mt-1 text-2xl text-gray-900">
                  {product.location?.name || ERROR_MESSAGES.LOCATION_NOT_FOUND}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:border-blue-500 hover:text-blue-600">
                <span>🔗</span> Paylaş
              </button>
              <button className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:border-red-400 hover:text-red-500">
                <span>❤️</span> Kaydet
              </button>
            </div>
          </section>

          <section className="mt-6 space-y-3">
            <div className="overflow-hidden rounded-2xl bg-gray-200 shadow-sm">
              <Swiper
                modules={[Navigation, Pagination, Thumbs]}
                navigation={true}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                spaceBetween={16}
                centeredSlides={false}
                breakpoints={{
                  640: {
                    slidesPerView: 1.1,
                    spaceBetween: 18,
                  },
                  768: {
                    slidesPerView: 1.2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 1.8,
                    spaceBetween: 22,
                  },
                  1280: {
                    slidesPerView: 2.2,
                    spaceBetween: 24,
                  },
                }}
                className="custom"
              >
                {product.images?.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative rounded-xl overflow-hidden aspect-4/3 sm:aspect-16/10">
                      <OptimizedImage
                        src={img}
                        alt={`${product.title} - Görsel ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading={index === 0 ? "eager" : "lazy"}
                        fetchPriority={index === 0 ? "high" : "auto"}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {product.images && product.images.length > 1 && (
              <div className="rounded-xl bg-white p-3 shadow-sm">
                <Swiper
                  modules={[Thumbs]}
                  onSwiper={setThumbsSwiper}
                  spaceBetween={12}
                  slidesPerView="auto"
                  freeMode={true}
                  watchSlidesProgress={true}
                  className="thumbnail-swiper"
                >
                  {product.images.map((img, index) => (
                    <SwiperSlide key={index} className="w-auto!">
                      <div className="h-20 w-28 overflow-hidden rounded-lg border border-gray-200 cursor-pointer hover:border-blue-500 transition-colors">
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </section>

          {/* Main Content */}
          <section className="mt-10 grid gap-8 lg:grid-cols-3">
            {/* Product Details - Spans 2 columns on desktop */}
            <div className="space-y-8 lg:col-span-2">
              <div className="grid gap-4 rounded-2xl bg-white p-5 shadow-sm md:grid-cols-2">
                {metaDetails.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p className="text-sm text-gray-500">{item.label}</p>
                      <p className="text-base font-semibold text-gray-900">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {focusTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <section className="space-y-3 rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Tur Bilgisi
                  </h2>
                  <button
                    className="text-sm font-medium text-blue-600"
                    onClick={() => setDescriptionExpanded((prev) => !prev)}
                  >
                    {descriptionExpanded ? "Kapat" : "Daha fazla oku"}
                  </button>
                </div>
                <p className="leading-relaxed text-gray-700">
                  {displayedDescription}
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl bg-gray-50 p-4">
                    <h3 className="font-semibold text-gray-900">
                      🌊 Tur Süreci
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Sabah limandan çıkış, gün boyu koylarda mola, akşamüzeri
                      dönüş.
                    </p>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-4">
                    <h3 className="font-semibold text-gray-900">
                      🥗 Yemek ve Kumanya Düzeni
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Kahvaltı ve öğle menüsü dahildir. Akşam yemeği tercihe
                      bağlıdır.
                    </p>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-4">
                    <h3 className="font-semibold text-gray-900">
                      💰 Fiyat ve Dahil Olanlar
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Fiyatlarımıza kaptan, yemek ve servis personeli, yakıt
                      dahil; kumanya hariç oluyor.
                    </p>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-4">
                    <h3 className="font-semibold text-gray-900">
                      🕒 Giriş–Çıkış Saatleri
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Giriş çıkış saatleri için "Şartlar" bölümünden
                      bakabilirsiniz. Öncesinde veya sonrasında başka
                      kiralamamız yoksa giriş çıkış saatinde esneme
                      yapabiliyoruz.
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    İmkanlar
                  </h2>
                  <button
                    className="text-sm font-medium text-blue-600"
                    onClick={() => setShowAllAmenities((prev) => !prev)}
                  >
                    {showAllAmenities
                      ? "Kapat"
                      : `Tüm İmkanları Gör (${mappedAmenities.length})`}
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {displayedAmenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 rounded-lg bg-gray-50 p-3"
                    >
                      <span className="text-blue-600">•</span>
                      <span className="text-sm font-medium text-gray-800">
                        {amenity}
                      </span>
                    </div>
                  ))}
                  {!mappedAmenities.length && (
                    <p className="text-sm text-gray-500">
                      İmkan bilgisi eklenmemiş.
                    </p>
                  )}
                </div>
              </section>

              <section className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-gray-900">Konum</h2>
                  <p className="text-sm text-gray-600">
                    {product.location?.name ||
                      ERROR_MESSAGES.LOCATION_NOT_FOUND}
                  </p>
                  <iframe
                    width="100%"
                    height="300"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={product.url}
                  />
                </div>
              </section>

              <section className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">
                  Sık Sorulan Sorular
                </h2>
                <div className="divide-y divide-gray-100">
                  {faqs.map((item, idx) => {
                    const open = faqOpen === idx;
                    return (
                      <div key={item.question}>
                        <button
                          className="flex w-full items-center justify-between py-3 text-left"
                          onClick={() =>
                            setFaqOpen((prev) => (prev === idx ? null : idx))
                          }
                        >
                          <span className="font-medium text-gray-900">
                            {item.question}
                          </span>
                          <span className="text-sm text-blue-600">
                            {open ? "−" : "+"}
                          </span>
                        </button>
                        {open && (
                          <p className="pb-3 text-sm text-gray-600">
                            {item.answer}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Payment Card - Desktop: Sticky sidebar, Mobile: Hidden (shown as bottom bar + modal) */}
            <aside className="hidden lg:block lg:sticky lg:top-50 lg:self-start">
              <FormProvider {...bookingForm}>
                <form
                  onSubmit={handleBookingSubmit(onBookingSubmit)}
                  className="space-y-4 rounded-2xl bg-white p-6 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-900">
                      {product.price} €{" "}
                      <span className="text-sm font-normal">
                        / {product.durationType}
                      </span>
                    </p>
                  </div>
                  <div className="grid gap-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Giriş Tarihi <span className="text-red-500">*</span>
                        <input
                          type="date"
                          {...bookingForm.register("girisTarihi")}
                          min={new Date().toISOString().split("T")[0]}
                          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                        {bookingForm.formState.errors.girisTarihi && (
                          <p className="mt-1 text-xs text-red-600">
                            {bookingForm.formState.errors.girisTarihi.message}
                          </p>
                        )}
                      </label>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Çıkış Tarihi <span className="text-red-500">*</span>
                        <input
                          type="date"
                          {...bookingForm.register("cikisTarihi")}
                          min={
                            bookingForm.watch("girisTarihi") ||
                            new Date().toISOString().split("T")[0]
                          }
                          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                        {bookingForm.formState.errors.cikisTarihi && (
                          <p className="mt-1 text-xs text-red-600">
                            {bookingForm.formState.errors.cikisTarihi.message}
                          </p>
                        )}
                      </label>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Yolcu Sayısı <span className="text-red-500">*</span>
                        <select
                          {...bookingForm.register("yolcuSayisi", {
                            valueAsNumber: true,
                          })}
                          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        >
                          {Array.from(
                            {
                              length:
                                product.personCapacity ||
                                product.travelCapacity ||
                                10,
                            },
                            (_, i) => i + 1
                          ).map((num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? "kişi" : "kişi"}
                            </option>
                          ))}
                        </select>
                        {bookingForm.formState.errors.yolcuSayisi && (
                          <p className="mt-1 text-xs text-red-600">
                            {bookingForm.formState.errors.yolcuSayisi.message}
                          </p>
                        )}
                      </label>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Ad Soyad <span className="text-red-500">*</span>
                        <input
                          type="text"
                          {...bookingForm.register("musteriAdSoyad")}
                          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                          placeholder="Adınız ve soyadınız"
                        />
                        {bookingForm.formState.errors.musteriAdSoyad && (
                          <p className="mt-1 text-xs text-red-600">
                            {
                              bookingForm.formState.errors.musteriAdSoyad
                                .message
                            }
                          </p>
                        )}
                      </label>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Telefon <span className="text-red-500">*</span>
                        <input
                          type="tel"
                          {...bookingForm.register("musteriTelefon")}
                          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                          placeholder="05XX XXX XX XX"
                        />
                        {bookingForm.formState.errors.musteriTelefon && (
                          <p className="mt-1 text-xs text-red-600">
                            {
                              bookingForm.formState.errors.musteriTelefon
                                .message
                            }
                          </p>
                        )}
                      </label>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Özel İstekler (Opsiyonel)
                        <textarea
                          {...bookingForm.register("ozelIstekler")}
                          rows={3}
                          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                          placeholder="Varsa özel isteklerinizi buraya yazabilirsiniz..."
                        />
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-md hover:bg-blue-700"
                  >
                    WhatsApp ile İletişime Geç
                  </button>
                </form>
              </FormProvider>
            </aside>
          </section>

          {/* Mobile Payment Bar - Fixed at bottom */}
          <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white shadow-lg lg:hidden">
            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className="flex w-full items-center justify-between px-4 py-4"
            >
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-gray-600">Fiyat</span>
                <span className="text-lg font-semibold text-gray-900">
                  {product.price} €{" "}
                  <span className="text-sm font-normal">
                    / {product.durationType}
                  </span>
                </span>
              </div>
              <span className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white">
                Rezervasyon Yap
              </span>
            </button>
          </div>

          {/* Mobile Payment Modal / Bottom Sheet */}
          {isPaymentModalOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-50 bg-black/50 lg:hidden"
                onClick={() => setIsPaymentModalOpen(false)}
                aria-hidden="true"
              />
              {/* Modal Content */}
              <div className="fixed bottom-0 left-0 right-0 z-50 max-h-[90vh] overflow-y-auto rounded-t-2xl bg-white shadow-2xl lg:hidden">
                <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Rezervasyon
                  </h2>
                  <button
                    onClick={() => setIsPaymentModalOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    aria-label="Kapat"
                  >
                    <span className="text-xl">×</span>
                  </button>
                </div>
                <FormProvider {...bookingForm}>
                  <form
                    onSubmit={handleBookingSubmit(onBookingSubmit)}
                    className="space-y-4 p-6"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-semibold text-gray-900">
                        {product.price} €{" "}
                        <span className="text-sm font-normal">
                          / {product.durationType}
                        </span>
                      </p>
                    </div>
                    <div className="grid gap-3">
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Giriş Tarihi <span className="text-red-500">*</span>
                          <input
                            type="date"
                            {...bookingForm.register("girisTarihi")}
                            min={new Date().toISOString().split("T")[0]}
                            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                          />
                          {bookingForm.formState.errors.girisTarihi && (
                            <p className="mt-1 text-xs text-red-600">
                              {bookingForm.formState.errors.girisTarihi.message}
                            </p>
                          )}
                        </label>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Çıkış Tarihi <span className="text-red-500">*</span>
                          <input
                            type="date"
                            {...bookingForm.register("cikisTarihi")}
                            min={
                              bookingForm.watch("girisTarihi") ||
                              new Date().toISOString().split("T")[0]
                            }
                            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                          />
                          {bookingForm.formState.errors.cikisTarihi && (
                            <p className="mt-1 text-xs text-red-600">
                              {bookingForm.formState.errors.cikisTarihi.message}
                            </p>
                          )}
                        </label>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Yolcu Sayısı <span className="text-red-500">*</span>
                          <select
                            {...bookingForm.register("yolcuSayisi", {
                              valueAsNumber: true,
                            })}
                            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                          >
                            {Array.from(
                              {
                                length:
                                  product.personCapacity ||
                                  product.travelCapacity ||
                                  10,
                              },
                              (_, i) => i + 1
                            ).map((num) => (
                              <option key={num} value={num}>
                                {num} {num === 1 ? "kişi" : "kişi"}
                              </option>
                            ))}
                          </select>
                          {bookingForm.formState.errors.yolcuSayisi && (
                            <p className="mt-1 text-xs text-red-600">
                              {bookingForm.formState.errors.yolcuSayisi.message}
                            </p>
                          )}
                        </label>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Ad Soyad <span className="text-red-500">*</span>
                          <input
                            type="text"
                            {...bookingForm.register("musteriAdSoyad")}
                            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                            placeholder="Adınız ve soyadınız"
                          />
                          {bookingForm.formState.errors.musteriAdSoyad && (
                            <p className="mt-1 text-xs text-red-600">
                              {
                                bookingForm.formState.errors.musteriAdSoyad
                                  .message
                              }
                            </p>
                          )}
                        </label>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Telefon <span className="text-red-500">*</span>
                          <input
                            type="tel"
                            {...bookingForm.register("musteriTelefon")}
                            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                            placeholder="05XX XXX XX XX"
                          />
                          {bookingForm.formState.errors.musteriTelefon && (
                            <p className="mt-1 text-xs text-red-600">
                              {
                                bookingForm.formState.errors.musteriTelefon
                                  .message
                              }
                            </p>
                          )}
                        </label>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Özel İstekler (Opsiyonel)
                          <textarea
                            {...bookingForm.register("ozelIstekler")}
                            rows={3}
                            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                            placeholder="Varsa özel isteklerinizi buraya yazabilirsiniz..."
                          />
                        </label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-md hover:bg-blue-700"
                    >
                      WhatsApp ile İletişime Geç
                    </button>
                  </form>
                </FormProvider>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
