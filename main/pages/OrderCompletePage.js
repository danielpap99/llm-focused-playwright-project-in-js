class OrderCompletePage {
  constructor(page) {
    this.page = page;
  }

  // #region Locators
  get backToProductsButton() {
    return this.page.locator('[data-test="back-to-products"]');
  }
  get orderCompleteHeader() {
    return this.page.locator(".complete-header");
  }
  get orderCompleteText() {
    return this.page.locator(".complete-text");
  }
  get ponyExpressImage() {
    return this.page.locator(".pony_express");
  }
  // #endregion

  // #region Actions
  async backToProducts() {
    await this.backToProductsButton.click();
  }
  // #endregion
}

module.exports = OrderCompletePage;
