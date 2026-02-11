class OrderCompletePage {
  constructor(page) {
    this.page = page;

    // Locators
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
    this.orderCompleteHeader = page.locator(".complete-header");
    this.orderCompleteText = page.locator(".complete-text");
    this.ponyExpressImage = page.locator(".pony_express");
  }

  // #region Actions
  async backToProducts() {
    await this.backToProductsButton.click();
  }
  // #endregion
}

module.exports = OrderCompletePage;
