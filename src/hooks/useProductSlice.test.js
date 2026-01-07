import { describe, it, expect, vi, beforeEach } from "vitest";
import { waitFor } from "@testing-library/react";
import { useProductSlice } from "./useProductSlice.js";
import { getProducts } from "../services/productService.js";
import { renderHookWithQuery } from "../test/queryWrapper.jsx";

vi.mock("../services/productService.js", () => ({
  getProducts: vi.fn(),
}));

describe("useProductSlice", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return sliced products with default limit", async () => {
    const mockProducts = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `Boat ${i + 1}`,
    }));
    getProducts.mockResolvedValue(mockProducts);

    const { result } = renderHookWithQuery(() => useProductSlice(8));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.products).toHaveLength(8);
    expect(result.current.products[0].id).toBe(1);
    expect(result.current.products[7].id).toBe(8);
  });

  it("should return sliced products with custom limit and offset", async () => {
    const mockProducts = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `Boat ${i + 1}`,
    }));
    getProducts.mockResolvedValue(mockProducts);

    const { result } = renderHookWithQuery(() => useProductSlice(5, 10));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.products).toHaveLength(5);
    expect(result.current.products[0].id).toBe(11);
    expect(result.current.products[4].id).toBe(15);
  });

  it("should return empty array when no products", async () => {
    getProducts.mockResolvedValue([]);

    const { result } = renderHookWithQuery(() => useProductSlice(8));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.products).toEqual([]);
  });

  it("should handle error state", async () => {
    const mockError = new Error("Failed to fetch");
    getProducts.mockRejectedValue(mockError);

    const { result } = renderHookWithQuery(() => useProductSlice(8));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe(mockError);
    expect(result.current.products).toEqual([]);
  });
});
