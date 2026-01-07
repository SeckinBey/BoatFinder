import { supabase } from "../lib/supabaseClient.js";

/**
 * Tüm tekneleri getirir (ilişkisel verilerle birlikte)
 * @returns {Promise<Array>} Tekne array'i
 */
export async function getProducts() {
  try {
    const { data, error } = await supabase
      .from("boats")
      .select(
        `
        *,
        locations:location_id (*),
        boat_types:type_id (*),
        captains:captain_id (*),
        boat_owners:owner_id (*)
      `
      )
      .order("id", { ascending: true });

    if (error) throw error;

    // Data transformasyonu (Supabase ilişkisel yapısını mevcut yapıya uyarla)
    return (data || []).map((boat) => ({
      ...boat,
      locationId: boat.location_id,
      typeId: boat.type_id,
      captainId: boat.captain_id,
      ownerId: boat.owner_id,
      cabinCount: boat.cabin_count,
      personCapacity: boat.person_capacity,
      travelCapacity: boat.travel_capacity,
      durationType: boat.duration_type,
      amenityIds: boat.amenity_ids || [],
      location: boat.locations,
      type: boat.boat_types,
      captain: boat.captains,
      owner: boat.boat_owners,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

/**
 * Tek bir tekneyi ID'ye göre getirir (ilişkisel verilerle birlikte)
 * @param {number|string} id - Tekne ID
 * @returns {Promise<Object|null>} Tekne objesi veya null
 */
export async function getProduct(id) {
  try {
    const { data, error } = await supabase
      .from("boats")
      .select(
        `
        *,
        locations:location_id (*),
        boat_types:type_id (*),
        captains:captain_id (*),
        boat_owners:owner_id (*)
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

    // Data transformasyonu
    return {
      ...data,
      locationId: data.location_id,
      typeId: data.type_id,
      captainId: data.captain_id,
      ownerId: data.owner_id,
      cabinCount: data.cabin_count,
      personCapacity: data.person_capacity,
      travelCapacity: data.travel_capacity,
      durationType: data.duration_type,
      amenityIds: data.amenity_ids || [],
      location: data.locations,
      type: data.boat_types,
      captain: data.captains,
      owner: data.boat_owners,
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

/**
 * Yeni tekne oluşturur
 * @param {Object} productData - Tekne verisi
 * @returns {Promise<Object>} Oluşturulan tekne
 */
export async function createProduct(productData) {
  try {
    // Supabase column isimlerine çevir
    const supabaseData = {
      name: productData.name,
      type_id: productData.typeId,
      title: productData.title,
      images: productData.images || [],
      duration_type: productData.durationType,
      captain_id: productData.captainId,
      owner_id: productData.ownerId,
      location_id: productData.locationId,
      cabin_count: productData.cabinCount,
      person_capacity: productData.personCapacity,
      travel_capacity: productData.travelCapacity,
      length: productData.length,
      details: productData.details,
      amenity_ids: productData.amenityIds || [],
      price: productData.price,
      discount: productData.discount || 0,
      url: productData.url,
    };

    const { data, error } = await supabase
      .from("boats")
      .insert([supabaseData])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

/**
 * Tekneyi günceller
 * @param {number|string} id - Tekne ID
 * @param {Object} productData - Güncellenecek tekne verisi
 * @returns {Promise<Object>} Güncellenmiş tekne
 */
export async function updateProduct(id, productData) {
  try {
    // Supabase column isimlerine çevir
    const supabaseData = {};
    if (productData.name !== undefined) supabaseData.name = productData.name;
    if (productData.typeId !== undefined)
      supabaseData.type_id = productData.typeId;
    if (productData.title !== undefined) supabaseData.title = productData.title;
    if (productData.images !== undefined)
      supabaseData.images = productData.images;
    if (productData.durationType !== undefined)
      supabaseData.duration_type = productData.durationType;
    if (productData.captainId !== undefined)
      supabaseData.captain_id = productData.captainId;
    if (productData.ownerId !== undefined)
      supabaseData.owner_id = productData.ownerId;
    if (productData.locationId !== undefined)
      supabaseData.location_id = productData.locationId;
    if (productData.cabinCount !== undefined)
      supabaseData.cabin_count = productData.cabinCount;
    if (productData.personCapacity !== undefined)
      supabaseData.person_capacity = productData.personCapacity;
    if (productData.travelCapacity !== undefined)
      supabaseData.travel_capacity = productData.travelCapacity;
    if (productData.length !== undefined)
      supabaseData.length = productData.length;
    if (productData.details !== undefined)
      supabaseData.details = productData.details;
    if (productData.amenityIds !== undefined)
      supabaseData.amenity_ids = productData.amenityIds;
    if (productData.price !== undefined) supabaseData.price = productData.price;
    if (productData.discount !== undefined)
      supabaseData.discount = productData.discount;
    if (productData.url !== undefined) supabaseData.url = productData.url;

    supabaseData.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("boats")
      .update(supabaseData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

/**
 * Tekneyi siler
 * @param {number|string} id - Tekne ID
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function deleteProduct(id) {
  try {
    const { data, error } = await supabase
      .from("boats")
      .delete()
      .eq("id", id)
      .select(); // ✅ Silinen kaydı görmek için (debug için)

    if (error) {
      console.error("Supabase delete error:", error);
      throw new Error(
        error.message ||
          `Silme işlemi başarısız: ${error.code || "Bilinmeyen hata"}`
      );
    }

    // Silinen kayıt yoksa (zaten silinmiş veya bulunamadı)
    if (!data || data.length === 0) {
      throw new Error("Silinecek kayıt bulunamadı veya zaten silinmiş");
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}
