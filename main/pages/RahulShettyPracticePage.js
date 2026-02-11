class RahulShettyPracticePage {
  constructor(page) {
    this.page = page;
  }

  // #region Locators
  get hideButton() {
    return this.page.locator("#hide-textbox");
  }
  get showButton() {
    return this.page.locator("#show-textbox");
  }
  get displayedTextBox() {
    return this.page.locator("#displayed-text");
  }
  // #endregion

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
