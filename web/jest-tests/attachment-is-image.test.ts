import { isImage, isMidiFile } from "@/utils/attachment";

describe("attachment utils - format matching", () => {
  describe("isImage", () => {
    it("should return true for standard images", () => {
      expect(isImage("image/jpeg")).toBe(true);
      expect(isImage("image/png")).toBe(true);
      expect(isImage("image/gif")).toBe(true);
    });

    it("should return false for non-images", () => {
      expect(isImage("video/mp4")).toBe(false);
      expect(isImage("application/pdf")).toBe(false);
      expect(isImage("text/plain")).toBe(false);
    });

    it("should return false for PSD images", () => {
      expect(isImage("image/vnd.adobe.photoshop")).toBe(false);
      expect(isImage("image/x-photoshop")).toBe(false);
      expect(isImage("image/photoshop")).toBe(false);
    });
  });

  describe("isMidiFile", () => {
    it("should return true for midi files", () => {
      expect(isMidiFile("audio/midi")).toBe(true);
      expect(isMidiFile("audio/mid")).toBe(true);
      expect(isMidiFile("audio/x-midi")).toBe(true);
      expect(isMidiFile("application/x-midi")).toBe(true);
    });

    it("should return false for non-midi audio", () => {
      expect(isMidiFile("audio/mp3")).toBe(false);
      expect(isMidiFile("audio/wav")).toBe(false);
    });
  });
});
