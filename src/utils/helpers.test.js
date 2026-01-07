import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getLocationById,
  getLocationByName,
  getBoatTypeById,
  getBoatTypeName,
  getLocationName,
  getAmenitiesByIds,
  formatPrice,
  formatPriceEUR,
  parseDate,
  safeParseInt,
  parseQueryParams,
} from "./helpers.js";
import { ERROR_MESSAGES } from "../constants/index.js";

describe("helpers", () => {
  const mockLocations = [
    { id: 1, name: "Antalya", title: "Merkez Antalya" },
    { id: 2, name: "Kaş", title: "Batı Antalya" },
    { id: 3, name: "Kemer", title: "Batı Antalya" },
  ];

  const mockBoatTypes = [
    { id: 1, name: "Gulet" },
    { id: 2, name: "Yelkenli" },
    { id: 3, name: "Katamaran" },
  ];

  const mockAmenities = [
    { id: 1, name: "WiFi" },
    { id: 2, name: "Bar" },
    { id: 3, name: "Güneşlenme Terası" },
  ];

  beforeEach(() => {
    // Console.warn'ı mock'la
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  describe("getLocationById", () => {
    it("should find location by id", () => {
      const location = getLocationById(1, mockLocations);
      expect(location).toEqual({
        id: 1,
        name: "Antalya",
        title: "Merkez Antalya",
      });
    });

    it("should return null if location not found", () => {
      const location = getLocationById(999, mockLocations);
      expect(location).toBeNull();
    });

    it("should warn and return null if locationsList is missing", () => {
      const location = getLocationById(1, null);
      expect(location).toBeNull();
      expect(console.warn).toHaveBeenCalled();
    });
  });

  describe("getLocationByName", () => {
    it("should find location by name (case-insensitive)", () => {
      const location = getLocationByName("antalya", mockLocations);
      expect(location?.name).toBe("Antalya");
    });

    it("should find location with exact case", () => {
      const location = getLocationByName("Kaş", mockLocations);
      expect(location?.name).toBe("Kaş");
    });

    it("should return null if location not found", () => {
      const location = getLocationByName("Istanbul", mockLocations);
      expect(location).toBeNull();
    });

    it("should warn and return null if name is missing", () => {
      const location = getLocationByName(null, mockLocations);
      expect(location).toBeNull();
      expect(console.warn).toHaveBeenCalled();
    });

    it("should warn and return null if locationsList is missing", () => {
      const location = getLocationByName("Antalya", null);
      expect(location).toBeNull();
      expect(console.warn).toHaveBeenCalled();
    });
  });

  describe("getBoatTypeById", () => {
    it("should find boat type by id", () => {
      const boatType = getBoatTypeById(1, mockBoatTypes);
      expect(boatType).toEqual({ id: 1, name: "Gulet" });
    });

    it("should return null if boat type not found", () => {
      const boatType = getBoatTypeById(999, mockBoatTypes);
      expect(boatType).toBeNull();
    });

    it("should warn and return null if boatTypesList is missing", () => {
      const boatType = getBoatTypeById(1, null);
      expect(boatType).toBeNull();
      expect(console.warn).toHaveBeenCalled();
    });
  });

  describe("getBoatTypeName", () => {
    it("should return boat type name by id", () => {
      const name = getBoatTypeName(1, mockBoatTypes);
      expect(name).toBe("Gulet");
    });

    it("should return error message if boat type not found", () => {
      const name = getBoatTypeName(999, mockBoatTypes);
      expect(name).toBe(ERROR_MESSAGES.BOAT_TYPE_NOT_FOUND);
    });

    it("should warn and return error message if boatTypesList is missing", () => {
      const name = getBoatTypeName(1, null);
      expect(name).toBe(ERROR_MESSAGES.BOAT_TYPE_NOT_FOUND);
      expect(console.warn).toHaveBeenCalled();
    });
  });

  describe("getLocationName", () => {
    it("should return location name by id", () => {
      const name = getLocationName(1, mockLocations);
      expect(name).toBe("Antalya");
    });

    it("should return error message if location not found", () => {
      const name = getLocationName(999, mockLocations);
      expect(name).toBe(ERROR_MESSAGES.LOCATION_NOT_FOUND);
    });

    it("should warn and return error message if locationsList is missing", () => {
      const name = getLocationName(1, null);
      expect(name).toBe(ERROR_MESSAGES.LOCATION_NOT_FOUND);
      expect(console.warn).toHaveBeenCalled();
    });
  });

  describe("getAmenitiesByIds", () => {
    it("should return amenity names by ids", () => {
      const amenities = getAmenitiesByIds([1, 2], mockAmenities);
      expect(amenities).toEqual(["WiFi", "Bar"]);
    });

    it("should filter out non-existent ids", () => {
      const amenities = getAmenitiesByIds([1, 999, 3], mockAmenities);
      expect(amenities).toEqual(["WiFi", "Güneşlenme Terası"]);
    });

    it("should return empty array if amenityIds is empty", () => {
      const amenities = getAmenitiesByIds([], mockAmenities);
      expect(amenities).toEqual([]);
    });

    it("should return empty array if amenityIds is not an array", () => {
      const amenities = getAmenitiesByIds(null, mockAmenities);
      expect(amenities).toEqual([]);
    });

    it("should warn and return empty array if amenitiesList is missing", () => {
      const amenities = getAmenitiesByIds([1, 2], null);
      expect(amenities).toEqual([]);
      expect(console.warn).toHaveBeenCalled();
    });
  });

  describe("formatPrice", () => {
    it("should format price with default currency (₺)", () => {
      const formatted = formatPrice(1500);
      expect(formatted).toBe("₺1.500");
    });

    it("should format price with custom currency", () => {
      const formatted = formatPrice(1500, "$");
      expect(formatted).toBe("$1.500");
    });

    it("should handle large numbers", () => {
      const formatted = formatPrice(1500000);
      expect(formatted).toBe("₺1.500.000");
    });

    it("should return empty string if price is not a number", () => {
      const formatted = formatPrice("invalid");
      expect(formatted).toBe("");
    });

    it("should handle zero", () => {
      const formatted = formatPrice(0);
      expect(formatted).toBe("₺0");
    });
  });

  describe("formatPriceEUR", () => {
    it("should format price with EUR currency", () => {
      const formatted = formatPriceEUR(1500);
      expect(formatted).toBe("€1.500");
    });
  });

  describe("parseDate", () => {
    it("should parse ISO date string", () => {
      const date = parseDate("2024-12-27");
      expect(date).toBeInstanceOf(Date);
      expect(date.getFullYear()).toBe(2024);
      expect(date.getMonth()).toBe(11); // 0-indexed
      expect(date.getDate()).toBe(27);
    });

    it("should parse date with format", () => {
      const date = parseDate("27/12/2024", "dd/MM/yyyy");
      expect(date).toBeInstanceOf(Date);
      expect(date.getFullYear()).toBe(2024);
    });

    it("should return null if dateString is missing", () => {
      const date = parseDate(null);
      expect(date).toBeNull();
    });

    it("should return null if dateString is empty", () => {
      const date = parseDate("");
      expect(date).toBeNull();
    });

    it("should return null for invalid date string", () => {
      const date = parseDate("invalid-date");
      expect(date).toBeNull();
    });
  });

  describe("safeParseInt", () => {
    it("should parse valid integer string", () => {
      expect(safeParseInt("123")).toBe(123);
      expect(safeParseInt("456")).toBe(456);
    });

    it("should parse number", () => {
      expect(safeParseInt(123)).toBe(123);
    });

    it("should return default value for invalid string", () => {
      expect(safeParseInt("invalid")).toBe(0);
    });

    it("should return custom default value", () => {
      expect(safeParseInt("invalid", 999)).toBe(999);
    });

    it("should handle empty string", () => {
      expect(safeParseInt("")).toBe(0);
    });

    it("should handle null", () => {
      expect(safeParseInt(null)).toBe(0);
    });
  });

  describe("parseQueryParams", () => {
    it("should parse query parameters", () => {
      const searchParams = new URLSearchParams(
        "location=1&date=2024-12-27&people=4&boatType=2"
      );
      const params = parseQueryParams(searchParams);
      expect(params).toEqual({
        location: "1",
        date: "2024-12-27",
        people: "4",
        boatType: "2",
      });
    });

    it("should handle missing parameters", () => {
      const searchParams = new URLSearchParams("location=1");
      const params = parseQueryParams(searchParams);
      expect(params).toEqual({
        location: "1",
        date: null,
        people: null,
        boatType: null,
      });
    });

    it("should handle empty search params", () => {
      const searchParams = new URLSearchParams("");
      const params = parseQueryParams(searchParams);
      expect(params).toEqual({
        location: null,
        date: null,
        people: null,
        boatType: null,
      });
    });
  });
});
