class OrderCompletePage {
  constructor(page) {
    this.page = page;
  }

  // #region Locators
  get backToProductsButton() { return this.page.locator('[data-test="back-to-products"]'); }
  get orderCompleteHeader() { return this.page.locator('.complete-header'); }
  get orderCompleteText() { return this.page.locator('.complete-text'); }
  get ponyExpressImage() { return this.page.locator('.pony_express'); }
  // #endregion

  // #region Actions
  async backToProducts() {
    await this.backToProductsButton.click();
  }
  // #endregion

  // #region Asserts
  async isBackToProductsButtonVisible() { 
    return await this.backToProductsButton.isVisible(); 
  }
  
  async orderCompleteHeaderText() { 
    return await this.orderCompleteHeader.textContent(); 
  }
  
  async orderCompleteDescription() { 
    return await this.orderCompleteText.textContent(); 
  }
  
  async isPonyExpressImageVisible() { 
    return await this.ponyExpressImage.isVisible(); 
  }
  // #endregion
}

module.exports = OrderCompletePage;