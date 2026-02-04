class CheckoutInformationPage {
  constructor(page) {
    this.page = page;
  }

  // #region Locators
  get firstNameInput() { return this.page.locator('[data-test="firstName"]'); }
  get lastNameInput() { return this.page.locator('[data-test="lastName"]'); }
  get postalCodeInput() { return this.page.locator('[data-test="postalCode"]'); }
  get continueButton() { return this.page.locator('[data-test="continue"]'); }
  get cancelButton() { return this.page.locator('[data-test="cancel"]'); }
  // #endregion

  // #region Actions
  async fillCheckoutInformation(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }
  
  async continueToOverview() {
    await this.continueButton.click();
  }
  
  async cancelCheckout() {
    await this.cancelButton.click();
  }
  // #endregion

  // #region Asserts
  async isFirstNameInputVisible() { 
    return await this.firstNameInput.isVisible(); 
  }
  
  async isLastNameInputVisible() { 
    return await this.lastNameInput.isVisible(); 
  }
  
  async isPostalCodeInputVisible() { 
    return await this.postalCodeInput.isVisible(); 
  }
  
  async isContinueButtonVisible() { 
    return await this.continueButton.isVisible(); 
  }
  
  async isCancelButtonVisible() { 
    return await this.cancelButton.isVisible(); 
  }
  // #endregion
}

module.exports = CheckoutInformationPage;