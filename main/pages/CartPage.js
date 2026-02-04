class CartPage {
  constructor(page) {
    this.page = page;
  }

  // #region Locators
  get continueShoppingButton() { return this.page.locator('[data-test="continue-shopping"]'); }
  get checkoutButton() { return this.page.locator('[data-test="checkout"]'); }
  get removeBackpackButton() { return this.page.locator('[data-test="remove-sauce-labs-backpack"]'); }
  get cartItems() { return this.page.locator('.cart_item'); }
  get cartItemNames() { return this.page.locator('.inventory_item_name'); }
  get cartItemPrices() { return this.page.locator('.inventory_item_price'); }
  // #endregion

  // #region Actions
  async continueShopping() {
    await this.continueShoppingButton.click();
  }
  
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
  
  async removeBackpackFromCart() {
    await this.removeBackpackButton.click();
  }
  // #endregion

  // #region Asserts
  async isContinueShoppingButtonVisible() { 
    return await this.continueShoppingButton.isVisible(); 
  }
  
  async isCheckoutButtonVisible() { 
    return await this.checkoutButton.isVisible(); 
  }
  
  async cartItemCount() { 
    return await this.cartItems.count(); 
  }
  
  async cartItemNamesList() { 
    return await this.cartItemNames.allTextContents(); 
  }
  
  async cartItemPricesList() { 
    return await this.cartItemPrices.allTextContents(); 
  }
  
  async isRemoveBackpackButtonVisible() { 
    return await this.removeBackpackButton.isVisible(); 
  }
  // #endregion
}

module.exports = CartPage;