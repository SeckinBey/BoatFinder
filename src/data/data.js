// data.js

/**
 * Sabit Veri Listeleri:
 */
import alanyaImage from "../assets/images/alanya.jpg";
import manavgatImage from "../assets/images/manavgat.jpg";
import merkezAntalyaImage from "../assets/images/antalya-liman.jpg";
import kemerImage from "../assets/images/kemer.jpg";
import demreImage from "../assets/images/demre.jpg";
import finikeImage from "../assets/images/finike.jpg";
import kasImage from "../assets/images/kas.jpg";
import kalkanImage from "../assets/images/kalkan.jpg";

export const locations = [
  { id: 1, name: "Alanya", title: "Doğu Antalya", imgId: 1 },
  { id: 2, name: "Manavgat", title: "Doğu Antalya", imgId: 2 },
  { id: 3, name: "Antalya Liman", title: "Merkez Antalya", imgId: 3 },
  { id: 4, name: "Kemer", title: "Batı Antalya", imgId: 4 },
  { id: 5, name: "Demre", title: "Batı Antalya", imgId: 5 },
  { id: 6, name: "Finike", title: "Batı Antalya", imgId: 6 },
  { id: 7, name: "Kaş", title: "Batı Antalya", imgId: 7 },
  { id: 8, name: "Kalkan", title: "Batı Antalya", imgId: 8 },
];

export const locationImages = [
  { id: 1, hrefImg: alanyaImage },
  { id: 2, hrefImg: manavgatImage },
  { id: 3, hrefImg: merkezAntalyaImage },
  { id: 4, hrefImg: kemerImage },
  { id: 5, hrefImg: demreImage },
  { id: 6, hrefImg: finikeImage },
  { id: 7, hrefImg: kasImage },
  { id: 8, hrefImg: kalkanImage },
];

export const boatTypes = [
  { id: 1, name: "Gulet" },
  { id: 2, name: "Yelkenli" },
  { id: 3, name: "Katamaran" },
  { id: 4, name: "Motoryat" },
  { id: 5, name: "Davet Teknesi" },
  { id: 6, name: "Lüks" },
  { id: 7, name: "Trawler" },
  { id: 8, name: "Sürat Teknesi" },
  { id: 9, name: "Kano" },
  { id: 10, name: "SUP Board" },
  { id: 11, name: "Jet Ski" },
  { id: 12, name: "Şişme Bot" },
];

export const amenities = [
  { id: 1, name: "Bar" },
  { id: 2, name: "İç Mekan Hoparlör" },
  { id: 3, name: "WİFİ" },
  { id: 4, name: "Güneşlenme Minderi" },
  { id: 5, name: "Balık Tutma Ekipmanları" },
  { id: 6, name: "Güneşlenme Terası" },
  { id: 7, name: "Radar" },
  { id: 8, name: "Hız Göstergesi" },
  { id: 9, name: "Cep Feneri" },
  { id: 10, name: "Can Yelekleri" },
  { id: 11, name: "Cankurtaran Simidi" },
  { id: 12, name: "Güvenlik Halatı" },
  { id: 13, name: "İlk Yardım Malzemeleri" },
  { id: 14, name: "Yangın Söndürücü" },
  { id: 15, name: "Tehlike İşaret Fişekleri" },
  { id: 16, name: "VHF Radyo" },
  { id: 17, name: "Yedek Çapa ve Halat" },
  { id: 18, name: "Düdük veya Siren" },
  { id: 19, name: "USB / AUX Girişi Bağlantısı" },
  { id: 20, name: "Güverte Duşu" },
  { id: 21, name: "Isıtma" },
  { id: 22, name: "Buzdolabı" },
  { id: 23, name: "Su Arıtma Sistemi" },
  { id: 24, name: "Saç Kurutma Makinesi" },
  { id: 25, name: "Jeneratör" },
  { id: 26, name: "Bluetooth" },
  { id: 27, name: "Yüzme Merdiveni" },
];

/**
 * İlişkisel Veriler:
 */
