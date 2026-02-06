class SauceLabsSignInPage {
  constructor(page) {
    this.page = page;
  }

  // #region Actions
  async waitForPageToLoad() {
    await this.page.waitForLoadState('networkidle');
  }
  
  async close() {
    await this.page.close();
  }
  // #endregion

  // #region Asserts
  async isOnSignInPage() {
    return this.page.url().includes('accounts.saucelabs.com/');
  }
  
  getUrl() {
    return this.page.url();
  }
  // #endregion
}

module.exports = SauceLabsSignInPage;