import { supabase } from "../lib/supabaseClient.js";
import imageCompression from 'browser-image-compression';

/**
 * Supabase Storage'dan public URL oluşturur
 * @param {string} bucket - Bucket adı
 * @param {string} path - Dosya yolu
 * @returns {string} Public URL
 */
export function getPublicUrl(bucket, path) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Location image URL'ini getirir
 * @param {string} imagePath - Görsel yolu (örn: "alanya.jpg")
 * @returns {string} Public URL
 */
export function getLocationImageUrl(imagePath) {
  if (!imagePath) return null;

  // Eğer zaten tam URL ise, olduğu gibi döndür
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // Supabase Storage'dan URL oluştur
  return getPublicUrl("location-images", imagePath);
}

/**
 * Görseli WebP formatına dönüştürür ve optimize eder
 * @param {File} file - Orijinal görsel dosyası
 * @param {Object} options - Sıkıştırma seçenekleri
 * @returns {Promise<File>} Optimize edilmiş WebP dosyası
 */
export async function convertToWebP(file, options = {}) {
  try {
    const defaultOptions = {
      maxSizeMB: 1, // Maksimum dosya boyutu (MB)
      maxWidthOrHeight: 1920, // Maksimum genişlik/yükseklik
      useWebWorker: true, // Web Worker kullan (performans için)
      fileType: 'image/webp', // WebP formatına dönüştür
      initialQuality: 0.85, // Kalite (0-1 arası, 0.85 = %85 kalite)
      ...options
    };

    // Eğer dosya zaten WebP ise ve küçükse, direkt döndür
    if (file.type === 'image/webp' && file.size < defaultOptions.maxSizeMB * 1024 * 1024) {
      return file;
    }

    // Görseli sıkıştır ve WebP'ye dönüştür
    const compressedFile = await imageCompression(file, defaultOptions);
    
    // Dosya adını .webp uzantısıyla değiştir
    const fileName = file.name.replace(/\.[^/.]+$/, '') + '.webp';
    const webpFile = new File([compressedFile], fileName, {
      type: 'image/webp',
      lastModified: Date.now()
    });

    return webpFile;
  } catch (error) {
    console.error('Error converting to WebP:', error);
    // Hata durumunda hata fırlat (uploadFile içinde handle edilecek)
    throw new Error(`Görsel dönüştürülürken hata oluştu: ${error.message}`);
  }
}

/**
 * Dosyayı Supabase Storage'a yükler (WebP optimizasyonu ile)
 * @param {string} bucket - Bucket adı
 * @param {File} file - Yüklenecek dosya
 * @param {string} path - Dosya yolu (opsiyonel)
 * @param {Object} compressionOptions - Sıkıştırma seçenekleri
 * @returns {Promise<string>} Yüklenen dosyanın public URL'i
 */
export async function uploadFile(bucket, file, path = null, compressionOptions = {}) {
  try {
    let fileToUpload = file;
    let wasConverted = false;
    
    // Sadece görsel dosyaları WebP'ye dönüştür
    if (file.type.startsWith('image/')) {
      try {
        fileToUpload = await convertToWebP(file, compressionOptions);
        wasConverted = true;
        
        // Sadece dönüştürme başarılı olduysa log'la
        const originalSizeMB = (file.size / 1024 / 1024).toFixed(2);
        const newSizeMB = (fileToUpload.size / 1024 / 1024).toFixed(2);
        const savings = ((1 - fileToUpload.size / file.size) * 100).toFixed(1);
        console.log(`✅ WebP dönüştürme: ${originalSizeMB}MB → ${newSizeMB}MB (${savings}% tasarruf)`);
      } catch (error) {
        console.warn('⚠️ WebP dönüştürme başarısız, orijinal dosya kullanılıyor:', error.message);
        // Hata durumunda orijinal dosyayı kullan
        fileToUpload = file;
      }
    }

    // Dosya adını oluştur (dönüştürülmüşse .webp, değilse orijinal uzantı)
    const fileExt = wasConverted ? 'webp' : fileToUpload.name.split(".").pop();
    const fileName =
      path ||
      `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = fileName;

    // Dosyayı yükle
    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, fileToUpload, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    // Public URL'i al
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error(`Dosya yüklenirken hata oluştu: ${error.message}`);
  }
}

/**
 * Birden fazla dosyayı Supabase Storage'a yükler (WebP optimizasyonu ile)
 * @param {string} bucket - Bucket adı
 * @param {File[]} files - Yüklenecek dosyalar
 * @param {Object} compressionOptions - Sıkıştırma seçenekleri
 * @returns {Promise<string[]>} Yüklenen dosyaların public URL'leri
 */
export async function uploadFiles(bucket, files, compressionOptions = {}) {
  try {
    const uploadPromises = files.map((file) => 
      uploadFile(bucket, file, null, compressionOptions)
    );
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error("Error uploading files:", error);
    throw error;
  }
}