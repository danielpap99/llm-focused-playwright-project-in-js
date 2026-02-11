class SauceLabsHomePage {
  constructor(page) {
    this.page = page;

    // Locators
    this.signInButton = page.getByRole("button", { name: "Sign in" });
  }

  // #region Actions
  async navigate() {
    await this.page.goto("https://saucelabs.com/");
  }

  async clickSignIn() {
    await this.signInButton.click();
  }
}

module.exports = SauceLabsHomePage;
