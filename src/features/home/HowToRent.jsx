import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

export default function HowToRent() {
  return (
    <section className="group/section instruction-section lg:container-fluid mt-12 px-4 sm:pl-6 lg:mt-16">
      {/* geniş ekanlarda grid görünümü*/}
      <>
        <header className="flex justify-between mb-4 md:mb-5 xl:mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-6">Nasıl tekne kiralanır?</h2>
            <p className="text-lg text-gray-700">
              TripFinder ile tekne kiralamak çok kolay!<br></br> İhtiyaçlarınıza
              en uygun tekneyi seçin, rezervasyonunuzu yapın ve denizin keyfini
              çıkarın.
            </p>
          </div>
        </header>
        <div className="hidden grid-cols-1 gap-5 md:grid-cols-2 xl:grid xl:grid-cols-4">
          <div className="group/item card-gradient flex flex-col justify-start rounded-xl border-2 p-6 transition-all duration-500 lg:p-7 4xl:p-12">
            <div className="relative inline-flex aspect-auto h-16 w-10 object-contain transition-all duration-500 group-hover/item:-translate-y-1 xl:h-[84px] xl:w-16 4xl:h-[110px] 4xl:w-[70px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 74 116"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M17.243 37.344L16 38.152a5.981 5.981 0 00-1.778 8.25l12.054 18.657a5.987 5.987 0 008.25 1.768l1.242-.803a5.987 5.987 0 001.773-8.25L25.493 39.122a5.987 5.987 0 00-8.25-1.778v0z"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M5.966 44.629l-1.243.808a5.982 5.982 0 00-1.773 8.25l12.074 18.652a5.987 5.987 0 008.25 1.773l1.242-.803a5.982 5.982 0 001.774-8.25L14.236 46.402a5.981 5.981 0 00-8.27-1.773v0zM53.516 53.161l-.096-44.34A6.84 6.84 0 0046.6 2h-1.44a6.84 6.84 0 00-6.82 6.82v25.497"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M28.506 30.068l-1.242.798a5.987 5.987 0 00-1.779 8.25L34.842 53.6a5.981 5.981 0 008.25 1.778l1.242-.803a5.98 5.98 0 001.773-8.25l-9.36-14.484a5.982 5.982 0 00-8.24-1.773v0zM35.797 93.683C37.045 81.276 53.63 75.76 53.63 75.76l1.37-5.77-7.846-5.445c-3.082-2.526-3.466-6.714-1.415-10.387 1.612-2.875 4.94-1.718 4.94-1.718s14.702 3.607 17.895 5.709c6.82 4.48 1.814 21.582-.955 26.816-2.768 5.233-10.574 21.339-10.574 21.339l-1.697 7.654M2.223 52.09l1.854 31.115 10.533 23.082"
                ></path>
              </svg>
            </div>
            <h4 className="pb-3 pt-8 text-lg font-bold leading-[34px] text-gray-dark lg:text-xl xl:pt-6 4xl:pt-9">
              Mükemmel tekneyi bulun
            </h4>
            <p className="text-sm font-normal capitalize leading-[22px] text-gray-light xl:leading-6 4xl:text-base 4xl:leading-7">
              Web sitemizdeki 100'den fazla tekne seçeneği arasından size en
              uygun olanı inceleyin.
            </p>
          </div>
          <div className="group/item card-gradient flex flex-col justify-start rounded-xl border-2 p-6 transition-all duration-500 lg:p-7 4xl:p-12">
            <div className="relative inline-flex aspect-auto h-16 w-10 object-contain transition-all duration-500 group-hover/item:-translate-y-1 xl:h-[84px] xl:w-16 4xl:h-[110px] 4xl:w-[70px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 74 116"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M17.226 36.97l-1.243.804a5.987 5.987 0 00-1.779 8.252l12.057 18.656a5.983 5.983 0 008.251 1.773l1.243-.803a5.978 5.978 0 001.774-8.246L25.472 38.745a5.978 5.978 0 00-8.246-1.774v0z"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M5.966 44.257l-1.243.798a5.983 5.983 0 00-1.773 8.252l12.056 18.66a5.972 5.972 0 008.247 1.774l1.243-.803a5.978 5.978 0 001.774-8.252L14.218 46.03a5.982 5.982 0 00-8.252-1.773v0zM57.143 53.757l11.046-42.865a6.847 6.847 0 00-4.896-8.318l-1.385-.359a6.852 6.852 0 00-8.322 4.892l-11.41 39.252M23.694 36.945l-8.055-26.048a6.852 6.852 0 014.896-8.323l1.39-.358a6.837 6.837 0 018.317 4.89l11.91 39.253"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M35.805 93.317c1.248-12.41 17.837-17.928 17.837-17.928l1.37-5.77-7.848-5.448c-3.082-2.501-3.466-6.715-1.41-10.389 1.607-2.875 4.942-1.718 4.942-1.718s14.7 3.608 17.878 5.7c6.821 4.487 1.814 21.587-.955 26.822-2.77 5.234-10.576 21.339-10.576 21.339l-1.01 7.246M2.223 51.715l1.854 31.122 10.536 23.092"
                ></path>
              </svg>
            </div>
            <h4 className="pb-3 pt-8 text-lg font-bold leading-[34px] text-gray-dark lg:text-xl xl:pt-6 4xl:pt-9">
              Kaptanını seç
            </h4>
            <p className="text-sm font-normal capitalize leading-[22px] text-gray-light xl:leading-6 4xl:text-base 4xl:leading-7">
              Deneyimli kaptanlarımız arasından seçim yaparak rotanızı güvenle
              oluşturun.
            </p>
          </div>
          <div className="group/item card-gradient flex flex-col justify-start rounded-xl border-2 p-6 transition-all duration-500 lg:p-7 4xl:p-12">
            <div className="relative inline-flex aspect-auto h-16 w-10 object-contain transition-all duration-500 group-hover/item:-translate-y-1 xl:h-[84px] xl:w-16 4xl:h-[110px] 4xl:w-[70px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 74 114"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M5.774 46.141l-1.182.76A5.695 5.695 0 002.9 54.748l11.466 17.747a5.69 5.69 0 007.838 1.677l1.182-.764a5.69 5.69 0 001.701-7.847l-11.46-17.747a5.695 5.695 0 00-7.853-1.673v0zM57.925 53.474l8.309-35.686a6.511 6.511 0 00-4.652-7.91l-1.322-.346a6.512 6.512 0 00-7.91 4.652l-9 32.591M28.154 49.726L26.818 9.05a6.507 6.507 0 016.007-6.939l1.36-.096a6.507 6.507 0 016.944 6.002l2.22 38.757"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M13.621 47.813l-7.718-26.33a5.997 5.997 0 014.224-7.323l1.216-.327a5.992 5.992 0 017.324 4.224l9.486 31.674M37.582 91.078C38.764 79.3 54.541 74.013 54.541 74.013l1.302-5.473-7.468-5.18c-2.926-2.403-3.291-6.392-1.336-9.886 1.529-2.73 4.695-1.629 4.695-1.629s13.985 3.431 17.008 5.416c6.487 4.267 1.725 20.535-.909 25.513-2.633 4.979-10.067 20.294-10.067 20.294l-1.817 8.03M2.338 53.595l1.639 27.517 10.02 21.956"
                ></path>
              </svg>
            </div>
            <h4 className="pb-3 pt-8 text-lg font-bold leading-[34px] text-gray-dark lg:text-xl xl:pt-6 4xl:pt-9">
              Esnek Lokasyonlar
            </h4>
            <p className="text-sm font-normal capitalize leading-[22px] text-gray-light xl:leading-6 4xl:text-base 4xl:leading-7">
              Size en yakın limandan teknenize binin ve eşsiz koyların tadını
              çıkarmaya başlayın.
            </p>
          </div>
          <div className="group/item card-gradient flex flex-col justify-start rounded-xl border-2 p-6 transition-all duration-500 lg:p-7 4xl:p-12">
            <div className="relative inline-flex aspect-auto h-16 w-10 object-contain transition-all duration-500 group-hover/item:-translate-y-1 xl:h-[84px] xl:w-16 4xl:h-[110px] 4xl:w-[70px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 74 99"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M62.731 50.17l8.939-29.798a5.882 5.882 0 00-3.573-7.48l-1.164-.408a5.878 5.878 0 00-7.484 3.573l-9.334 26.955M36.228 44.497l1.95-36.714A5.878 5.878 0 0144.117 2h1.233a5.878 5.878 0 015.782 5.944l-1.016 35.055M24.767 49.85l-6.833-36.189a5.644 5.644 0 014.537-6.511l1.159-.209a5.644 5.644 0 016.512 4.532l6.078 32.994M24.715 49.846L11.722 28.682a4.593 4.593 0 00-5.913-2.605l-.899.352a4.584 4.584 0 00-2.605 5.913L12.2 55.867l3.556 21.42 6.164 17.825M38.806 83.278c-.26-10.71 13.297-17.183 13.297-17.183l.825-3.278-11.17-4.141c-2.891-1.806-3.668-5.362-2.305-8.709 1.063-2.605 4.028-1.988 4.028-1.988s16.814 1.845 19.749 3.286c6.29 3.1 3.842 18.212 2.04 22.97-1.801 4.758-8.291 19.318-8.291 19.318v3.387"
                ></path>
              </svg>
            </div>
            <h4 className="pb-3 pt-8 text-lg font-bold leading-[34px] text-gray-dark lg:text-xl xl:pt-6 4xl:pt-9">
              Mutlu Müşteriler
            </h4>
            <p className="text-sm font-normal capitalize leading-[22px] text-gray-light xl:leading-6 4xl:text-base 4xl:leading-7">
              Kiralama sürecinden dönüşe kadar her an yanınızdayız. Size sadece
              keyfini sürmek kalsın.
            </p>
          </div>
        </div>
      </>

      {/* küçük ekranlarda slider görünümü */}
      <div className="instruction group relative xl:hidden">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          spaceBetween={12}
          breakpoints={{
            640: { slidesPerView: 1.45, spaceBetween: 14 },
            768: { slidesPerView: 2.05, spaceBetween: 16 },
            1024: { slidesPerView: 3.05, spaceBetween: 18 },
            1280: { slidesPerView: 4.05, spaceBetween: 18 },
            1536: { slidesPerView: 4.25, spaceBetween: 20 },
          }}
        >
          <SwiperSlide>
            <div className="group/item card-gradient flex flex-col justify-start rounded-xl border-2 p-6 transition-all duration-500 lg:p-7 4xl:p-12">
              <div className="relative inline-flex aspect-auto h-16 w-10 object-contain transition-all duration-500 group-hover/item:-translate-y-1 xl:h-[84px] xl:w-16 4xl:h-[110px] 4xl:w-[70px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 74 116"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    d="M17.243 37.344L16 38.152a5.981 5.981 0 00-1.778 8.25l12.054 18.657a5.987 5.987 0 008.25 1.768l1.242-.803a5.987 5.987 0 001.773-8.25L25.493 39.122a5.987 5.987 0 00-8.25-1.778v0z"
                  ></path>
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    d="M5.966 44.629l-1.243.808a5.982 5.982 0 00-1.773 8.25l12.074 18.652a5.987 5.987 0 008.25 1.773l1.242-.803a5.982 5.982 0 001.774-8.25L14.236 46.402a5.981 5.981 0 00-8.27-1.773v0zM53.516 53.161l-.096-44.34A6.84 6.84 0 0046.6 2h-1.44a6.84 6.84 0 00-6.82 6.82v25.497"
                  ></path>
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    d="M28.506 30.068l-1.242.798a5.987 5.987 0 00-1.779 8.25L34.842 53.6a5.981 5.981 0 008.25 1.778l1.242-.803a5.98 5.98 0 001.773-8.25l-9.36-14.484a5.982 5.982 0 00-8.24-1.773v0zM35.797 93.683C37.045 81.276 53.63 75.76 53.63 75.76l1.37-5.77-7.846-5.445c-3.082-2.526-3.466-6.714-1.415-10.387 1.612-2.875 4.94-1.718 4.94-1.718s14.702 3.607 17.895 5.709c6.82 4.48 1.814 21.582-.955 26.816-2.768 5.233-10.574 21.339-10.574 21.339l-1.697 7.654M2.223 52.09l1.854 31.115 10.533 23.082"
                  ></path>
                </svg>
              </div>
              <h4 className="pb-3 pt-8 text-lg font-bold leading-[34px] text-gray-dark lg:text-xl xl:pt-6 4xl:pt-9">
                Find perfect boat
              </h4>
              <p className="text-sm font-normal capitalize leading-[22px] text-gray-light xl:leading-6 4xl:text-base 4xl:leading-7">
                Browse over 100 of our boats online at our website.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="group/item card-gradient flex flex-col justify-start rounded-xl border-2 p-6 transition-all duration-500 lg:p-7 4xl:p-12">
              <div className="relative inline-flex aspect-auto h-16 w-10 object-contain transition-all duration-500 group-hover/item:-translate-y-1 xl:h-[84px] xl:w-16 4xl:h-[110px] 4xl:w-[70px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 74 116"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    d="M17.226 36.97l-1.243.804a5.987 5.987 0 00-1.779 8.252l12.057 18.656a5.983 5.983 0 008.251 1.773l1.243-.803a5.978 5.978 0 001.774-8.246L25.472 38.745a5.978 5.978 0 00-8.246-1.774v0z"
                  ></path>
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    d="M5.966 44.257l-1.243.798a5.983 5.983 0 00-1.773 8.252l12.056 18.66a5.972 5.972 0 008.247 1.774l1.243-.803a5.978 5.978 0 001.774-8.252L14.218 46.03a5.982 5.982 0 00-8.252-1.773v0zM57.143 53.757l11.046-42.865a6.847 6.847 0 00-4.896-8.318l-1.385-.359a6.852 6.852 0 00-8.322 4.892l-11.41 39.252M23.694 36.945l-8.055-26.048a6.852 6.852 0 014.896-8.323l1.39-.358a6.837 6.837 0 018.317 4.89l11.91 39.253"
                  ></path>
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    d="M35.805 93.317c1.248-12.41 17.837-17.928 17.837-17.928l1.37-5.77-7.848-5.448c-3.082-2.501-3.466-6.715-1.41-10.389 1.607-2.875 4.942-1.718 4.942-1.718s14.7 3.608 17.878 5.7c6.821 4.487 1.814 21.587-.955 26.822-2.77 5.234-10.576 21.339-10.576 21.339l-1.01 7.246M2.223 51.715l1.854 31.122 10.536 23.092"
                  ></path>
                </svg>
              </div>
              <h4 className="pb-3 pt-8 text-lg font-bold leading-[34px] text-gray-dark lg:text-xl xl:pt-6 4xl:pt-9">
                Select a captain
              </h4>
              <p className="text-sm font-normal capitalize leading-[22px] text-gray-light xl:leading-6 4xl:text-base 4xl:leading-7">
                Find your perfect look among thousands of fashion pieces, here
                available for rent and purchase
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="group/item card-gradient flex flex-col justify-start rounded-xl border-2 p-6 transition-all duration-500 lg:p-7 4xl:p-12">
              <div className="relative inline-flex aspect-auto h-16 w-10 object-contain transition-all duration-500 group-hover/item:-translate-y-1 xl:h-[84px] xl:w-16 4xl:h-[110px] 4xl:w-[70px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 74 114"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    d="M5.774 46.141l-1.182.76A5.695 5.695 0 002.9 54.748l11.466 17.747a5.69 5.69 0 007.838 1.677l1.182-.764a5.69 5.69 0 001.701-7.847l-11.46-17.747a5.695 5.695 0 00-7.853-1.673v0zM57.925 53.474l8.309-35.686a6.511 6.511 0 00-4.652-7.91l-1.322-.346a6.512 6.512 0 00-7.91 4.652l-9 32.591M28.154 49.726L26.818 9.05a6.507 6.507 0 016.007-6.939l1.36-.096a6.507 6.507 0 016.944 6.002l2.22 38.757"
                  ></path>
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    d="M13.621 47.813l-7.718-26.33a5.997 5.997 0 014.224-7.323l1.216-.327a5.992 5.992 0 017.324 4.224l9.486 31.674M37.582 91.078C38.764 79.3 54.541 74.013 54.541 74.013l1.302-5.473-7.468-5.18c-2.926-2.403-3.291-6.392-1.336-9.886 1.529-2.73 4.695-1.629 4.695-1.629s13.985 3.431 17.008 5.416c6.487 4.267 1.725 20.535-.909 25.513-2.633 4.979-10.067 20.294-10.067 20.294l-1.817 8.03M2.338 53.595l1.639 27.517 10.02 21.956"
                  ></path>
                </svg>
              </div>
              <h4 className="pb-3 pt-8 text-lg font-bold leading-[34px] text-gray-dark lg:text-xl xl:pt-6 4xl:pt-9">
                Many Pickup Locations
              </h4>
              <p className="text-sm font-normal capitalize leading-[22px] text-gray-light xl:leading-6 4xl:text-base 4xl:leading-7">
                Enjoy wearing it at your special event for a few days, or
                purchase it to make it part of your wardrobe
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="group/item card-gradient flex flex-col justify-start rounded-xl border-2 p-6 transition-all duration-500 lg:p-7 4xl:p-12">
              <div className="relative inline-flex aspect-auto h-16 w-10 object-contain transition-all duration-500 group-hover/item:-translate-y-1 xl:h-[84px] xl:w-16 4xl:h-[110px] 4xl:w-[70px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 74 99"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    d="M62.731 50.17l8.939-29.798a5.882 5.882 0 00-3.573-7.48l-1.164-.408a5.878 5.878 0 00-7.484 3.573l-9.334 26.955M36.228 44.497l1.95-36.714A5.878 5.878 0 0144.117 2h1.233a5.878 5.878 0 015.782 5.944l-1.016 35.055M24.767 49.85l-6.833-36.189a5.644 5.644 0 014.537-6.511l1.159-.209a5.644 5.644 0 016.512 4.532l6.078 32.994M24.715 49.846L11.722 28.682a4.593 4.593 0 00-5.913-2.605l-.899.352a4.584 4.584 0 00-2.605 5.913L12.2 55.867l3.556 21.42 6.164 17.825M38.806 83.278c-.26-10.71 13.297-17.183 13.297-17.183l.825-3.278-11.17-4.141c-2.891-1.806-3.668-5.362-2.305-8.709 1.063-2.605 4.028-1.988 4.028-1.988s16.814 1.845 19.749 3.286c6.29 3.1 3.842 18.212 2.04 22.97-1.801 4.758-8.291 19.318-8.291 19.318v3.387"
                  ></path>
                </svg>
              </div>
              <h4 className="pb-3 pt-8 text-lg font-bold leading-[34px] text-gray-dark lg:text-xl xl:pt-6 4xl:pt-9">
                Satisfied Customers
              </h4>
              <p className="text-sm font-normal capitalize leading-[22px] text-gray-light xl:leading-6 4xl:text-base 4xl:leading-7">
                Simply pop your dress back in the free prepaid satchel provided.
                We now handle all the dry cleaning.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
