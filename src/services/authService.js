import { supabase } from "../lib/supabaseClient.js";

/**
 * Email ve şifre ile giriş yapar
 * @param {string} email - Kullanıcı email'i
 * @param {string} password - Kullanıcı şifresi
 * @returns {Promise<{user: Object, session: Object}>}
 */
export async function login(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

/**
 * Çıkış yapar
 * @returns {Promise<void>}
 */
export async function logout() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
}

/**
 * Mevcut kullanıcıyı getirir
 * @returns {Promise<Object|null>} Kullanıcı objesi veya null
 */
export async function getCurrentUser() {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    // AuthSessionMissingError beklenen bir durumdur (kullanıcı giriş yapmamış olabilir)
    // Bu hatayı sessizce handle ediyoruz
    if (error?.name === "AuthSessionMissingError" || error?.message?.includes("Auth session missing")) {
      return null;
    }
    // Diğer hatalar için console'a yazdır
    console.error("Error getting current user:", error);
    return null;
  }
}

/**
 * Yeni kullanıcı kaydı oluşturur
 * @param {string} email - Kullanıcı email'i
 * @param {string} password - Kullanıcı şifresi
 * @returns {Promise<{user: Object, session: Object}>}
 */
export async function signUp(email, password) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
}

/**
 * Auth state değişikliklerini dinler
 * @param {Function} callback - Auth state değiştiğinde çağrılacak callback
 * @returns {Function} Unsubscribe fonksiyonu
 */
export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange(callback);
}
