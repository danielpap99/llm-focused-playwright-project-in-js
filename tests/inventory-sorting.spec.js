const { test, expect } = require("./base-test");

test.describe("Inventory Sorting Functionality", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login("standard_user", "secret_sauce");
  });

  test("Inventory is sorted alphabetically by default", async ({ page, loginPage, inventoryPage }) => {
    await expect(inventoryPage.sortContainer).toHaveValue("az");

    const itemNames = await inventoryPage.inventoryItemNames.allTextContents();
    const alphabeticalNames = [...itemNames].sort((a, b) => a.localeCompare(b));

    await expect(itemNames).toEqual(alphabeticalNames);
  });

  test("Inventory is sorted correctly when Z to A option is selected", async ({ page, loginPage, inventoryPage }) => {
    const itemNames = await inventoryPage.inventoryItemNames.allTextContents();
    const expectedSortedNames = [...itemNames].sort((a, b) => b.localeCompare(a));

    await inventoryPage.selectSortOption("za");

    const itemNamesAfterSort = await inventoryPage.inventoryItemNames.allTextContents();

    await expect(itemNamesAfterSort).toEqual(expectedSortedNames);
  });

  test("Inventory is sorted correctly when A to Z option is selected again", async ({ page, loginPage, inventoryPage }) => {
    const itemNames = await inventoryPage.inventoryItemNames.allTextContents();
    const expectedAlphabeticalNames = [...itemNames].sort((a, b) => a.localeCompare(b));
    const expectedReverseAlphabeticalNames = [...itemNames].sort((a, b) => b.localeCompare(a));

    await inventoryPage.selectSortOption("za");
    let itemNamesAfterSort = await inventoryPage.inventoryItemNames.allTextContents();

    await expect(itemNamesAfterSort).toEqual(expectedReverseAlphabeticalNames);

    await inventoryPage.selectSortOption("az");
    itemNamesAfterSort = await inventoryPage.inventoryItemNames.allTextContents();

    await expect(itemNamesAfterSort).toEqual(expectedAlphabeticalNames);
  });

  test("Inventory is sorted correctly when descending price option is selected", async ({ page, loginPage, inventoryPage }) => {
    const itemPrices = await inventoryPage.inventoryItemPrices.allTextContents();
    const numericPrices = itemPrices.map((price) => parseFloat(price.replace("$", "")));
    const expectedSortedPrices = [...numericPrices].sort((a, b) => a - b);

    await inventoryPage.selectSortOption("lohi");

    const itemPricesAfterSort = await inventoryPage.inventoryItemPrices.allTextContents();
    const numericPricesAfterSort = itemPricesAfterSort.map((price) => parseFloat(price.replace("$", "")));

    await expect(numericPricesAfterSort).toEqual(expectedSortedPrices);
  });

  test("Inventory is sorted correctly when ascending price option is selected", async ({ page, loginPage, inventoryPage }) => {
    const itemPrices = await inventoryPage.inventoryItemPrices.allTextContents();
    const numericPrices = itemPrices.map((price) => parseFloat(price.replace("$", "")));
    const expectedSortedPrices = [...numericPrices].sort((a, b) => b - a);

    await inventoryPage.selectSortOption("hilo");

    const itemPricesAfterSort = await inventoryPage.inventoryItemPrices.allTextContents();
    const numericPricesAfterSort = itemPricesAfterSort.map((price) => parseFloat(price.replace("$", "")));

    await expect(numericPricesAfterSort).toEqual(expectedSortedPrices);
  });
});
