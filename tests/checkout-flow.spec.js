const { test, expect } = require("./base-test");

test.describe("Checkout Flow Functionality", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login("standard_user", "secret_sauce");
  });

  test("User can complete full checkout flow with single product", async ({
    inventoryPage,
    cartPage,
    checkoutInformationPage,
    checkoutOverviewPage,
    orderCompletePage
  }) => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.goToCart();

    await expect(cartPage.cartItems).toHaveCount(1);
    await expect(cartPage.cartItemNames.first()).toHaveText("Sauce Labs Backpack");
    await expect(cartPage.cartItemPrices.first()).toHaveText("$29.99");

    await cartPage.proceedToCheckout();

    await checkoutInformationPage.fillCheckoutInformation("Dan", "P", "1111");
    await checkoutInformationPage.continueToOverview();

    await expect(checkoutOverviewPage.orderItemNames.first()).toHaveText("Sauce Labs Backpack");
    await expect(checkoutOverviewPage.orderItemPrices.first()).toHaveText("$29.99");
    await expect(checkoutOverviewPage.paymentInfo).toHaveText("SauceCard #31337");
    await expect(checkoutOverviewPage.shippingInfo).toHaveText("Free Pony Express Delivery!");
    await expect(checkoutOverviewPage.subtotalLabel).toHaveText("Item total: $29.99");
    await expect(checkoutOverviewPage.taxLabel).toHaveText("Tax: $2.40");
    await expect(checkoutOverviewPage.totalLabel).toHaveText("Total: $32.39");

    await checkoutOverviewPage.finishOrder();

    await expect(orderCompletePage.orderCompleteHeader).toHaveText("Thank you for your order!");
    await expect(orderCompletePage.ponyExpressImage).toBeVisible();
    await expect(orderCompletePage.backToProductsButton).toBeVisible();

    await orderCompletePage.backToProducts();

    await expect(inventoryPage.inventoryContainer).toBeVisible();
    await expect(inventoryPage.shoppingCartIcon).toHaveText("");
  });
});
