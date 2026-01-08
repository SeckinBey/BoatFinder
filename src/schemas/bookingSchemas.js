// src/schemas/bookingSchemas.js

import { z } from "zod";

export const REZERVASYON_DURUMU = {
  OPSIYONEL: "Opsiyonel",
  ONAYLANDI: "Onaylandı",
  TAMAMLANDI: "Tamamlandı",
  IPTAL_EDILDI: "İptal Edildi",
};

export const PARA_BIRIMI = {
  EUR: "EUR",
  USD: "USD",
  TRY: "TRY",
};

export const ODEME_YONTEMI = {
  NAKIT: "Nakit",
  HAVALE: "Havale",
  KREDI_KARTI: "Kredi Kartı",
};

// Rezervasyon oluşturma/güncelleme schema'sı
export const bookingFormSchema = z
  .object({
    tekne_id: z.number().int().positive("Tekne seçimi zorunludur"),

    giris_tarihi: z.string().datetime("Geçerli bir giriş tarihi seçin"),
    cikis_tarihi: z.string().datetime("Geçerli bir çıkış tarihi seçin"),
    durum: z.enum(
      [
        REZERVASYON_DURUMU.OPSIYONEL,
        REZERVASYON_DURUMU.ONAYLANDI,
        REZERVASYON_DURUMU.TAMAMLANDI,
        REZERVASYON_DURUMU.IPTAL_EDILDI,
      ],
      {
        required_error: "Rezervasyon durumu seçilmelidir",
      }
    ),

    musteri_ad_soyad: z
      .string()
      .min(2, "Ad soyad en az 2 karakter olmalıdır")
      .max(255, "Ad soyad en fazla 255 karakter olabilir"),
    musteri_telefon: z
      .string()
      .min(10, "Telefon numarası en az 10 karakter olmalıdır")
      .max(20, "Telefon numarası en fazla 20 karakter olabilir")
      .regex(/^[\d\s\-\+\(\)]+$/, "Geçerli bir telefon numarası girin"),
    musteri_eposta: z
      .string()
      .email("Geçerli bir e-posta adresi girin")
      .max(255, "E-posta en fazla 255 karakter olabilir"),
    yolcu_sayisi: z
      .number()
      .int("Yolcu sayısı tam sayı olmalıdır")
      .positive("Yolcu sayısı 0'dan büyük olmalıdır")
      .max(100, "Yolcu sayısı çok yüksek"),

    baz_fiyat: z
      .number()
      .nonnegative("Baz fiyat negatif olamaz")
      .max(999999999.99, "Baz fiyat çok yüksek"),
    ekstralar_toplam: z
      .number()
      .nonnegative("Ekstralar toplamı negatif olamaz")
      .max(999999999.99, "Ekstralar toplamı çok yüksek"),
    para_birimi: z.enum([PARA_BIRIMI.EUR, PARA_BIRIMI.USD, PARA_BIRIMI.TRY], {
      required_error: "Para birimi seçilmelidir",
    }),
    odeme_yontemi: z
      .enum([
        ODEME_YONTEMI.NAKIT,
        ODEME_YONTEMI.HAVALE,
        ODEME_YONTEMI.KREDI_KARTI,
      ])
      .optional()
      .nullable(),
    alinan_depozito: z
      .number()
      .nonnegative("Alınan depozito negatif olamaz")
      .max(999999999.99, "Depozito tutarı çok yüksek"),

    ozel_istekler: z
      .string()
      .max(5000, "Özel istekler çok uzun")
      .optional()
      .nullable(),
  })
  .refine(
    (data) => {
      // Çıkış tarihi giriş tarihinden sonra olmalı
      const giris = new Date(data.giris_tarihi);
      const cikis = new Date(data.cikis_tarihi);
      return cikis > giris;
    },
    {
      message: "Çıkış tarihi giriş tarihinden sonra olmalıdır",
      path: ["cikis_tarihi"],
    }
  )
  .refine(
    (data) => {
      // Alınan depozito toplam tutardan fazla olamaz
      const toplam = data.baz_fiyat + data.ekstralar_toplam;
      return data.alinan_depozito <= toplam;
    },
    {
      message: "Alınan depozito toplam tutardan fazla olamaz",
      path: ["alinan_depozito"],
    }
  );

// Kullanıcı rezervasyon formu için schema (sadece müşteri bilgileri ve tarih)
export const customerBookingSchema = z
  .object({
    tekneId: z.number().int().positive("Tekne seçimi zorunludur"),
    girisTarihi: z.string().min(1, "Giriş tarihi seçiniz"),
    cikisTarihi: z.string().min(1, "Çıkış tarihi seçiniz"),
    musteriAdSoyad: z
      .string()
      .min(2, "Ad soyad en az 2 karakter olmalıdır")
      .max(255, "Ad soyad en fazla 255 karakter olabilir"),
    musteriTelefon: z
      .string()
      .min(10, "Telefon numarası en az 10 karakter olmalıdır")
      .max(20, "Telefon numarası en fazla 20 karakter olabilir")
      .regex(/^[\d\s\-\+\(\)]+$/, "Geçerli bir telefon numarası girin"),
    musteriEposta: z
      .string()
      .email("Geçerli bir e-posta adresi girin")
      .max(255, "E-posta en fazla 255 karakter olabilir"),
    yolcuSayisi: z
      .number()
      .int("Yolcu sayısı tam sayı olmalıdır")
      .positive("Yolcu sayısı 0'dan büyük olmalıdır")
      .max(100, "Yolcu sayısı çok yüksek"),
    ozelIstekler: z
      .string()
      .max(5000, "Özel istekler çok uzun")
      .optional()
      .nullable(),
  })
  .refine(
    (data) => {
      // Çıkış tarihi giriş tarihinden sonra olmalı
      const giris = new Date(data.girisTarihi);
      const cikis = new Date(data.cikisTarihi);
      return cikis > giris;
    },
    {
      message: "Çıkış tarihi giriş tarihinden sonra olmalıdır",
      path: ["cikisTarihi"],
    }
  );