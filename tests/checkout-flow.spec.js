const { test, expect } = require('./base-test');

test.describe('Checkout Flow Functionality', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('User can complete full checkout flow with single product', async ({ 
    inventoryPage, 
    cartPage, 
    checkoutInformationPage, 
    checkoutOverviewPage, 
    orderCompletePage 
  }) => {

    await inventoryPage.addBackpackToCart();
    await inventoryPage.goToCart();
    
    await expect(await cartPage.cartItemCount()).toBe(1);
    await expect((await cartPage.cartItemNamesList())[0]).toBe('Sauce Labs Backpack');
    await expect((await cartPage.cartItemPricesList())[0]).toBe('$29.99');
    
    await cartPage.proceedToCheckout();
    
    await checkoutInformationPage.fillCheckoutInformation('Dan', 'P', '1111');
    await checkoutInformationPage.continueToOverview();
    
    await expect((await checkoutOverviewPage.orderItemNamesList())[0]).toBe('Sauce Labs Backpack');
    await expect((await checkoutOverviewPage.orderItemPricesList())[0]).toBe('$29.99');
    await expect(await checkoutOverviewPage.paymentInfoText()).toBe('SauceCard #31337');
    await expect(await checkoutOverviewPage.shippingInfoText()).toBe('Free Pony Express Delivery!');
    await expect(await checkoutOverviewPage.subtotalText()).toBe('Item total: $29.99');
    await expect(await checkoutOverviewPage.taxText()).toBe('Tax: $2.40');
    await expect(await checkoutOverviewPage.totalText()).toBe('Total: $32.39');
    
    await checkoutOverviewPage.finishOrder();
    
    await expect(await orderCompletePage.orderCompleteHeaderText()).toBe('Thank you for your order!');
    await expect(await orderCompletePage.isPonyExpressImageVisible()).toBe(true);
    await expect(await orderCompletePage.isBackToProductsButtonVisible()).toBe(true);
    
    await orderCompletePage.backToProducts();
    
    await expect(await inventoryPage.inventoryIsVisible()).toBe(true);
    await expect(await inventoryPage.cartCount()).toBe('');
  });
});