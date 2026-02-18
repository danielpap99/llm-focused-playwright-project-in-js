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

  test("Alert button should show popup containing entered name", async ({ page }) => {
    await practicePage.enterName("Daniel");

    let dialogMessage = "";
    page.on("dialog", async (dialog) => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });

    await practicePage.clickAlertButton();

    expect(dialogMessage).toContain("Daniel");
  });

  test("Should show 3 results when typing 'Hu' and allow selecting Hungary", async () => {
    await practicePage.typeInAutocomplete("Hu");

    await expect(practicePage.suggestionList).toBeVisible();
    await expect(practicePage.suggestionItems).toHaveCount(3);

    const suggestions = await practicePage.suggestionItems.allTextContents();
    expect(suggestions).toEqual(expect.arrayContaining(["Bhutan", "Hungary", "Lithuania"]));

    await practicePage.selectCountryFromSuggestion("Hungary");

    await expect(practicePage.autocompleteInput).toHaveValue("Hungary");
  });
});
