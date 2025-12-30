import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import EmptyState from "./EmptyState.jsx";

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("EmptyState", () => {
  it("should render with default title", () => {
    renderWithRouter(<EmptyState />);
    expect(screen.getByText("İçerik bulunamadı")).toBeInTheDocument();
  });

  it("should render with custom title", () => {
    renderWithRouter(<EmptyState title="Özel Başlık" />);
    expect(screen.getByText("Özel Başlık")).toBeInTheDocument();
  });

  it("should render with custom message", () => {
    renderWithRouter(<EmptyState message="Özel mesaj" />);
    expect(screen.getByText("Özel mesaj")).toBeInTheDocument();
  });

  it("should show action link by default", () => {
    renderWithRouter(<EmptyState />);
    const link = screen.getByText("Ana Sayfaya Dön");
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute("href", "/");
  });

  it("should hide action link when showAction is false", () => {
    renderWithRouter(<EmptyState showAction={false} />);
    expect(screen.queryByText("Ana Sayfaya Dön")).not.toBeInTheDocument();
  });

  it("should render with custom action label", () => {
    renderWithRouter(<EmptyState actionLabel="Geri Dön" />);
    expect(screen.getByText("Geri Dön")).toBeInTheDocument();
  });

  it("should render with custom action link", () => {
    renderWithRouter(<EmptyState actionLink="/explore" />);
    const link = screen.getByText("Ana Sayfaya Dön");
    expect(link.closest("a")).toHaveAttribute("href", "/explore");
  });

  it("should render with fullScreen class when fullScreen is true", () => {
    const { container } = renderWithRouter(<EmptyState fullScreen />);
    const wrapper = container.querySelector(".min-h-screen");
    expect(wrapper).toBeInTheDocument();
  });

  it("should render without fullScreen class when fullScreen is false", () => {
    const { container } = renderWithRouter(<EmptyState fullScreen={false} />);
    const wrapper = container.querySelector(".min-h-screen");
    expect(wrapper).not.toBeInTheDocument();
    const paddingWrapper = container.querySelector(".py-12");
    expect(paddingWrapper).toBeInTheDocument();
  });

  it("should not render message when message prop is not provided", () => {
    renderWithRouter(<EmptyState />);
    // Message olmadığında sadece title ve action gösterilir
    expect(screen.getByText("İçerik bulunamadı")).toBeInTheDocument();
    expect(screen.getByText("Ana Sayfaya Dön")).toBeInTheDocument();
  });
});
