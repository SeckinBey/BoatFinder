import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Home", to: "/" },
  { name: "Explore", to: "/explore" },
  { name: "Pricing", to: "#" },
  { name: "Help", to: "#" },
  { name: "Other Pages", to: "#" },
];

export default function Navbar({ variant }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <header
        className={
          variant === "hero"
            ? "absolute inset-x-0 top-0 z-50"
            : "top-0 z-50 bg-gray-900 backdrop-blur"
        }
      >
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-8"
        >
          <div className="flex items-center lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <span className="sr-only">TripFinder Boat</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white font-semibold">
                TF
              </div>
              <span className="text-lg font-semibold text-white ">
                TripFinder
              </span>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="text-sm font-semibold text-slate-800 transition-colors hover:text-indigo-600 lg:text-white lg:hover:text-white/80"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                <span className="sr-only">TripFinder Boat</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white font-semibold">
                  TF
                </div>
                <span className="text-lg font-semibold text-slate-800">
                  TripFinder
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className="-mx-3 block cursor-pointer rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </>
  );
}
