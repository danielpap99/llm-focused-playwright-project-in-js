const { test: baseTest, expect } = require("@playwright/test");

const LoginPage = require("../main/pages/LoginPage");
const InventoryPage = require("../main/pages/InventoryPage");
const CartPage = require("../main/pages/CartPage");
const CheckoutInformationPage = require("../main/pages/CheckoutInformationPage");
const CheckoutOverviewPage = require("../main/pages/CheckoutOverviewPage");
const OrderCompletePage = require("../main/pages/OrderCompletePage");

const test = baseTest.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutInformationPage: async ({ page }, use) => {
    await use(new CheckoutInformationPage(page));
  },

  checkoutOverviewPage: async ({ page }, use) => {
    await use(new CheckoutOverviewPage(page));
  },

  orderCompletePage: async ({ page }, use) => {
    await use(new OrderCompletePage(page));
  }
});

module.exports = { test, expect };
