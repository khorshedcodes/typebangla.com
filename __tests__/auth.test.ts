import { describe, test, expect } from "./testRunner";

describe("User Authentication & Role Permissions", () => {
  const canAccessAdminPanel = (role: "student" | "teacher" | "admin") => role === "admin";
  const canCreateInstituteClass = (role: "student" | "teacher" | "admin") => role === "teacher" || role === "admin";

  test("Admin role should have full access to Admin Panel and Institute creation", () => {
    expect(canAccessAdminPanel("admin")).toBe(true);
    expect(canCreateInstituteClass("admin")).toBe(true);
  });

  test("Teacher role should have access to create Institute classes but not access Admin Panel", () => {
    expect(canAccessAdminPanel("teacher")).toBe(false);
    expect(canCreateInstituteClass("teacher")).toBe(true);
  });

  test("Student role should not have access to Admin Panel or Institute creation", () => {
    expect(canAccessAdminPanel("student")).toBe(false);
    expect(canCreateInstituteClass("student")).toBe(false);
  });
});
