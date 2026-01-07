import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ErrorMessage from "./ErrorMessage.jsx";

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("ErrorMessage", () => {
  it("should render with default title and message", () => {
    renderWithRouter(<ErrorMessage />);
    expect(screen.getByText("Hata oluştu")).toBeInTheDocument();
    expect(screen.getByText("Bir hata oluştu")).toBeInTheDocument();
  });

  it("should render with custom title", () => {
    renderWithRouter(<ErrorMessage title="Özel Başlık" />);
    expect(screen.getByText("Özel Başlık")).toBeInTheDocument();
  });

  it("should render error message from error object", () => {
    const error = new Error("Test hata mesajı");
    renderWithRouter(<ErrorMessage error={error} />);
    expect(screen.getByText("Test hata mesajı")).toBeInTheDocument();
  });

  it("should render custom message prop over error message", () => {
    const error = new Error("Error message");
    renderWithRouter(<ErrorMessage error={error} message="Custom message" />);
    expect(screen.getByText("Custom message")).toBeInTheDocument();
    expect(screen.queryByText("Error message")).not.toBeInTheDocument();
  });

  it("should show home link by default", () => {
    renderWithRouter(<ErrorMessage />);
    const link = screen.getByText("Ana Sayfaya Dön");
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute("href", "/");
  });

  it("should hide home link when showHomeLink is false", () => {
    renderWithRouter(<ErrorMessage showHomeLink={false} />);
    expect(screen.queryByText("Ana Sayfaya Dön")).not.toBeInTheDocument();
  });

  it("should render with fullScreen class when fullScreen is true", () => {
    const { container } = renderWithRouter(<ErrorMessage fullScreen />);
    const wrapper = container.querySelector(".min-h-screen");
    expect(wrapper).toBeInTheDocument();
  });

  it("should render without fullScreen class when fullScreen is false", () => {
    const { container } = renderWithRouter(<ErrorMessage fullScreen={false} />);
    const wrapper = container.querySelector(".min-h-screen");
    expect(wrapper).not.toBeInTheDocument();
    const paddingWrapper = container.querySelector(".py-12");
    expect(paddingWrapper).toBeInTheDocument();
  });

  it("should handle error without message property", () => {
    const error = { code: "TEST_ERROR" };
    renderWithRouter(<ErrorMessage error={error} />);
    expect(screen.getByText("Bir hata oluştu")).toBeInTheDocument();
  });
});
