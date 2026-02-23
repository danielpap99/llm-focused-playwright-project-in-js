class CartPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItems = page.locator(".cart_item");
    this.cartItemNames = page.locator(".inventory_item_name");
    this.cartItemPrices = page.locator(".inventory_item_price");
    this.removeButton = (productName) => page.locator(`[data-test="remove-${productName.toLowerCase().replaceAll(" ", "-")}"]`);
  }

  // #region Actions
  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async removeProductFromCart(productName) {
    const removeButton = this.page.locator(`[data-test="remove-${productName.toLowerCase().replaceAll(" ", "-")}"]`);
    await removeButton.click();
  }
  // #endregion
}

module.exports = CartPage;
