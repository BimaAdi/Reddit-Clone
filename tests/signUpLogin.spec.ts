import { test, expect } from "@playwright/test";
import { clearDb } from "./helpers/clearDb";

test.describe("sign_up and login", () => {
  test.beforeEach(async () => {
    await clearDb();
  });

  test("signUp then signIn", async ({ page }) => {
    // Sign Up Test
    await page.goto("/signup");
    
    await page.waitForURL("/signup");
    await page.getByTestId("usernameInputSignUp").fill("John");
    await page.getByTestId("passwordInputSignUp").fill("secretpassword");
    await page.getByTestId("confirmPasswordInputSignUp").fill("secretpassword");
    await page.getByTestId("signUpButton").click();

    // Signin Test
    await page.waitForURL("/signin");
    await page.getByTestId("usernameInput").fill("John");
    await page.getByTestId("passwordInput").fill("secretpassword");
    await page.getByTestId("signInButton").click();

    // Go To Home after login
    await page.waitForURL("/");
    const item2 = await page.getByRole("listitem");
    const navItem = await item2.allInnerTexts();
    expect(navItem).toContain("SignOut");
    expect(navItem).not.toContain("SignIn");
  });

  test.afterEach(async () => {
    await clearDb();
  });
});
