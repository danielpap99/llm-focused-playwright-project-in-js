const { test: baseTest, expect, chromium, firefox } = require('@playwright/test');
const LoginPage = require('../main/pages/LoginPage');
const InventoryPage = require('../main/pages/InventoryPage');

const test = baseTest.extend({
  browserName: async ({}, use) => {
    const browsers = ['chromium', 'firefox', 'edge'];
    const selectedBrowser = browsers[Math.floor(Math.random() * browsers.length)];
    await use(selectedBrowser);
  },

  browser: async ({ browserName }, use) => {
    let headlessStatus = true;
    let browser;

    if (browserName === 'chromium') {
      browser = await chromium.launch({ headless: headlessStatus });
    } else if (browserName === 'firefox') {
      browser = await firefox.launch({ headless: headlessStatus });
    } else {
      browser = await chromium.launch({ headless: headlessStatus, channel: 'msedge' });
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
    console.log(`Running test "${testInfo.title}" on ${browserName}`);
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
});

exports.test = test;
exports.expect = expect;
