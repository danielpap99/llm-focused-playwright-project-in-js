const { test, expect } = require("@playwright/test");
const RahulShettyPracticePage = require("../main/pages/RahulShettyPracticePage");

test.describe("Rahul Shetty Practice", () => {
  let practicePage;

  test.beforeEach(async ({ page }) => {
    practicePage = new RahulShettyPracticePage(page);
    await practicePage.navigateToPage();
  });

  test("Hide button should hide the text box, and show button should show it again", async () => {
    await expect(practicePage.displayedTextBox).toBeVisible();

    await practicePage.clickHideButton();

    await expect(practicePage.displayedTextBox).toBeHidden();

    await practicePage.clickShowButton();

    await expect(practicePage.displayedTextBox).toBeVisible();
  });
});
