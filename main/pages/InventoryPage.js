class InventoryPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.shoppingCartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.sortContainer = page.locator('[data-test="product-sort-container"]');
    this.inventoryItemNames = page.locator('[data-test="inventory-item-name"]');
    this.inventoryItemPrices = page.locator('[data-test="inventory-item-price"]');
    this.addToCartBackpackButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.addToCartBikeLightButton = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.removeBackpackButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.removeBikeLightButton = page.locator('[data-test="remove-sauce-labs-bike-light"]');
    this.backpackTitleLink = page.locator('[data-test="item-4-title-link"]');
    this.bikeLightImageLink = page.locator('[data-test="item-0-img-link"]');
  }

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

  async addProductToCart(dataTestId) {
    const addToCartButton = this.page.locator(`[data-test="${dataTestId}"]`);
    await addToCartButton.click();
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
