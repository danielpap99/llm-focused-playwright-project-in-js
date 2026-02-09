class InventoryPage {
  constructor(page) {
    this.page = page;
  }

  // #region Locators
  get inventoryContainer() {
    return this.page.locator('[data-test="inventory-container"]');
  }
  get shoppingCartIcon() {
    return this.page.locator('[data-test="shopping-cart-link"]');
  }
  get sortContainer() {
    return this.page.locator('[data-test="product-sort-container"]');
  }
  get inventoryItemNames() {
    return this.page.locator('[data-test="inventory-item-name"]');
  }
  get inventoryItemPrices() {
    return this.page.locator('[data-test="inventory-item-price"]');
  }
  get addToCartBackpackButton() {
    return this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  }
  get addToCartBikeLightButton() {
    return this.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
  }
  get removeBackpackButton() {
    return this.page.locator('[data-test="remove-sauce-labs-backpack"]');
  }
  get removeBikeLightButton() {
    return this.page.locator('[data-test="remove-sauce-labs-bike-light"]');
  }
  // #endregion

  // #region Actions
  async selectSortOption(sortOption) {
    await this.sortContainer.selectOption(sortOption);
  }

  async addBackpackToCart() {
    await this.addToCartBackpackButton.click();
  }

  async addBikeLightToCart() {
    await this.addToCartBikeLightButton.click();
  }

  async goToCart() {
    await this.shoppingCartIcon.click();
  }
  // #endregion

  // #region Asserts
  async inventoryIsVisible() {
    return await this.inventoryContainer.isVisible();
  }

  async cartCount() {
    return await this.shoppingCartIcon.textContent();
  }
  // #endregion
}

module.exports = InventoryPage;