export const captains = [
  { id: 101, firstName: "Ali", lastName: "Kaya", phone: "+90 532 123 45 67" },
  {
    id: 102,
    firstName: "Berna",
    lastName: "Özdemir",
    phone: "+90 533 234 56 78",
  },
  { id: 103, firstName: "Cem", lastName: "Yılmaz", phone: "+90 541 345 67 89" },
  { id: 104, firstName: "Deniz", lastName: "Aras", phone: "+90 542 456 78 90" },
  { id: 105, firstName: "Eren", lastName: "Şahin", phone: "+90 505 567 89 01" },
];

export const boatOwners = [
  {
    id: 201,
    firstName: "Funda",
    lastName: "Güler",
    phone: "+90 530 678 90 12",
  },
  {
    id: 202,
    firstName: "Hakan",
    lastName: "Çelik",
    phone: "+90 531 789 01 23",
  },
  { id: 203, firstName: "İrem", lastName: "Aksoy", phone: "+90 543 890 12 34" },
  {
    id: 204,
    firstName: "Koray",
    lastName: "Doğan",
    phone: "+90 544 901 23 45",
  },
  {
    id: 205,
    firstName: "Lale",
    lastName: "Yıldız",
    phone: "+90 506 012 34 56",
  },
];

export const locationUrl = [
  {
    id: 1,
    ad: "Ad 1",
    url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51097.990261695435!2d30.608115428222657!3d36.82751961615848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c3959f0c159f61%3A0x693c7c698bd2444a!2zQmFsxLFrw6fEsSBCYXLEsW5hxJ_EsSBQbGFqxLE!5e0!3m2!1str!2str!4v1765883505651!5m2!1str!2str",
  },
  {
    id: 2,
    ad: "Ad 2",
    url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3219.689432736574!2d29.637466376502868!3d36.19843420138867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c1da573546baed%3A0x4dd496c950b7e537!2sKa%C5%9F%20Belediyesi%20Yat%20Liman%C4%B1!5e0!3m2!1str!2str!4v1765886017553!5m2!1str!2str",
  },
  {
    id: 3,
    ad: "Ad 3",
    url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3203.1120118489985!2d30.570119544363873!3d36.59961122021311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c3b79f338b357d%3A0x987c3acc0f3bb306!2sG%20Marina%20Kemer!5e0!3m2!1str!2str!4v1765886155837!5m2!1str!2str",
  },
  {
    id: 4,
    ad: "Ad 4",
    url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51083.49396247625!2d30.658232637880257!3d36.84922034115336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c3900525de718b%3A0x448a01e080365c0!2sAntalya%20Kalei%C3%A7i%20Yat%20Liman%C4%B1!5e0!3m2!1str!2str!4v1765883703850!5m2!1str!2str",
  },
  {
    id: 5,
    ad: "Ad 5",
    url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3215.7601006152936!2d30.145099976506078!3d36.29387039607652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c18ba0d6b0374d%3A0xd0b1b6dc3d0e7373!2sFinike%20Liman!5e0!3m2!1str!2str!4v1765886372922!5m2!1str!2str",
  },
  {
    id: 6,
    ad: "Ad 6",
    url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12822.89093784839!2d31.991366972073095!3d36.53668299796989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14dc98722c2ca4ad%3A0x557f1a4d9cc20027!2sAlanya%20Limani!5e0!3m2!1str!2str!4v1765886309889!5m2!1str!2str",
  },
  {
    id: 7,
    ad: "Ad 7",
    url: "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1900.2849383378139!2d31.449751641333375!3d36.77331214083154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1str!2str!4v1765886267244!5m2!1str!2str",
  },
  {
    id: 8,
    ad: "Ad 8",
    url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3217.0287795845684!2d29.408915089896176!3d36.263080226652164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c02cd5b44e129d%3A0x755706a05a157c93!2sKalkan%20Yat%20Liman%C4%B1!5e0!3m2!1str!2str!4v1765886427682!5m2!1str!2str",
  },
  {
    id: 9,
    ad: "Ad 9",
    url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43313.33813660485!2d29.850234970208902!3d36.20831289772607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c1ef07ea221fc1%3A0xb6511d1faf260dd8!2zw4dheWHEn3rEsSBZYXQgTGltYW7EsQ!5e0!3m2!1str!2str!4v1765886540921!5m2!1str!2str",
  },
];

