import { getSafeRedirectPath, isPublicRoute } from "@/utils/redirect-safety";
import { ROUTES } from "@/router/routes";

describe("redirect-safety utils", () => {
  describe("getSafeRedirectPath", () => {
    it("should return undefined for falsy inputs", () => {
      expect(getSafeRedirectPath(null)).toBeUndefined();
      expect(getSafeRedirectPath("")).toBeUndefined();
      expect(getSafeRedirectPath(undefined)).toBeUndefined();
    });

    it("should return undefined for non-relative paths", () => {
      expect(getSafeRedirectPath("https://example.com")).toBeUndefined();
      expect(getSafeRedirectPath("http://localhost:3000/auth")).toBeUndefined();
    });

    it("should return undefined for protocol-relative paths", () => {
      expect(getSafeRedirectPath("//example.com")).toBeUndefined();
    });

    it("should return undefined for auth routes", () => {
      expect(getSafeRedirectPath(ROUTES.AUTH)).toBeUndefined();
      expect(getSafeRedirectPath(`${ROUTES.AUTH}/callback`)).toBeUndefined();
      expect(getSafeRedirectPath(`${ROUTES.AUTH}?reason=test`)).toBeUndefined();
    });

    it("should return the path for safe internal routes", () => {
      expect(getSafeRedirectPath("/explore")).toBe("/explore");
      expect(getSafeRedirectPath("/memos/1")).toBe("/memos/1");
      expect(getSafeRedirectPath("/")).toBe("/");
    });
  });

  describe("isPublicRoute", () => {
    it("should return true for public routes", () => {
      expect(isPublicRoute(ROUTES.AUTH)).toBe(true);
      expect(isPublicRoute(ROUTES.ABOUT)).toBe(true);
      expect(isPublicRoute(ROUTES.EXPLORE)).toBe(true);
      expect(isPublicRoute(`${ROUTES.SHARED_MEMO}/123`)).toBe(true);
      expect(isPublicRoute("/u/testuser")).toBe(true);
      expect(isPublicRoute("/memos/123")).toBe(true);
    });

    it("should return false for private routes", () => {
      expect(isPublicRoute("/settings")).toBe(false);
      expect(isPublicRoute("/archived")).toBe(false);
      expect(isPublicRoute("/")).toBe(false);
    });
  });
});
