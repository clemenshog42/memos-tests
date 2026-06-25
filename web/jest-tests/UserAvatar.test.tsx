import { render } from "@testing-library/react";
import UserAvatar from "@/components/UserAvatar";

describe("UserAvatar Integration", () => {
  it("renders with custom avatar url", () => {
    const { container } = render(<UserAvatar avatarUrl="/my-custom-avatar.png" className="custom-class" />);

    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    expect(img).toHaveAttribute("src", "/my-custom-avatar.png");

    const wrapper = img!.parentElement;
    expect(wrapper).toHaveClass("custom-class");
  });

  it("renders with default avatar url if not provided", () => {
    const { container } = render(<UserAvatar />);

    const img = container.querySelector("img");
    expect(img).toHaveAttribute("src", "/full-logo.webp");
  });
});
