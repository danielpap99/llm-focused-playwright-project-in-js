class RahulShettyPracticePage {
  constructor(page) {
    this.page = page;

    // Locators
    this.hideButton = page.locator("#hide-textbox");
    this.showButton = page.locator("#show-textbox");
    this.displayedTextBox = page.locator("#displayed-text");
    this.nameInput = page.locator("#name");
    this.alertButton = page.locator("#alertbtn");
    this.autocompleteInput = page.getByRole("textbox", { name: "Type to Select Countries" });
    this.suggestionList = page.locator("ul.ui-menu");
    this.suggestionItems = page.locator("ul.ui-menu li");
  }

  // #region Actions
  async navigateToPage() {
    await this.page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  }

  async clickHideButton() {
    await this.hideButton.click();
  }

  async clickShowButton() {
    await this.showButton.click();
  }

  async enterName(name) {
    await this.nameInput.fill(name);
  }

  async clickAlertButton() {
    await this.alertButton.click();
  }

  async typeInAutocomplete(text) {
    await this.autocompleteInput.fill(text);
  }

  async selectCountryFromSuggestion(countryName) {
    await this.suggestionItems.filter({ hasText: countryName }).click();
  }
  // #endregion
}

module.exports = RahulShettyPracticePage;