/**
 * Temel Veri Kümesi:
 * Gemiler (Fiyat Bilgisi Eklenmiş)
 */
export const boats = [
  {
    id: 1,
    name: "Mavi Rüya",
    typeId: 1, // Gulet (Lüks, Konaklamalı)
    title: "Akdeniz'in Engin Sularında Lüks Gulet Deneyimi!",
    images: [
      "https://images.unsplash.com/photo-1542512766-5de0463dc1cc?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=1444&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1593351415075-3bac9f45c877?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://tripfinder-boat.vercel.app/_next/image?url=%2Fimages%2Ftop-boats%2Fboat-thirty-one.jpg&w=1920&q=75",
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1585000962552-70f0a67223d9?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    durationType: "Konaklamalı",
    captainId: 101,
    ownerId: 201,
    locationId: 3, // Antalya Liman
    cabinCount: 6,
    personCapacity: 12,
    travelCapacity: 20,
    length: "32m",
    details:
      "Geniş güvertesi ve lüks kabinleriyle unutulmaz bir mavi yolculuk vadediyor. Ege ve Akdeniz'in en güzel koylarını keşfetmeye hazır olun.",
    amenityIds: [1, 3, 4, 6, 7, 10, 13, 22, 25, 26, 27],
    price: 2800, // Konaklamalı (Günlük)
    url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51097.990261695435!2d30.608115428222657!3d36.82751961615848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c3959f0c159f61%3A0x693c7c698bd2444a!2zQmFsxLFrw6fEsSBCYXLEsW5hxJ_EsSBQbGFqxLE!5e0!3m2!1str!2str!4v1765883505651!5m2!1str!2str",
  },
  {
    id: 2,
    name: "Ege Yıldızı",
    typeId: 2, // Yelkenli (Konaklamalı)
    title: "Rüzgarla Dans Edin: Profesyonel Yelkenli Kiralama",
    images: [
      "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=1444&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1593351415075-3bac9f45c877?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://tripfinder-boat.vercel.app/_next/image?url=%2Fimages%2Ftop-boats%2Fboat-thirty-one.jpg&w=1920&q=75",
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1585000962552-70f0a67223d9?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1542512766-5de0463dc1cc?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    durationType: "Konaklamalı",
    captainId: 102,
    ownerId: 202,
    locationId: 7, // Kaş
    cabinCount: 4,
    personCapacity: 8,
    travelCapacity: 10,
    length: "15m",
    details:
      "Tecrübeli kaptanı ile beraber Kaş'ın eşsiz koylarında yelken açın. Deneyimli veya deneyimsiz tüm misafirler için uygundur.",
    amenityIds: [3, 8, 10, 14, 16, 17, 22, 27],
    price: 1350, // Konaklamalı (Günlük)
    url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3219.689432736574!2d29.637466376502868!3d36.19843420138867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c1da573546baed%3A0x4dd496c950b7e537!2sKa%C5%9F%20Belediyesi%20Yat%20Liman%C4%B1!5e0!3m2!1str!2str!4v1765886017553!5m2!1str!2str",
  },
  {
    id: 3,
    name: "Hızlı Dalga",
    typeId: 8, // Sürat Teknesi (Saatlik)
    title: "Adrenalin Dolu Bir Gün: Kemer Çıkışlı Sürat Teknesi",
    images: [
      "https://tripfinder-boat.vercel.app/_next/image?url=%2Fimages%2Ftop-boats%2Fboat-thirty-one.jpg&w=1920&q=75",
      "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=1444&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1593351415075-3bac9f45c877?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1585000962552-70f0a67223d9?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1542512766-5de0463dc1cc?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    durationType: "Saatlik",
    captainId: 103,
    ownerId: 203,
    locationId: 4, // Kemer
    cabinCount: 0,
    personCapacity: 0,
    travelCapacity: 6,
    length: "8m",
    details:
      "Kısa sürede uzak koylara ulaşmak isteyenler için ideal. Hızlı ve güvenli bir deniz yolculuğu deneyimi sunar.",
    amenityIds: [8, 10, 14, 18, 19, 27],
    price: 85, // Saatlik
    url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3203.1120118489985!2d30.570119544363873!3d36.59961122021311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c3b79f338b357d%3A0x987c3acc0f3bb306!2sG%20Marina%20Kemer!5e0!3m2!1str!2str!4v1765886155837!5m2!1str!2str",
  },
  {
    id: 4,
    name: "Liman Kraliçesi",
    typeId: 5, // Davet Teknesi (Günübirlik/Etkinlik)
    title: "Özel Kutlamalarınız İçin Muhteşem Davet Teknesi",
    images: [
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=1444&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1593351415075-3bac9f45c877?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://tripfinder-boat.vercel.app/_next/image?url=%2Fimages%2Ftop-boats%2Fboat-thirty-one.jpg&w=1920&q=75",
      "https://images.unsplash.com/photo-1585000962552-70f0a67223d9?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1542512766-5de0463dc1cc?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    durationType: "Günübirlik",
    captainId: 104,
    ownerId: 204,
    locationId: 3, // Antalya Liman
    cabinCount: 3,
    personCapacity: 6,
    travelCapacity: 40,
    length: "40m",
    details:
      "Doğum günleri, nişanlar ve kurumsal etkinlikler için ideal. Geniş dans pisti ve profesyonel ses sistemi mevcuttur.",
    amenityIds: [1, 2, 3, 6, 10, 13, 16, 25, 26],
    price: 1800, // Günübirlik (Tüm Gün)
    url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51083.49396247625!2d30.658232637880257!3d36.84922034115336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c3900525de718b%3A0x448a01e080365c0!2sAntalya%20Kalei%C3%A7i%20Yat%20Liman%C4%B1!5e0!3m2!1str!2str!4v1765883703850!5m2!1str!2str",
  },
  {
    id: 5,
    name: "Sessiz Dalış",
    typeId: 7, // Trawler (Konaklamalı)
    title: "Trawler ile huzurlu ve konforlu bir tatil.",
    images: [
      "https://images.unsplash.com/photo-1593351415075-3bac9f45c877?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=1444&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://tripfinder-boat.vercel.app/_next/image?url=%2Fimages%2Ftop-boats%2Fboat-thirty-one.jpg&w=1920&q=75",
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1585000962552-70f0a67223d9?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1542512766-5de0463dc1cc?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    durationType: "Konaklamalı",
    captainId: 105,
    ownerId: 205,
    locationId: 6, // Finike
    cabinCount: 2,
    personCapacity: 4,
    travelCapacity: 8,
    length: "18m",
    details:
      "Yavaş ve keyifli bir seyir arayanlar için mükemmel bir seçim. Geniş yaşam alanları ve modern mutfak ekipmanları mevcuttur.",
    amenityIds: [3, 4, 7, 10, 13, 16, 21, 22, 24, 27],
    price: 950, // Konaklamalı (Günlük)
    url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3215.7601006152936!2d30.145099976506078!3d36.29387039607652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c18ba0d6b0374d%3A0xd0b1b6dc3d0e7373!2sFinike%20Liman!5e0!3m2!1str!2str!4v1765886372922!5m2!1str!2str",
  },
  {
    id: 6,
    name: "Köpük",
    typeId: 11, // Jet Ski (Saatlik)
    title: "Kısa Süreli Kiralama: Jet Ski ile Hızın Tadını Çıkarın!",
    images: [
      "https://images.unsplash.com/photo-1574574971987-956627063462?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1588667634212-07a718b958c8?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1616823522304-4c441b83d8e3?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1627956463990-21a71e613b5a?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1605330364415-373f7617b070?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1549418579-d5be1c68f23f?q=80&w=1500&h=1000&fit=crop",
    ],
    durationType: "Saatlik",
    captainId: null,
    ownerId: 202,
    locationId: 1, // Alanya
    cabinCount: 0,
    personCapacity: 0,
    travelCapacity: 2,
    length: "3m",
    details:
      "Eğlence ve hız arayanlar için birebir. Alanya sahilinde unutulmaz anlar yaşayın. Ehliyet zorunluluğu yoktur (kısa kiralama).",
    amenityIds: [10, 13, 18],
    price: 50, // Saatlik
    url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12822.89093784839!2d31.991366972073095!3d36.53668299796989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14dc98722c2ca4ad%3A0x557f1a4d9cc20027!2sAlanya%20Limani!5e0!3m2!1str!2str!4v1765886309889!5m2!1str!2str",
  },
  {
    id: 7,
    name: "Deniz Kızı",
    typeId: 3, // Katamaran (Günübirlik)
    title: "Geniş Alan ve Denge: Manavgat'ta Katamaran Macerası",
    images: [
      "https://images.unsplash.com/photo-1621213271783-a7c36a463a55?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1582236577874-904084f478a5?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1596728087707-164993108c4c?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1616823522304-4c441b83d8e3?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1628994520973-19910d525281?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1579290076326-068305c747a8?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1549418579-d5be1c68f23f?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1537243350163-950e1815b57f?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1588667634212-07a718b958c8?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1610444654921-b3b18d22d250?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1588667634212-07a718b958c8?q=80&w=1500&h=1000&fit=crop",
    ],
    durationType: "Günübirlik",
    captainId: 102,
    ownerId: 203,
    locationId: 2, // Manavgat
    cabinCount: 4,
    personCapacity: 8,
    travelCapacity: 15,
    length: "14m",
    details:
      "Yüksek denge ve geniş yaşam alanları sunar. Manavgat'ın berrak sularında yüzme molaları ve harika bir gün batımı için idealdir.",
    amenityIds: [3, 4, 6, 10, 13, 16, 20, 22, 26, 27],
    price: 1100, // Günübirlik (Tüm Gün)
    url: "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1900.2849383378139!2d31.449751641333375!3d36.77331214083154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1str!2str!4v1765886267244!5m2!1str!2str",
  },
  {
    id: 8,
    name: "Akdeniz Rüzgarı",
    typeId: 4, // Motoryat (Konaklamalı)
    title: "Hız ve Lüks Bir Arada: Kalkan'da Kiralık Motoryat",
    images: [
      "https://images.unsplash.com/photo-1610444654921-b3b18d22d250?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1549418579-d5be1c68f23f?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1537243350163-950e1815b57f?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1621213271783-a7c36a463a55?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1588667634212-07a718b958c8?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1616823522304-4c441b83d8e3?q=80&w=1500&h=1000&fit=crop",
    ],
    durationType: "Konaklamalı",
    captainId: 103,
    ownerId: 204,
    locationId: 8, // Kalkan
    cabinCount: 3,
    personCapacity: 6,
    travelCapacity: 8,
    length: "17m",
    details:
      "Şık tasarımı ve güçlü motoru ile Kaş ve Kalkan çevresindeki koylara hızlıca ulaşın. Tam donanımlı mutfağa sahiptir.",
    amenityIds: [1, 3, 4, 7, 8, 10, 13, 16, 20, 22, 25, 27],
    price: 1850, // Konaklamalı (Günlük)
    url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3217.0287795845684!2d29.408915089896176!3d36.263080226652164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c02cd5b44e129d%3A0x755706a05a157c93!2sKalkan%20Yat%20Liman%C4%B1!5e0!3m2!1str!2str!4v1765886427682!5m2!1str!2str",
  },
  {
    id: 9,
    name: "Fırtına",
    typeId: 9, // Kano (Saatlik)
    title: "Kano Kiralama: Demre'de Bireysel Keşifler",
    images: [
      "https://images.unsplash.com/photo-1546961342-ea5880467c66?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1605330364415-373f7617b070?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1571595166014-99890a8a6409?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1575887258071-f92594a861d8?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1574574971987-956627063462?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1577969854747-d35275e7a57a?q=80&w=1500&h=1000&fit=crop",
    ],
    durationType: "Saatlik",
    captainId: 104,
    ownerId: 205,
    locationId: 5, // Demre
    cabinCount: 0,
    personCapacity: 0,
    travelCapacity: 2,
    length: "4m",
    details:
      "Kendi hızınızda, suyun keyfini çıkarın. Demre'nin tarihi kalıntılarını denizden görmek için harika bir seçenek.",
    amenityIds: [10, 13, 18],
    price: 15, // Saatlik
    url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43313.33813660485!2d29.850234970208902!3d36.20831289772607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c1ef07ea221fc1%3A0xb6511d1faf260dd8!2zw4dheWHEn3rEsSBZYXQgTGltYW7EsQ!5e0!3m2!1str!2str!4v1765886540921!5m2!1str!2str",
  },
  {
    id: 10,
    name: "Yaz Esintisi",
    typeId: 6, // Lüks Yat (En Lüks, Konaklamalı)
    title: "Maksimum Lüks ve Hizmet: Ultra Lüks Yat Deneyimi",
    images: [
      "https://images.unsplash.com/photo-1632734914101-d779a5570077?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1548682121-50e572013898?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1628994520973-19910d525281?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1579290076326-068305c747a8?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1549418579-d5be1c68f23f?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1610444654921-b3b18d22d250?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1537243350163-950e1815b57f?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1621213271783-a7c36a463a55?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1588667634212-07a718b958c8?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1616823522304-4c441b83d8e3?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1627956463990-21a71e613b5a?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1571595166014-99890a8a6409?q=80&w=1500&h=1000&fit=crop",
    ],
    durationType: "Konaklamalı",
    captainId: 105,
    ownerId: 201,
    locationId: 4, // Kemer
    cabinCount: 5,
    personCapacity: 10,
    travelCapacity: 15,
    length: "28m",
    details:
      "5 yıldızlı otel konforunu denizde yaşayın. Tam mürettebatlı bu yat, en zorlu zevklere hitap edecek şekilde donatılmıştır.",
    amenityIds: [1, 2, 3, 4, 6, 7, 10, 13, 16, 21, 22, 23, 24, 25, 26, 27],
    price: 4500, // Konaklamalı (Günlük - Yüksek Seviye)
    url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3203.1120118489985!2d30.570119544363873!3d36.59961122021311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c3b79f338b357d%3A0x987c3acc0f3bb306!2sG%20Marina%20Kemer!5e0!3m2!1str!2str!4v1765886155837!5m2!1str!2str",
  },
  {
    id: 11,
    name: "Mercan",
    typeId: 10, // SUP Board (Saatlik)
    title: "SUP Board Kiralama: Durgun Sularda Yoga ve Spor",
    images: [
      "https://images.unsplash.com/photo-1575887258071-f92594a861d8?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1571595166014-99890a8a6409?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1574574971987-956627063462?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1577969854747-d35275e7a57a?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1549418579-d5be1c68f23f?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1616823522304-4c441b83d8e3?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1627956463990-21a71e613b5a?q=80&w=1500&h=1000&fit=crop",
    ],
    durationType: "Saatlik",
    captainId: null,
    ownerId: 203,
    locationId: 7, // Kaş
    cabinCount: 0,
    personCapacity: 0,
    travelCapacity: 1,
    length: "3.5m",
    details:
      "Stand Up Paddle (SUP) ile denizin tadını çıkarın. Denge ve fitness için mükemmeldir. Ekipmanlar sağlanır.",
    amenityIds: [10, 13, 18],
    price: 20, // Saatlik
    url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3219.689432736574!2d29.637466376502868!3d36.19843420138867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c1da573546baed%3A0x4dd496c950b7e537!2sKa%C5%9F%20Belediyesi%20Yat%20Liman%C4%B1!5e0!3m2!1str!2str!4v1765886017553!5m2!1str!2str",
  },
  {
    id: 12,
    name: "Okyanus Gözcüsü",
    typeId: 7, // Trawler (Konaklamalı)
    title: "Ailenizle Sakin Bir Hafta Sonu İçin Trawler",
    images: [
      "https://images.unsplash.com/photo-1621213271783-a7c36a463a55?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1588667634212-07a718b958c8?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1610444654921-b3b18d22d250?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1537243350163-950e1815b57f?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1627956463990-21a71e613b5a?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1549418579-d5be1c68f23f?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1582236577874-904084f478a5?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1546961342-ea5880467c66?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1605330364415-373f7617b070?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1571595166014-99890a8a6409?q=80&w=1500&h=1000&fit=crop",
    ],
    durationType: "Konaklamalı",
    captainId: 104,
    ownerId: 202,
    locationId: 6, // Finike
    cabinCount: 3,
    personCapacity: 6,
    travelCapacity: 10,
    length: "16m",
    details:
      "Stabil yapısıyla uzun süreli konaklamalar için ideal. Aile yemekleri için geniş bir yemek alanı sunar.",
    amenityIds: [3, 4, 7, 10, 13, 16, 21, 22, 25, 27],
    price: 1050, // Konaklamalı (Günlük)
    url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3215.7601006152936!2d30.145099976506078!3d36.29387039607652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c18ba0d6b0374d%3A0xd0b1b6dc3d0e7373!2sFinike%20Liman!5e0!3m2!1str!2str!4v1765886372922!5m2!1str!2str",
  },
  {
    id: 13,
    name: "Şişme Macera",
    typeId: 12, // Şişme Bot (Saatlik/Günübirlik)
    title: "Şişme Bot ile Gizli Koylara Ulaşın",
    images: [
      "https://images.unsplash.com/photo-1567113110543-f6615b130e52?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1605330364415-373f7617b070?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1546961342-ea5880467c66?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1579290076326-068305c747a8?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1574574971987-956627063462?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1577969854747-d35275e7a57a?q=80&w=1500&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1575887258071-f92594a861d8?q=80&w=1500&h=1000&fit=crop",
    ],
    durationType: "Günübirlik",
    captainId: 101,
    ownerId: 204,
    locationId: 1, // Alanya
    cabinCount: 0,
    personCapacity: 0,
    travelCapacity: 4,
    length: "4.5m",
    details:
      "Kolay kullanımı sayesinde kaptansız kiralamaya uygundur. Balık tutma veya yüzme için ideal bir bottur.",
    amenityIds: [5, 10, 13, 18],
    price: 350, // Günübirlik (Motor hariç/dahil opsiyonu olabilir)
    url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12822.89093784839!2d31.991366972073095!3d36.53668299796989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14dc98722c2ca4ad%3A0x557f1a4d9cc20027!2sAlanya%20Limani!5e0!3m2!1str!2str!4v1765886309889!5m2!1str!2str",
  },
];

export const addons = [
  { label: "SUP", price: "80 €" },
  { label: "Early Check-In", price: "120 €" },
  { label: "Şnorkel Seti", price: "25 €" },
];

export const faqs = [
  {
    question: "Tekne kiraladıktan sonraki iptal koşulları nedir?",
    answer:
      "Tura 7 gün kala ücretsiz iptal, sonrası için %50 kesinti uygulanır.",
  },
  {
    question:
      "Tekne kiralarken kaptanlı veya kaptansız seçenekler mevcut mu?",
    answer:
      "Evet, kaptanlı ve kaptansız kiralama seçenekleri bulunmaktadır. Kaptansız kiralama için yeterli denizcilik tecrübesine sahip olmanız gerekmektedir.",
  },
  {
    question: "Tekne kiralama ücretine neler dahildir?",
    answer:
      "Genellikle tekne kiralama ücretine yakıt, kaptan, mürettebat, temizlik ve sigorta dahildir. Detaylar kiralama anlaşmasında belirtilir.",
  },
  {
    question: "Tekne kiralamada yakıt masrafları nasıl karşılanır?",
    answer:
      "Yakıt masrafları genellikle kiralama ücretine dahildir. bazı teknelerde fiyat ayrı olabilmektedir. her teknenin ilan detay kısmında görebilirsiniz.",
  },
  {
    question: "Tekne kiralama fiyatları nasıl belirlenir?",
    answer:
      "Fiyatlar teknenin türüne, büyüklüğüne, kiralama süresine ve sezona göre değişiklik gösterir.",
  },
];
