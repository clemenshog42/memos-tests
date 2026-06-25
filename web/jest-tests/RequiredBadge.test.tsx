
import { render, screen } from "@testing-library/react";
import RequiredBadge from "@/components/RequiredBadge";

describe("RequiredBadge Integration", () => {
  it("renders the asterisk and default classes", () => {
    render(<RequiredBadge />);

    const badge = screen.getByText("*");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("text-destructive", "font-bold");
  });

  it("appends custom className", () => {
    render(<RequiredBadge className="custom-badge" />);

    const badge = screen.getByText("*");
    expect(badge).toHaveClass("custom-badge", "text-destructive");
  });
});
