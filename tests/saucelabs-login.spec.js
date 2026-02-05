const { test, expect } = require('./base-test');

test.describe('Sauce Labs sign in opens a new tab', () => {

  test('Sign in option on sauce labs opens a  new tab', async ({ page, context }) => {
    await page.goto('https://saucelabs.com/');
    
    // Set up promise to wait for new page before clicking
    const pagePromise = context.waitForEvent('page');
    
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // Wait for new tab to open
    const newPage = await pagePromise;
    await newPage.waitForLoadState('networkidle');
    
    // Verify URL contains accounts.saucelabs.com
    expect(newPage.url()).toContain('accounts.saucelabs.com/');
    
    // Clean up - close the new tab
    await newPage.close();
  });
});