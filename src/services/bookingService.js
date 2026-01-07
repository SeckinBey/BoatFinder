// src/services/bookingService.js

import { supabase } from "../lib/supabaseClient.js";

/**
 * Tüm rezervasyonları getirir (ilişkisel verilerle birlikte)
 * @param {Object} options - Filtreleme seçenekleri
 * @param {number} options.tekneId - Tekne ID'ye göre filtreleme
 * @param {string} options.durum - Duruma göre filtreleme
 * @param {string} options.musteriEposta - Müşteri e-postasına göre filtreleme
 * @param {string} options.baslangicTarihi - Başlangıç tarihinden sonraki rezervasyonlar
 * @param {string} options.bitisTarihi - Bitiş tarihinden önceki rezervasyonlar
 * @returns {Promise<Array>} Rezervasyon array'i
 */
export async function getBookings(options = {}) {
  try {
    let query = supabase
      .from("rezervasyonlar")
      .select(
        `
        *,
        boats:tekne_id (
          id,
          name,
          title,
          images,
          location_id,
          person_capacity,
          travel_capacity
        )
      `
      )
      .order("giris_tarihi", { ascending: false });

    // Filtreleme seçenekleri
    if (options.tekneId) {
      query = query.eq("tekne_id", options.tekneId);
    }

    if (options.durum) {
      query = query.eq("durum", options.durum);
    }

    if (options.musteriEposta) {
      query = query.ilike("musteri_eposta", `%${options.musteriEposta}%`);
    }

    if (options.baslangicTarihi) {
      query = query.gte("giris_tarihi", options.baslangicTarihi);
    }

    if (options.bitisTarihi) {
      query = query.lte("cikis_tarihi", options.bitisTarihi);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Data transformasyonu (snake_case -> camelCase)
    return (data || []).map(transformBookingData);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
}

/**
 * Tek bir rezervasyonu ID'ye göre getirir (ilişkisel verilerle birlikte)
 * @param {number|string} id - Rezervasyon ID
 * @returns {Promise<Object|null>} Rezervasyon objesi veya null
 */
export async function getBooking(id) {
  try {
    const { data, error } = await supabase
      .from("rezervasyonlar")
      .select(
        `
        *,
        boats:tekne_id (
          id,
          name,
          title,
          images,
          location_id,
          person_capacity,
          travel_capacity,
          locations:location_id (*),
          boat_types:type_id (*)
        )
      `
      )
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // No rows returned
        return null;
      }
      throw error;
    }

    if (!data) return null;

    return transformBookingData(data);
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw error;
  }
}

/**
 * Belirli bir tekne için tarih aralığında müsaitlik kontrolü yapar
 * @param {number} tekneId - Tekne ID
 * @param {string} girisTarihi - Giriş tarihi (ISO 8601 formatında)
 * @param {string} cikisTarihi - Çıkış tarihi (ISO 8601 formatında)
 * @param {number} excludeBookingId - Kontrol dışı bırakılacak rezervasyon ID (güncelleme için)
 * @returns {Promise<{available: boolean, conflictingBookings: Array}>}
 */
export async function checkAvailability(
  tekneId,
  girisTarihi,
  cikisTarihi,
  excludeBookingId = null
) {
  try {
    let query = supabase
      .from("rezervasyonlar")
      .select("id, giris_tarihi, cikis_tarihi, durum, musteri_ad_soyad")
      .eq("tekne_id", tekneId)
      .neq("durum", "İptal Edildi") // İptal edilmiş rezervasyonları hariç tut
      .or(
        // Çakışma kontrolü: Yeni rezervasyonun tarihleri mevcut rezervasyonlarla çakışıyor mu?
        `and(giris_tarihi.lt.${cikisTarihi},cikis_tarihi.gt.${girisTarihi})`
      );

    // Güncelleme durumunda mevcut rezervasyonu hariç tut
    if (excludeBookingId) {
      query = query.neq("id", excludeBookingId);
    }

    const { data, error } = await query;

    if (error) throw error;

    const conflictingBookings = (data || []).map((booking) => ({
      id: booking.id,
      girisTarihi: booking.giris_tarihi,
      cikisTarihi: booking.cikis_tarihi,
      durum: booking.durum,
      musteriAdSoyad: booking.musteri_ad_soyad,
    }));

    return {
      available: conflictingBookings.length === 0,
      conflictingBookings,
    };
  } catch (error) {
    console.error("Error checking availability:", error);
    throw error;
  }
}

/**
 * Yeni rezervasyon oluşturur
 * @param {Object} bookingData - Rezervasyon verisi
 * @returns {Promise<Object>} Oluşturulan rezervasyon
 */
