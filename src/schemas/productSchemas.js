import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(1, "Ürün adı gereklidir")
    .min(3, "Ürün adı en az 3 karakter olmalıdır"),

  typeId: z
    .number({ required_error: "Tekne tipi seçilmelidir" })
    .int("Geçerli bir tekne tipi seçiniz")
    .positive("Geçerli bir tekne tipi seçiniz"),

  title: z
    .string()
    .min(1, "Başlık gereklidir")
    .min(5, "Başlık en az 5 karakter olmalıdır"),

  // URL veya dosya yükleme için - artık sadece string array (URL'ler olacak)
  images: z
    .array(z.string().min(1, "Görsel gereklidir"))
    .min(1, "En az bir görsel gereklidir"),

  durationType: z
    .string()
    .min(1, "Süre tipi seçilmelidir")
    .refine((val) => ["Saatlik", "Günlük"].includes(val), {
      message: "Süre tipi 'Saatlik' veya 'Günlük' olmalıdır",
    }),

  captainId: z.number().int().positive().nullable().optional(),
  ownerId: z.number().int().positive().nullable().optional(),

  locationId: z
    .number({ required_error: "Lokasyon seçilmelidir" })
    .int("Geçerli bir lokasyon seçiniz")
    .positive("Geçerli bir lokasyon seçiniz"),

  cabinCount: z.number().int().min(0).nullable().optional(),
  personCapacity: z.number().int().min(1).nullable().optional(),

  travelCapacity: z
    .number({ required_error: "Seyahat kapasitesi gereklidir" })
    .int("Seyahat kapasitesi tam sayı olmalıdır")
    .min(1, "Seyahat kapasitesi en az 1 olmalıdır"),

  length: z.string().nullable().optional(),

  details: z.string().nullable().optional(),

  amenityIds: z.array(z.number().int().positive()).default([]),

  price: z
    .number({ required_error: "Fiyat gereklidir" })
    .positive("Fiyat pozitif bir sayı olmalıdır")
    .min(0.01, "Fiyat 0'dan büyük olmalıdır"),

  discount: z.number().min(0).max(100).default(0),

  url: z
    .string()
    .url("Geçerli bir URL giriniz")
    .nullable()
    .optional()
    .or(z.literal("")),

  // Tur bilgileri (opsiyonel)
  tourInfo: z
    .object({
      turSureci: z.string().nullable().optional(),
      fiyataDahilOlanlar: z.string().nullable().optional(),
      girisCikisSaatleri: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
});