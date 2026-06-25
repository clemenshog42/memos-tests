
import { render, screen } from "@testing-library/react";
import MemosLogo from "@/components/MemosLogo";

jest.mock("@/contexts/InstanceContext", () => ({
  useInstance: () => ({
    generalSetting: {
      customProfile: {
        title: "Custom Memos",
        logoUrl: "/custom-logo.png",
      },
    },
  }),
}));

jest.mock("@/components/UserAvatar", () => {
  return function MockUserAvatar({ avatarUrl }: { avatarUrl: string }) {
    return <img data-testid="user-avatar" src={avatarUrl} alt="avatar" />;
  };
});

describe("MemosLogo Integration", () => {
  it("renders custom title and avatar from context", () => {
    render(<MemosLogo />);

    expect(screen.getByText("Custom Memos")).toBeInTheDocument();

    const avatar = screen.getByTestId("user-avatar");
    expect(avatar).toHaveAttribute("src", "/custom-logo.png");
  });

  it("hides title when collapsed", () => {
    render(<MemosLogo collapsed={true} />);

    expect(screen.queryByText("Custom Memos")).not.toBeInTheDocument();

    const avatar = screen.getByTestId("user-avatar");
    expect(avatar).toBeInTheDocument();
  });
});
