import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import DataWrapper from "./DataWrapper.jsx";

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("DataWrapper", () => {
  it("should render LoadingSpinner when isLoading is true", () => {
    renderWithRouter(
      <DataWrapper isLoading={true} data={[]} error={null}>
        <div>Content</div>
      </DataWrapper>
    );

    // LoadingSpinner renders default message
    expect(screen.getByText("Yükleniyor...")).toBeInTheDocument();
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("should render ErrorMessage when error exists", () => {
    const error = new Error("Test error");
    renderWithRouter(
      <DataWrapper isLoading={false} data={[]} error={error}>
        <div>Content</div>
      </DataWrapper>
    );

    expect(screen.getByText("Test error")).toBeInTheDocument();
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("should render EmptyState when data is null", () => {
    renderWithRouter(
      <DataWrapper isLoading={false} data={null} error={null}>
        <div>Content</div>
      </DataWrapper>
    );

    expect(
      screen.getByRole("heading", { name: "İçerik bulunamadı" })
    ).toBeInTheDocument();
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("should render EmptyState when data is undefined", () => {
    renderWithRouter(
      <DataWrapper isLoading={false} data={undefined} error={null}>
        <div>Content</div>
      </DataWrapper>
    );

    expect(
      screen.getByRole("heading", { name: "İçerik bulunamadı" })
    ).toBeInTheDocument();
  });

  it("should render EmptyState when data is empty array", () => {
    renderWithRouter(
      <DataWrapper isLoading={false} data={[]} error={null}>
        <div>Content</div>
      </DataWrapper>
    );

    expect(
      screen.getByRole("heading", { name: "İçerik bulunamadı" })
    ).toBeInTheDocument();
  });

  it("should render children when data exists", () => {
    const data = [1, 2, 3];
    renderWithRouter(
      <DataWrapper isLoading={false} data={data} error={null}>
        <div data-testid="content">Content</div>
      </DataWrapper>
    );

    expect(screen.getByTestId("content")).toBeInTheDocument();
    expect(screen.queryByText("Yükleniyor...")).not.toBeInTheDocument();
    expect(screen.queryByText("İçerik bulunamadı")).not.toBeInTheDocument();
  });

  it("should pass loadingProps to LoadingSpinner", () => {
    const loadingProps = { message: "Loading data..." };
    renderWithRouter(
      <DataWrapper
        isLoading={true}
        data={[]}
        error={null}
        loadingProps={loadingProps}
      >
        <div>Content</div>
      </DataWrapper>
    );

    expect(screen.getByText("Loading data...")).toBeInTheDocument();
  });

  it("should pass errorProps to ErrorMessage", () => {
    const error = new Error("Test error");
    const errorProps = { title: "Custom Error" };
    renderWithRouter(
      <DataWrapper
        isLoading={false}
        data={[]}
        error={error}
        errorProps={errorProps}
      >
        <div>Content</div>
      </DataWrapper>
    );

    expect(screen.getByText("Custom Error")).toBeInTheDocument();
  });

  it("should pass emptyProps and emptyMessage to EmptyState", () => {
    const emptyProps = { title: "Custom Empty" };
    const emptyMessage = "No data found";
    renderWithRouter(
      <DataWrapper
        isLoading={false}
        data={[]}
        error={null}
        emptyProps={emptyProps}
        emptyMessage={emptyMessage}
      >
        <div>Content</div>
      </DataWrapper>
    );

    expect(screen.getByText("Custom Empty")).toBeInTheDocument();
    expect(screen.getByText("No data found")).toBeInTheDocument();
  });

  it("should prioritize loading over error", () => {
    const error = new Error("Test error");
    renderWithRouter(
      <DataWrapper isLoading={true} data={[]} error={error}>
        <div>Content</div>
      </DataWrapper>
    );

    expect(screen.getByText("Yükleniyor...")).toBeInTheDocument();
    expect(screen.queryByText("Test error")).not.toBeInTheDocument();
  });

  it("should prioritize loading over empty state", () => {
    renderWithRouter(
      <DataWrapper isLoading={true} data={[]} error={null}>
        <div>Content</div>
      </DataWrapper>
    );

    expect(screen.getByText("Yükleniyor...")).toBeInTheDocument();
    expect(screen.queryByText("İçerik bulunamadı")).not.toBeInTheDocument();
  });

  it("should handle non-array data that exists", () => {
    const data = { id: 1, name: "Test" };
    renderWithRouter(
      <DataWrapper isLoading={false} data={data} error={null}>
        <div data-testid="content">Content</div>
      </DataWrapper>
    );

    expect(screen.getByTestId("content")).toBeInTheDocument();
  });
});
