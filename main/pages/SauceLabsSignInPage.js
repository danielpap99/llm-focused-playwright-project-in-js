class SauceLabsSignInPage {
  constructor(page) {
    this.page = page;
  }

  // #region Actions
  async waitForPageToLoad() {
    await this.page.waitForLoadState("networkidle");
  }

  async close() {
    await this.page.close();
  }
  // #endregion
}

module.exports = SauceLabsSignInPage;
