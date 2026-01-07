// src/services/productService.test.js
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as productService from "./productService.js";
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
  getUserFriendlyErrorMessage: vi.fn((error) => error.message),
}));

describe("productService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getProducts", () => {
    it("should return transformed products when fetch succeeds", async () => {
      const mockBoats = [
        {
          id: 1,
          name: "Boat 1",
          location_id: 1,
          type_id: 2,
          captain_id: 3,
          owner_id: 4,
          cabin_count: 2,
          person_capacity: 8,
          travel_capacity: 6,
          duration_type: "Günlük",
          amenity_ids: [1, 2],
          locations: { id: 1, name: "Location 1" },
          boat_types: { id: 2, name: "Type 1" },
          captains: { id: 3, name: "Captain 1" },
          boat_owners: { id: 4, name: "Owner 1" },
        },
      ];

      const mockOrder = vi.fn().mockResolvedValue({
        data: mockBoats,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      const result = await productService.getProducts();

      expect(supabase.from).toHaveBeenCalledWith("boats");
      expect(mockSelect).toHaveBeenCalled();
      expect(mockOrder).toHaveBeenCalledWith("id", { ascending: true });
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        id: 1,
        name: "Boat 1",
        locationId: 1,
        typeId: 2,
        captainId: 3,
        ownerId: 4,
        cabinCount: 2,
        personCapacity: 8,
        travelCapacity: 6,
        durationType: "Günlük",
        amenityIds: [1, 2],
        location: mockBoats[0].locations,
        type: mockBoats[0].boat_types,
        captain: mockBoats[0].captains,
        owner: mockBoats[0].boat_owners,
      });
    });

    it("should return empty array when data is null", async () => {
      const mockOrder = vi.fn().mockResolvedValue({
        data: null,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      const result = await productService.getProducts();

      expect(result).toEqual([]);
    });

    it("should throw error when Supabase returns error", async () => {
      const mockError = { code: "PGRST116", message: "Error" };
      const mockOrder = vi.fn().mockResolvedValue({
        data: null,
        error: mockError,
      });
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      await expect(productService.getProducts()).rejects.toEqual(mockError);
    });

    it("should handle error in catch block", async () => {
      const mockError = new Error("Network error");
      const mockOrder = vi.fn().mockRejectedValue(mockError);
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      await expect(productService.getProducts()).rejects.toThrow(
        "Network error"
      );
    });
    it("should handle null amenity_ids", async () => {
      const mockBoats = [
        {
          id: 1,
          name: "Boat 1",
          location_id: 1,
          type_id: 2,
          amenity_ids: null, // null test
          locations: { id: 1, name: "Location 1" },
        },
      ];

      const mockOrder = vi.fn().mockResolvedValue({
        data: mockBoats,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      const result = await productService.getProducts();

      expect(result[0].amenityIds).toEqual([]);
    });

    it("should handle undefined amenity_ids", async () => {
      const mockBoats = [
        {
          id: 1,
          name: "Boat 1",
          location_id: 1,
          type_id: 2,
          // amenity_ids undefined
          locations: { id: 1, name: "Location 1" },
        },
      ];

      const mockOrder = vi.fn().mockResolvedValue({
        data: mockBoats,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
      supabase.from.mockReturnValue({ select: mockSelect });

      const result = await productService.getProducts();

      expect(result[0].amenityIds).toEqual([]);
    });
  });

  describe("getProduct", () => {
    it("should return transformed product when found", async () => {
      const mockBoat = {
        id: 1,
        name: "Boat 1",
        location_id: 1,
        type_id: 2,
        captain_id: 3,
        owner_id: 4,
        cabin_count: 2,
        person_capacity: 8,
        travel_capacity: 6,
        duration_type: "Günlük",
        amenity_ids: [1, 2],
        locations: { id: 1, name: "Location 1" },
        boat_types: { id: 2, name: "Type 1" },
        captains: { id: 3, name: "Captain 1" },
        boat_owners: { id: 4, name: "Owner 1" },
      };

      const mockSingle = vi.fn().mockResolvedValue({
        data: mockBoat,
        error: null,
      });
      const mockEq = vi.fn().mockReturnValue({ single: mockSingle });
      const mockSelect = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ select: mockSelect });

      const result = await productService.getProduct(1);

      expect(supabase.from).toHaveBeenCalledWith("boats");
      expect(mockEq).toHaveBeenCalledWith("id", 1);
      expect(mockSingle).toHaveBeenCalled();
      expect(result).toMatchObject({
        id: 1,
        name: "Boat 1",
        locationId: 1,
        typeId: 2,
      });
    });

    it("should return null when product not found (PGRST116)", async () => {
      const mockSingle = vi.fn().mockResolvedValue({
        data: null,
        error: { code: "PGRST116", message: "No rows returned" },
      });
      const mockEq = vi.fn().mockReturnValue({ single: mockSingle });
      const mockSelect = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ select: mockSelect });

      const result = await productService.getProduct(999);

      expect(result).toBeNull();
    });

    it("should throw error for non-PGRST116 errors", async () => {
      const mockError = { code: "OTHER", message: "Other error" };
      const mockSingle = vi.fn().mockResolvedValue({
        data: null,
        error: mockError,
      });
      const mockEq = vi.fn().mockReturnValue({ single: mockSingle });
      const mockSelect = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ select: mockSelect });

      await expect(productService.getProduct(1)).rejects.toEqual(mockError);
    });

    it("should return null when data is null and no error", async () => {
      const mockSingle = vi.fn().mockResolvedValue({
        data: null,
        error: null,
      });
      const mockEq = vi.fn().mockReturnValue({ single: mockSingle });
      const mockSelect = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ select: mockSelect });

      const result = await productService.getProduct(1);

      expect(result).toBeNull();
    });
    it("should handle null amenity_ids", async () => {
      const mockBoat = {
        id: 1,
        name: "Boat 1",
        location_id: 1,
        amenity_ids: null,
        locations: { id: 1 },
      };

      const mockSingle = vi.fn().mockResolvedValue({
        data: mockBoat,
        error: null,
      });
      const mockEq = vi.fn().mockReturnValue({ single: mockSingle });
      const mockSelect = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ select: mockSelect });

      const result = await productService.getProduct(1);

      expect(result.amenityIds).toEqual([]);
    });
  });

  describe("createProduct", () => {
    it("should create and return product with transformed data", async () => {
      const productData = {
        name: "New Boat",
        typeId: 1,
        title: "Title",
        images: ["image1.jpg"],
        durationType: "Günlük",
        captainId: 1,
        ownerId: 1,
        locationId: 1,
        cabinCount: 2,
        personCapacity: 8,
        travelCapacity: 6,
        length: 10,
        details: "Details",
        amenityIds: [1, 2],
        price: 1000,
        discount: 100,
        url: "url",
      };

      const mockCreated = { id: 1, name: "New Boat" };
      const mockSingle = vi.fn().mockResolvedValue({
        data: mockCreated,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockInsert = vi.fn().mockReturnValue({ select: mockSelect });
      supabase.from.mockReturnValue({ insert: mockInsert });

      const result = await productService.createProduct(productData);

      expect(supabase.from).toHaveBeenCalledWith("boats");
      expect(mockInsert).toHaveBeenCalled();
      expect(mockSelect).toHaveBeenCalled();
      expect(mockSingle).toHaveBeenCalled();
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
        productService.createProduct({ name: "Test" })
      ).rejects.toEqual(mockError);
    });
  });

  describe("deleteProduct", () => {
    it("should delete product successfully", async () => {
      const mockSelect = vi.fn().mockResolvedValue({
        data: [{ id: 1 }],
        error: null,
      });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockDelete = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ delete: mockDelete });

      const result = await productService.deleteProduct(1);

      expect(supabase.from).toHaveBeenCalledWith("boats");
      expect(mockDelete).toHaveBeenCalled();
      expect(mockEq).toHaveBeenCalledWith("id", 1);
      expect(mockSelect).toHaveBeenCalled();
      expect(result).toEqual({ success: true });
    });

    it("should handle error without message property", async () => {
      const mockError = { code: "UNKNOWN" }; // message yok
      const mockSelect = vi.fn().mockResolvedValue({
        data: null,
        error: mockError,
      });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockDelete = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ delete: mockDelete });

      await expect(productService.deleteProduct(1)).rejects.toThrow();
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

      // deleteProduct throws an Error object, not the raw error
      await expect(productService.deleteProduct(1)).rejects.toThrow();
    });

    it("should handle error without message and code", async () => {
      const mockError = {}; // Ne message ne code var
      const mockSelect = vi.fn().mockResolvedValue({
        data: null,
        error: mockError,
      });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockDelete = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ delete: mockDelete });

      await expect(productService.deleteProduct(1)).rejects.toThrow(
        "Silme işlemi başarısız: Bilinmeyen hata"
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

      await expect(productService.deleteProduct(1)).rejects.toThrow(
        "Silinecek kayıt bulunamadı"
      );
    });
  });

  describe("updateProduct", () => {
    it("should update and return product with all fields", async () => {
      const productData = {
        name: "Updated Boat",
        typeId: 2,
        title: "Updated Title",
        images: ["image1.jpg", "image2.jpg"],
        durationType: "Saatlik",
        captainId: 2,
        ownerId: 2,
        locationId: 2,
        cabinCount: 3,
        personCapacity: 10,
        travelCapacity: 8,
        length: 15,
        details: "Updated details",
        amenityIds: [1, 2, 3],
        price: 1500,
        discount: 200,
        url: "updated-url",
      };

      const mockUpdated = { id: 1, ...productData };
      const mockSingle = vi.fn().mockResolvedValue({
        data: mockUpdated,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockUpdate = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ update: mockUpdate });

      const result = await productService.updateProduct(1, productData);

      expect(supabase.from).toHaveBeenCalledWith("boats");
      expect(mockUpdate).toHaveBeenCalled();
      expect(mockEq).toHaveBeenCalledWith("id", 1);
      expect(mockSelect).toHaveBeenCalled();
      expect(mockSingle).toHaveBeenCalled();
      expect(result).toEqual(mockUpdated);

      // Verify that update was called with correct transformed data
      const updateCall = mockUpdate.mock.calls[0][0];
      expect(updateCall).toMatchObject({
        name: productData.name,
        type_id: productData.typeId,
        title: productData.title,
        images: productData.images,
        duration_type: productData.durationType,
        captain_id: productData.captainId,
        owner_id: productData.ownerId,
        location_id: productData.locationId,
        cabin_count: productData.cabinCount,
        person_capacity: productData.personCapacity,
        travel_capacity: productData.travelCapacity,
        length: productData.length,
        details: productData.details,
        amenity_ids: productData.amenityIds,
        price: productData.price,
        discount: productData.discount,
        url: productData.url,
      });
      expect(updateCall.updated_at).toBeDefined();
    });

    it("should update and return product with partial fields", async () => {
      const productData = {
        name: "Updated Boat",
        price: 1500,
      };

      const mockUpdated = { id: 1, ...productData };
      const mockSingle = vi.fn().mockResolvedValue({
        data: mockUpdated,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockUpdate = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ update: mockUpdate });

      const result = await productService.updateProduct(1, productData);

      expect(supabase.from).toHaveBeenCalledWith("boats");
      expect(mockUpdate).toHaveBeenCalled();
      expect(mockEq).toHaveBeenCalledWith("id", 1);
      expect(mockSelect).toHaveBeenCalled();
      expect(mockSingle).toHaveBeenCalled();
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
        productService.updateProduct(1, { name: "Test" })
      ).rejects.toEqual(mockError);
    });
    it("should not include undefined fields in update", async () => {
      const productData = {
        name: "Updated Boat",
        // typeId, title, etc. undefined - bunlar eklenmemeli
      };

      const mockUpdated = { id: 1, name: "Updated Boat" };
      const mockSingle = vi.fn().mockResolvedValue({
        data: mockUpdated,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockUpdate = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ update: mockUpdate });

      await productService.updateProduct(1, productData);

      const updateCall = mockUpdate.mock.calls[0][0];
      expect(updateCall.name).toBe("Updated Boat");
      expect(updateCall.type_id).toBeUndefined();
      expect(updateCall.title).toBeUndefined();
      expect(updateCall.updated_at).toBeDefined();
    });
    it("should handle empty productData object (all fields undefined)", async () => {
      const productData = {}; // Tüm field'lar undefined

      const mockUpdated = { id: 1 };
      const mockSingle = vi.fn().mockResolvedValue({
        data: mockUpdated,
        error: null,
      });
      const mockSelect = vi.fn().mockReturnValue({ single: mockSingle });
      const mockEq = vi.fn().mockReturnValue({ select: mockSelect });
      const mockUpdate = vi.fn().mockReturnValue({ eq: mockEq });
      supabase.from.mockReturnValue({ update: mockUpdate });

      const result = await productService.updateProduct(1, productData);

      const updateCall = mockUpdate.mock.calls[0][0];
      // Sadece updated_at olmalı, diğer field'lar undefined olduğu için eklenmemeli
      expect(updateCall.name).toBeUndefined();
      expect(updateCall.updated_at).toBeDefined();
      expect(result).toEqual(mockUpdated);
    });
  });
});
