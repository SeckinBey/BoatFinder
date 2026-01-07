// src/app/admin/components/AvailabilityStatus.jsx

export default function AvailabilityStatus({
    available,
    conflictingBookings = [],
    isLoading = false,
}) {
    // Eğer hiçbir şey yoksa ve loading de değilse, component'i gösterme
    if (!isLoading && !available && conflictingBookings.length === 0) {
        return null;
    }

    return (
        <div
            className={`p-4 rounded-lg ${available
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
        >
            {isLoading ? (
                <p className="text-sm text-gray-600">Müsaitlik kontrol ediliyor...</p>
            ) : available ? (
                <p className="text-sm text-green-800 font-medium">
                    ✓ Bu tarihler için tekne müsait
                </p>
            ) : (
                <div>
                    <p className="text-sm text-red-800 font-medium mb-2">
                        ✗ Bu tarihler için tekne müsait değil
                    </p>
                    {conflictingBookings.length > 0 && (
                        <ul className="text-xs text-red-700 list-disc list-inside">
                            {conflictingBookings.map((booking) => (
                                <li key={booking.id}>
                                    {booking.musteriAdSoyad} -{" "}
                                    {new Date(booking.girisTarihi).toLocaleDateString("tr-TR")} -{" "}
                                    {new Date(booking.cikisTarihi).toLocaleDateString("tr-TR")}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}