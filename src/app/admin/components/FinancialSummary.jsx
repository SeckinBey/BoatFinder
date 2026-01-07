// src/app/admin/components/FinancialSummary.jsx

import { useFormContext } from "react-hook-form";

export default function FinancialSummary() {
    const { watch } = useFormContext();

    const bazFiyat = watch("bazFiyat") || 0;
    const ekstralarToplam = watch("ekstralarToplam") || 0;
    const toplamTutar = bazFiyat + ekstralarToplam;
    const alinanDepozito = watch("alinanDepozito") || 0;
    const kalanBakiye = toplamTutar - alinanDepozito;
    const paraBirimi = watch("paraBirimi");

    return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <span className="text-gray-600">Toplam Tutar:</span>
                    <span className="ml-2 font-semibold text-gray-900">
                        {toplamTutar.toLocaleString("tr-TR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}{" "}
                        {paraBirimi}
                    </span>
                </div>
                <div>
                    <span className="text-gray-600">Kalan Bakiye:</span>
                    <span
                        className={`ml-2 font-semibold ${kalanBakiye > 0 ? "text-orange-600" : "text-green-600"
                            }`}
                    >
                        {kalanBakiye.toLocaleString("tr-TR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}{" "}
                        {paraBirimi}
                    </span>
                </div>
            </div>
        </div>
    );
}