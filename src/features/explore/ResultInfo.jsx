export default function ResultInfo({ onOpenFilters }) {
  return (
    <>
      {/* Veriler şu anda statik olarak gösteriliyor. Projenin ilerleyen
       aşamalarında dinamik olarak gösterilecek. */}
      <div className="mb-8 flex items-center justify-between">
        <p className="text-gray-dark text-sm font-bold text-gray-dark md:text-base">
          Showing 1 - 20
          <span className="font-normal text-gray"> out of 2356 Products </span>
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenFilters}
            aria-label="Filtreleri aç"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-700 transition duration-200 hover:border-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 xl:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M7 12h10M10 18h4"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
