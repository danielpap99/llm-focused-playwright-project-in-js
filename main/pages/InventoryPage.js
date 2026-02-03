class InventoryPage {
  constructor(page) {
    this.page = page;
  }

  // #region Locators
  get inventoryContainer() { return this.page.locator('[data-test="inventory-container"]'); }
  get shoppingCartIcon() { return this.page.locator('[data-test="shopping-cart-link"]'); }
  get sortContainer() { return this.page.locator('[data-test="product-sort-container"]'); }
  get inventoryItemNames() { return this.page.locator('[data-test="inventory-item-name"]'); }
  get inventoryItemPrices() { return this.page.locator('[data-test="inventory-item-price"]'); }
  // #endregion

  // #region Actions
  async selectSortOption(sortOption) {
    await this.sortContainer.selectOption(sortOption);
  }
  // #endregion

  // #region Asserts
  async inventoryIsVisible() { return await this.inventoryContainer.isVisible(); }
  async shoppingCartIconIsVisible() { return await this.shoppingCartIcon.isVisible(); }
  async sortContainerIsVisible() { return await this.sortContainer.isVisible(); }
  async inventoryItemNamesList() { return await this.inventoryItemNames.allTextContents(); }
  async inventoryItemPricesList() { return await this.inventoryItemPrices.allTextContents(); }
  async currentSortOption() { return await this.sortContainer.inputValue(); }
  // #endregion
}

module.exports = InventoryPage;