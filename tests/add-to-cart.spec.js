const { test, expect } = require('./base-test');

test.describe('Add to Cart Functionality', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('User can add two items to cart and cart count updates to 2', async ({ inventoryPage }) => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.addBikeLightToCart();
    
    await expect(await inventoryPage.getCartCount()).toBe('2');
    
    await expect(await inventoryPage.isBackpackAddToCartButtonVisible()).toBe(false);
    await expect(await inventoryPage.isBikeLightAddToCartButtonVisible()).toBe(false);
    
    await expect(await inventoryPage.isRemoveBackpackButtonVisible()).toBe(true);
    await expect(await inventoryPage.isRemoveBikeLightButtonVisible()).toBe(true);
  });
});