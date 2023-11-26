import { test, expect } from "@playwright/test";
import { clearDb } from "./helpers/clearDb";

test.describe("signIn wrong password", () => {
  test.beforeEach(async () => {
    await clearDb();
  });

  test("signIn Wrong password", async ({ page }) => {
    // Sign In Page
    await page.goto("/signin");

    await page.waitForURL("/signin");
    await page.getByTestId("usernameInput").fill("John");
    await page.getByTestId("passwordInput").fill("wrongpassword");
    await page.getByTestId("signInButton").click();

    // show alert when username or password not valid
    const alertMessage = await page.getByText("Wrong username or Password");
    // await alertMessage.waitFor();

    await expect(alertMessage).toBeVisible();
  });

  test.afterEach(async () => {
    await clearDb(); 
  });
});
