import { getFileTypeLabel } from "@/utils/format";

describe("format utils - getFileTypeLabel", () => {
  it("should return File for empty mimeType", () => {
    expect(getFileTypeLabel("")).toBe("File");
    expect(getFileTypeLabel(undefined as any)).toBe("File");
  });

  it("should handle special cases", () => {
    expect(getFileTypeLabel("application/pdf")).toBe("PDF");
    expect(getFileTypeLabel("application/zip")).toBe("ZIP");
    expect(getFileTypeLabel("application/json")).toBe("JSON");
    expect(getFileTypeLabel("text/plain")).toBe("TXT");
  });

  it("should handle image mime types", () => {
    expect(getFileTypeLabel("image/jpeg")).toBe("JPEG");
    expect(getFileTypeLabel("image/png")).toBe("PNG");
    expect(getFileTypeLabel("image/gif")).toBe("GIF");
    expect(getFileTypeLabel("image/webp")).toBe("WebP");
    expect(getFileTypeLabel("image/svg+xml")).toBe("SVG");
  });

  it("should handle video mime types", () => {
    expect(getFileTypeLabel("video/mp4")).toBe("MP4");
    expect(getFileTypeLabel("video/webm")).toBe("WEBM");
  });

  it("should handle audio mime types", () => {
    expect(getFileTypeLabel("audio/mp3")).toBe("MP3");
    expect(getFileTypeLabel("audio/mpeg")).toBe("MP3");
  });

  it("should fallback to subtype or category uppercase", () => {
    expect(getFileTypeLabel("application/vnd.custom-type")).toBe("VND.CUSTOM-TYPE");
  });
});
