import { Fragment, useState } from "react";
import { Listbox, Transition, Popover, Dialog } from "@headlessui/react";
import {
  ChevronDownIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

export default function SideBar({
  isOpen,
  onClose,
  selectedLocation,
  setSelectedLocation,
  departureDate,
  setDepartureDate,
  boatType,
  setBoatType,
  numberOfPeople,
  setNumberOfPeople,
  boatTypes = [],
  locations = [],
}) {
  // Modal state'leri
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isBoatTypeModalOpen, setIsBoatTypeModalOpen] = useState(false);

  // "Tümü" seçenekleri
  const allLocationOption = { id: "all", name: "Tümü" };
  const allBoatTypeOption = { id: "all", name: "Tümü" };

  const baseClasses =
    "h-full overflow-y-auto bg-[#F6F8FF] xl:px-0.5 transition-all duration-200";
  const mobileClasses = isOpen
    ? "fixed inset-0 z-40 block w-screen h-screen shadow-xl px-5 py-5"
    : "hidden";

  return (
    <div
      className={`${baseClasses} ${mobileClasses} xl:static xl:block xl:shadow-none`}
    >
      <div className="mb-4 flex items-center justify-between px-5 py-2 pt-3 uppercase md:px-7 xl:px-0 xl:pt-0">
        <h5 className="md:text-h5 font-bold text-gray-dark leading-8">
          Filtre
        </h5>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex font-medium items-center justify-center focus:outline-none transition duration-200 active:scale-90 px-4 py-2 text-sm rounded-md hover:text-gray-1000 focus:ring-gray-900/30 p-0! text-gray focus:ring-0! xl:hidden"
        >
          Kapat
        </button>
      </div>
      <div className="grid grid-cols-1 gap-8 px-5 pb-3 md:px-7 xl:p-0 xl:pb-0">
        {/* Lokasyon Modal */}
        <div className="map_autocomplete">
          <div>
            <div className="flex flex-col">
              <label className="block text-base font-bold leading-7">
                <span className="block text-sm mb-1.5 lg:text-base! text-gray-dark">
                  Lokasyon
                </span>
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => setIsLocationModalOpen(true)}
                    className="flex w-full items-center gap-3 rounded-xl border bg-white border-gray-200 px-4 py-3 shadow-sm hover:bg-gray-50 transition-colors"
                  >
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
                    <span className="flex-1 text-left text-base font-semibold text-gray-900">
                      {selectedLocation ? selectedLocation.name : "Konum Seçin"}
                    </span>
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Lokasyon Modal Dialog */}
        <Dialog
          open={isLocationModalOpen}
          onClose={() => setIsLocationModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-md w-full rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <Dialog.Title className="text-lg font-bold text-gray-900">
                  Lokasyon Seçin
                </Dialog.Title>
                <button
                  onClick={() => setIsLocationModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {/* Tümü seçeneği */}
                <button
                  onClick={() => {
                    setSelectedLocation(allLocationOption);
                    setIsLocationModalOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-3 rounded-lg transition-colors ${
                    selectedLocation?.id === "all"
                      ? "bg-slate-900/5"
                      : "hover:bg-slate-900/5"
                  }`}
                >
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
                    className={`flex-1 text-left ${
                      selectedLocation?.id === "all"
                        ? "font-semibold"
                        : "font-normal"
                    }`}
                  >
                    Tümü
                  </span>
                  {selectedLocation?.id === "all" && (
                    <CheckIcon className="h-5 w-5 text-slate-900" />
                  )}
                </button>

                {locations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => {
                      setSelectedLocation(location);
                      setIsLocationModalOpen(false);
                    }}
                    className={`w-full flex items-center px-3 py-3 rounded-lg transition-colors ${
                      selectedLocation?.id === location.id
                        ? "bg-slate-900/5"
                        : "hover:bg-slate-900/5"
                    }`}
                  >
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
                      className={`flex-1 text-left ${
                        selectedLocation?.id === location.id
                          ? "font-semibold"
                          : "font-normal"
                      }`}
                    >
                      {location.name}
                    </span>
                    {selectedLocation?.id === location.id && (
                      <CheckIcon className="h-5 w-5 text-slate-900" />
                    )}
                  </button>
                ))}
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>

        {/* Tarih Modal */}
        <div className="date-picker">
          <div>
            <div className="flex flex-col">
              <label className="block text-base font-bold leading-7">
                <span className="block text-sm mb-1.5 lg:text-base! text-gray-dark">
                  Tarih
                </span>
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => setIsDateModalOpen(true)}
                    className="flex w-full items-center gap-3 rounded-xl border bg-white border-gray-200 px-4 py-3 shadow-sm hover:bg-gray-50 transition-colors"
                  >
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
                    <span className="flex-1 text-left text-base font-semibold text-gray-900">
                      {departureDate
                        ? format(departureDate, "EEE dd / MM / yy")
                        : "Tarih Seçin"}
                    </span>
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Tarih Modal Dialog */}
        <Dialog
          open={isDateModalOpen}
          onClose={() => setIsDateModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-md w-full rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <Dialog.Title className="text-lg font-bold text-gray-900">
                  Tarih Seçin
                </Dialog.Title>
                <button
                  onClick={() => setIsDateModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="flex justify-center">
                <DayPicker
                  mode="single"
                  selected={departureDate}
                  onSelect={(date) => {
                    setDepartureDate(date);
                    setIsDateModalOpen(false);
                  }}
                  disabled={(date) => date < new Date()}
                  className="rounded-lg"
                />
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>

        {/* Tekne Tipi Modal */}
        <div className="boat-type">
          <div>
            <div className="flex flex-col">
              <label className="block text-base font-bold leading-7">
                <span className="block text-sm mb-1.5 lg:text-base! text-gray-dark">
                  Kategoriler
                </span>
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => setIsBoatTypeModalOpen(true)}
                    className="flex w-full items-center gap-3 rounded-xl border bg-white border-gray-200 px-4 py-3 shadow-sm hover:bg-gray-50 transition-colors"
                  >
                    <svg
                      version="1.1"
                      id="Layer_1"
                      xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 56 65"
                      enableBackground="new 0 0 56 65"
                      xmlSpace="preserve"
                      fill="#000000"
                      className="w-5 h-5"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <title>Boat</title> <desc>Created with Sketch.</desc>{" "}
                        <g id="Page-1" sketch:type="MSPage">
                          {" "}
                          <g
                            id="Boat"
                            transform="translate(2.000000, 2.000000)"
                            sketch:type="MSLayerGroup"
                          >
                            {" "}
                            <path
                              id="Shape"
                              sketch:type="MSShapeGroup"
                              fill="none"
                              stroke="#6B6C6E"
                              strokeWidth="2"
                              d="M40,62H5.8c-1.3,0-5.9-7.1-5.9-8 s1-1.4,1-1.4l50-9.4c1.3,0,2,0.9,2,2.4C53,47,48.3,62,40,62L40,62z"
                            ></path>{" "}
                            <path
                              id="Shape_2_"
                              sketch:type="MSShapeGroup"
                              fill="none"
                              stroke="#6B6C6E"
                              strokeWidth="2"
                              d="M23,42.2L4.7,47.1 c0,0,15.3-13,10.6-43.6"
                            ></path>{" "}
                            <path
                              id="Shape_1_"
                              sketch:type="MSShapeGroup"
                              fill="none"
                              stroke="#6B6C6E"
                              strokeWidth="2"
                              d="M22.4,42.4L46,36.5 c0,0-4.7-29.4-33-36.5C13,0,28.3,17.7,22.4,42.4L22.4,42.4z"
                            ></path>{" "}
                          </g>{" "}
                        </g>{" "}
                      </g>
                    </svg>
                    <span className="flex-1 text-left text-base font-semibold text-gray-900">
                      {boatType ? boatType.name : "Tekne tipi seçin"}
                    </span>
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Tekne Tipi Modal Dialog */}
        <Dialog
          open={isBoatTypeModalOpen}
          onClose={() => setIsBoatTypeModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-md w-full rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <Dialog.Title className="text-lg font-bold text-gray-900">
                  Tekne Tipi Seçin
                </Dialog.Title>
                <button
                  onClick={() => setIsBoatTypeModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {/* Tümü seçeneği */}
                <button
                  onClick={() => {
                    setBoatType(allBoatTypeOption);
                    setIsBoatTypeModalOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-3 rounded-lg transition-colors ${
                    boatType?.id === "all"
                      ? "bg-slate-900/5"
                      : "hover:bg-slate-900/5"
                  }`}
                >
                  <span className="mr-3 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
                    <svg
                      version="1.1"
                      id="Layer_1"
                      xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 56 65"
                      enableBackground="new 0 0 56 65"
                      xmlSpace="preserve"
                      fill="#000000"
                      className="w-5 h-5"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <title>Boat</title> <desc>Created with Sketch.</desc>{" "}
                        <g id="Page-1" sketch:type="MSPage">
                          {" "}
                          <g
                            id="Boat"
                            transform="translate(2.000000, 2.000000)"
                            sketch:type="MSLayerGroup"
                          >
                            {" "}
                            <path
                              id="Shape"
                              sketch:type="MSShapeGroup"
                              fill="none"
                              stroke="#6B6C6E"
                              strokeWidth="2"
                              d="M40,62H5.8c-1.3,0-5.9-7.1-5.9-8 s1-1.4,1-1.4l50-9.4c1.3,0,2,0.9,2,2.4C53,47,48.3,62,40,62L40,62z"
                            ></path>{" "}
                            <path
                              id="Shape_2_"
                              sketch:type="MSShapeGroup"
                              fill="none"
                              stroke="#6B6C6E"
                              strokeWidth="2"
                              d="M23,42.2L4.7,47.1 c0,0,15.3-13,10.6-43.6"
                            ></path>{" "}
                            <path
                              id="Shape_1_"
                              sketch:type="MSShapeGroup"
                              fill="none"
                              stroke="#6B6C6E"
                              strokeWidth="2"
                              d="M22.4,42.4L46,36.5 c0,0-4.7-29.4-33-36.5C13,0,28.3,17.7,22.4,42.4L22.4,42.4z"
                            ></path>{" "}
                          </g>{" "}
                        </g>{" "}
                      </g>
                    </svg>
                  </span>
                  <span
                    className={`flex-1 text-left ${
                      boatType?.id === "all" ? "font-semibold" : "font-normal"
                    }`}
                  >
                    Tümü
                  </span>
                  {boatType?.id === "all" && (
                    <CheckIcon className="h-5 w-5 text-slate-900" />
                  )}
                </button>

                {boatTypes.map((boat) => (
                  <button
                    key={boat.id}
                    onClick={() => {
                      setBoatType(boat);
                      setIsBoatTypeModalOpen(false);
                    }}
                    className={`w-full flex items-center px-3 py-3 rounded-lg transition-colors ${
                      boatType?.id === boat.id
                        ? "bg-slate-900/5"
                        : "hover:bg-slate-900/5"
                    }`}
                  >
                    <span className="mr-3 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
                      <svg
                        version="1.1"
                        id="Layer_1"
                        xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 56 65"
                        enableBackground="new 0 0 56 65"
                        xmlSpace="preserve"
                        fill="#000000"
                        className="w-5 h-5"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <title>Boat</title> <desc>Created with Sketch.</desc>{" "}
                          <g id="Page-1" sketch:type="MSPage">
                            {" "}
                            <g
                              id="Boat"
                              transform="translate(2.000000, 2.000000)"
                              sketch:type="MSLayerGroup"
                            >
                              {" "}
                              <path
                                id="Shape"
                                sketch:type="MSShapeGroup"
                                fill="none"
                                stroke="#6B6C6E"
                                strokeWidth="2"
                                d="M40,62H5.8c-1.3,0-5.9-7.1-5.9-8 s1-1.4,1-1.4l50-9.4c1.3,0,2,0.9,2,2.4C53,47,48.3,62,40,62L40,62z"
                              ></path>{" "}
                              <path
                                id="Shape_2_"
                                sketch:type="MSShapeGroup"
                                fill="none"
                                stroke="#6B6C6E"
                                strokeWidth="2"
                                d="M23,42.2L4.7,47.1 c0,0,15.3-13,10.6-43.6"
                              ></path>{" "}
                              <path
                                id="Shape_1_"
                                sketch:type="MSShapeGroup"
                                fill="none"
                                stroke="#6B6C6E"
                                strokeWidth="2"
                                d="M22.4,42.4L46,36.5 c0,0-4.7-29.4-33-36.5C13,0,28.3,17.7,22.4,42.4L22.4,42.4z"
                              ></path>{" "}
                            </g>{" "}
                          </g>{" "}
                        </g>
                      </svg>
                    </span>
                    <span
                      className={`flex-1 text-left ${
                        boatType?.id === boat.id
                          ? "font-semibold"
                          : "font-normal"
                      }`}
                    >
                      {boat.name}
                    </span>
                    {boatType?.id === boat.id && (
                      <CheckIcon className="h-5 w-5 text-slate-900" />
                    )}
                  </button>
                ))}
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>

        <div className="flex items-center justify-between py-2">
          <span className="text-gray-dark text-sm md:text-base block !text-sm font-bold capitalize text-gray-dark lg:!text-base">
            Kişi Sayısı
          </span>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setNumberOfPeople((prev) => Math.max(0, prev - 1))}
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
            <span className="min-w-[2rem] text-center text-base font-semibold text-black">
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
    </div>
  );
}
