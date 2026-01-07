// src/app/admin/components/BookingFormHeader.jsx

import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { ROUTES } from "../../../constants/index.js";

export default function BookingFormHeader({ title, subtitle }) {
    return (
        <div className="flex items-center gap-4">
            <Link
                to={ROUTES.ADMIN_BOOKINGS}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
                <ArrowLeftIcon className="h-6 w-6 text-gray-600" />
            </Link>
            <div>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                {subtitle && (
                    <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
                )}
            </div>
        </div>
    );
}