const { test, expect } = require("./base-test");

test.describe("Login Functionality", () => {
  test("@Smoke Log-in page loads correctly", async ({ page, loginPage }) => {
    await page.goto("https://www.saucedemo.com/");

    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test("@Smoke User can log in successfully", async ({ loginPage, inventoryPage }) => {
    await loginPage.login("standard_user", "secret_sauce");

    await expect(inventoryPage.inventoryContainer).toBeVisible();
    await expect(inventoryPage.shoppingCartIcon).toBeVisible();
    await expect(inventoryPage.sortContainer).toBeVisible();
  });

  test("User cannot log in with invalid username", async ({ loginPage, inventoryPage }) => {
    await loginPage.login("invalid_username", "secret_sauce");

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText("Epic sadface: Username and password do not match any user in this service");
    await expect(inventoryPage.inventoryContainer).not.toBeVisible();
  });

  test("User cannot log in with valid username and invalid password", async ({ loginPage, inventoryPage }) => {
    await loginPage.login("standard_user", "invalid_password");

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText("Epic sadface: Username and password do not match any user in this service");
    await expect(inventoryPage.inventoryContainer).not.toBeVisible();
  });

  test("User cannot log in with empty username and password fields", async ({ loginPage, inventoryPage }) => {
    await loginPage.login("", "");

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText("Epic sadface: Username is required");
    await expect(inventoryPage.inventoryContainer).not.toBeVisible();
  });

  test("Locked out user cannot log in", async ({ loginPage, inventoryPage }) => {
    await loginPage.login("locked_out_user", "secret_sauce");

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText("Epic sadface: Sorry, this user has been locked out.");
    await expect(inventoryPage.inventoryContainer).not.toBeVisible();
  });

  test("Locked out username with wrong password shows generic invalid credentials message", async ({ loginPage, inventoryPage }) => {
    await loginPage.login("locked_out_user", "password123");

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText("Epic sadface: Username and password do not match any user in this service");
    await expect(loginPage.errorMessage).not.toHaveText("Epic sadface: Sorry, this user has been locked out.");
    await expect(inventoryPage.inventoryContainer).not.toBeVisible();
  });
});
