const { test, expect } = require("./base-test");

test.describe("Login Functionality", () => {
  test("Log-in page loads correctly", async ({ page, loginPage }) => {
    await page.goto("https://www.saucedemo.com/");

    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test("User can log in successfully", async ({ page, loginPage, inventoryPage }) => {
    await loginPage.login("standard_user", "secret_sauce");

    await expect(inventoryPage.inventoryContainer).toBeVisible();
    await expect(inventoryPage.shoppingCartIcon).toBeVisible();
    await expect(inventoryPage.sortContainer).toBeVisible();
  });

  test("User cannot log in with invalid username", async ({ page, loginPage, inventoryPage }) => {
    await loginPage.login("invalid_username", "secret_sauce");

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText("Epic sadface: Username and password do not match any user in this service");
    await expect(inventoryPage.inventoryContainer).not.toBeVisible();
  });

  test("User cannot log in with valid username and invalid password", async ({ page, loginPage, inventoryPage }) => {
    await loginPage.login("standard_user", "invalid_password");

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText("Epic sadface: Username and password do not match any user in this service");
    await expect(inventoryPage.inventoryContainer).not.toBeVisible();
  });
});
