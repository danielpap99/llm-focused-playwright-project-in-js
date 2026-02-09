class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;
  }

  // #region Locators
  get finishButton() {
    return this.page.locator('[data-test="finish"]');
  }
  get cancelButton() {
    return this.page.locator('[data-test="cancel"]');
  }
  get orderItemNames() {
    return this.page.locator(".inventory_item_name");
  }
  get orderItemPrices() {
    return this.page.locator(".inventory_item_price");
  }
  get subtotalLabel() {
    return this.page.locator(".summary_subtotal_label");
  }
  get taxLabel() {
    return this.page.locator(".summary_tax_label");
  }
  get totalLabel() {
    return this.page.locator(".summary_total_label");
  }
  get paymentInfo() {
    return this.page.locator('[data-test="payment-info-value"]');
  }
  get shippingInfo() {
    return this.page.locator('[data-test="shipping-info-value"]');
  }
  // #endregion

  // #region Actions
  async finishOrder() {
    await this.finishButton.click();
  }

  async cancelOrder() {
    await this.cancelButton.click();
  }
  // #endregion

  // #region Asserts
  async isFinishButtonVisible() {
    return await this.finishButton.isVisible();
  }

  async isCancelButtonVisible() {
    return await this.cancelButton.isVisible();
  }
  // #endregion
}

module.exports = CheckoutOverviewPage;
