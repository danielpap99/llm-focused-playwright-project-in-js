const { test: baseTest, expect, chromium, firefox } = require("@playwright/test");
const LoginPage = require("../main/pages/LoginPage");
const InventoryPage = require("../main/pages/InventoryPage");
const CartPage = require("../main/pages/CartPage");
const CheckoutInformationPage = require("../main/pages/CheckoutInformationPage");
const CheckoutOverviewPage = require("../main/pages/CheckoutOverviewPage");
const OrderCompletePage = require("../main/pages/OrderCompletePage");

const test = baseTest.extend({
  browserName: async ({}, use) => {
    const browsers = ["chromium", "edge"];
    const selectedBrowser = browsers[Math.floor(Math.random() * browsers.length)];
    await use(selectedBrowser);
  },

  browser: async ({ browserName }, use) => {
    let headlessStatus = false;
    let browser;

    if (browserName === "chromium") {
      browser = await chromium.launch({ headless: headlessStatus });
    } else {
      browser = await chromium.launch({ headless: headlessStatus, channel: "msedge" });
    }

    await use(browser);
    await browser.close();
  },

  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    await use(context);
    await context.close();
  },

  page: async ({ context, browserName }, use, testInfo) => {
    const page = await context.newPage();
    await use(page);
    await page.close();
  },

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

exports.test = test;
exports.expect = expect;
