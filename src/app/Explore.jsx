// src/app/Explore.jsx
import { useState } from "react";
import { useSEO } from "../hooks/useSEO.js";
import { useParams } from "react-router-dom";
import { getLocationByName } from "../utils/helpers.js";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import ResultInfo from "../features/explore/ResultInfo.jsx";
import SideBar from "../features/explore/SideBar.jsx";
import Results from "../features/explore/Results.jsx";
import { useStaticData } from "../hooks/useStaticData.js";
import { useFilteredProducts } from "../hooks/useFilteredProducts.js";
import { useFilters } from "../context/FilterContext.jsx";
import DataWrapper from "../components/DataWrapper.jsx";

export default function Explore() {
  const { locationName } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {
    boatTypes,
    locations,
    isLoading: isStaticDataLoading,
  } = useStaticData();

  const {
    selectedLocation,
    departureDate,
    boatType,
    numberOfPeople,
    searchTerm,
    setSelectedLocation,
    setDepartureDate,
    setBoatType,
    setNumberOfPeople,
  } = useFilters();

  // Filtrelenmiş boats'u hesapla
  const {
    products: filteredBoats,
    isLoading,
    error,
  } = useFilteredProducts({
    selectedLocation,
    boatType,
    numberOfPeople,
    searchTerm,
  });

  // ✅ Location bilgisini al (URL parametresinden) - locations yüklenene kadar null döndür
  const currentLocation =
    locationName && locations
      ? getLocationByName(locationName, locations)
      : null;

  // ✅ SEO için title ve description oluştur
  const locationTitle = currentLocation?.name || "Tüm Lokasyonlar";
  const boatTypeName =
    boatType && boatTypes
      ? boatTypes.find((bt) => bt.id === boatType)?.name
      : null;

  const seoTitle = boatTypeName
    ? `${locationTitle} - ${boatTypeName} Tekne Kiralama`
    : `${locationTitle} - Tekne Kiralama`;

  const seoDescription =
    filteredBoats?.length > 0
      ? `${locationTitle} bölgesinde ${
          filteredBoats.length
        } adet tekne bulundu. ${
          boatTypeName ? boatTypeName + " " : ""
        }Tekne kiralama seçeneklerini keşfedin ve en uygun fiyatları görün.`
      : `${locationTitle} bölgesinde tekne kiralama hizmetleri. En iyi fiyatlar ve kaliteli hizmet için TripFinder'ı ziyaret edin.`;

  const seoKeywords = [
    "tekne kiralama",
    locationTitle?.toLowerCase() || "antalya",
    boatTypeName?.toLowerCase() || "",
    "mavi yolculuk",
    "tekne turu",
  ]
    .filter(Boolean)
    .join(", ");

  useSEO({
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    url: locationName ? `/explore/${locationName}` : "/explore",
    type: "website",
  });

  return (
    <>
      <DataWrapper
        isLoading={isLoading || isStaticDataLoading}
        error={error}
        data={filteredBoats}
        loadingProps={{ fullScreen: true }}
        emptyMessage="Arama kriterlerinize uygun tekne bulunamadı"
      >
        <Navbar />
        <div className="container-fluid mb-12 p-6 lg:mb-16">
          <ResultInfo onOpenFilters={() => setIsSidebarOpen(true)} />
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-[330px_5fr] 3xl:gap-12">
            <SideBar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              departureDate={departureDate}
              setDepartureDate={setDepartureDate}
              boatType={boatType}
              setBoatType={setBoatType}
              numberOfPeople={numberOfPeople}
              setNumberOfPeople={setNumberOfPeople}
              boatTypes={boatTypes}
              locations={locations}
            />
            <Results
              boatTypes={boatTypes}
              boats={filteredBoats}
              locations={locations}
            />
          </div>
        </div>
        <Footer />
      </DataWrapper>
    </>
  );
}
