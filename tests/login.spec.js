const { test, expect } = require('./baseTest');

test('Log-in page loads correctly', async ({ page, loginPage }) => {
  await page.goto('https://www.saucedemo.com/');

  await expect(await loginPage.isUsernameFieldVisible()).toBe(true);
  await expect(await loginPage.isPasswordFieldVisible()).toBe(true);
  await expect(await loginPage.isLoginButtonVisible()).toBe(true);
});

test('User can log in successfully', async ({ page, loginPage, inventoryPage }) => {
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(await inventoryPage.inventoryIsVisible()).toBe(true);
  await expect(await inventoryPage.shoppingCartIconIsVisible()).toBe(true);
  await expect(await inventoryPage.sortContainerIsVisible()).toBe(true);
});

test('User cannot log in with invalid username', async ({ page, loginPage, inventoryPage }) => {
  await loginPage.login('invalid_username', 'secret_sauce')

  await expect(await loginPage.errorMessageIsVisible()).toBe(true);
  await expect(await loginPage.getErrorMessageText()).toBe('Epic sadface: Username and password do not match any user in this service');
  await expect(await inventoryPage.inventoryIsVisible()).toBe(false);
});

test('User cannot log in with valid username and invalid password', async ({ page, loginPage, inventoryPage }) => {
  await loginPage.login('standard_user', 'invalid_password');

  await expect(await loginPage.errorMessageIsVisible()).toBe(true);
  await expect(await loginPage.getErrorMessageText()).toBe('Epic sadface: Username and password do not match any user in this service');
  await expect(await inventoryPage.inventoryIsVisible()).toBe(false);
});