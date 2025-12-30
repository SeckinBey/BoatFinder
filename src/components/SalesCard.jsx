import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { formatPriceEUR, getLocationName } from "../utils/helpers.js";
import { getProductDetailRoute } from "../constants/index.js";
import OptimizedImage from "./OptimizedImage.jsx";

export default function SalesCard({ boatTypes, ship, locations }) {
  const locationName = getLocationName(ship.locationId, locations);
  return (
    <div className="listing-card group/item relative inline-flex w-full flex-col rounded-2xl overflow-hidden bg-white shadow-lg transition hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-300">
      <Link to={getProductDetailRoute(ship.id)}>
        <div className="relative w-full overflow-hidden rounded-xl">
          <div className="listing-item after:absolute after:bottom-0 after:left-0 after:z-1 after:h-1/4 after:w-full after:bg-linear-to-t after:from-black/25">
            <Swiper
              pagination={true}
              loop={true}
              modules={[Pagination]}
              className="HotSalesSwiper"
            >
              {ship.images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <OptimizedImage
                    src={img}
                    alt={ship.name}
                    width={816}
                    height={600}
                    className="aspect-34/25 bg-gray-lighter"
                    loading={idx === 0 ? "eager" : "lazy"}
                    fetchPriority={idx === 0 ? "high" : "auto"}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="content pt-3 px-4">
          <div className="mb-3 flex font-extralight text-lg items-center gap-2">
            <p>{locationName}</p>
            <span>•</span>
            <p>{boatTypes}</p>
            <span>•</span>
            <p
              className={
                ship.captainId
                  ? "rounded-full bg-blue-50 px-2 py-1 text-sm font-medium text-blue-700"
                  : ""
              }
            >
              {ship.captainId ? "Kaptanlı" : "Kaptansız"}
            </p>
          </div>
          <h4 className="text-ellipsis font-semibold text-xl text-gray-dark mb-3">
            {ship.name}
          </h4>

          <ul className="flex flex-wrap items-center   gap-10 font-semibold text-gray-dark mb-4">
            <li
              className={
                ship.cabinCount === 0 || !ship.cabinCount
                  ? "hidden"
                  : "flex items-center gap-2"
              }
            >
              <div className="flex flex-col leading-tight">
                <span className="text-xs  text-gray-500 uppercase">KABİN</span>
                <div className="flex flex-row leading-tight gap-0.5">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 60 60"
                    fill="currentColor"
                    className="w-5 h-5 text-gray-600 shrink-0"
                  >
                    <path d="m57.7,29.27H2.5c-.06,0-.13,0-.19,0C.85,30.82-.04,32.91-.04,35.2v15.29c0,1.25,1.03,2.27,2.3,2.27h4.17v4.52c0,1.5,1.23,2.72,2.75,2.72s2.75-1.22,2.75-2.72v-4.52h36.14v4.52c0,1.5,1.23,2.72,2.75,2.72s2.75-1.22,2.75-2.72v-4.52h4.17c1.27,0,2.3-1.02,2.3-2.27v-15.29c0-2.28-.89-4.37-2.34-5.93Z"></path>
                    <path d="m9.87,24.73h10.67c-.27-.48-.43-1.03-.43-1.62v-3.65c0-1.79,1.46-3.25,3.25-3.25h13.28c1.79,0,3.25,1.46,3.25,3.25v3.65c0,.59-.16,1.14-.43,1.62h16.17V2.72c0-1.5-1.24-2.72-2.75-2.72s-2.75,1.22-2.75,2.72v5.79c-.56-.25-1.18-.39-1.84-.39H11.71c-.66,0-1.28.14-1.84.39V2.72c0-1.5-1.23-2.72-2.75-2.72s-2.75,1.22-2.75,2.72v22.01h5.5Z"></path>
                  </svg>

                  <span className="text-base leading-none mt-0.5">
                    {ship.cabinCount}
                  </span>
                </div>
              </div>
            </li>
            <li
              className={
                ship.personCapacity === 0 || !ship.personCapacity
                  ? "hidden"
                  : "flex items-center gap-2"
              }
            >
              <div className="flex flex-col leading-tight">
                <span className="text-xs  text-gray-500 uppercase">KONAK.</span>
                <div className="flex flex-row leading-tight gap-0.5">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 60 60"
                    fill="currentColor"
                    className="w-5 h-5 text-gray-600 shrink-0"
                  >
                    <path d="m7.01,6.09v26.06h52.99v21.75c0,5.07-6.94,5.07-6.94,0v-12.87H7.01v12.87c0,5.07-7.01,5.07-7.01,0V6.09C0,1.02,7.01,1.02,7.01,6.09Z"></path>
                    <path d="m14.56,17.83c2.95,0,5.31,2.36,5.31,5.31s-2.36,5.24-5.31,5.24-5.24-2.36-5.24-5.24,2.36-5.31,5.24-5.31Z"></path>
                    <path d="m24.57,12.31h30.26c2.88,0,5.16,2.8,5.16,6.27v9.8H24.57V12.31Z"></path>
                  </svg>
                  <span className="text-base leading-none mt-0.5">
                    {ship.personCapacity}
                  </span>
                </div>
              </div>
            </li>
            <li
              className={
                ship.travelCapacity === 0 || !ship.travelCapacity
                  ? "hidden"
                  : "flex items-center gap-2"
              }
            >
              <div className="flex flex-col leading-tight">
                <span className="text-xs  text-gray-500 uppercase">SEYİR</span>
                <div className="flex flex-row leading-tight gap-0.5">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 60 60"
                    fill="currentColor"
                    className="w-5 h-5 text-gray-600 shrink-0"
                  >
                    <path d="m54.65,26.42c-1.02.05-1.95.31-2.73.71-.5-3.89-2-7.46-4.26-10.44.95-.33,1.91-.94,2.72-1.84,1.89-2.1,2.25-4.86.8-6.16-1.45-1.31-4.16-.67-6.05,1.43-.7.78-1.19,1.65-1.46,2.51-2.99-2.34-6.59-3.91-10.54-4.45.45-.91.7-2.03.64-3.26C33.63,2.1,31.93-.1,29.98,0c-1.95.1-3.41,2.47-3.27,5.29.06,1.07.34,2.05.77,2.85-4.1.5-7.85,2.13-10.93,4.57l-.35-.35c-.33-.93-.94-1.87-1.82-2.67-2.1-1.89-4.86-2.25-6.16-.8-1.31,1.45-.67,4.16,1.43,6.05.97.87,2.07,1.4,3.12,1.59-2.34,3.03-3.89,6.7-4.38,10.69-.93-.5-2.11-.78-3.41-.72-2.82.15-5.02,1.84-4.92,3.8s2.47,3.41,5.29,3.27c1.16-.06,2.21-.4,3.05-.89.51,4.08,2.15,7.81,4.59,10.88-1.17.21-2.42.9-3.44,2.03-1.89,2.1-2.25,4.86-.8,6.16s4.16.67,6.05-1.43c.82-.91,1.33-1.94,1.55-2.92l.24-.24c3.06,2.41,6.76,4.02,10.82,4.52-.49.93-.77,2.1-.71,3.38.15,2.82,1.84,5.02,3.8,4.92s3.41-2.47,3.27-5.29c-.06-1.15-.38-2.18-.87-3.01,3.97-.5,7.62-2.05,10.64-4.38.34.91.94,1.82,1.8,2.6,2.1,1.89,4.86,2.25,6.16.8,1.31-1.45.67-4.16-1.43-6.05-.76-.69-1.62-1.17-2.45-1.44,2.25-2.94,3.76-6.47,4.28-10.32.88.41,1.96.63,3.12.57,2.82-.15,5.02-1.84,4.92-3.8-.1-1.95-2.47-3.41-5.29-3.27Zm-36.27,11.81c-1.19-1.68-2.02-3.63-2.4-5.74h8.14l.02-.02s0,.02,0,.02h-.03l-5.74,5.74Zm5.74-10.79h.07s-.01.03-.02.05l-.05-.05h-8.16c.37-2.12,1.19-4.08,2.38-5.77l5.77,5.77Zm12.24,0s0-.01-.01-.02l5.68-5.68c1.16,1.68,1.96,3.61,2.33,5.7h-8Zm-3.61-3.57v.03s-.02,0-.02,0l.02-.02v-8.12c2.1.38,4.04,1.22,5.72,2.4l-5.72,5.72Zm0,12.28s.04-.01.05-.02l5.62,5.62c-1.67,1.17-3.59,1.99-5.67,2.36v-7.96Zm3.63-3.59s.01-.04.02-.05h7.95c-.37,2.08-1.19,4-2.35,5.67l-5.61-5.61Zm-8.68-16.82v8.14l.05.05s-.03.01-.05.02v-.07l-5.77-5.77c1.69-1.18,3.65-2,5.77-2.37Zm-.02,20.37s.01,0,.02.01v8.02c-2.1-.36-4.04-1.17-5.72-2.33l5.7-5.7Z"></path>
                  </svg>
                  <span className="text-base leading-none mt-0.5">
                    {ship.travelCapacity} Kişi
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="price  rounded-2xl p-4 mx-2 mb-2">
          <div className="flex justify-center-safe items-center gap-2">
            <span className="text-gray-dark font-semibold text-2xl">
              {formatPriceEUR(ship.price)}
            </span>
            <span className="text-gray-600 text-xl ">{ship.durationType}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
