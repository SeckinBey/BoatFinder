// ==================== ROUTES ====================
export const ROUTES = {
  HOME: "/",
  EXPLORE: "/explore",
  PRODUCT_DETAIL: "/product/:id", // Dinamik route
  SIGN_IN: "/signin",
  ADMIN: "/admin",
  ADMIN_PRODUCTS: "/admin/products",
  ADMIN_PRODUCTS_NEW: "/admin/products/new",
  ADMIN_PRODUCTS_EDIT: "/admin/products/edit/:id", // Dinamik route
  ADMIN_DATA: "/admin/data",
  ADMIN_SETTINGS: "/admin/settings",
  ADMIN_BOOKINGS: "/admin/bookings",
  ADMIN_BOOKINGS_NEW: "/admin/bookings/new",
  ADMIN_BOOKINGS_EDIT: "/admin/bookings/edit/:id",
};

// Route helper fonksiyonları (dinamik route'lar için)
export const getProductDetailRoute = (id) => `/product/${id}`;
export const getAdminProductEditRoute = (id) => `/admin/products/edit/${id}`;
export const getAdminBookingEditRoute = (id) => `/admin/bookings/edit/${id}`;

// ==================== ERROR MESSAGES ====================
export const ERROR_MESSAGES = {
  PRODUCT_NOT_FOUND: "Ürün bulunamadı",
  NETWORK_ERROR: "Bağlantı hatası oluştu",
  UNAUTHORIZED: "Bu işlem için yetkiniz yok",
  LOCATION_NOT_FOUND: "Konum bilgisi yok",
  BOAT_TYPE_NOT_FOUND: "Bilinmiyor",
  SEARCH_CRITERIA_MISSING: "Lütfen arama kriterlerini girin",
  DELETE_CONFIRMATION: "Bu ürünü silmek istediğinize emin misiniz?",
};

// ==================== LOCAL STORAGE KEYS ====================
export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: "authToken",
  IS_AUTHENTICATED: "isAuthenticated",
  USER_DATA: "userData",
};

// ==================== QUERY PARAMETERS ====================
export const QUERY_PARAMS = {
  LOCATION: "location",
  DATE: "date",
  PEOPLE: "people",
  BOAT_TYPE: "boatType",
};

// ==================== DATE FORMATS ====================
export const DATE_FORMATS = {
  DISPLAY: "EEE dd / MM / yy", // "Mon 15 / 01 / 24"
  ISO: "yyyy-MM-dd",
};

// ==================== PLACEHOLDER TEXTS ====================
export const PLACEHOLDERS = {
  SEARCH_DESTINATIONS: "Search destinations",
  SELECT_DEPARTURE_DATE: "Select departure date",
  NUMBER_OF_PEOPLE: "Number Of People",
};

// ==================== DEFAULT VALUES ====================
export const DEFAULTS = {
  NUMBER_OF_PEOPLE: 0,
  ALL_FILTER: "all",
};

// ==================== CONFIRM DIALOG TEXTS ====================
export const CONFIRM_TEXTS = {
  DELETE_ITEM: "Bu kaydı silmek istediğinize emin misiniz?",
  DELETE_PRODUCT: "Bu ürünü silmek istediğinize emin misiniz?",
  UNSAVED_CHANGES:
    "Kaydedilmemiş değişiklikler var. Çıkmak istediğinize emin misiniz?",
  DELETE_BOOKING: "Bu rezervasyonu silmek istediğinize emin misiniz?",
};

// ==================== TOAST MESSAGES ====================
export const TOAST_MESSAGES = {
  SEARCH_CRITERIA_MISSING: "Lütfen arama kriterlerini girin",
  OPERATION_SUCCESS: "İşlem başarıyla tamamlandı",
  OPERATION_FAILED: "İşlem başarısız oldu",
  NETWORK_ERROR: "Bağlantı hatası oluştu",
};

// SEO Constants
export const SEO_CONFIG = {
  SITE_NAME: "TripFinder",
  SITE_URL: "https://tripfinder.com", // Production URL'inizi buraya ekleyin
  DEFAULT_TITLE: "TripFinder - Antalya Tekne Kiralama ve Tur Hizmetleri",
  DEFAULT_DESCRIPTION:
    "Antalya bölgesinde tekne kiralama ve tur hizmetleri. En iyi fiyatlar ve kaliteli hizmet için TripFinder'ı ziyaret edin.",
  DEFAULT_KEYWORDS:
    "tekne kiralama, antalya tekne turu, mavi yolculuk, tekne turu, yacht kiralama",
  DEFAULT_IMAGE: "https://tripfinder.com/og-image.jpg", // OG image URL'inizi buraya ekleyin
};

// Image Constants
export const IMAGE_PLACEHOLDER = "/src/assets/images/placeholder.svg";

// Rezervasyon durumları için constants:
export const BOOKING_STATUS = {
  OPSIYONEL: "Opsiyonel",
  ONAYLANDI: "Onaylandı",
  TAMAMLANDI: "Tamamlandı",
  IPTAL_EDILDI: "İptal Edildi",
};

export const PARA_BIRIMI = {
  EUR: "EUR",
  USD: "USD",
  TRY: "TRY",
};

export const ODEME_YONTEMI = {
  NAKIT: "Nakit",
  HAVALE: "Havale",
  KREDI_KARTI: "Kredi Kartı",
};
