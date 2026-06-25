import { render } from "@testing-library/react";
import Skeleton from "@/components/Skeleton";

describe("Skeleton Integration", () => {
  it("renders default number of skeleton cards", () => {
    const { container } = render(<Skeleton />);

    // Default count is 4
    const cards = container.querySelectorAll(".bg-card");
    expect(cards).toHaveLength(4);
  });

  it("renders specified number of skeleton cards", () => {
    const { container } = render(<Skeleton count={2} />);

    const cards = container.querySelectorAll(".bg-card");
    expect(cards).toHaveLength(2);
  });

  it("renders creator details when showCreator is true", () => {
    const { container } = render(<Skeleton count={1} showCreator={true} />);

    // There should be a w-8 h-8 div for avatar inside the skeleton
    const avatarSkeleton = container.querySelector(".w-8.h-8");
    expect(avatarSkeleton).not.toBeNull();
  });
});
