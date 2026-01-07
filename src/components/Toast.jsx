import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Toast({
  isOpen,
  onClose,
  message,
  type = "info",
  duration: _duration = 5000, // Duration is passed but not used in this component (used in ToastContainer for auto-removal)
}) {
  // Suppress unused variable warning - duration is used by ToastContainer
  void _duration;
  const icons = {
    success: CheckCircleIcon,
    error: XCircleIcon,
    warning: ExclamationTriangleIcon,
    info: InformationCircleIcon,
  };

  const colors = {
    success: {
      bg: "bg-green-50",
      text: "text-green-800",
      icon: "text-green-400",
      border: "border-green-200",
    },
    error: {
      bg: "bg-red-50",
      text: "text-red-800",
      icon: "text-red-400",
      border: "border-red-200",
    },
    warning: {
      bg: "bg-yellow-50",
      text: "text-yellow-800",
      icon: "text-yellow-400",
      border: "border-yellow-200",
    },
    info: {
      bg: "bg-blue-50",
      text: "text-blue-800",
      icon: "text-blue-400",
      border: "border-blue-200",
    },
  };

  const Icon = icons[type];
  const style = colors[type] || colors.info;
  const SafeIcon = Icon || InformationCircleIcon;

  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
        <div className={`p-4 ${style.bg} border-l-4 ${style.border}`}>
          <div className="flex items-start">
            <div className="shrink-0">
              <SafeIcon
                className={`h-5 w-5 ${style.icon}`}
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className={`text-sm font-medium ${style.text}`}>{message}</p>
            </div>
            <div className="ml-4 flex shrink-0">
              <button
                type="button"
                className={`inline-flex rounded-md ${style.text} focus:outline-none focus:ring-2 focus:ring-offset-2 hover:opacity-75`}
                onClick={onClose}
              >
                <span className="sr-only">Kapat</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}

// Toast Container - Birden fazla toast göstermek için
export function ToastContainer({ toasts, onRemove }) {
  if (!toasts || toasts.length === 0) return null;
  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            isOpen={true}
            onClose={() => onRemove(toast.id)}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
          />
        ))}
      </div>
    </div>
  );
}
