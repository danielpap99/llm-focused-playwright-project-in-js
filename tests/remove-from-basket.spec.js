const { test, expect } = require("./base-test");

test.describe("Remove from basket functionality", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login("standard_user", "secret_sauce");
  });

  test("User can remove item from basket", async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await expect(inventoryPage.shoppingCartIcon).toHaveText("1");

    await inventoryPage.goToCart();
    await cartPage.removeProductFromCart("Sauce Labs Backpack");

    await expect(inventoryPage.shoppingCartIcon).toHaveText("");
    await expect(cartPage.removeButton("Sauce Labs Backpack")).not.toBeVisible();
    await expect(cartPage.cartItems).toHaveCount(0);
  });
});
