const { test, expect } = require("./base-test");

test.describe("Add to Cart Functionality", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login("standard_user", "secret_sauce");
  });

  test("User can add two items to cart", async ({ inventoryPage }) => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await inventoryPage.addProductToCart("Sauce Labs Bike Light");

    await expect(inventoryPage.shoppingCartIcon).toHaveText("2");

    await expect(inventoryPage.addToBasketButton("Sauce Labs Backpack")).not.toBeVisible();
    await expect(inventoryPage.addToBasketButton("Sauce Labs Bike Light")).not.toBeVisible();

    await expect(inventoryPage.removeButton("Sauce Labs Backpack")).toBeVisible();
    await expect(inventoryPage.removeButton("Sauce Labs Bike Light")).toBeVisible();
  });

  test("User can remove items from cart from the inventory page", async ({ inventoryPage }) => {
    await inventoryPage.addProductToCart("Sauce Labs Onesie");
    await inventoryPage.addProductToCart("Sauce Labs Fleece Jacket");

    await expect(inventoryPage.shoppingCartIcon).toHaveText("2");

    await inventoryPage.removeProductFromCart("Sauce Labs Onesie");
    await expect(inventoryPage.removeButton("Sauce Labs Onesie")).not.toBeVisible();
    await expect(inventoryPage.addToBasketButton("Sauce Labs Onesie")).toBeVisible();
    await expect(inventoryPage.shoppingCartIcon).toHaveText("1");

    await inventoryPage.removeProductFromCart("Sauce Labs Fleece Jacket");
    await expect(inventoryPage.removeButton("Sauce Labs Fleece Jacket")).not.toBeVisible();
    await expect(inventoryPage.addToBasketButton("Sauce Labs Fleece Jacket")).toBeVisible();
    await expect(inventoryPage.shoppingCartIcon).toHaveText("");
  });
});
