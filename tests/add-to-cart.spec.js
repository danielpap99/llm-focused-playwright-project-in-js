const { test, expect } = require("./base-test");

test.describe("Add to Cart Functionality", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login("standard_user", "secret_sauce");
  });

  test("User can add two items to cart and cart count updates to 2", async ({ inventoryPage }) => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.addBikeLightToCart();

    await expect(inventoryPage.shoppingCartIcon).toHaveText("2");

    await expect(inventoryPage.addToCartBackpackButton).not.toBeVisible();
    await expect(inventoryPage.addToCartBikeLightButton).not.toBeVisible();

    await expect(inventoryPage.removeBackpackButton).toBeVisible();
    await expect(inventoryPage.removeBikeLightButton).toBeVisible();
  });
});
