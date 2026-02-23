class InventoryPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.shoppingCartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.sortContainer = page.locator('[data-test="product-sort-container"]');
    this.inventoryItemNames = page.locator('[data-test="inventory-item-name"]');
    this.inventoryItemPrices = page.locator('[data-test="inventory-item-price"]');
    this.addToBasketButton = (productName) => page.locator(`[data-test="add-to-cart-${productName.toLowerCase().replaceAll(" ", "-")}"]`);
    this.removeButton = (productName) => page.locator(`[data-test="remove-${productName.toLowerCase().replaceAll(" ", "-")}"]`);
    this.backpackTitleLink = page.locator('[data-test="item-4-title-link"]');
    this.bikeLightImageLink = page.locator('[data-test="item-0-img-link"]');
  }

  // #region Actions
  async selectSortOption(sortOption) {
    await this.sortContainer.selectOption(sortOption);
  }

  async addProductToCart(productName) {
    const addToCartButton = this.page.locator(`[data-test="add-to-cart-${productName.toLowerCase().replaceAll(" ", "-")}"]`);
    await addToCartButton.click();
  }

  async removeProductFromCart(productName) {
    const removeButton = this.page.locator(`[data-test="remove-${productName.toLowerCase().replaceAll(" ", "-")}"]`);
    await removeButton.click();
  }

  async goToCart() {
    await this.shoppingCartIcon.click();
  }

  async clickBackpackTitle() {
    await this.backpackTitleLink.click();
  }

  async clickBikeLightImage() {
    await this.bikeLightImageLink.click();
  }
  // #endregion
}

module.exports = InventoryPage;
