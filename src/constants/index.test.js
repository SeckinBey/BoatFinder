import { describe, it, expect } from "vitest";
import { getProductDetailRoute, getAdminProductEditRoute } from "./index.js";

describe("constants route helpers", () => {
  it("getProductDetailRoute should build product detail route", () => {
    expect(getProductDetailRoute(123)).toBe("/product/123");
    expect(getProductDetailRoute("abc")).toBe("/product/abc");
  });

  it("getAdminProductEditRoute should build admin product edit route", () => {
    expect(getAdminProductEditRoute(7)).toBe("/admin/products/edit/7");
    expect(getAdminProductEditRoute("xyz")).toBe("/admin/products/edit/xyz");
  });
});




