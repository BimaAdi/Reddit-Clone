import { test, expect } from "@playwright/test";
import { clearDb } from "./helpers/clearDb";

test.beforeEach(async ({ page }) => {
  await clearDb();

  // Sign Up Test
  await page.goto("/signup");

  await page.waitForURL("/signup");
  await page.getByTestId("usernameInputSignUp").fill("Test");
  await page.getByTestId("passwordInputSignUp").fill("secretpassword");
  await page.getByTestId("confirmPasswordInputSignUp").fill("secretpassword");
  await page.getByTestId("signUpButton").click();

  // Signin Test
  await page.waitForURL("/signin");
  await page.getByTestId("usernameInput").fill("Test");
  await page.getByTestId("passwordInput").fill("secretpassword");
  await page.getByTestId("signInButton").click();

  // Go To Home after login
  await page.waitForURL("/");
  const item2 = await page.getByRole("listitem");
  const navItem = await item2.allInnerTexts();
  await expect(navItem).toContain("SignOut");
  await expect(navItem).not.toContain("SignIn");
});

test("upvote then downvote", async ({ page }) => {
  // Sign Up Test
  await page.goto("/");

  await page.waitForURL("/");
  await page.getByRole("button", { name: "Create Post" }).click();
  await page.getByPlaceholder("Title").fill("my test post");
  await page.getByPlaceholder("Your post").fill("this is my post");
  await page.getByTestId("createPostButton").press("Enter");

  await expect(
    page.getByRole("heading", { name: "my test post", exact: true })
  ).toBeVisible();

  // Test Upvote
  await page.locator("rect").first().click();
  await expect(page.getByText("1", { exact: true })).toBeVisible();
  // Test Downvote
  await page.locator("rect").nth(1).click();
  await expect(page.getByText("-1", { exact: true })).toBeVisible();

  // Go to detail post page
  await page.getByRole("link", { name: "my test post" }).click();
  await expect(page.getByText("1 Votes")).toBeVisible();
  // Test Upvote
  await page.locator("rect").first().click();
  await expect(page.getByText("1", { exact: true })).toBeVisible();
  // Test Downvote
  await page.locator("rect").nth(1).click();
  await expect(page.getByText("-1", { exact: true })).toBeVisible();
});

test.afterEach(async () => {
  await clearDb();
});
