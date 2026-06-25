import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "@/components/SearchBar";

const mockAddFilter = jest.fn();
jest.mock("@/contexts/MemoFilterContext", () => ({
  useMemoFilterContext: () => ({
    addFilter: mockAddFilter,
  }),
}));

jest.mock("@/utils/i18n", () => ({
  useTranslate: () => (key: string) => key,
}));

jest.mock("@/components/MemoDisplaySettingMenu", () => {
  return function MockMemoDisplaySettingMenu() {
    return <div data-testid="memo-display-setting-menu" />;
  };
});

describe("SearchBar Integration", () => {
  beforeEach(() => {
    mockAddFilter.mockClear();
  });

  it("updates input and adds filter on Enter", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    // Type query
    await user.type(input, "hello world");
    expect(input).toHaveValue("hello world");

    // Press Enter
    await user.keyboard("{Enter}");

    // Should call addFilter for each word
    expect(mockAddFilter).toHaveBeenCalledTimes(2);
    expect(mockAddFilter).toHaveBeenCalledWith({ factor: "contentSearch", value: "hello" });
    expect(mockAddFilter).toHaveBeenCalledWith({ factor: "contentSearch", value: "world" });

    // Input should be cleared
    expect(input).toHaveValue("");
  });
});
