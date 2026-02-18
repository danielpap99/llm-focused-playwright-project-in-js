const { test, expect } = require("./base-test");

test.describe("Product Detail Pages", () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.login("standard_user", "secret_sauce");
    await expect(inventoryPage.inventoryContainer).toBeVisible();
  });

  test("User can access individual product detail pages", async ({ page, inventoryPage, productDetailPage }) => {
    // Step 1: Click on product name link for 'Sauce Labs Backpack'
    await inventoryPage.clickBackpackTitle();

    // Verify navigation to product detail page
    await expect(page).toHaveURL(/\/inventory-item\.html\?id=4/);

    // Verify page displays large product image
    await expect(productDetailPage.productImage).toBeVisible();

    // Verify product name, description, and price are visible
    await expect(productDetailPage.productName).toHaveText("Sauce Labs Backpack");
    await expect(productDetailPage.productDescription).toHaveText(
      "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection."
    );
    await expect(productDetailPage.productPrice).toHaveText("$29.99");

    // Verify 'Add to cart' button is available
    await expect(productDetailPage.addToCartButton).toBeVisible();
    await expect(productDetailPage.addToCartButton).toHaveText("Add to cart");

    // Verify 'Back to products' button is present
    await expect(productDetailPage.backToProductsButton).toBeVisible();
    await expect(productDetailPage.backToProductsButton).toHaveText("Back to products");

    // Step 2: Return to inventory and click on product image for 'Sauce Labs Bike Light'
    await productDetailPage.goBackToProducts();
    await expect(page).toHaveURL(/\/inventory\.html/);
    await expect(inventoryPage.inventoryContainer).toBeVisible();

    await inventoryPage.clickBikeLightImage();

    // Verify navigation to product detail page
    await expect(page).toHaveURL(/\/inventory-item\.html\?id=0/);

    // Verify all product information is displayed correctly
    await expect(productDetailPage.productImage).toBeVisible();
    await expect(productDetailPage.productName).toHaveText("Sauce Labs Bike Light");
    await expect(productDetailPage.productDescription).toHaveText(
      "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included."
    );
    await expect(productDetailPage.productPrice).toHaveText("$9.99");

    // Verify navigation and action buttons function properly
    await expect(productDetailPage.addToCartButton).toBeVisible();
    await expect(productDetailPage.backToProductsButton).toBeVisible();

    // Step 3: Use 'Back to products' button
    await productDetailPage.goBackToProducts();

    // Verify return to main inventory page
    await expect(page).toHaveURL(/\/inventory\.html/);
    await expect(inventoryPage.inventoryContainer).toBeVisible();

    // Verify products are displayed (sorting should be maintained)
    await expect(inventoryPage.inventoryItemNames.first()).toBeVisible();
  });
});
