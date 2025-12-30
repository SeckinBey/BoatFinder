import { describe, it, expect, vi, beforeEach } from "vitest";
import { waitFor } from "@testing-library/react";
import { useProducts } from "./useProducts.js";
import { getProducts } from "../services/productService.js";
import { renderHookWithQuery } from "../test/queryWrapper.jsx";

// Mock productService
vi.mock("../services/productService.js", () => ({
  getProducts: vi.fn(),
}));

describe("useProducts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return products when fetch succeeds", async () => {
    const mockProducts = [
      { id: 1, name: "Boat 1", locationId: 1 },
      { id: 2, name: "Boat 2", locationId: 2 },
    ];
    getProducts.mockResolvedValue(mockProducts);

    const { result } = renderHookWithQuery(() => useProducts());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.error).toBeNull();
    expect(getProducts).toHaveBeenCalledTimes(1);
  });

  it("should return loading state initially", () => {
    getProducts.mockImplementation(() => new Promise(() => {})); // Never resolves

    const { result } = renderHookWithQuery(() => useProducts());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.products).toEqual([]);
  });

  it("should return error when fetch fails", async () => {
    const mockError = new Error("Failed to fetch products");
    getProducts.mockRejectedValue(mockError);

    const { result } = renderHookWithQuery(() => useProducts());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe(mockError);
    expect(result.current.products).toEqual([]);
  });

  it("should return empty array when data is null", async () => {
    getProducts.mockResolvedValue(null);

    const { result } = renderHookWithQuery(() => useProducts());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.products).toEqual([]);
  });
});
