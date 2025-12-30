import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// Jest-dom matchers'ı ekle
expect.extend(matchers);

// Her test sonrası cleanup
afterEach(() => {
  cleanup();
});
