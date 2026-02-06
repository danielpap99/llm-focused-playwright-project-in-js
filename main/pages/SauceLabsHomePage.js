class SauceLabsHomePage {
  constructor(page) {
    this.page = page;
  }

  // #region Locators
  get signInButton() { return this.page.getByRole('button', { name: 'Sign in' }); }
  // #endregion

  // #region Actions
  async navigate() {
    await this.page.goto('https://saucelabs.com/');
  }

  async clickSignIn() {
    await this.signInButton.click();
  }
  // #endregion

  // #region Asserts
  async isSignInButtonVisible() { return await this.signInButton.isVisible(); }
  // #endregion
}

module.exports = SauceLabsHomePage;