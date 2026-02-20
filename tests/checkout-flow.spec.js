const { test, expect } = require("./base-test");
const testData = require("./data/checkout-test-data.json");

test.describe("Checkout Flow Functionality", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login("standard_user", "secret_sauce");
  });

  for (const product of testData) {
    test(`User can complete full checkout flow with ${product.productName}`, async ({
      inventoryPage,
      cartPage,
      checkoutInformationPage,
      checkoutOverviewPage,
      orderCompletePage
    }) => {
      await inventoryPage.addProductToCart(product.dataTestId);
      await inventoryPage.goToCart();

      await expect(cartPage.cartItems).toHaveCount(1);
      await expect(cartPage.cartItemNames.first()).toHaveText(product.productName);
      await expect(cartPage.cartItemPrices.first()).toHaveText(product.expectedPrice);

      await cartPage.proceedToCheckout();

      await checkoutInformationPage.fillCheckoutInformation("Dan", "P", "1111");
      await checkoutInformationPage.continueToOverview();

      await expect(checkoutOverviewPage.orderItemNames.first()).toHaveText(product.productName);
      await expect(checkoutOverviewPage.orderItemPrices.first()).toHaveText(product.expectedPrice);
      await expect(checkoutOverviewPage.paymentInfo).toHaveText("SauceCard #31337");
      await expect(checkoutOverviewPage.shippingInfo).toHaveText("Free Pony Express Delivery!");
      await expect(checkoutOverviewPage.subtotalLabel).toHaveText(product.expectedSubtotal);
      await expect(checkoutOverviewPage.taxLabel).toHaveText(product.expectedTax);
      await expect(checkoutOverviewPage.totalLabel).toHaveText(product.expectedTotal);

      await checkoutOverviewPage.finishOrder();

      await expect(orderCompletePage.orderCompleteHeader).toHaveText("Thank you for your order!");
      await expect(orderCompletePage.ponyExpressImage).toBeVisible();
      await expect(orderCompletePage.backToProductsButton).toBeVisible();

      await orderCompletePage.backToProducts();

      await expect(inventoryPage.inventoryContainer).toBeVisible();
      await expect(inventoryPage.shoppingCartIcon).toHaveText("1");
    });
  }
});
