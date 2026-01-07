// src/utils/helpers.js
import { ERROR_MESSAGES } from "../constants";
import { parse } from "date-fns";

// ==================== DATA LOOKUP HELPERS ====================

/**
 * Location'ı ID'ye göre bulur
 * @param {number} id - Location ID
 * @param {Array|null} locationsList - Locations array (optional, falls back to static data)
 * @returns {Object|null} Location objesi veya null
 */
export const getLocationById = (id, locationsList) => {
  if (!locationsList) {
    console.warn("getLocationById: locationsList parameter is required");
    return null;
  }
  return locationsList.find((loc) => loc.id === id) || null;
};

/**
 * Location'ı name'e göre bulur (case-insensitive)
 * @param {string} name - Location name
 * @param {Array|null} locationsList - Locations array (optional)
 * @returns {Object|null} Location objesi veya null
 */
export const getLocationByName = (name, locationsList) => {
  if (!name || !locationsList) {
    console.warn(
      "getLocationByName: name and locationsList parameters are required"
    );
    return null;
  }
  return (
    locationsList.find(
      (loc) => loc.name.toLowerCase() === name.toLowerCase()
    ) || null
  );
};

/**
 * Boat type'ı ID'ye göre bulur
 * @param {number} id - Boat type ID
 * @param {Array|null} boatTypesList - Boat types array (optional)
 * @returns {Object|null} Boat type objesi veya null
 */
export const getBoatTypeById = (id, boatTypesList) => {
  if (!boatTypesList) {
    console.warn("getBoatTypeById: boatTypesList parameter is required");
    return null;
  }
  return boatTypesList.find((type) => type.id === id) || null;
};

/**
 * Boat type name'ini ID'ye göre döner
 * @param {number} id - Boat type ID
 * @param {Array|null} boatTypesList - Boat types array (optional)
 * @returns {string} Boat type name veya "Bilinmiyor"
 */
export const getBoatTypeName = (id, boatTypesList) => {
  if (!boatTypesList) {
    console.warn("getBoatTypeName: boatTypesList parameter is required");
    return ERROR_MESSAGES.BOAT_TYPE_NOT_FOUND;
  }
  const type = getBoatTypeById(id, boatTypesList);
  return type?.name || ERROR_MESSAGES.BOAT_TYPE_NOT_FOUND;
};

/**
 * Location name'ini ID'ye göre döner
 * @param {number} id - Location ID
 * @param {Array|null} locationsList - Locations array (optional)
 * @returns {string} Location name veya "Bilinmiyor"
 */
export const getLocationName = (id, locationsList) => {
  if (!locationsList) {
    console.warn("getLocationName: locationsList parameter is required");
    return ERROR_MESSAGES.LOCATION_NOT_FOUND;
  }
  const location = getLocationById(id, locationsList);
  return location?.name || ERROR_MESSAGES.LOCATION_NOT_FOUND;
};

/**
 * Amenity'leri ID array'ine göre bulur
 * @param {number[]} amenityIds - Amenity ID array'i
 * @param {Array|null} amenitiesList - Amenities array (optional)
 * @returns {string[]} Amenity name array'i
 */
export const getAmenitiesByIds = (amenityIds, amenitiesList) => {
  if (!amenityIds || !Array.isArray(amenityIds)) return [];
  if (!amenitiesList) {
    console.warn("getAmenitiesByIds: amenitiesList parameter is required");
    return [];
  }
  return amenityIds
    .map((id) => amenitiesList.find((a) => a.id === id)?.name)
    .filter(Boolean);
};

// ==================== FORMATTING HELPERS ====================

/**
 * Fiyatı formatlar (TL için)
 * @param {number} price - Fiyat
 * @param {string} currency - Para birimi (default: "₺")
 * @returns {string} Formatlanmış fiyat
 */
export const formatPrice = (price, currency = "₺") => {
  if (typeof price !== "number") return "";
  return `${currency}${price.toLocaleString("tr-TR")}`;
};

/**
 * Fiyatı Euro formatında formatlar
 * @param {number} price - Fiyat
 * @returns {string} Formatlanmış fiyat
 */
export const formatPriceEUR = (price) => {
  return formatPrice(price, "€");
};

/**
 * Tarihi parse eder (birden fazla format dener)
 * @param {string} dateString - Tarih string'i
 * @param {string} format - Date format (opsiyonel)
 * @returns {Date|null} Parse edilmiş tarih veya null
 */
export const parseDate = (dateString, format = null) => {
  if (!dateString) return null;

  try {
    // Eğer format verilmişse, date-fns parse kullan
    if (format) {
      const parsed = parse(dateString, format, new Date());
      if (!isNaN(parsed.getTime())) return parsed;
    }

    // ISO formatını dene
    const isoDate = new Date(dateString);
    if (!isNaN(isoDate.getTime())) return isoDate;
  } catch (error) {
    console.error("Date parsing error:", error);
  }

  return null;
};

// ==================== VALIDATION HELPERS ====================

/**
 * Sayıyı güvenli şekilde parse eder
 * @param {string|number} value - Parse edilecek değer
 * @param {number} defaultValue - Varsayılan değer
 * @returns {number} Parse edilmiş sayı
 */
export const safeParseInt = (value, defaultValue = 0) => {
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * URL query parametrelerini parse eder
 * @param {URLSearchParams} searchParams - URLSearchParams objesi
 * @returns {Object} Parse edilmiş query parametreleri
 */
export const parseQueryParams = (searchParams) => {
  return {
    location: searchParams.get("location"),
    date: searchParams.get("date"),
    people: searchParams.get("people"),
    boatType: searchParams.get("boatType"),
  };
};
