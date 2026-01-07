import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LoadingSpinner from "./LoadingSpinner.jsx";

describe("LoadingSpinner", () => {
  it("should render with default message", () => {
    render(<LoadingSpinner />);
    expect(screen.getByText("Yükleniyor...")).toBeInTheDocument();
  });

  it("should render with custom message", () => {
    render(<LoadingSpinner message="Özel mesaj" />);
    expect(screen.getByText("Özel mesaj")).toBeInTheDocument();
  });

  it("should render with medium size by default", () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.querySelector(".h-12.w-12");
    expect(spinner).toBeInTheDocument();
  });

  it("should render with small size", () => {
    const { container } = render(<LoadingSpinner size="sm" />);
    const spinner = container.querySelector(".h-8.w-8");
    expect(spinner).toBeInTheDocument();
  });

  it("should render with large size", () => {
    const { container } = render(<LoadingSpinner size="lg" />);
    const spinner = container.querySelector(".h-16.w-16");
    expect(spinner).toBeInTheDocument();
  });

  it("should render with fullScreen class when fullScreen is true", () => {
    const { container } = render(<LoadingSpinner fullScreen />);
    const wrapper = container.querySelector(".min-h-screen");
    expect(wrapper).toBeInTheDocument();
  });

  it("should render without fullScreen class when fullScreen is false", () => {
    const { container } = render(<LoadingSpinner fullScreen={false} />);
    const wrapper = container.querySelector(".min-h-screen");
    expect(wrapper).not.toBeInTheDocument();
    const paddingWrapper = container.querySelector(".py-12");
    expect(paddingWrapper).toBeInTheDocument();
  });

  it("should have animate-spin class on spinner", () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });
});
