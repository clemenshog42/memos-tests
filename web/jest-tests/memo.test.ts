import { convertVisibilityFromString, convertVisibilityToString } from "@/utils/memo";
import { Visibility } from "@/types/proto/api/v1/memo_service_pb";

describe("memo utils", () => {
  describe("convertVisibilityFromString", () => {
    it("should convert PUBLIC to Visibility.PUBLIC", () => {
      expect(convertVisibilityFromString("PUBLIC")).toBe(Visibility.PUBLIC);
    });

    it("should convert PROTECTED to Visibility.PROTECTED", () => {
      expect(convertVisibilityFromString("PROTECTED")).toBe(Visibility.PROTECTED);
    });

    it("should convert PRIVATE to Visibility.PRIVATE", () => {
      expect(convertVisibilityFromString("PRIVATE")).toBe(Visibility.PRIVATE);
    });

    it("should return Visibility.PUBLIC for unknown inputs", () => {
      expect(convertVisibilityFromString("UNKNOWN")).toBe(Visibility.PUBLIC);
      expect(convertVisibilityFromString("")).toBe(Visibility.PUBLIC);
    });
  });

  describe("convertVisibilityToString", () => {
    it("should convert Visibility.PUBLIC to PUBLIC", () => {
      expect(convertVisibilityToString(Visibility.PUBLIC)).toBe("PUBLIC");
    });

    it("should convert Visibility.PROTECTED to PROTECTED", () => {
      expect(convertVisibilityToString(Visibility.PROTECTED)).toBe("PROTECTED");
    });

    it("should convert Visibility.PRIVATE to PRIVATE", () => {
      expect(convertVisibilityToString(Visibility.PRIVATE)).toBe("PRIVATE");
    });

    it("should return PRIVATE for unknown Visibility values", () => {
      expect(convertVisibilityToString(-1 as Visibility)).toBe("PRIVATE");
    });
  });
});
