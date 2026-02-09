const { test, expect } = require("./base-test");
const SauceLabsHomePage = require("../main/pages/SauceLabsHomePage");
const SauceLabsSignInPage = require("../main/pages/SauceLabsSignInPage");

test.describe("Sauce Labs sign in opens a new tab", () => {
  test("Sign in option on sauce labs opens a  new tab", async ({ page, context }) => {
    // Initialize page objects
    const homePage = new SauceLabsHomePage(page);

    // Navigate to Sauce Labs home page
    await homePage.navigate();

    // Set up listener for new page before clicking
    const pagePromise = context.waitForEvent("page");

    // Click sign in button
    await homePage.clickSignIn();

    // Handle the new page that opens
    const newPage = await pagePromise;
    const signInPage = new SauceLabsSignInPage(newPage);

    // Wait for sign-in page to load and verify URL
    await signInPage.waitForPageToLoad();
    await expect(newPage).toHaveURL(/accounts\.saucelabs\.com/);

    // Close the sign-in page
    await signInPage.close();
  });
});
