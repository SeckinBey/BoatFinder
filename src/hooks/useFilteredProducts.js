import { useState, useEffect, useMemo, useCallback } from "react";
import { getProducts } from "../services/productService.js";
import { DEFAULTS } from "../constants/index.js";

/**
 * Ürünleri filtreleme kriterlerine göre filtreler
 * @param {Object} filters - Filtre objesi
 * @param {string} filters.searchTerm - Arama terimi (ürün adı veya başlık)
 * @param {number|string} filters.selectedType - Seçili tekne tipi ID (veya "all")
 * @param {number|string} filters.selectedLocation - Seçili lokasyon ID (veya "all")
 * @param {number} filters.numberOfPeople - Minimum kişi sayısı
 * @param {Object} filters.boatType - Boat type objesi (Explore.jsx için)
 * @returns {Object} { products, isLoading, error, refetch }
 */
export function useFilteredProducts(filters = {}) {
  const {
    searchTerm = "",
    selectedType = DEFAULTS.ALL_FILTER,
    selectedLocation = DEFAULTS.ALL_FILTER,
    numberOfPeople = 0,
    boatType = null,
  } = filters;

  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch fonksiyonunu ayrı bir fonksiyon olarak tanımla
  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getProducts();
      setAllProducts(data);
    } catch (err) {
      setError(err);
      console.error("Error fetching products:", err);
      setAllProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Tüm ürünleri bir kez çek
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Client-side filtering
  const filteredProducts = useMemo(() => {
    if (isLoading || error) return [];

    let filtered = [...allProducts];

    // Arama terimi filtresi
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (boat) =>
          boat.name?.toLowerCase().includes(searchLower) ||
          boat.title?.toLowerCase().includes(searchLower)
      );
    }

    // Tekne tipi filtresi
    const typeFilter = boatType?.id || selectedType;
    if (typeFilter && typeFilter !== DEFAULTS.ALL_FILTER) {
      const typeId =
        typeof typeFilter === "string" ? parseInt(typeFilter) : typeFilter;
      filtered = filtered.filter(
        (boat) => boat.typeId === typeId || boat.type?.id === typeId
      );
    }

    // Lokasyon filtresi
    const locationFilter =
      typeof selectedLocation === "object" && selectedLocation !== null
        ? selectedLocation.id
        : selectedLocation;

    if (locationFilter && locationFilter !== DEFAULTS.ALL_FILTER) {
      const locationId =
        typeof locationFilter === "string"
          ? parseInt(locationFilter)
          : locationFilter;
      filtered = filtered.filter(
        (boat) =>
          boat.locationId === locationId || boat.location?.id === locationId
      );
    }

    // Kişi sayısı filtresi
    if (numberOfPeople > DEFAULTS.NUMBER_OF_PEOPLE) {
      filtered = filtered.filter(
        (boat) => boat.travelCapacity >= numberOfPeople
      );
    }

    return filtered;
  }, [
    allProducts,
    searchTerm,
    selectedType,
    selectedLocation,
    numberOfPeople,
    boatType,
    isLoading,
    error,
  ]);

  return {
    products: filteredProducts,
    isLoading,
    error,
    refetch: fetchProducts,
  };
}
