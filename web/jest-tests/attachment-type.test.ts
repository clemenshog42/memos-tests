import { getAttachmentType } from "@/utils/attachment";
import { Attachment } from "@/types/proto/api/v1/attachment_service_pb";

describe("attachment utils - getAttachmentType", () => {
  it("should return image/* for images", () => {
    expect(getAttachmentType({ type: "image/jpeg" } as unknown as Attachment)).toBe("image/*");
    expect(getAttachmentType({ type: "image/png" } as unknown as Attachment)).toBe("image/*");
  });

  it("should return application/octet-stream for psd images", () => {
    expect(getAttachmentType({ type: "image/vnd.adobe.photoshop" } as unknown as Attachment)).toBe("application/octet-stream");
  });

  it("should return video/* for videos", () => {
    expect(getAttachmentType({ type: "video/mp4" } as unknown as Attachment)).toBe("video/*");
  });

  it("should return audio/* for audios", () => {
    expect(getAttachmentType({ type: "audio/mp3" } as unknown as Attachment)).toBe("audio/*");
  });

  it("should not return audio/* for midi files", () => {
    expect(getAttachmentType({ type: "audio/midi" } as unknown as Attachment)).toBe("application/octet-stream");
  });

  it("should return text/* for text files", () => {
    expect(getAttachmentType({ type: "text/plain" } as unknown as Attachment)).toBe("text/*");
  });

  it("should handle specific application types", () => {
    expect(getAttachmentType({ type: "application/epub+zip" } as unknown as Attachment)).toBe("application/epub+zip");
    expect(getAttachmentType({ type: "application/pdf" } as unknown as Attachment)).toBe("application/pdf");
    expect(getAttachmentType({ type: "application/msword" } as unknown as Attachment)).toBe("application/msword");
    expect(getAttachmentType({ type: "application/vnd.ms-excel" } as unknown as Attachment)).toBe("application/msexcel");
    expect(getAttachmentType({ type: "application/zip" } as unknown as Attachment)).toBe("application/zip");
    expect(getAttachmentType({ type: "application/x-java-archive" } as unknown as Attachment)).toBe("application/x-java-archive");
  });

  it("should default to application/octet-stream", () => {
    expect(getAttachmentType({ type: "application/unknown" } as unknown as Attachment)).toBe("application/octet-stream");
  });
});
