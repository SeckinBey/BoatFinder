// src/app/admin/components/BookingFormFields.jsx

import { useFormContext } from "react-hook-form";
import { useProducts } from "../../../hooks/useProducts.js";
import { BOOKING_STATUS, PARA_BIRIMI, ODEME_YONTEMI } from "../../../constants/index.js";

export default function BookingFormFields() {
    const { register, formState: { errors }, watch } = useFormContext();
    const { products } = useProducts();

    return (
        <>
            {/* Tekne Seçimi */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tekne <span className="text-red-500">*</span>
                </label>
                <select
                    {...register("tekneId", { valueAsNumber: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">Tekne seçin...</option>
                    {products.map((product) => (
                        <option key={product.id} value={product.id}>
                            {product.name} - {product.title}
                        </option>
                    ))}
                </select>
                {errors.tekneId && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.tekneId.message}
                    </p>
                )}
            </div>

            {/* Tarih Aralığı */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Giriş Tarihi <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="datetime-local"
                        {...register("girisTarihi")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.girisTarihi && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.girisTarihi.message}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Çıkış Tarihi <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="datetime-local"
                        {...register("cikisTarihi")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.cikisTarihi && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.cikisTarihi.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Müşteri Bilgileri */}
            <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Müşteri Bilgileri
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ad Soyad <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("musteriAdSoyad")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.musteriAdSoyad && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.musteriAdSoyad.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Telefon <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            {...register("musteriTelefon")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.musteriTelefon && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.musteriTelefon.message}
                            </p>
                        )}
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            E-posta <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            {...register("musteriEposta")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.musteriEposta && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.musteriEposta.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Yolcu Sayısı <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            min="1"
                            {...register("yolcuSayisi", { valueAsNumber: true })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.yolcuSayisi && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.yolcuSayisi.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Durum <span className="text-red-500">*</span>
                        </label>
                        <select
                            {...register("durum")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            {Object.values(BOOKING_STATUS).map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Finansal Detaylar */}
            <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Finansal Detaylar
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Baz Fiyat
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            {...register("bazFiyat", { valueAsNumber: true })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ekstralar Toplam
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            {...register("ekstralarToplam", { valueAsNumber: true })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Para Birimi
                        </label>
                        <select
                            {...register("paraBirimi")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            {Object.values(PARA_BIRIMI).map((currency) => (
                                <option key={currency} value={currency}>
                                    {currency}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Alınan Depozito
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            {...register("alinanDepozito", { valueAsNumber: true })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ödeme Yöntemi
                        </label>
                        <select
                            {...register("odemeYontemi")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Seçiniz...</option>
                            {Object.values(ODEME_YONTEMI).map((method) => (
                                <option key={method} value={method}>
                                    {method}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Özel İstekler */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Özel İstekler
                </label>
                <textarea
                    {...register("ozelIstekler")}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Müşterinin özel istekleri, notlar..."
                />
            </div>
        </>
    );
}