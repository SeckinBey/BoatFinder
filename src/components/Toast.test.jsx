import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Toast, { ToastContainer } from "./Toast.jsx";

// Mock Headless UI Transition component
vi.mock("@headlessui/react", async () => {
  const actual = await vi.importActual("@headlessui/react");
  return {
    ...actual,
    Transition: ({ children, show }) => {
      if (!show) return null;
      return <>{children}</>;
    },
  };
});

describe("Toast", () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    message: "Test message",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render when isOpen is true", () => {
    render(<Toast {...defaultProps} />);
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("should not render when isOpen is false", () => {
    render(<Toast {...defaultProps} isOpen={false} />);
    expect(screen.queryByText("Test message")).not.toBeInTheDocument();
  });

  it("should render with default info type", () => {
    const { container } = render(<Toast {...defaultProps} />);
    const toast = container.querySelector(".bg-blue-50");
    expect(toast).toBeInTheDocument();
  });

  it("should render with success type", () => {
    const { container } = render(<Toast {...defaultProps} type="success" />);
    const toast = container.querySelector(".bg-green-50");
    expect(toast).toBeInTheDocument();
  });

  it("should render with error type", () => {
    const { container } = render(<Toast {...defaultProps} type="error" />);
    const toast = container.querySelector(".bg-red-50");
    expect(toast).toBeInTheDocument();
  });

  it("should render with warning type", () => {
    const { container } = render(<Toast {...defaultProps} type="warning" />);
    const toast = container.querySelector(".bg-yellow-50");
    expect(toast).toBeInTheDocument();
  });

  it("should call onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    render(<Toast {...defaultProps} />);

    const closeButton = screen.getByRole("button", { name: /kapat/i });
    await user.click(closeButton);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("should render correct icon for success type", () => {
    const { container } = render(<Toast {...defaultProps} type="success" />);
    // CheckCircleIcon should be present
    const icons = container.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThan(0);
    // Check for green icon color
    const iconContainer = container.querySelector(".text-green-400");
    expect(iconContainer).toBeInTheDocument();
  });

  it("should render correct icon for error type", () => {
    const { container } = render(<Toast {...defaultProps} type="error" />);
    const icons = container.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThan(0);
    const iconContainer = container.querySelector(".text-red-400");
    expect(iconContainer).toBeInTheDocument();
  });

  it("should render correct icon for warning type", () => {
    const { container } = render(<Toast {...defaultProps} type="warning" />);
    const icons = container.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThan(0);
    const iconContainer = container.querySelector(".text-yellow-400");
    expect(iconContainer).toBeInTheDocument();
  });

  it("should render correct icon for info type", () => {
    const { container } = render(<Toast {...defaultProps} type="info" />);
    const icons = container.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThan(0);
    const iconContainer = container.querySelector(".text-blue-400");
    expect(iconContainer).toBeInTheDocument();
  });

  it("should fallback to info styles for unknown type", () => {
    const { container } = render(<Toast {...defaultProps} type="unknown" />);
    const toast = container.querySelector(".bg-blue-50");
    expect(toast).toBeInTheDocument();
    const iconContainer = container.querySelector(".text-blue-400");
    expect(iconContainer).toBeInTheDocument();
  });
});

describe("ToastContainer", () => {
  const mockToasts = [
    { id: 1, message: "Toast 1", type: "success", duration: 3000 },
    { id: 2, message: "Toast 2", type: "error", duration: 5000 },
    { id: 3, message: "Toast 3", type: "warning", duration: 4000 },
  ];

  it("should not render when toasts array is empty", () => {
    const { container } = render(
      <ToastContainer toasts={[]} onRemove={vi.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("should not render when toasts is null", () => {
    const { container } = render(
      <ToastContainer toasts={null} onRemove={vi.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("should render all toasts", () => {
    render(<ToastContainer toasts={mockToasts} onRemove={vi.fn()} />);
    expect(screen.getByText("Toast 1")).toBeInTheDocument();
    expect(screen.getByText("Toast 2")).toBeInTheDocument();
    expect(screen.getByText("Toast 3")).toBeInTheDocument();
  });

  it("should call onRemove with correct id when toast is closed", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(<ToastContainer toasts={mockToasts} onRemove={onRemove} />);

    // Find and click close button for first toast
    const closeButtons = screen.getAllByRole("button", { name: /kapat/i });
    await user.click(closeButtons[0]);

    expect(onRemove).toHaveBeenCalledWith(1);
  });

  it("should render toasts with correct types", () => {
    const { container } = render(
      <ToastContainer toasts={mockToasts} onRemove={vi.fn()} />
    );

    const successToast = container.querySelector(".bg-green-50");
    const errorToast = container.querySelector(".bg-red-50");
    const warningToast = container.querySelector(".bg-yellow-50");

    expect(successToast).toBeInTheDocument();
    expect(errorToast).toBeInTheDocument();
    expect(warningToast).toBeInTheDocument();
  });

  it("should have aria-live attribute", () => {
    const { container } = render(
      <ToastContainer toasts={mockToasts} onRemove={vi.fn()} />
    );
    const containerElement = container.querySelector('[aria-live="assertive"]');
    expect(containerElement).toBeInTheDocument();
  });
});
