import { useState, useEffect, useMemo } from "react";
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
import { useImageLoader } from "../hooks/useImageLoader.js";
import heroBg from "../assets/images/hero-bg.png";
import bannerImg from "../assets/images/2.jpg";

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
  const { locations, isLoading: isStaticDataLoading } = useStaticData();

  // HotSales için product data'yı yükle
  const { products, isLoading: isProductsLoading } = useProductSlice(8);

  // Kritik görsellerin URL'lerini topla
  const criticalImages = useMemo(() => {
    const images = [heroBg]; // Hero background image

    // ExploreHome banner image
    images.push(bannerImg);

    // Location images (ilk 4 lokasyon)
    if (locations && locations.length > 0) {
      locations.slice(0, 4).forEach((location) => {
        if (location.imageUrl) {
          images.push(location.imageUrl);
        }
      });
    }

    // Product images (ilk 4 ürünün ilk görseli)
    if (products && products.length > 0) {
      products.slice(0, 4).forEach((product) => {
        if (product.images && product.images.length > 0) {
          images.push(product.images[0]);
        }
      });
    }

    return images;
  }, [locations, products]);

  // Görsel yükleme takibi
  const {
    allImagesLoaded,
    registerImage,
    registerFailedImage,
  } = useImageLoader(criticalImages);

  // Data loading state
  const isDataLoading = isStaticDataLoading || isProductsLoading;

  // Toplam loading state (data + görseller)
  const isLoading = isDataLoading || !allImagesLoaded;

  // Loading ekranını göster
  if (isLoading) {
    return (
      <>
        <Navbar variant="hero" />
        <FullScreenLoader message="Yükleniyor..." />
        {/* Görünmez görselleri yükle - preload için */}
        <div className="hidden">
          {criticalImages.map((url, index) => (
            <img
              key={index}
              src={url}
              alt=""
              onLoad={() => registerImage(url)}
              onError={() => registerFailedImage(url)}
            />
          ))}
        </div>
      </>
    );
  }

  // Normal içerik
  return (
    <>
      <Navbar variant="hero" />
      <HeroSection onImageLoad={registerImage} onImageError={registerFailedImage} />
      <CardSlider onImageLoad={registerImage} onImageError={registerFailedImage} />
      <HowToRent />
      <HotSales onImageLoad={registerImage} onImageError={registerFailedImage} />
      <ExploreHome onImageLoad={registerImage} onImageError={registerFailedImage} />
      <Footer />
    </>
  );
}
