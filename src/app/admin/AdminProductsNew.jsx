import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { productSchema } from "../../schemas/productSchemas.js";
import { createProduct } from "../../services/productService.js";
import {
  getLocations,
  getBoatTypes,
  getAmenities,
  getCaptains,
  getBoatOwners,
} from "../../services/staticDataService.js";
import { useToastContext } from "../../context/ToastContext.jsx";
import { ROUTES } from "../../constants/index.js";
import DataWrapper from "../../components/DataWrapper.jsx";
import { uploadFiles } from "../../services/storageService.js";

export default function AdminProductsNew() {
  const navigate = useNavigate();
  const { success, error: showError } = useToastContext();

  const [locations, setLocations] = useState([]);
  const [boatTypes, setBoatTypes] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [captains, setCaptains] = useState([]);
  const [owners, setOwners] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFiles, setImageFiles] = useState([null]); // File objeleri için
  const [imagePreviews, setImagePreviews] = useState([null]); // Önizleme URL'leri için

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      typeId: undefined,
      title: "",
      images: [],
      durationType: "Günlük",
      captainId: null,
      ownerId: null,
      locationId: undefined,
      cabinCount: null,
      personCapacity: null,
      travelCapacity: 1,
      length: "",
      details: "",
      amenityIds: [],
      price: 0,
      discount: 0,
      url: "",
    },
  });

  // Static data'yı yükle
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoadingData(true);
        const [
          locationsData,
          boatTypesData,
          amenitiesData,
          captainsData,
          ownersData,
        ] = await Promise.all([
          getLocations(),
          getBoatTypes(),
          getAmenities(),
          getCaptains(),
          getBoatOwners(),
        ]);

        setLocations(locationsData);
        setBoatTypes(boatTypesData);
        setAmenities(amenitiesData);
        setCaptains(captainsData);
        setOwners(ownersData);
      } catch (err) {
        console.error("Error loading data:", err);
        showError("Veriler yüklenirken bir hata oluştu");
      } finally {
        setIsLoadingData(false);
      }
    }

    loadData();
  }, [showError]);

  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => {
        if (preview) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, []);

  // Image file değişikliği
  const handleImageChange = (index, file) => {
    if (!file) {
      const newFiles = [...imageFiles];
      const newPreviews = [...imagePreviews];
      newFiles[index] = null;
      newPreviews[index] = null;
      setImageFiles(newFiles);
      setImagePreviews(newPreviews);
      return;
    }

    // Dosya tipi kontrolü
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];
    if (!validTypes.includes(file.type)) {
      showError(
        "Sadece JPEG, PNG, WebP veya GIF formatında görseller yüklenebilir"
      );
      return;
    }

    // Dosya boyutu kontrolü (5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      showError("Dosya boyutu 5MB'dan küçük olmalıdır");
      return;
    }

    const newFiles = [...imageFiles];
    const newPreviews = [...imagePreviews];

    // Eski önizlemeyi temizle
    if (newPreviews[index]) {
      URL.revokeObjectURL(newPreviews[index]);
    }

    newFiles[index] = file;
    // Önizleme URL'i oluştur
    const previewUrl = URL.createObjectURL(file);
    newPreviews[index] = previewUrl;

    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  const addImageField = () => {
    setImageFiles([...imageFiles, null]);
    setImagePreviews([...imagePreviews, null]);
  };

  const removeImageField = (index) => {
    if (imageFiles.length > 1) {
      // Önizleme URL'ini temizle (memory leak önleme)
      if (imagePreviews[index]) {
        URL.revokeObjectURL(imagePreviews[index]);
      }

      const newFiles = imageFiles.filter((_, i) => i !== index);
      const newPreviews = imagePreviews.filter((_, i) => i !== index);
      setImageFiles(newFiles);
      setImagePreviews(newPreviews);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      // Dosyaları filtrele (null olanları çıkar)
      const validFiles = imageFiles.filter((file) => file !== null);

      if (validFiles.length === 0) {
        showError("En az bir görsel gereklidir");
        setIsSubmitting(false);
        return;
      }

      // Dosyaları Supabase Storage'a yükle
      const imageUrls = await uploadFiles("boat-images", validFiles);

      const productData = {
        ...data,
        images: imageUrls,
        captainId: data.captainId || null,
        ownerId: data.ownerId || null,
        cabinCount: data.cabinCount || null,
        personCapacity: data.personCapacity || null,
        length: data.length || null,
        details: data.details || null,
        url: data.url || null,
      };

      await createProduct(productData);
      success("Ürün başarıyla oluşturuldu");
      navigate(ROUTES.ADMIN_PRODUCTS);
    } catch (err) {
      console.error("Error creating product:", err);
      showError(err.message || "Ürün oluşturulurken bir hata oluştu");
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
      data={locations.length > 0}
      emptyMessage="Veriler yükleniyor..."
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
            <h1 className="text-2xl font-bold text-gray-900">Yeni Ürün Ekle</h1>
            <p className="text-sm text-gray-500 mt-1">
              Yeni bir tekne ürünü ekleyin
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
              <div className="space-y-2">
                {imageFiles.map((file, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const selectedFile = e.target.files[0];
                            if (selectedFile) {
                              handleImageChange(index, selectedFile);
                            }
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        />
                      </div>
                      {imageFiles.length > 1 && (
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
              {isSubmitting ? "Kaydediliyor..." : "Ürünü Kaydet"}
            </button>
          </div>
        </form>
      </div>
    </DataWrapper>
  );
}
