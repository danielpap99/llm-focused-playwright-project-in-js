const { test, expect } = require("@playwright/test");

test.setTimeout(60000);
const GreenKartPage = require("../main/pages/GreenKartPage");

test.describe("GreenKart Date Picker Tests", () => {
  test("should open and close calendar correctly", async ({ page }) => {
    const greenKartPage = new GreenKartPage(page);

    await greenKartPage.navigateToOffers();

    await expect(greenKartPage.calendar).not.toBeVisible();

    await greenKartPage.openCalendar();

    await expect(greenKartPage.calendar).toBeVisible();

    await expect(greenKartPage.navigationLabel).toContainText("2026");
  });

  test("should be able to select July 8th, 1999 in the date picker", async ({ page }) => {
    const greenKartPage = new GreenKartPage(page);

    await greenKartPage.navigateToOffers();

    await expect(page).toHaveTitle(/GreenKart/);
    await expect(page.locator("text=Delivery Date")).toBeVisible();

    await greenKartPage.selectDate(8, "july", 1999);

    await expect(greenKartPage.monthInput).toHaveValue("7");
    await expect(greenKartPage.dayInput).toHaveValue("8");
    await expect(greenKartPage.yearInput).toHaveValue("1999");
  });
});
