import { isSuperUser } from "@/utils/user";
import { User, User_Role } from "@/types/proto/api/v1/user_service_pb";

describe("user utils", () => {
  describe("isSuperUser", () => {
    it("should return falsy if user is undefined", () => {
      expect(isSuperUser(undefined)).toBeFalsy();
    });

    it("should return false if user is not ADMIN", () => {
      const user = { role: User_Role.USER } as User;
      expect(isSuperUser(user)).toBe(false);
    });

    it("should return true if user is ADMIN", () => {
      const user = { role: User_Role.ADMIN } as User;
      expect(isSuperUser(user)).toBe(true);
    });
  });
});
