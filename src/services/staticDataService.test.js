// src/services/staticDataService.test.js
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as staticDataService from "./staticDataService.js";
import { supabase } from "../lib/supabaseClient.js";

// Mock dependencies
vi.mock("../lib/supabaseClient.js", () => ({
  supabase: {
    from: vi.fn(),
  },
}));

// Mock errorHandler
vi.mock("../utils/errorHandler.js", () => ({
  handleError: vi.fn((error) => error),
}));

describe("staticDataService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getLocations", () => {
    it("should return locations with imageUrl transformation", async () => {
      const mockLocations = [
        { id: 1, name: "Location 1", image_url: "https://example.com/img.jpg" },
        { id: 2, name: "Location 2", image_url: null },
        { id: 3, name: "Location 3" }, // image_url undefined
      ];

      const mockOrder = vi.fn().mockResolvedValue({
        data: mockLocations,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      const result = await staticDataService.getLocations();

      expect(supabase.from).toHaveBeenCalledWith("locations");
      expect(result).toHaveLength(3);
      expect(result[0]).toMatchObject({
        id: 1,
        name: "Location 1",
        imageUrl: "https://example.com/img.jpg",
      });
      expect(result[1].imageUrl).toBeNull();
      expect(result[2].imageUrl).toBeNull();
    });

    it("should return empty array when data is null", async () => {
      const mockOrder = vi.fn().mockResolvedValue({
        data: null,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      const result = await staticDataService.getLocations();

      expect(result).toEqual([]);
    });

    it("should throw error when fetch fails", async () => {
      const mockError = { code: "PGRST116", message: "Error" };
      const mockOrder = vi.fn().mockResolvedValue({
        data: null,
        error: mockError,
      });
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      await expect(staticDataService.getLocations()).rejects.toEqual(mockError);
    });
  });

  describe("getBoatTypes", () => {
    it("should return boat types when fetch succeeds", async () => {
      const mockTypes = [
        { id: 1, name: "Type 1" },
        { id: 2, name: "Type 2" },
      ];

      const mockOrder = vi.fn().mockResolvedValue({
        data: mockTypes,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      const result = await staticDataService.getBoatTypes();

      expect(supabase.from).toHaveBeenCalledWith("boat_types");
      expect(result).toEqual(mockTypes);
    });

    it("should throw error when Supabase returns error", async () => {
      const mockError = { code: "PGRST116", message: "Error" };
      const mockOrder = vi.fn().mockResolvedValue({
        data: null,
        error: mockError,
      });
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      await expect(staticDataService.getBoatTypes()).rejects.toEqual(mockError);
    });

    it("should handle error in catch block when promise rejects", async () => {
      const mockError = new Error("Network error");
      const mockOrder = vi.fn().mockRejectedValue(mockError);
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      await expect(staticDataService.getBoatTypes()).rejects.toThrow(
        "Network error"
      );
    });

    it("should return empty array when data is null", async () => {
      const mockOrder = vi.fn().mockResolvedValue({
        data: null,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      const result = await staticDataService.getBoatTypes();

      expect(result).toEqual([]);
    });
  });

  describe("getAmenities", () => {
    it("should return amenities when fetch succeeds", async () => {
      const mockAmenities = [
        { id: 1, name: "Amenity 1" },
        { id: 2, name: "Amenity 2" },
      ];

      const mockOrder = vi.fn().mockResolvedValue({
        data: mockAmenities,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      const result = await staticDataService.getAmenities();

      expect(supabase.from).toHaveBeenCalledWith("amenities");
      expect(result).toEqual(mockAmenities);
    });

    it("should throw error when Supabase returns error", async () => {
      const mockError = { code: "PGRST116", message: "Error" };
      const mockOrder = vi.fn().mockResolvedValue({
        data: null,
        error: mockError,
      });
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      await expect(staticDataService.getAmenities()).rejects.toEqual(mockError);
    });

    it("should handle error in catch block when promise rejects", async () => {
      const mockError = new Error("Network error");
      const mockOrder = vi.fn().mockRejectedValue(mockError);
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      await expect(staticDataService.getAmenities()).rejects.toThrow(
        "Network error"
      );
    });

    it("should return empty array when data is null", async () => {
      const mockOrder = vi.fn().mockResolvedValue({
        data: null,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      const result = await staticDataService.getAmenities();

      expect(result).toEqual([]);
    });
  });

  describe("getCaptains", () => {
    it("should return captains when fetch succeeds", async () => {
      const mockCaptains = [
        { id: 1, first_name: "John", last_name: "Doe", phone: "123" },
      ];

      const mockOrder = vi.fn().mockResolvedValue({
        data: mockCaptains,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      const result = await staticDataService.getCaptains();

      expect(supabase.from).toHaveBeenCalledWith("captains");
      expect(result).toEqual(mockCaptains);
    });

    it("should throw error when Supabase returns error", async () => {
      const mockError = { code: "PGRST116", message: "Error" };
      const mockOrder = vi.fn().mockResolvedValue({
        data: null,
        error: mockError,
      });
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      await expect(staticDataService.getCaptains()).rejects.toEqual(mockError);
    });

    it("should handle error in catch block when promise rejects", async () => {
      const mockError = new Error("Network error");
      const mockOrder = vi.fn().mockRejectedValue(mockError);
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      await expect(staticDataService.getCaptains()).rejects.toThrow(
        "Network error"
      );
    });

    it("should return empty array when data is null", async () => {
      const mockOrder = vi.fn().mockResolvedValue({
        data: null,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      const result = await staticDataService.getCaptains();

      expect(result).toEqual([]);
    });
  });

  describe("getBoatOwners", () => {
    it("should return boat owners when fetch succeeds", async () => {
      const mockOwners = [
        { id: 1, first_name: "Jane", last_name: "Smith", phone: "456" },
      ];

      const mockOrder = vi.fn().mockResolvedValue({
        data: mockOwners,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      const result = await staticDataService.getBoatOwners();

      expect(supabase.from).toHaveBeenCalledWith("boat_owners");
      expect(result).toEqual(mockOwners);
    });

    it("should throw error when Supabase returns error", async () => {
      const mockError = { code: "PGRST116", message: "Error" };
      const mockOrder = vi.fn().mockResolvedValue({
        data: null,
        error: mockError,
      });
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      await expect(staticDataService.getBoatOwners()).rejects.toEqual(
        mockError
      );
    });

    it("should handle error in catch block when promise rejects", async () => {
      const mockError = new Error("Network error");
      const mockOrder = vi.fn().mockRejectedValue(mockError);
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      await expect(staticDataService.getBoatOwners()).rejects.toThrow(
        "Network error"
      );
    });

    it("should return empty array when data is null", async () => {
      const mockOrder = vi.fn().mockResolvedValue({
        data: null,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      const result = await staticDataService.getBoatOwners();

      expect(result).toEqual([]);
    });
  });

  describe("getAddons", () => {
    it("should return addons when fetch succeeds", async () => {
      const mockAddons = [
        { id: 1, name: "Addon 1" },
        { id: 2, name: "Addon 2" },
      ];

      const mockOrder = vi.fn().mockResolvedValue({
        data: mockAddons,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      const result = await staticDataService.getAddons();

      expect(supabase.from).toHaveBeenCalledWith("addons");
      expect(result).toEqual(mockAddons);
    });

    it("should handle error when fetch fails", async () => {
      const mockError = { code: "PGRST116", message: "Error" };
      const mockOrder = vi.fn().mockResolvedValue({
        data: null,
        error: mockError,
      });
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      await expect(staticDataService.getAddons()).rejects.toEqual(mockError);
    });

    it("should return empty array when data is null", async () => {
      const mockOrder = vi.fn().mockResolvedValue({
        data: null,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      const result = await staticDataService.getAddons();

      expect(result).toEqual([]);
    });
  });

  describe("getFaqs", () => {
    it("should return faqs when fetch succeeds", async () => {
      const mockFaqs = [
        { id: 1, question: "Q1", answer: "A1" },
        { id: 2, question: "Q2", answer: "A2" },
      ];

      const mockOrder = vi.fn().mockResolvedValue({
        data: mockFaqs,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      const result = await staticDataService.getFaqs();

      expect(supabase.from).toHaveBeenCalledWith("faqs");
      expect(result).toEqual(mockFaqs);
    });

    it("should handle error when fetch fails", async () => {
      const mockError = { code: "PGRST116", message: "Error" };
      const mockOrder = vi.fn().mockResolvedValue({
        data: null,
        error: mockError,
      });
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      await expect(staticDataService.getFaqs()).rejects.toEqual(mockError);
    });

    it("should return empty array when data is null", async () => {
      const mockOrder = vi.fn().mockResolvedValue({
        data: null,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      const result = await staticDataService.getFaqs();

      expect(result).toEqual([]);
    });
  });

  describe("createLocation", () => {
    it("should create location with imageUrl transformation", async () => {
      const locationData = {
        name: "New Location",
        title: "Title",
        imageUrl: "https://example.com/img.jpg",
      };

      const mockCreated = {
        id: 1,
        name: "New Location",
        title: "Title",
        image_url: "https://example.com/img.jpg",
      };

      const mockSingle = vi.fn().mockResolvedValue({
        data: mockCreated,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockInsert = vi.fn().mockReturnValue({ select: mockSelect });
      supabase.from.mockReturnValue({ insert: mockInsert });

      const result = await staticDataService.createLocation(locationData);

      expect(supabase.from).toHaveBeenCalledWith("locations");
      expect(mockInsert).toHaveBeenCalled();
      expect(result).toMatchObject({
        id: 1,
        name: "New Location",
        imageUrl: "https://example.com/img.jpg",
      });
    });

    it("should handle imageUrl fallback to image_url", async () => {
      const locationData = {
        name: "New Location",
        title: "Title",
        image_url: "https://example.com/img2.jpg",
      };

      const mockCreated = {
        id: 1,
        name: "New Location",
        image_url: "https://example.com/img2.jpg",
      };

      const mockSingle = vi.fn().mockResolvedValue({
        data: mockCreated,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockInsert = vi.fn().mockReturnValue({ select: mockSelect });
      supabase.from.mockReturnValue({ insert: mockInsert });

      const result = await staticDataService.createLocation(locationData);

      expect(result.imageUrl).toBe("https://example.com/img2.jpg");
    });

    it("should handle error when creation fails", async () => {
      const mockError = { code: "23505", message: "Duplicate key" };
      const mockSingle = vi.fn().mockResolvedValue({
        data: null,
        error: mockError,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockInsert = vi.fn().mockReturnValue({ select: mockSelect });
      supabase.from.mockReturnValue({ insert: mockInsert });

      await expect(
        staticDataService.createLocation({ name: "Test" })
      ).rejects.toEqual(mockError);
    });
  });

  describe("updateLocation", () => {
    it("should update location with all fields", async () => {
      const locationData = {
        name: "Updated Location",
        title: "Updated Title",
        imageUrl: "https://example.com/new.jpg",
      };

      const mockUpdated = {
        id: 1,
        name: "Updated Location",
        title: "Updated Title",
        image_url: "https://example.com/new.jpg",
      };

      const mockSingle = vi.fn().mockResolvedValue({
        data: mockUpdated,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockUpdate = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ update: mockUpdate });

      const result = await staticDataService.updateLocation(1, locationData);

      expect(supabase.from).toHaveBeenCalledWith("locations");
      expect(mockUpdate).toHaveBeenCalled();
      expect(result).toMatchObject({
        id: 1,
        name: "Updated Location",
        imageUrl: "https://example.com/new.jpg",
      });
    });

    it("should handle error when update fails", async () => {
      const mockError = { code: "PGRST116", message: "Not found" };
      const mockSingle = vi.fn().mockResolvedValue({
        data: null,
        error: mockError,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockUpdate = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ update: mockUpdate });

      await expect(
        staticDataService.updateLocation(1, { name: "Test" })
      ).rejects.toEqual(mockError);
    });

    it("should handle imageUrl fallback to image_url", async () => {
      const locationData = {
        image_url: "https://example.com/fallback.jpg",
      };

      const mockUpdated = {
        id: 1,
        image_url: "https://example.com/fallback.jpg",
      };
      const mockSingle = vi.fn().mockResolvedValue({
        data: mockUpdated,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockUpdate = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ update: mockUpdate });

      const result = await staticDataService.updateLocation(1, locationData);

      expect(result.imageUrl).toBe("https://example.com/fallback.jpg");
    });
  });

  describe("deleteLocation", () => {
    it("should delete location successfully", async () => {
      const mockSelect = vi.fn().mockResolvedValue({
        data: [{ id: 1 }],
        error: null,
      });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockDelete = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ delete: mockDelete });

      const result = await staticDataService.deleteLocation(1);

      expect(supabase.from).toHaveBeenCalledWith("locations");
      expect(result).toEqual({ success: true });
    });
    it("should handle error when deletion fails", async () => {
      const mockError = { code: "PGRST116", message: "Not found" };
      const mockSelect = vi.fn().mockResolvedValue({
        data: null,
        error: mockError,
      });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockDelete = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ delete: mockDelete });

      await expect(staticDataService.deleteLocation(1)).rejects.toEqual(
        mockError
      );
    });

    it("should throw error when no data returned", async () => {
      const mockSelect = vi.fn().mockResolvedValue({
        data: [],
        error: null,
      });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockDelete = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ delete: mockDelete });

      await expect(staticDataService.deleteLocation(1)).rejects.toThrow(
        "Silinecek kayıt bulunamadı"
      );
    });
  });

  describe("createBoatType", () => {
    it("should create boat type successfully", async () => {
      const boatTypeData = { name: "New Type" };
      const mockCreated = { id: 1, name: "New Type" };

      const mockSingle = vi.fn().mockResolvedValue({
        data: mockCreated,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockInsert = vi.fn().mockReturnValue({ select: mockSelect });
      supabase.from.mockReturnValue({ insert: mockInsert });

      const result = await staticDataService.createBoatType(boatTypeData);

      expect(supabase.from).toHaveBeenCalledWith("boat_types");
      expect(result).toEqual(mockCreated);
    });

    it("should handle error when creation fails", async () => {
      const mockError = { code: "23505", message: "Duplicate key" };
      const mockSingle = vi.fn().mockResolvedValue({
        data: null,
        error: mockError,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockInsert = vi.fn().mockReturnValue({ select: mockSelect });
      supabase.from.mockReturnValue({ insert: mockInsert });

      await expect(
        staticDataService.createBoatType({ name: "Test" })
      ).rejects.toEqual(mockError);
    });
  });

  describe("updateBoatType", () => {
    it("should update boat type successfully", async () => {
      const boatTypeData = { name: "Updated Type" };
      const mockUpdated = { id: 1, name: "Updated Type" };

      const mockSingle = vi.fn().mockResolvedValue({
        data: mockUpdated,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockUpdate = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ update: mockUpdate });

      const result = await staticDataService.updateBoatType(1, boatTypeData);

      expect(result).toEqual(mockUpdated);
    });
    it("should handle error when update fails", async () => {
      const mockError = { code: "PGRST116", message: "Not found" };
      const mockSingle = vi.fn().mockResolvedValue({
        data: null,
        error: mockError,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockUpdate = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ update: mockUpdate });

      await expect(
        staticDataService.updateBoatType(1, { name: "Test" })
      ).rejects.toEqual(mockError);
    });
  });

  describe("deleteBoatType", () => {
    it("should delete boat type successfully", async () => {
      const mockSelect = vi.fn().mockResolvedValue({
        data: [{ id: 1 }],
        error: null,
      });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockDelete = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ delete: mockDelete });

      const result = await staticDataService.deleteBoatType(1);

      expect(result).toEqual({ success: true });
    });
    it("should throw error when no data returned", async () => {
      const mockSelect = vi.fn().mockResolvedValue({
        data: [],
        error: null,
      });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockDelete = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ delete: mockDelete });

      await expect(staticDataService.deleteBoatType(1)).rejects.toThrow(
        "Silinecek kayıt bulunamadı"
      );
    });

    it("should handle error when deletion fails", async () => {
      const mockError = { code: "PGRST116", message: "Not found" };
      const mockSelect = vi.fn().mockResolvedValue({
        data: null,
        error: mockError,
      });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockDelete = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ delete: mockDelete });

      await expect(staticDataService.deleteBoatType(1)).rejects.toEqual(
        mockError
      );
    });
  });

  describe("createAmenity", () => {
    it("should create amenity successfully", async () => {
      const amenityData = { name: "New Amenity" };
      const mockCreated = { id: 1, name: "New Amenity" };

      const mockSingle = vi.fn().mockResolvedValue({
        data: mockCreated,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockInsert = vi.fn().mockReturnValue({ select: mockSelect });
      supabase.from.mockReturnValue({ insert: mockInsert });

      const result = await staticDataService.createAmenity(amenityData);

      expect(supabase.from).toHaveBeenCalledWith("amenities");
      expect(result).toEqual(mockCreated);
    });
    it("should handle error when creation fails", async () => {
      const mockError = { code: "23505", message: "Duplicate key" };
      const mockSingle = vi.fn().mockResolvedValue({
        data: null,
        error: mockError,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockInsert = vi.fn().mockReturnValue({ select: mockSelect });
      supabase.from.mockReturnValue({ insert: mockInsert });

      await expect(
        staticDataService.createAmenity({ name: "Test" })
      ).rejects.toEqual(mockError);
    });
  });

  describe("updateAmenity", () => {
    it("should update amenity successfully", async () => {
      const amenityData = { name: "Updated Amenity" };
      const mockUpdated = { id: 1, name: "Updated Amenity" };

      const mockSingle = vi.fn().mockResolvedValue({
        data: mockUpdated,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockUpdate = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ update: mockUpdate });

      const result = await staticDataService.updateAmenity(1, amenityData);

      expect(result).toEqual(mockUpdated);
    });
    it("should handle error when update fails", async () => {
      const mockError = { code: "PGRST116", message: "Not found" };
      const mockSingle = vi.fn().mockResolvedValue({
        data: null,
        error: mockError,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockUpdate = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ update: mockUpdate });

      await expect(
        staticDataService.updateAmenity(1, { name: "Test" })
      ).rejects.toEqual(mockError);
    });
  });

  describe("deleteAmenity", () => {
    it("should delete amenity successfully", async () => {
      const mockSelect = vi.fn().mockResolvedValue({
        data: [{ id: 1 }],
        error: null,
      });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockDelete = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ delete: mockDelete });

      const result = await staticDataService.deleteAmenity(1);

      expect(result).toEqual({ success: true });
    });
    it("should throw error when no data returned", async () => {
      const mockSelect = vi.fn().mockResolvedValue({
        data: [],
        error: null,
      });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockDelete = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ delete: mockDelete });

      await expect(staticDataService.deleteAmenity(1)).rejects.toThrow(
        "Silinecek kayıt bulunamadı"
      );
    });

    it("should handle error when deletion fails", async () => {
      const mockError = { code: "PGRST116", message: "Not found" };
      const mockSelect = vi.fn().mockResolvedValue({
        data: null,
        error: mockError,
      });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockDelete = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ delete: mockDelete });

      await expect(staticDataService.deleteAmenity(1)).rejects.toEqual(
        mockError
      );
    });
  });

  describe("createCaptain", () => {
    it("should create captain with camelCase fields", async () => {
      const captainData = {
        firstName: "John",
        lastName: "Doe",
        phone: "123456789",
      };

      const mockCreated = {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        phone: "123456789",
      };

      const mockSingle = vi.fn().mockResolvedValue({
        data: mockCreated,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockInsert = vi.fn().mockReturnValue({ select: mockSelect });
      supabase.from.mockReturnValue({ insert: mockInsert });

      const result = await staticDataService.createCaptain(captainData);

      expect(supabase.from).toHaveBeenCalledWith("captains");
      expect(mockInsert).toHaveBeenCalledWith([
        { first_name: "John", last_name: "Doe", phone: "123456789" },
      ]);
      expect(result).toEqual(mockCreated);
    });

    it("should handle error when Supabase returns error", async () => {
      const mockError = { code: "23505", message: "Duplicate key" };
      const mockSingle = vi.fn().mockResolvedValue({
        data: null,
        error: mockError,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockInsert = vi.fn().mockReturnValue({ select: mockSelect });
      supabase.from.mockReturnValue({ insert: mockInsert });

      await expect(
        staticDataService.createCaptain({
          firstName: "Test",
          lastName: "Test",
          phone: "123",
        })
      ).rejects.toEqual(mockError);
    });

    it("should handle error in catch block when promise rejects", async () => {
      const mockError = new Error("Network error");
      const mockSingle = vi.fn().mockRejectedValue(mockError);
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockInsert = vi.fn().mockReturnValue({ select: mockSelect });
      supabase.from.mockReturnValue({ insert: mockInsert });

      await expect(
        staticDataService.createCaptain({
          firstName: "Test",
          lastName: "Test",
          phone: "123",
        })
      ).rejects.toThrow("Network error");
    });

    it("should handle snake_case fields as fallback", async () => {
      const captainData = {
        first_name: "Jane",
        last_name: "Smith",
        phone: "987654321",
      };

      const mockCreated = {
        id: 1,
        first_name: "Jane",
        last_name: "Smith",
        phone: "987654321",
      };

      const mockSingle = vi.fn().mockResolvedValue({
        data: mockCreated,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockInsert = vi.fn().mockReturnValue({ select: mockSelect });
      supabase.from.mockReturnValue({ insert: mockInsert });

      await staticDataService.createCaptain(captainData);

      expect(mockInsert).toHaveBeenCalledWith([
        { first_name: "Jane", last_name: "Smith", phone: "987654321" },
      ]);
    });
  });

  describe("updateCaptain", () => {
    it("should update captain with camelCase fields", async () => {
      const captainData = {
        firstName: "Updated",
        lastName: "Name",
        phone: "111",
      };

      const mockUpdated = {
        id: 1,
        first_name: "Updated",
        last_name: "Name",
        phone: "111",
      };

      const mockSingle = vi.fn().mockResolvedValue({
        data: mockUpdated,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockUpdate = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ update: mockUpdate });

      const result = await staticDataService.updateCaptain(1, captainData);

      expect(result).toEqual(mockUpdated);
    });

    it("should handle firstName with only snake_case", async () => {
      const captainData = {
        first_name: "OnlySnake",
      };

      const mockUpdated = {
        id: 1,
        first_name: "OnlySnake",
      };

      const mockSingle = vi.fn().mockResolvedValue({
        data: mockUpdated,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockUpdate = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ update: mockUpdate });

      await staticDataService.updateCaptain(1, captainData);

      const updateCall = mockUpdate.mock.calls[0][0];
      expect(updateCall.first_name).toBe("OnlySnake");
    });

    it("should handle lastName with only snake_case", async () => {
      const captainData = {
        last_name: "OnlySnake",
      };

      const mockUpdated = {
        id: 1,
        last_name: "OnlySnake",
      };

      const mockSingle = vi.fn().mockResolvedValue({
        data: mockUpdated,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockUpdate = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ update: mockUpdate });

      await staticDataService.updateCaptain(1, captainData);

      const updateCall = mockUpdate.mock.calls[0][0];
      expect(updateCall.last_name).toBe("OnlySnake");
    });

    it("should handle error when update fails", async () => {
      const mockError = { code: "PGRST116", message: "Not found" };
      const mockSingle = vi.fn().mockResolvedValue({
        data: null,
        error: mockError,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockUpdate = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ update: mockUpdate });

      await expect(
        staticDataService.updateCaptain(1, { firstName: "Test" })
      ).rejects.toEqual(mockError);
    });

    it("should handle snake_case fields as fallback", async () => {
      const captainData = {
        first_name: "Fallback",
        last_name: "Name",
      };

      const mockUpdated = {
        id: 1,
        first_name: "Fallback",
        last_name: "Name",
      };

      const mockSingle = vi.fn().mockResolvedValue({
        data: mockUpdated,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockUpdate = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ update: mockUpdate });

      await staticDataService.updateCaptain(1, captainData);

      const updateCall = mockUpdate.mock.calls[0][0];
      expect(updateCall.first_name).toBe("Fallback");
      expect(updateCall.last_name).toBe("Name");
    });
  });

  describe("deleteCaptain", () => {
    it("should delete captain successfully", async () => {
      const mockSelect = vi.fn().mockResolvedValue({
        data: [{ id: 1 }],
        error: null,
      });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockDelete = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ delete: mockDelete });

      const result = await staticDataService.deleteCaptain(1);

      expect(result).toEqual({ success: true });
    });

    it("should throw error when no data returned", async () => {
      const mockSelect = vi.fn().mockResolvedValue({
        data: [],
        error: null,
      });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockDelete = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ delete: mockDelete });

      await expect(staticDataService.deleteCaptain(1)).rejects.toThrow(
        "Silinecek kayıt bulunamadı"
      );
    });

    it("should handle error when deletion fails", async () => {
      const mockError = { code: "PGRST116", message: "Not found" };
      const mockSelect = vi.fn().mockResolvedValue({
        data: null,
        error: mockError,
      });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockDelete = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ delete: mockDelete });

      await expect(staticDataService.deleteCaptain(1)).rejects.toEqual(
        mockError
      );
    });
  });

  describe("createBoatOwner", () => {
    it("should create boat owner with camelCase fields", async () => {
      const ownerData = {
        firstName: "Owner",
        lastName: "One",
        phone: "555",
      };

      const mockCreated = {
        id: 1,
        first_name: "Owner",
        last_name: "One",
        phone: "555",
      };

      const mockSingle = vi.fn().mockResolvedValue({
        data: mockCreated,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockInsert = vi.fn().mockReturnValue({ select: mockSelect });
      supabase.from.mockReturnValue({ insert: mockInsert });

      const result = await staticDataService.createBoatOwner(ownerData);

      expect(result).toEqual(mockCreated);
    });

    it("should handle snake_case fields as primary (when firstName/lastName not provided)", async () => {
      const ownerData = {
        first_name: "SnakeFirst",
        last_name: "SnakeLast",
        phone: "555",
      };

      const mockCreated = {
        id: 1,
        first_name: "SnakeFirst",
        last_name: "SnakeLast",
        phone: "555",
      };

      const mockSingle = vi.fn().mockResolvedValue({
        data: mockCreated,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockInsert = vi.fn().mockReturnValue({ select: mockSelect });
      supabase.from.mockReturnValue({ insert: mockInsert });

      await staticDataService.createBoatOwner(ownerData);

      expect(mockInsert).toHaveBeenCalledWith([
        { first_name: "SnakeFirst", last_name: "SnakeLast", phone: "555" },
      ]);
    });

    it("should handle error when Supabase returns error", async () => {
      const mockError = { code: "23505", message: "Duplicate key" };
      const mockSingle = vi.fn().mockResolvedValue({
        data: null,
        error: mockError,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockInsert = vi.fn().mockReturnValue({ select: mockSelect });
      supabase.from.mockReturnValue({ insert: mockInsert });

      await expect(
        staticDataService.createBoatOwner({
          firstName: "Test",
          lastName: "Test",
          phone: "123",
        })
      ).rejects.toEqual(mockError);
    });

    it("should handle error in catch block when promise rejects", async () => {
      const mockError = new Error("Network error");
      const mockSingle = vi.fn().mockRejectedValue(mockError);
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockInsert = vi.fn().mockReturnValue({ select: mockSelect });
      supabase.from.mockReturnValue({ insert: mockInsert });

      await expect(
        staticDataService.createBoatOwner({
          firstName: "Test",
          lastName: "Test",
          phone: "123",
        })
      ).rejects.toThrow("Network error");
    });
  });

  describe("updateBoatOwner", () => {
    it("should update boat owner successfully", async () => {
      const ownerData = {
        firstName: "Updated",
        lastName: "Owner",
        phone: "999",
      };

      const mockUpdated = {
        id: 1,
        first_name: "Updated",
        last_name: "Owner",
        phone: "999",
      };

      const mockSingle = vi.fn().mockResolvedValue({
        data: mockUpdated,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockUpdate = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ update: mockUpdate });

      const result = await staticDataService.updateBoatOwner(1, ownerData);

      expect(result).toEqual(mockUpdated);
    });

    it("should handle firstName with only snake_case (firstName undefined)", async () => {
      const ownerData = {
        first_name: "OnlySnakeFirstName",
      };

      const mockUpdated = {
        id: 1,
        first_name: "OnlySnakeFirstName",
      };

      const mockSingle = vi.fn().mockResolvedValue({
        data: mockUpdated,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockUpdate = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ update: mockUpdate });

      await staticDataService.updateBoatOwner(1, ownerData);

      const updateCall = mockUpdate.mock.calls[0][0];
      expect(updateCall.first_name).toBe("OnlySnakeFirstName");
    });

    it("should handle lastName with snake_case fallback", async () => {
      const ownerData = {
        last_name: "SnakeCase",
      };

      const mockUpdated = {
        id: 1,
        last_name: "SnakeCase",
      };

      const mockSingle = vi.fn().mockResolvedValue({
        data: mockUpdated,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockUpdate = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ update: mockUpdate });

      await staticDataService.updateBoatOwner(1, ownerData);

      const updateCall = mockUpdate.mock.calls[0][0];
      expect(updateCall.last_name).toBe("SnakeCase");
    });

    it("should handle error when update fails", async () => {
      const mockError = { code: "PGRST116", message: "Not found" };
      const mockSingle = vi.fn().mockResolvedValue({
        data: null,
        error: mockError,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockUpdate = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ update: mockUpdate });

      await expect(
        staticDataService.updateBoatOwner(1, { firstName: "Test" })
      ).rejects.toEqual(mockError);
    });
  });

  describe("deleteBoatOwner", () => {
    it("should delete boat owner successfully", async () => {
      const mockSelect = vi.fn().mockResolvedValue({
        data: [{ id: 1 }],
        error: null,
      });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockDelete = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ delete: mockDelete });

      const result = await staticDataService.deleteBoatOwner(1);

      expect(result).toEqual({ success: true });
    });

    it("should throw error when no data returned", async () => {
      const mockSelect = vi.fn().mockResolvedValue({
        data: [],
        error: null,
      });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockDelete = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ delete: mockDelete });

      await expect(staticDataService.deleteBoatOwner(1)).rejects.toThrow(
        "Silinecek kayıt bulunamadı"
      );
    });

    it("should handle error when deletion fails", async () => {
      const mockError = { code: "PGRST116", message: "Not found" };
      const mockSelect = vi.fn().mockResolvedValue({
        data: null,
        error: mockError,
      });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockDelete = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ delete: mockDelete });

      await expect(staticDataService.deleteBoatOwner(1)).rejects.toEqual(
        mockError
      );
    });
  });
});
