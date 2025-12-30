import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfirmDialog from "./ConfirmDialog.jsx";

// Mock Headless UI components (ConfirmDialog uses Dialog.Panel, Dialog.Title, Transition.Child)
vi.mock("@headlessui/react", () => {
  const Dialog = ({ children, onClose }) => (
    <div data-testid="dialog" data-has-onclose={String(!!onClose)}>
      {children}
    </div>
  );

  Dialog.Panel = ({ children, className }) => (
    <div data-testid="dialog-panel" className={className}>
      {children}
    </div>
  );

  Dialog.Title = ({ children, as: As = "h3", className }) => {
    const TitleComponent = As;
    return <TitleComponent className={className}>{children}</TitleComponent>;
  };

  const Transition = ({ show, children }) => (show ? <>{children}</> : null);
  Transition.Child = ({ children }) => <>{children}</>;

  return { Dialog, Transition };
});

describe("ConfirmDialog", () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onConfirm: vi.fn(),
    onCancel: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render when isOpen is true", () => {
    render(<ConfirmDialog {...defaultProps} />);
    expect(screen.getByTestId("dialog")).toBeInTheDocument();
  });

  it("should not render when isOpen is false", () => {
    render(<ConfirmDialog {...defaultProps} isOpen={false} />);
    expect(screen.queryByTestId("dialog")).not.toBeInTheDocument();
  });

  it("should render with default title", () => {
    render(<ConfirmDialog {...defaultProps} />);
    expect(screen.getByText("Emin misiniz?")).toBeInTheDocument();
  });

  it("should render with custom title", () => {
    render(<ConfirmDialog {...defaultProps} title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("should render with default message", () => {
    render(<ConfirmDialog {...defaultProps} />);
    expect(screen.getByText("Bu işlem geri alınamaz.")).toBeInTheDocument();
  });

  it("should render with custom message", () => {
    render(<ConfirmDialog {...defaultProps} message="Custom message" />);
    expect(screen.getByText("Custom message")).toBeInTheDocument();
  });

  it("should render with default button texts", () => {
    render(<ConfirmDialog {...defaultProps} />);
    expect(screen.getByText("Evet")).toBeInTheDocument();
    expect(screen.getByText("İptal")).toBeInTheDocument();
  });

  it("should render with custom button texts", () => {
    render(
      <ConfirmDialog
        {...defaultProps}
        confirmText="Confirm"
        cancelText="Cancel"
      />
    );
    expect(screen.getByText("Confirm")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("should call onConfirm and onClose when confirm button is clicked", async () => {
    const user = userEvent.setup();
    render(<ConfirmDialog {...defaultProps} />);

    const confirmButton = screen.getByText("Evet");
    await user.click(confirmButton);

    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("should call onCancel and onClose when cancel button is clicked", async () => {
    const user = userEvent.setup();
    render(<ConfirmDialog {...defaultProps} />);

    const cancelButton = screen.getByText("İptal");
    await user.click(cancelButton);

    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when cancel button is clicked even if onCancel is not provided", async () => {
    const user = userEvent.setup();
    const { onCancel: _onCancel, ...propsWithoutCancel } = defaultProps;
    render(<ConfirmDialog {...propsWithoutCancel} />);

    const cancelButton = screen.getByText("İptal");
    await user.click(cancelButton);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("should render with danger variant by default", () => {
    render(<ConfirmDialog {...defaultProps} />);
    const button = screen.getByText("Evet");
    expect(button.className).toContain("bg-red-600");
  });

  it("should render with warning variant", () => {
    render(<ConfirmDialog {...defaultProps} variant="warning" />);
    const button = screen.getByText("Evet");
    expect(button.className).toContain("bg-yellow-600");
  });

  it("should render with info variant", () => {
    render(<ConfirmDialog {...defaultProps} variant="info" />);
    const button = screen.getByText("Evet");
    expect(button.className).toContain("bg-blue-600");
  });

  it("should render with danger variant for unknown variant", () => {
    render(<ConfirmDialog {...defaultProps} variant="unknown" />);
    const button = screen.getByText("Evet");
    expect(button.className).toContain("bg-red-600");
  });
});
