class LoginPage {
  constructor(page) {
    this.page = page;
  }

  // #region Locators
  get usernameInput() { return this.page.locator('[data-test="username"]'); }
  get passwordInput() { return this.page.locator('[data-test="password"]'); }
  get loginButton() { return this.page.locator('[data-test="login-button"]'); }
  get errorMessage() { return this.page.locator('[data-test="error"]'); }
  // #endregion

  // #region Actions
  async login(username, password) {
    await this.page.goto('https://www.saucedemo.com/');
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
  // #endregion

  // #region Asserts
  async isUsernameFieldVisible() { return await this.usernameInput.isVisible(); }
  async isPasswordFieldVisible() { return await this.passwordInput.isVisible(); }
  async isLoginButtonVisible() { return await this.loginButton.isVisible(); }
  async errorMessageIsVisible() { return await this.errorMessage.isVisible(); }
  async getErrorMessageText() { return await this.errorMessage.textContent(); }
  // #endregion
}

module.exports = LoginPage;