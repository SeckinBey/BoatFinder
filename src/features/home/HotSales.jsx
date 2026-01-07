import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import SalesCard from "../../components/SalesCard.jsx";
import { ROUTES } from "../../constants/index.js";
import { useProductSlice } from "../../hooks/useProductSlice.js";
import { useStaticData } from "../../hooks/useStaticData.js";
import DataWrapper from "../../components/DataWrapper.jsx";

export default function HotSales() {
  const { products, isLoading, error } = useProductSlice(8);
  const { locations } = useStaticData();

  return (
    <DataWrapper
      isLoading={isLoading}
      error={error}
      data={products}
      loadingProps={{ message: "Tekneler yükleniyor..." }}
      emptyMessage="Henüz tekneler eklenmemiş"
    >
      <section className="group/section container-fluid lg:container-fluid mt-12 px-4 sm:p-6 lg:mt-16 overflow-hidden">
        <header className="flex justify-between items-end mb-4 md:mb-5 xl:mb-6 gap-5">
          <div>
            <h2 className="text-3xl font-bold mb-6">Popüler Tekneler</h2>
            <p className="text-lg text-gray-700">
              TripFinder ile tekne kiralamak çok kolay!<br></br> İhtiyaçlarınıza
              en uygun tekneyi seçin, rezervasyonunuzu yapın ve denizin keyfini
              çıkarın.
            </p>
          </div>
          <div>
            <Link
              to={ROUTES.EXPLORE}
              className="inline-block whitespace-nowrap text-sm font-bold
            leading-6 text-gray-light underline md:text-base lg:pr-0"
            >
              Keşfet
            </Link>
          </div>
        </header>
        <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:gap-y-10">
          {/* Card 1 */}

          {products.map((ship) => (
            <SalesCard
              key={ship.id}
              boatTypes={ship.type?.name || "Bilinmiyor"}
              ship={ship}
              locations={locations}
            />
          ))}
        </div>
      </section>
    </DataWrapper>
  );
}
