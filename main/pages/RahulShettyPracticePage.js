class RahulShettyPracticePage {
  constructor(page) {
    this.page = page;

    // Locators
    this.hideButton = page.locator("#hide-textbox");
    this.showButton = page.locator("#show-textbox");
    this.displayedTextBox = page.locator("#displayed-text");
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
  // #endregion
}

module.exports = RahulShettyPracticePage;
