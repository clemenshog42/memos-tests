
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LearnMore from "@/components/LearnMore";

jest.mock("@/utils/i18n", () => ({
  useTranslate: () => (key: string) => key,
}));

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

describe("LearnMore Integration", () => {
  it("renders a link and shows tooltip on hover", async () => {
    const user = userEvent.setup();
    render(<LearnMore url="https://example.com" title="Example Title" />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com");

    await user.hover(link);

    await waitFor(() => {
      const elements = screen.getAllByText("Example Title");
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it("falls back to common.learn-more if title is not provided", async () => {
    const user = userEvent.setup();
    render(<LearnMore url="https://example.com" />);

    const link = screen.getByRole("link");
    await user.hover(link);

    await waitFor(() => {
      const elements = screen.getAllByText("common.learn-more");
      expect(elements.length).toBeGreaterThan(0);
    });
  });
});
