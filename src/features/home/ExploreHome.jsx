import { Link } from "react-router-dom";
import bannerImg from "../../assets/images/2.jpg";
import OptimizedImage from "../../components/OptimizedImage";

export default function ExploreHome() {
  return (
    <div className="relative px-4 mt-4 md:px-12 md:py-12 lg:px-14 xl:px-20 xl:py-16 3xl:px-32 3xl:py-20 4xl:px-40 4xl:py-[88px] from-black/10 to-black/60 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-full before:bg-gradient-to-b md:before:rounded-2xl md:before:bg-gradient-to-r xl:before:hidden 4xl:!py-[132px]">
      <div className="relative md:px-12 md:py-12 lg:px-14 xl:px-20 xl:py-16 3xl:px-32 3xl:py-20 4xl:px-40 4xl:py-[88px]">
        <OptimizedImage
          alt="Call to action Banner"
          loading="lazy"
          className="absolute aspect-18/5 text-transparent bg-gray-lighter object-cover h-full w-full inset-0 rounded-2xl"
          sizes="100vw"
          src={bannerImg}
        />
        <div className="relative m-auto md:ml-0 max-w-[450px] xl:max-w-[513px] px-8 py-9 md:px-0 md:py-0 flex flex-col justify-center md:justify-start z-20">
          <h2 className="text-center text-2xl font-bold text-white md:text-left md:text-3xl xl:mb-6 3xl:text-5xl mb-3">
            Your care, our value
          </h2>
          <p className="mb-7 leading-[1.78] text-white md:text-base xl:mb-10 3xl:text-lg text-sm text-center md:text-left">
            Find and book your dream boat through Yacht. Charter Fleet, the
            world's leading luxury boat comparison site.
          </p>
          <Link
            to={`/explore`}
            className="m-auto inline-block rounded-lg bg-white px-9 py-3 text-sm font-semibold text-gray-dark transition duration-150 hover:bg-gray-dark hover:text-white! hover:bg-black md:ml-0 md:text-base"
          >
            View Boats
          </Link>
        </div>
      </div>
    </div>
  );
}
