import { formatFileSize } from "@/utils/format";

describe("format utils - formatFileSize", () => {
  it("should format 0 bytes correctly", () => {
    expect(formatFileSize(0)).toBe("0 B");
  });

  it("should return Invalid size for negative bytes", () => {
    expect(formatFileSize(-100)).toBe("Invalid size");
  });

  it("should format bytes correctly", () => {
    expect(formatFileSize(500)).toBe("500 B");
  });

  it("should format kilobytes correctly", () => {
    expect(formatFileSize(1024)).toBe("1.0 KB");
    expect(formatFileSize(1500)).toBe("1.5 KB");
  });

  it("should format megabytes correctly", () => {
    expect(formatFileSize(1048576)).toBe("1.0 MB");
    expect(formatFileSize(1572864)).toBe("1.5 MB");
  });

  it("should format gigabytes correctly", () => {
    expect(formatFileSize(1073741824)).toBe("1.0 GB");
  });
});
