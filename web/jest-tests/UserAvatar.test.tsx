import React from "react";
import { render, screen } from "@testing-library/react";
import UserAvatar from "@/components/UserAvatar";

describe("UserAvatar Integration", () => {
  it("renders with custom avatar url", () => {
    render(<UserAvatar avatarUrl="/my-custom-avatar.png" className="custom-class" />);
    
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/my-custom-avatar.png");
    
    const wrapper = img.parentElement;
    expect(wrapper).toHaveClass("custom-class");
  });

  it("renders with default avatar url if not provided", () => {
    render(<UserAvatar />);
    
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/full-logo.webp");
  });
});