export async function createBooking(bookingData) {
  try {
    // Önce müsaitlik kontrolü yap
    const availability = await checkAvailability(
      bookingData.tekneId,
      bookingData.girisTarihi,
      bookingData.cikisTarihi
    );

    if (!availability.available) {
      throw new Error(
        `Bu tekne seçilen tarihler arasında müsait değil. Çakışan rezervasyonlar: ${availability.conflictingBookings
          .map((b) => b.musteriAdSoyad)
          .join(", ")}`
      );
    }

    // Supabase column isimlerine çevir (camelCase -> snake_case)
    const supabaseData = {
      tekne_id: bookingData.tekneId,
      giris_tarihi: bookingData.girisTarihi,
      cikis_tarihi: bookingData.cikisTarihi,
      durum: bookingData.durum || "Opsiyonel",
      musteri_ad_soyad: bookingData.musteriAdSoyad,
      musteri_telefon: bookingData.musteriTelefon,
      musteri_eposta: bookingData.musteriEposta,
      yolcu_sayisi: bookingData.yolcuSayisi,
      baz_fiyat: bookingData.bazFiyat || 0,
      ekstralar_toplam: bookingData.ekstralarToplam || 0,
      para_birimi: bookingData.paraBirimi || "EUR",
      odeme_yontemi: bookingData.odemeYontemi || null,
      alinan_depozito: bookingData.alinanDepozito || 0,
      ozel_istekler: bookingData.ozelIstekler || null,
      created_by: bookingData.createdBy || null,
    };

    const { data, error } = await supabase
      .from("rezervasyonlar")
      .insert([supabaseData])
      .select(
        `
        *,
        boats:tekne_id (
          id,
          name,
          title,
          images,
          location_id,
          person_capacity,
          travel_capacity
        )
      `
      )
      .single();

    if (error) {
      // Tarih çakışması hatası (trigger'dan gelebilir)
      if (error.message?.includes("rezerve edilmiş")) {
        throw new Error(error.message);
      }
      throw error;
    }

    return transformBookingData(data);
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

/**
 * Rezervasyonu günceller
 * @param {number|string} id - Rezervasyon ID
 * @param {Object} bookingData - Güncellenecek rezervasyon verisi
 * @returns {Promise<Object>} Güncellenmiş rezervasyon
 */
export async function updateBooking(id, bookingData) {
  try {
    // Eğer tarih değişikliği varsa müsaitlik kontrolü yap
    if (
      bookingData.girisTarihi ||
      bookingData.cikisTarihi ||
      bookingData.tekneId
    ) {
      // Mevcut rezervasyonu al
      const currentBooking = await getBooking(id);
      if (!currentBooking) {
        throw new Error("Güncellenecek rezervasyon bulunamadı");
      }

      const tekneId = bookingData.tekneId || currentBooking.tekneId;
      const girisTarihi = bookingData.girisTarihi || currentBooking.girisTarihi;
      const cikisTarihi = bookingData.cikisTarihi || currentBooking.cikisTarihi;

      const availability = await checkAvailability(
        tekneId,
        girisTarihi,
        cikisTarihi,
        id // Mevcut rezervasyonu hariç tut
      );

      if (!availability.available) {
        throw new Error(
          `Bu tekne seçilen tarihler arasında müsait değil. Çakışan rezervasyonlar: ${availability.conflictingBookings
            .map((b) => b.musteriAdSoyad)
            .join(", ")}`
        );
      }
    }

    // Supabase column isimlerine çevir
    const supabaseData = {};
    if (bookingData.tekneId !== undefined)
      supabaseData.tekne_id = bookingData.tekneId;
    if (bookingData.girisTarihi !== undefined)
      supabaseData.giris_tarihi = bookingData.girisTarihi;
    if (bookingData.cikisTarihi !== undefined)
      supabaseData.cikis_tarihi = bookingData.cikisTarihi;
    if (bookingData.durum !== undefined) supabaseData.durum = bookingData.durum;
    if (bookingData.musteriAdSoyad !== undefined)
      supabaseData.musteri_ad_soyad = bookingData.musteriAdSoyad;
    if (bookingData.musteriTelefon !== undefined)
      supabaseData.musteri_telefon = bookingData.musteriTelefon;
    if (bookingData.musteriEposta !== undefined)
      supabaseData.musteri_eposta = bookingData.musteriEposta;
    if (bookingData.yolcuSayisi !== undefined)
      supabaseData.yolcu_sayisi = bookingData.yolcuSayisi;
    if (bookingData.bazFiyat !== undefined)
      supabaseData.baz_fiyat = bookingData.bazFiyat;
    if (bookingData.ekstralarToplam !== undefined)
      supabaseData.ekstralar_toplam = bookingData.ekstralarToplam;
    if (bookingData.paraBirimi !== undefined)
      supabaseData.para_birimi = bookingData.paraBirimi;
    if (bookingData.odemeYontemi !== undefined)
      supabaseData.odeme_yontemi = bookingData.odemeYontemi;
    if (bookingData.alinanDepozito !== undefined)
      supabaseData.alinan_depozito = bookingData.alinanDepozito;
    if (bookingData.ozelIstekler !== undefined)
      supabaseData.ozel_istekler = bookingData.ozelIstekler;

    // updated_at otomatik güncelleniyor (trigger ile)

    const { data, error } = await supabase
      .from("rezervasyonlar")
      .update(supabaseData)
      .eq("id", id)
      .select(
        `
        *,
        boats:tekne_id (
          id,
          name,
          title,
          images,
          location_id,
          person_capacity,
          travel_capacity
        )
      `
      )
      .single();

    if (error) {
      // Tarih çakışması hatası (trigger'dan gelebilir)
      if (error.message?.includes("rezerve edilmiş")) {
        throw new Error(error.message);
      }
      throw error;
    }

    return transformBookingData(data);
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
}

/**
 * Rezervasyonu siler
 * @param {number|string} id - Rezervasyon ID
 * @returns {Promise<{success: boolean}>}
 */
export async function deleteBooking(id) {
  try {
    const { data, error } = await supabase
      .from("rezervasyonlar")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error("Supabase delete error:", error);
      throw new Error(
        error.message ||
          `Silme işlemi başarısız: ${error.code || "Bilinmeyen hata"}`
      );
    }

    // Silinen kayıt yoksa
    if (!data || data.length === 0) {
      throw new Error("Silinecek kayıt bulunamadı veya zaten silinmiş");
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
}

/**
 * Belirli bir tekne için tüm rezervasyonları getirir
 * @param {number} tekneId - Tekne ID
 * @param {Object} options - Ek filtreleme seçenekleri
 * @returns {Promise<Array>} Rezervasyon array'i
 */
export async function getBookingsByBoat(tekneId, options = {}) {
  return getBookings({
    ...options,
    tekneId,
  });
}

/**
 * Belirli bir tarih aralığındaki rezervasyonları getirir
 * @param {string} baslangicTarihi - Başlangıç tarihi (ISO 8601)
 * @param {string} bitisTarihi - Bitiş tarihi (ISO 8601)
 * @param {Object} options - Ek filtreleme seçenekleri
 * @returns {Promise<Array>} Rezervasyon array'i
 */
export async function getBookingsByDateRange(
  baslangicTarihi,
  bitisTarihi,
  options = {}
) {
  return getBookings({
    ...options,
    baslangicTarihi,
    bitisTarihi,
  });
}

/**
 * Belirli bir durumdaki rezervasyonları getirir
 * @param {string} durum - Rezervasyon durumu
 * @param {Object} options - Ek filtreleme seçenekleri
 * @returns {Promise<Array>} Rezervasyon array'i
 */
export async function getBookingsByStatus(durum, options = {}) {
  return getBookings({
    ...options,
    durum,
  });
}

/**
 * Aktif rezervasyonları getirir (İptal Edildi hariç, gelecek tarihli)
 * @param {Object} options - Ek filtreleme seçenekleri
 * @returns {Promise<Array>} Rezervasyon array'i
 */
export async function getActiveBookings(options = {}) {
  try {
    const now = new Date().toISOString();
    return getBookings({
      ...options,
      baslangicTarihi: now, // Gelecek tarihli rezervasyonlar
    });
  } catch (error) {
    console.error("Error fetching active bookings:", error);
    throw error;
  }
}

/**
 * Supabase'den gelen booking verisini camelCase formatına çevirir
 * @param {Object} data - Supabase'den gelen ham veri
 * @returns {Object} Transform edilmiş veri
 */
function transformBookingData(data) {
  if (!data) return null;

  return {
    id: data.id,
    tekneId: data.tekne_id,
    girisTarihi: data.giris_tarihi,
    cikisTarihi: data.cikis_tarihi,
    durum: data.durum,
    musteriAdSoyad: data.musteri_ad_soyad,
    musteriTelefon: data.musteri_telefon,
    musteriEposta: data.musteri_eposta,
    yolcuSayisi: data.yolcu_sayisi,
    bazFiyat: parseFloat(data.baz_fiyat || 0),
    ekstralarToplam: parseFloat(data.ekstralar_toplam || 0),
    toplamTutar: parseFloat(data.toplam_tutar || 0),
    paraBirimi: data.para_birimi,
    odemeYontemi: data.odeme_yontemi,
    alinanDepozito: parseFloat(data.alinan_depozito || 0),
    kalanBakiye: parseFloat(data.kalan_bakiye || 0),
    ozelIstekler: data.ozel_istekler,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    createdBy: data.created_by,
    // İlişkisel veri
    boat: data.boats
      ? {
          id: data.boats.id,
          name: data.boats.name,
          title: data.boats.title,
          images: data.boats.images || [],
          locationId: data.boats.location_id,
          personCapacity: data.boats.person_capacity,
          travelCapacity: data.boats.travel_capacity,
          location: data.boats.locations,
          type: data.boats.boat_types,
        }
      : null,
  };
}
