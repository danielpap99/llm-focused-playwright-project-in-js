class ProductDetailPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.productImage = page.locator('[data-test*="item-"][data-test*="-img"]');
    this.productName = page.locator('[data-test="inventory-item-name"]');
    this.productDescription = page.locator('[data-test="inventory-item-desc"]');
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
  }

  // #region Actions
  async addToCart() {
    await this.addToCartButton.click();
  }

  async goBackToProducts() {
    await this.backToProductsButton.click();
  }
  // #endregion
}

module.exports = ProductDetailPage;
