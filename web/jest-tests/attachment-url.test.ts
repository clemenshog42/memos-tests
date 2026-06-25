import { getAttachmentUrl, getAttachmentThumbnailUrl, getAttachmentMotionClipUrl } from "@/utils/attachment";
import { Attachment } from "@/types/proto/api/v1/attachment_service_pb";

describe("attachment utils - urls", () => {
  describe("getAttachmentUrl", () => {
    it("should return externalLink if present", () => {
      const attachment = { externalLink: "https://example.com/image.jpg" } as unknown as Attachment;
      expect(getAttachmentUrl(attachment)).toBe("https://example.com/image.jpg");
    });

    it("should return internal url if externalLink is not present", () => {
      const attachment = { name: "assets/123", filename: "test.png" } as unknown as Attachment;
      expect(getAttachmentUrl(attachment)).toBe("http://localhost/file/assets/123/test.png");
    });
  });

  describe("getAttachmentThumbnailUrl", () => {
    it("should return thumbnail url", () => {
      const attachment = { name: "assets/123", filename: "test.png" } as unknown as Attachment;
      expect(getAttachmentThumbnailUrl(attachment)).toBe("http://localhost/file/assets/123/test.png?thumbnail=true");
    });
  });

  describe("getAttachmentMotionClipUrl", () => {
    it("should return motion clip url", () => {
      const attachment = { name: "assets/123", filename: "test.png" } as unknown as Attachment;
      expect(getAttachmentMotionClipUrl(attachment)).toBe("http://localhost/file/assets/123/test.png?motion=true");
    });
  });
});
