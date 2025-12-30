import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useStaticData } from "../../hooks/useStaticData.js";
import OptimizedImage from "../../components/OptimizedImage.jsx";
import placeholderImage from "../../assets/images/placeholder.svg";

export default function CardSlider() {
  const { locations } = useStaticData();

  return (
    <section className="lg:container-fluid mt-12 px-4 sm:pl-6 lg:mt-16 ">
      <header className="flex justify-between mb-4 md:mb-5 xl:mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-6">TripFinder'a Hoş Geldiniz</h2>
          <p className="text-lg text-gray-700">
            TripFinder ile en iyi tekne turlarını keşfedin ve unutulmaz deniz
            maceralarına atılın!
          </p>
        </div>
      </header>
      <div className="relative">
        <Swiper
          modules={[Pagination, Navigation]}
          navigation={true}
          loop={true}
          pagination={{
            clickable: true,
          }}
          spaceBetween={12}
          slidesPerView={1.02}
          breakpoints={{
            640: { slidesPerView: 1.45, spaceBetween: 14 },
            768: { slidesPerView: 2.05, spaceBetween: 16 },
            1024: { slidesPerView: 3.05, spaceBetween: 18 },
            1280: { slidesPerView: 4.05, spaceBetween: 18 },
            1536: { slidesPerView: 4.25, spaceBetween: 20 },
          }}
        >
          {locations.map((location) => {
            // ✅ Artık location.imageUrl kullanıyoruz (Supabase'den geliyor)
            const imageSrc = location.imageUrl || placeholderImage;

            return (
              <SwiperSlide key={location.id}>
                <Link
                  to={`/explore/${location.name}`}
                  className="group relative block h-[430px] overflow-hidden rounded-2xl bg-gray-900 shadow-xl transition hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-300"
                >
                  <OptimizedImage
                    src={imageSrc}
                    alt={location.title || location.name}
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />

                  <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-black/75 via-black/40 to-transparent p-6 text-white">
                    <span className="text-lg font-semibold">
                      {location.name}
                    </span>
                    <span className="text-base font-medium opacity-90">
                      {location.title || ""}
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
