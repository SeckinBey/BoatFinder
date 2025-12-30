import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { productSchema } from "../../schemas/productSchemas.js";
import { getProduct, updateProduct } from "../../services/productService.js";
import {
  getLocations,
  getBoatTypes,
  getAmenities,
} from "../../services/staticDataService.js";
import { useToastContext } from "../../context/ToastContext.jsx";
import { ROUTES } from "../../constants/index.js";
import DataWrapper from "../../components/DataWrapper.jsx";
import { uploadFiles } from "../../services/storageService.js";

export default function AdminProductsEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { success, error: showError } = useToastContext();

  const [product, setProduct] = useState(null);
  const [locations, setLocations] = useState([]);
  const [boatTypes, setBoatTypes] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Hibrit yaklaşım: Hem mevcut URL'ler hem de yeni dosyalar
  const [imageItems, setImageItems] = useState([]); // { type: 'url' | 'file', value: string | File, preview?: string }
  const [imagePreviews, setImagePreviews] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  // Product ve static data'yı yükle
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoadingData(true);

        const [productData, locationsData, boatTypesData, amenitiesData] =
          await Promise.all([
            getProduct(id),
            getLocations(),
            getBoatTypes(),
            getAmenities(),
          ]);

        if (!productData) {
          showError("Ürün bulunamadı");
          navigate(ROUTES.ADMIN_PRODUCTS);
          return;
        }

        setProduct(productData);
        setLocations(locationsData);
        setBoatTypes(boatTypesData);
        setAmenities(amenitiesData);

        // Mevcut görselleri yükle
        const existingImages =
          productData.images && productData.images.length > 0
            ? productData.images
            : [];

        // Mevcut görselleri URL olarak işaretle
        const initialItems = existingImages.length > 0
          ? existingImages.map((url) => ({
              type: "url",
              value: url,
              preview: url,
            }))
          : [{ type: "file", value: null, preview: null }];

        setImageItems(initialItems);
        setImagePreviews(initialItems.map((item) => item.preview || null));

        reset({
          name: productData.name || "",
          typeId: productData.typeId || undefined,
          title: productData.title || "",
          images: existingImages,
          durationType: productData.durationType || "Günlük",
          captainId: productData.captainId || null,
          ownerId: productData.ownerId || null,
          locationId: productData.locationId || undefined,
          cabinCount: productData.cabinCount || null,
          personCapacity: productData.personCapacity || null,
          travelCapacity: productData.travelCapacity || 1,
          length: productData.length || "",
          details: productData.details || "",
          amenityIds: productData.amenityIds || [],
          price: productData.price || 0,
          discount: productData.discount || 0,
          url: productData.url || "",
        });
      } catch (err) {
        console.error("Error loading data:", err);
        showError("Veriler yüklenirken bir hata oluştu");
      } finally {
        setIsLoadingData(false);
      }
    }

    if (id) {
      loadData();
    }
  }, [id, navigate, reset, showError]);

  // Memory leak önleme
  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => {
        if (preview && preview.startsWith("blob:")) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, []);

  // Görsel değişikliği (URL veya dosya)
  const handleImageChange = (index, fileOrUrl, type) => {
    const newItems = [...imageItems];
    const newPreviews = [...imagePreviews];

    // Eski önizlemeyi temizle (eğer blob URL ise)
    if (newPreviews[index] && newPreviews[index].startsWith("blob:")) {
      URL.revokeObjectURL(newPreviews[index]);
    }

    if (type === "file") {
      if (!fileOrUrl) {
        newItems[index] = { type: "file", value: null, preview: null };
        newPreviews[index] = null;
        setImageItems(newItems);
        setImagePreviews(newPreviews);
        return;
      }

      const file = fileOrUrl;

      // Dosya tipi kontrolü
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        showError("Sadece JPEG, PNG, WebP veya GIF formatında görseller yüklenebilir");
        return;
      }

      // Dosya boyutu kontrolü (5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        showError("Dosya boyutu 5MB'dan küçük olmalıdır");
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      newItems[index] = { type: "file", value: file, preview: previewUrl };
      newPreviews[index] = previewUrl;
    } else {
      // URL değişikliği
      newItems[index] = { type: "url", value: fileOrUrl, preview: fileOrUrl };
      newPreviews[index] = fileOrUrl;
    }

    setImageItems(newItems);
    setImagePreviews(newPreviews);
  };

  // Görsel tipini değiştir (URL <-> File)
  const toggleImageType = (index) => {
    const newItems = [...imageItems];
    const newPreviews = [...imagePreviews];

    // Eski önizlemeyi temizle
    if (newPreviews[index] && newPreviews[index].startsWith("blob:")) {
      URL.revokeObjectURL(newPreviews[index]);
    }

    if (newItems[index].type === "url") {
      newItems[index] = { type: "file", value: null, preview: null };
      newPreviews[index] = null;
    } else {
      newItems[index] = { type: "url", value: "", preview: "" };
      newPreviews[index] = "";
    }

    setImageItems(newItems);
    setImagePreviews(newPreviews);
  };

  const addImageField = () => {
    setImageItems([...imageItems, { type: "file", value: null, preview: null }]);
    setImagePreviews([...imagePreviews, null]);
  };

  const removeImageField = (index) => {
    if (imageItems.length > 1) {
      // Önizleme URL'ini temizle
      if (imagePreviews[index] && imagePreviews[index].startsWith("blob:")) {
        URL.revokeObjectURL(imagePreviews[index]);
      }

      const newItems = imageItems.filter((_, i) => i !== index);
      const newPreviews = imagePreviews.filter((_, i) => i !== index);
      setImageItems(newItems);
      setImagePreviews(newPreviews);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      // Yeni dosyaları yükle
      const filesToUpload = imageItems
        .filter((item) => item.type === "file" && item.value !== null)
        .map((item) => item.value);

      let uploadedUrls = [];
      if (filesToUpload.length > 0) {
        uploadedUrls = await uploadFiles("boat-images", filesToUpload);
      }

      // Mevcut URL'leri al
      const existingUrls = imageItems
        .filter((item) => item.type === "url" && item.value && item.value.trim() !== "")
        .map((item) => item.value.trim());

      // Tüm görselleri birleştir
      const allImages = [...existingUrls, ...uploadedUrls];

      if (allImages.length === 0) {
        showError("En az bir görsel gereklidir");
        setIsSubmitting(false);
        return;
      }

      const productData = {
        ...data,
        images: allImages,
        captainId: data.captainId || null,
        ownerId: data.ownerId || null,
        cabinCount: data.cabinCount || null,
        personCapacity: data.personCapacity || null,
        length: data.length || null,
        details: data.details || null,
        url: data.url || null,
      };

      await updateProduct(id, productData);
      success("Ürün başarıyla güncellendi");
      navigate(ROUTES.ADMIN_PRODUCTS);
    } catch (err) {
      console.error("Error updating product:", err);
      showError(err.message || "Ürün güncellenirken bir hata oluştu");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedAmenities = watch("amenityIds") || [];

  const toggleAmenity = (amenityId) => {
    const current = selectedAmenities;
    const newAmenities = current.includes(amenityId)
      ? current.filter((id) => id !== amenityId)
      : [...current, amenityId];
    setValue("amenityIds", newAmenities);
  };

  return (
    <DataWrapper
      isLoading={isLoadingData}
      error={null}
      data={product}
      emptyMessage="Ürün yükleniyor..."
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link
            to={ROUTES.ADMIN_PRODUCTS}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span>Geri Dön</span>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ürünü Düzenle</h1>
            <p className="text-sm text-gray-500 mt-1">
              {product?.name || "Ürün bilgilerini güncelleyin"}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            {/* Temel Bilgiler */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Temel Bilgiler
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* ... existing form fields (name, title, typeId, locationId, durationType) ... */}
                {/* Ürün Adı */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ürün Adı <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Örn: Lüks Gulet"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Başlık */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Başlık <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("title")}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.title ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Örn: Antalya'da Unutulmaz Bir Deneyim"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Tekne Tipi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tekne Tipi <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("typeId", { valueAsNumber: true })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.typeId ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Seçiniz</option>
                    {boatTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                  {errors.typeId && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.typeId.message}
                    </p>
                  )}
                </div>

                {/* Lokasyon */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lokasyon <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("locationId", { valueAsNumber: true })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.locationId ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Seçiniz</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                  {errors.locationId && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.locationId.message}
                    </p>
                  )}
                </div>

                {/* Süre Tipi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Süre Tipi <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("durationType")}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.durationType ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="Günlük">Günlük</option>
                    <option value="Saatlik">Saatlik</option>
                  </select>
                  {errors.durationType && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.durationType.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Görseller */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Görseller <span className="text-red-500">*</span>
              </h2>
              <div className="space-y-4">
                {imageItems.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex gap-2">
                      {/* Tip değiştirme butonu */}
                      <button
                        type="button"
                        onClick={() => toggleImageType(index)}
                        className="px-3 py-2 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 whitespace-nowrap"
                        title={item.type === "url" ? "Dosya yüklemeye geç" : "URL girmeye geç"}
                      >
                        {item.type === "url" ? "📁 Dosya" : "🔗 URL"}
                      </button>

                      {/* Input alanı */}
                      <div className="flex-1">
                        {item.type === "url" ? (
                          <input
                            type="url"
                            value={item.value || ""}
                            onChange={(e) => handleImageChange(index, e.target.value, "url")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="https://example.com/image.jpg"
                          />
                        ) : (
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const selectedFile = e.target.files[0];
                              handleImageChange(index, selectedFile, "file");
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                          />
                        )}
                      </div>

                      {imageItems.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeImageField(index)}
                          className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                        >
                          Sil
                        </button>
                      )}
                    </div>
                    {/* Önizleme */}
                    {imagePreviews[index] && (
                      <div className="mt-2">
                        <img
                          src={imagePreviews[index]}
                          alt={`Önizleme ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg border border-gray-300"
                        />
                      </div>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageField}
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  + Görsel Ekle
                </button>
                {errors.images && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.images.message}
                  </p>
                )}
              </div>
            </div>

            {/* Fiyat ve Kapasite */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Fiyat ve Kapasite
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* ... existing price, discount, travelCapacity, cabinCount, personCapacity, length fields ... */}
                {/* Fiyat */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fiyat (€) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("price", { valueAsNumber: true })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                {/* İndirim */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    İndirim (%)
                  </label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    max="100"
                    {...register("discount", { valueAsNumber: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="0"
                  />
                </div>

                {/* Seyahat Kapasitesi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Seyahat Kapasitesi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    {...register("travelCapacity", { valueAsNumber: true })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.travelCapacity
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="1"
                  />
                  {errors.travelCapacity && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.travelCapacity.message}
                    </p>
                  )}
                </div>

                {/* Kabin Sayısı */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kabin Sayısı
                  </label>
                  <input
                    type="number"
                    min="0"
                    {...register("cabinCount", { valueAsNumber: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="0"
                  />
                </div>

                {/* Kişi Kapasitesi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kişi Kapasitesi
                  </label>
                  <input
                    type="number"
                    min="1"
                    {...register("personCapacity", { valueAsNumber: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="1"
                  />
                </div>

                {/* Uzunluk */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Uzunluk
                  </label>
                  <input
                    type="text"
                    {...register("length")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Örn: 25m"
                  />
                </div>
              </div>
            </div>

            {/* Özellikler (Amenities) */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Özellikler
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {amenities.map((amenity) => (
                  <label
                    key={amenity.id}
                    className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity.id)}
                      onChange={() => toggleAmenity(amenity.id)}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">
                      {amenity.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Detaylar */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Detaylar
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Açıklama
                  </label>
                  <textarea
                    {...register("details")}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Ürün açıklaması..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL
                  </label>
                  <input
                    type="url"
                    {...register("url")}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.url ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="https://example.com"
                  />
                  {errors.url && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.url.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4">
            <Link
              to={ROUTES.ADMIN_PRODUCTS}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              İptal
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Güncelleniyor..." : "Değişiklikleri Kaydet"}
            </button>
          </div>
        </form>
      </div>
    </DataWrapper>
  );
}