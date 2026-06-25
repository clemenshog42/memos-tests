import { 
  getAttachmentMotionGroupId, 
  isAppleLivePhotoStill, 
  isAppleLivePhotoVideo, 
  isAndroidMotionContainer, 
  isMotionAttachment 
} from "@/utils/attachment";
import { Attachment, MotionMediaFamily, MotionMediaRole } from "@/types/proto/api/v1/attachment_service_pb";

describe("attachment utils - motion", () => {
  const regularAttachment = {} as unknown as Attachment;
  const appleLivePhotoStill = {
    motionMedia: {
      family: MotionMediaFamily.APPLE_LIVE_PHOTO,
      role: MotionMediaRole.STILL,
      groupId: "group-1",
      hasEmbeddedVideo: false,
    }
  } as unknown as Attachment;
  const appleLivePhotoVideo = {
    motionMedia: {
      family: MotionMediaFamily.APPLE_LIVE_PHOTO,
      role: MotionMediaRole.VIDEO,
      groupId: "group-1",
      hasEmbeddedVideo: false,
    }
  } as unknown as Attachment;
  const androidMotionContainer = {
    motionMedia: {
      family: MotionMediaFamily.ANDROID_MOTION_PHOTO,
      role: MotionMediaRole.CONTAINER,
      groupId: "group-2",
      hasEmbeddedVideo: true,
    }
  } as unknown as Attachment;

  describe("getAttachmentMotionGroupId", () => {
    it("should return undefined if motionMedia is missing", () => {
      expect(getAttachmentMotionGroupId(regularAttachment)).toBeUndefined();
    });

    it("should return groupId if motionMedia is present", () => {
      expect(getAttachmentMotionGroupId(appleLivePhotoStill)).toBe("group-1");
    });
  });

  describe("isAppleLivePhotoStill", () => {
    it("should return true for apple live photo still", () => {
      expect(isAppleLivePhotoStill(appleLivePhotoStill)).toBe(true);
      expect(isAppleLivePhotoStill(appleLivePhotoVideo)).toBe(false);
      expect(isAppleLivePhotoStill(regularAttachment)).toBe(false);
    });
  });

  describe("isAppleLivePhotoVideo", () => {
    it("should return true for apple live photo video", () => {
      expect(isAppleLivePhotoVideo(appleLivePhotoVideo)).toBe(true);
      expect(isAppleLivePhotoVideo(appleLivePhotoStill)).toBe(false);
      expect(isAppleLivePhotoVideo(regularAttachment)).toBe(false);
    });
  });

  describe("isAndroidMotionContainer", () => {
    it("should return true for android motion container", () => {
      expect(isAndroidMotionContainer(androidMotionContainer)).toBe(true);
      expect(isAndroidMotionContainer(appleLivePhotoStill)).toBe(false);
      expect(isAndroidMotionContainer(regularAttachment)).toBe(false);
    });
  });

  describe("isMotionAttachment", () => {
    it("should return true for any motion attachment", () => {
      expect(isMotionAttachment(appleLivePhotoStill)).toBe(true);
      expect(isMotionAttachment(appleLivePhotoVideo)).toBe(true);
      expect(isMotionAttachment(androidMotionContainer)).toBe(true);
      expect(isMotionAttachment(regularAttachment)).toBe(false);
    });
  });
});
