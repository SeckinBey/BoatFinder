import { describe, it, expect, vi, beforeEach } from "vitest";
import { waitFor } from "@testing-library/react";
import { useStaticData } from "./useStaticData.js";
import * as staticDataService from "../services/staticDataService.js";
import { renderHookWithQuery } from "../test/queryWrapper.jsx";

vi.mock("../services/staticDataService.js", () => ({
  getLocations: vi.fn(),
  getBoatTypes: vi.fn(),
  getAmenities: vi.fn(),
  getAddons: vi.fn(),
  getFaqs: vi.fn(),
}));

describe("useStaticData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    staticDataService.getLocations.mockResolvedValue([
      { id: 1, name: "Location 1" },
    ]);
    staticDataService.getBoatTypes.mockResolvedValue([
      { id: 1, name: "Type 1" },
    ]);
    staticDataService.getAmenities.mockResolvedValue([
      { id: 1, name: "Amenity 1" },
    ]);
    staticDataService.getAddons.mockResolvedValue([{ id: 1, name: "Addon 1" }]);
    staticDataService.getFaqs.mockResolvedValue([
      { id: 1, question: "Q1", answer: "A1" },
    ]);
  });

  it("should return all static data when all fetches succeed", async () => {
    const { result } = renderHookWithQuery(() => useStaticData());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.locations).toHaveLength(1);
    expect(result.current.boatTypes).toHaveLength(1);
    expect(result.current.amenities).toHaveLength(1);
    expect(result.current.addons).toHaveLength(1);
    expect(result.current.faqs).toHaveLength(1);
    expect(result.current.error).toBeNull();
  });

  it("should return loading state when any fetch is pending", () => {
    staticDataService.getLocations.mockImplementation(
      () => new Promise(() => {})
    );

    const { result } = renderHookWithQuery(() => useStaticData());

    expect(result.current.isLoading).toBe(true);
  });

  it("should return error when any fetch fails", async () => {
    const mockError = new Error("Failed to fetch locations");
    staticDataService.getLocations.mockRejectedValue(mockError);

    const { result } = renderHookWithQuery(() => useStaticData());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe(mockError);
  });

  it("should return empty arrays as defaults", () => {
    staticDataService.getLocations.mockResolvedValue([]);
    staticDataService.getBoatTypes.mockResolvedValue([]);
    staticDataService.getAmenities.mockResolvedValue([]);
    staticDataService.getAddons.mockResolvedValue([]);
    staticDataService.getFaqs.mockResolvedValue([]);

    const { result } = renderHookWithQuery(() => useStaticData());

    // Initially loading, but check defaults
    expect(result.current.locations).toEqual([]);
    expect(result.current.boatTypes).toEqual([]);
  });
});
