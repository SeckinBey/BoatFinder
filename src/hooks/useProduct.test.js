import { describe, it, expect, vi, beforeEach } from "vitest";
import { waitFor } from "@testing-library/react";
import { useProduct } from "./useProduct.js";
import { getProduct } from "../services/productService.js";
import { renderHookWithQuery } from "../test/queryWrapper.jsx";

// Mock dependencies
vi.mock("../services/productService.js", () => ({
  getProduct: vi.fn(),
}));

const mockUseParams = vi.fn(() => ({}));
vi.mock("react-router-dom", () => ({
  useParams: () => mockUseParams(),
}));

describe("useProduct", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseParams.mockReturnValue({}); // Default: no params
  });

  it("should return product when fetch succeeds with id param", async () => {
    const mockProduct = {
      id: 1,
      name: "Test Boat",
      locationId: 1,
      typeId: 1,
    };
    getProduct.mockResolvedValue(mockProduct);

    const { result } = renderHookWithQuery(() => useProduct(1));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.product).toEqual(mockProduct);
    expect(result.current.error).toBeNull();
    expect(getProduct).toHaveBeenCalledWith(1);
  });

  it("should not fetch when id is null", () => {
    mockUseParams.mockReturnValue({ id: undefined });

    const { result } = renderHookWithQuery(() => useProduct());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.product).toBeUndefined();
    expect(getProduct).not.toHaveBeenCalled();
  });

  it("should return error when fetch fails", async () => {
    const mockError = new Error("Product not found");
    getProduct.mockRejectedValue(mockError);

    const { result } = renderHookWithQuery(() => useProduct(999));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe(mockError);
    expect(result.current.product).toBeUndefined();
  });

  it("should parse string id to number", async () => {
    const mockProduct = { id: 123, name: "Test" };
    getProduct.mockResolvedValue(mockProduct);

    const { result } = renderHookWithQuery(() => useProduct("123"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(getProduct).toHaveBeenCalledWith(123);
    expect(result.current.product).toEqual(mockProduct);
  });
});
