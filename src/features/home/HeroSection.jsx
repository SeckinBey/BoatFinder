import heroBg from "../../assets/images/hero-bg.png";
import { useStaticData } from "../../hooks/useStaticData.js";
import { Fragment } from "react";
import { Listbox, Transition, Popover } from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import {
  ERROR_MESSAGES,
  QUERY_PARAMS,
  ROUTES,
  TOAST_MESSAGES,
} from "../../constants";
import { useToastContext } from "../../context/ToastContext";
import { useFilters } from "../../context/FilterContext";
import { useNavigate } from "react-router-dom";
import OptimizedImage from "../../components/OptimizedImage.jsx";

export default function HeroSection() {
  const { locations } = useStaticData();

  const {
    selectedLocation,
    departureDate,
    numberOfPeople,
    setSelectedLocation,
    setDepartureDate,
    setNumberOfPeople,
  } = useFilters();

  const navigate = useNavigate();
  const { warning } = useToastContext();

  const handleSubmit = () => {
    const validators = {
      location: !!selectedLocation,
      date: !!departureDate,
      people: numberOfPeople > 0,
    };

    const missing = Object.entries(validators)
      .filter(([, valid]) => !valid)
      .map(([key]) => key);

    if (missing.length === 3) {
      warning(
        `${TOAST_MESSAGES.SEARCH_CRITERIA_MISSING}: ${missing.join(", ")}`
      );
      return;
    }

    const query = new URLSearchParams();
    if (selectedLocation) {
      query.set(QUERY_PARAMS.LOCATION, selectedLocation.id);
    }
    if (departureDate) {
      // Date'i formatla (ISO format)
      const formattedDate = departureDate.toISOString().split("T")[0];
      query.set(QUERY_PARAMS.DATE, formattedDate);
    }
    if (numberOfPeople > 0) {
      query.set(QUERY_PARAMS.PEOPLE, numberOfPeople);
    }

    navigate(`${ROUTES.EXPLORE}?${query}`);
  };

  return (
    <section className="relative isolate flex min-h-[80vh] items-end justify-center overflow-hidden px-4 pb-28 pt-48 sm:justify-start sm:pb-44 sm:pt-64 sm:pl-10 lg:pb-52 lg:pt-72 lg:pl-16 xl:pl-24 2xl:pl-32">
      <OptimizedImage
        src={heroBg}
        alt="Home banner 1"
        fetchPriority="high"
        sizes="100vw"
        className="absolute inset-0 h-full w-full bg-gray-lighter object-cover"
        loading="eager"
      />
      <form className="relative z-50 w-full max-w-[520px] rounded-xl bg-white/95 p-8 shadow-2xl backdrop-blur-sm sm:max-w-[440px] lg:max-w-[560px]">
        <div className="mb-6">
          <span className="mb-2 hidden font-satisfy text-xl leading-7 text-gray-800 sm:block 4xl:text-[28px] 4xl:leading-[44px]">
            Enjoy your trip
          </span>
          <h1 className="mb-3 text-[30px] font-extrabold uppercase leading-9 text-gray-900 sm:text-[36px] sm:leading-11 lg:text-[42px] lg:leading-[50px]">
            Discover the
            <br className="hidden sm:block" />
            New World
          </h1>
          <p className="hidden text-sm leading-6 text-gray-700 sm:block md:text-base">
            Compare prices from 200+ booking sites to help you find the lowest
            price on the right hotel for you.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-5 w-5 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.6"
                d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.6"
                d="M19.5 9c0 7-7.5 12-7.5 12S4.5 16 4.5 9a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>

            <div className=" w-full">
              <Listbox value={selectedLocation} onChange={setSelectedLocation}>
                <div className="relative mt-1">
                  <Listbox.Button className="flex w-full items-center justify-between rounded-lg bg-transparent text-left text-base font-semibold text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/50">
                    <span className="block truncate">
                      {selectedLocation
                        ? selectedLocation.name
                        : "Search destinations"}
                    </span>
                  </Listbox.Button>

                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-2 max-h-72 w-full overflow-auto rounded-2xl bg-white py-2 text-sm shadow-xl ring-1 ring-black/5 focus:outline-none">
                      {locations.map((location) => (
                        <Listbox.Option
                          key={location.id}
                          value={location}
                          className={({ active }) =>
                            `relative flex cursor-pointer select-none items-center px-3 py-2 ${
                              active
                                ? "bg-slate-900/5 text-slate-900"
                                : "text-gray-900"
                            }`
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span className="mr-3 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  className="h-5 w-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.6"
                                    d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.6"
                                    d="M19.5 9c0 7-7.5 12-7.5 12S4.5 16 4.5 9a7.5 7.5 0 1 1 15 0Z"
                                  />
                                </svg>
                              </span>

                              <span
                                className={`block truncate ${
                                  selected ? "font-semibold" : "font-normal"
                                }`}
                              >
                                {location.name}
                              </span>

                              {selected && (
                                <span className="ml-auto flex items-center text-slate-900">
                                  <CheckIcon className="h-4 w-4" />
                                </span>
                              )}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>

          {/* DEPARTURE DATE */}
          <Popover className="relative">
            {() => (
              <>
                <Popover.Button className="flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="h-5 w-5 text-gray-500"
                  >
                    <rect
                      x="3.5"
                      y="4"
                      width="17"
                      height="17"
                      rx="2.5"
                      strokeWidth="1.6"
                    />
                    <path
                      strokeLinecap="round"
                      strokeWidth="1.6"
                      d="M8 2.5v3M16 2.5v3M3.5 9h17"
                    />
                  </svg>
                  <div className="flex w-full">
                    <span className="text-base font-semibold text-gray-900">
                      {departureDate
                        ? format(departureDate, "EEE dd / MM / yy")
                        : "Select departure date"}
                    </span>
                  </div>
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-10 mt-2 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/5">
                    <DayPicker
                      mode="single"
                      selected={departureDate}
                      onSelect={setDepartureDate}
                      disabled={(date) => date < new Date()}
                      className="rounded-lg"
                    />
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>

          {/* NUMBER OF PEOPLE */}
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 shadow-sm">
            <span className="text-base font-semibold text-gray-900">
              Number Of People
            </span>
            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setNumberOfPeople((prev) => Math.max(0, prev - 1))
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-black text-black transition hover:bg-gray-50 hover:border-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <span className="min-w-8 text-center text-base font-semibold text-black">
                {String(numberOfPeople).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => setNumberOfPeople((prev) => prev + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-black text-black transition hover:bg-gray-50 hover:border-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="mt-6 w-full rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-slate-800"
          onClick={() => handleSubmit()}
        >
          Submit
        </button>
      </form>
    </section>
  );
}
