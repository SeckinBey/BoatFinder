import HeroSection from "../features/home/HeroSection.jsx";
import CardSlider from "../features/home/CardSlider.jsx";
import HowToRent from "../features/home/HowToRent.jsx";
import HotSales from "../features/home/HotSales.jsx";
import ExploreHome from "../features/home/ExploreHome.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import FullScreenLoader from "../components/FullScreenLoader.jsx";
import { useStaticData } from "../hooks/useStaticData.js";
import { useProductSlice } from "../hooks/useProductSlice.js";
import { useSEO } from "../hooks/useSEO.js";

export default function Home() {
  useSEO({
    title: "Ana Sayfa",
    description:
      "Antalya bölgesinde tekne kiralama ve tur hizmetleri. En iyi fiyatlar ve kaliteli hizmet için TripFinder'ı ziyaret edin.",
    keywords: "tekne kiralama, antalya tekne turu, mavi yolculuk, tekne turu",
    url: "/",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "TripFinder",
      url: "https://tripfinder.com",
      logo: "https://tripfinder.com/logo.png",
      description: "Antalya bölgesinde tekne kiralama ve tur hizmetleri",
    },
  });
  // Static data'yı Home seviyesinde yükle
  const { isLoading: isStaticDataLoading } = useStaticData();

  // HotSales için product data'yı yükle (opsiyonel - eğer HotSales'ı da kontrol etmek isterseniz)
  const { isLoading: isProductsLoading } = useProductSlice(8);

  // Toplam loading state
  const isLoading = isStaticDataLoading || isProductsLoading;

  // Loading ekranını göster
  if (isLoading) {
    return (
      <>
        <Navbar variant="hero" />
        <FullScreenLoader message="Yükleniyor..." />
      </>
    );
  }

  // Normal içerik
  return (
    <>
      <Navbar variant="hero" />
      <HeroSection />
      <CardSlider />
      <HowToRent />
      <HotSales />
      <ExploreHome />
      <Footer />
    </>
  );
}
