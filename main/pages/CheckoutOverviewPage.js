class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.orderItemNames = page.locator(".inventory_item_name");
    this.orderItemPrices = page.locator(".inventory_item_price");
    this.subtotalLabel = page.locator(".summary_subtotal_label");
    this.taxLabel = page.locator(".summary_tax_label");
    this.totalLabel = page.locator(".summary_total_label");
    this.paymentInfo = page.locator('[data-test="payment-info-value"]');
    this.shippingInfo = page.locator('[data-test="shipping-info-value"]');
  }

  // #region Actions
  async finishOrder() {
    await this.finishButton.click();
  }

  async cancelOrder() {
    await this.cancelButton.click();
  }
  // #endregion
}

module.exports = CheckoutOverviewPage;
