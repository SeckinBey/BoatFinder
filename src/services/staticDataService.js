import { supabase } from "../lib/supabaseClient.js";
import { handleError } from "../utils/errorHandler.js";

export async function getLocations() {
  try {
    const { data, error } = await supabase
      .from("locations")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;

    // ✅ image_url zaten tam URL ise direkt kullan
    return (data || []).map((location) => ({
      ...location,
      imageUrl: location.image_url || null, // Direkt kullan
    }));
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
}

/**
 * Tüm tekne tiplerini getirir
 * @returns {Promise<Array>} Tekne tipi array'i
 */
export async function getBoatTypes() {
  try {
    const { data, error } = await supabase
      .from("boat_types")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching boat types:", error);
    throw error;
  }
}

/**
 * Tüm özellikleri (amenities) getirir
 * @returns {Promise<Array>} Özellik array'i
 */
export async function getAmenities() {
  try {
    const { data, error } = await supabase
      .from("amenities")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching amenities:", error);
    throw error;
  }
}

/**
 * Tüm kaptanları getirir
 * @returns {Promise<Array>} Kaptan array'i
 */
export async function getCaptains() {
  try {
    const { data, error } = await supabase
      .from("captains")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching captains:", error);
    throw error;
  }
}

/**
 * Yeni kaptan ekler
 * @param {Object} captainData - Kaptan verisi {first_name, last_name, phone}
 * @returns {Promise<Object>} Eklenen kaptan
 */
export async function createCaptain(captainData) {
  try {
    const supabaseData = {
      first_name: captainData.firstName || captainData.first_name,
      last_name: captainData.lastName || captainData.last_name,
      phone: captainData.phone,
    };

    const { data, error } = await supabase
      .from("captains")
      .insert([supabaseData])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    handleError(error, "createCaptain");
    throw error;
  }
}

/**
 * Kaptanı günceller
 * @param {number|string} id - Kaptan ID
 * @param {Object} captainData - Güncellenecek kaptan verisi
 * @returns {Promise<Object>} Güncellenmiş kaptan
 */
export async function updateCaptain(id, captainData) {
  try {
    const supabaseData = {};
    if (
      captainData.firstName !== undefined ||
      captainData.first_name !== undefined
    )
      supabaseData.first_name = captainData.firstName || captainData.first_name;
    if (
      captainData.lastName !== undefined ||
      captainData.last_name !== undefined
    )
      supabaseData.last_name = captainData.lastName || captainData.last_name;
    if (captainData.phone !== undefined) supabaseData.phone = captainData.phone;

    const { data, error } = await supabase
      .from("captains")
      .update(supabaseData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    handleError(error, "updateCaptain");
    throw error;
  }
}

/**
 * Kaptanı siler
 * @param {number|string} id - Kaptan ID
 * @returns {Promise<{success: boolean}>}
 */
export async function deleteCaptain(id) {
  try {
    const { data, error } = await supabase
      .from("captains")
      .delete()
      .eq("id", id)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) {
      throw new Error("Silinecek kayıt bulunamadı");
    }
    return { success: true };
  } catch (error) {
    handleError(error, "deleteCaptain");
    throw error;
  }
}

/**
 * Tüm tekne sahiplerini getirir
 * @returns {Promise<Array>} Tekne sahibi array'i
 */
export async function getBoatOwners() {
  try {
    const { data, error } = await supabase
      .from("boat_owners")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching boat owners:", error);
    throw error;
  }
}

/**
 * Yeni tekne sahibi ekler
 * @param {Object} ownerData - Tekne sahibi verisi {first_name, last_name, phone}
 * @returns {Promise<Object>} Eklenen tekne sahibi
 */
export async function createBoatOwner(ownerData) {
  try {
    const supabaseData = {
      first_name: ownerData.firstName || ownerData.first_name,
      last_name: ownerData.lastName || ownerData.last_name,
      phone: ownerData.phone,
    };

    const { data, error } = await supabase
      .from("boat_owners")
      .insert([supabaseData])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    handleError(error, "createBoatOwner");
    throw error;
  }
}

/**
 * Tekne sahibini günceller
 * @param {number|string} id - Tekne sahibi ID
 * @param {Object} ownerData - Güncellenecek tekne sahibi verisi
 * @returns {Promise<Object>} Güncellenmiş tekne sahibi
 */
export async function updateBoatOwner(id, ownerData) {
  try {
    const supabaseData = {};
    if (ownerData.firstName !== undefined || ownerData.first_name !== undefined)
      supabaseData.first_name = ownerData.firstName || ownerData.first_name;
    if (ownerData.lastName !== undefined || ownerData.last_name !== undefined)
      supabaseData.last_name = ownerData.lastName || ownerData.last_name;
    if (ownerData.phone !== undefined) supabaseData.phone = ownerData.phone;

    const { data, error } = await supabase
      .from("boat_owners")
      .update(supabaseData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    handleError(error, "updateBoatOwner");
    throw error;
  }
}

/**
 * Tekne sahibini siler
 * @param {number|string} id - Tekne sahibi ID
 * @returns {Promise<{success: boolean}>}
 */
export async function deleteBoatOwner(id) {
  try {
    const { data, error } = await supabase
      .from("boat_owners")
      .delete()
      .eq("id", id)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) {
      throw new Error("Silinecek kayıt bulunamadı");
    }
    return { success: true };
  } catch (error) {
    handleError(error, "deleteBoatOwner");
    throw error;
  }
}

/**
 * Yeni lokasyon ekler
 */
export async function createLocation(locationData) {
  try {
    const supabaseData = {
      name: locationData.name,
      title: locationData.title,
      image_url: locationData.imageUrl || locationData.image_url || null,
    };

    const { data, error } = await supabase
      .from("locations")
      .insert([supabaseData])
      .select()
      .single();

    if (error) throw error;
    return {
      ...data,
      imageUrl: data.image_url,
    };
  } catch (error) {
    handleError(error, "createLocation");
    throw error;
  }
}

/**
 * Lokasyonu günceller
 */
export async function updateLocation(id, locationData) {
  try {
    const supabaseData = {};
    if (locationData.name !== undefined) supabaseData.name = locationData.name;
    if (locationData.title !== undefined)
      supabaseData.title = locationData.title;
    if (
      locationData.imageUrl !== undefined ||
      locationData.image_url !== undefined
    )
      supabaseData.image_url = locationData.imageUrl || locationData.image_url;

    const { data, error } = await supabase
      .from("locations")
      .update(supabaseData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return {
      ...data,
      imageUrl: data.image_url,
    };
  } catch (error) {
    handleError(error, "updateLocation");
    throw error;
  }
}

/**
 * Lokasyonu siler
 */
export async function deleteLocation(id) {
  try {
    const { data, error } = await supabase
      .from("locations")
      .delete()
      .eq("id", id)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) {
      throw new Error("Silinecek kayıt bulunamadı");
    }
    return { success: true };
  } catch (error) {
    handleError(error, "deleteLocation");
    throw error;
  }
}

/**
 * Yeni tekne tipi ekler
 */
export async function createBoatType(boatTypeData) {
  try {
    const { data, error } = await supabase
      .from("boat_types")
      .insert([{ name: boatTypeData.name }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    handleError(error, "createBoatType");
    throw error;
  }
}

/**
 * Tekne tipini günceller
 */
export async function updateBoatType(id, boatTypeData) {
  try {
    const { data, error } = await supabase
      .from("boat_types")
      .update({ name: boatTypeData.name })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    handleError(error, "updateBoatType");
    throw error;
  }
}

/**
 * Tekne tipini siler
 */
export async function deleteBoatType(id) {
  try {
    const { data, error } = await supabase
      .from("boat_types")
      .delete()
      .eq("id", id)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) {
      throw new Error("Silinecek kayıt bulunamadı");
    }
    return { success: true };
  } catch (error) {
    handleError(error, "deleteBoatType");
    throw error;
  }
}

/**
 * Yeni özellik (amenity) ekler
 */
export async function createAmenity(amenityData) {
  try {
    const { data, error } = await supabase
      .from("amenities")
      .insert([{ name: amenityData.name }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    handleError(error, "createAmenity");
    throw error;
  }
}

/**
 * Özelliği (amenity) günceller
 */
export async function updateAmenity(id, amenityData) {
  try {
    const { data, error } = await supabase
      .from("amenities")
      .update({ name: amenityData.name })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    handleError(error, "updateAmenity");
    throw error;
  }
}

/**
 * Özelliği (amenity) siler
 */
export async function deleteAmenity(id) {
  try {
    const { data, error } = await supabase
      .from("amenities")
      .delete()
      .eq("id", id)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) {
      throw new Error("Silinecek kayıt bulunamadı");
    }
    return { success: true };
  } catch (error) {
    handleError(error, "deleteAmenity");
    throw error;
  }
}

/**
 * Tüm ek hizmetleri (addons) getirir
 * @returns {Promise<Array>} Addon array'i
 */
export async function getAddons() {
  try {
    const { data, error } = await supabase
      .from("addons")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching addons:", error);
    throw error;
  }
}

/**
 * Tüm sık sorulan soruları (faqs) getirir
 * @returns {Promise<Array>} FAQ array'i
 */
export async function getFaqs() {
  try {
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching faqs:", error);
    throw error;
  }
}
