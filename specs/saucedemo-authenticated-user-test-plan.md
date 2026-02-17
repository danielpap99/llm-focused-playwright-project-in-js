# SauceDemo Authenticated User Test Plan

## Application Overview

Comprehensive test plan for SauceDemo e-commerce application covering all functionality available to authenticated users including product browsing, cart management, checkout process, and user account features.

## Test Scenarios

### 1. Product Inventory & Browsing

**Seed:** `tests/setup-authenticated-user.spec.js`

#### 1.1. Verify product inventory page loads successfully

**File:** `tests/product-inventory/inventory-display.spec.js`

**Steps:**
  1. Navigate to inventory page after login
    - expect: Products page should load with title 'Products'
    - expect: Six products should be displayed in grid layout
    - expect: Each product should show image, name, description, price, and 'Add to cart' button
    - expect: Product prices should be correctly formatted (e.g., $29.99)

#### 1.2. Test product sorting functionality

**File:** `tests/product-inventory/product-sorting.spec.js`

**Steps:**
  1. Change sorting to 'Name (Z to A)'
    - expect: Products should be sorted alphabetically in descending order
    - expect: First product should be 'Test.allTheThings() T-Shirt (Red)'
    - expect: Last product should be 'Sauce Labs Backpack'
  2. Change sorting to 'Price (low to high)'
    - expect: Products should be sorted by price ascending
    - expect: First product should be 'Sauce Labs Onesie' ($7.99)
    - expect: Last product should be 'Sauce Labs Fleece Jacket' ($49.99)
  3. Change sorting to 'Price (high to low)'
    - expect: Products should be sorted by price descending
    - expect: First product should be 'Sauce Labs Fleece Jacket' ($49.99)
    - expect: Last product should be 'Sauce Labs Onesie' ($7.99)
  4. Reset sorting to 'Name (A to Z)'
    - expect: Products should return to default alphabetical order
    - expect: First product should be 'Sauce Labs Backpack'
    - expect: Last product should be 'Test.allTheThings() T-Shirt (Red)'

#### 1.3. Access individual product detail pages

**File:** `tests/product-inventory/product-details.spec.js`

**Steps:**
  1. Click on product name link for 'Sauce Labs Backpack'
    - expect: Should navigate to product detail page (/inventory-item.html?id=4)
    - expect: Page should display large product image
    - expect: Product name, description, and price should be visible
    - expect: 'Add to cart' button should be available
    - expect: 'Back to products' button should be present
  2. Click on product image for 'Sauce Labs Bike Light'
    - expect: Should navigate to product detail page (/inventory-item.html?id=0)
    - expect: All product information should be displayed correctly
    - expect: Navigation and action buttons should function properly
  3. Use 'Back to products' button
    - expect: Should return to main inventory page
    - expect: Product sorting selection should be maintained

### 2. Shopping Cart Management

**Seed:** `tests/setup-authenticated-user.spec.js`

#### 2.1. Add single item to cart

**File:** `tests/cart-management/add-single-item.spec.js`

**Steps:**
  1. Click 'Add to cart' button for 'Sauce Labs Backpack'
    - expect: Button should change to 'Remove'
    - expect: Shopping cart badge should show '1'
    - expect: Cart icon should become clickable
  2. Click shopping cart icon
    - expect: Should navigate to cart page (/cart.html)
    - expect: Cart should display one item: 'Sauce Labs Backpack'
    - expect: Item quantity should show '1'
    - expect: Item price should be '$29.99'
    - expect: 'Continue Shopping' and 'Checkout' buttons should be visible

#### 2.2. Add multiple items to cart

**File:** `tests/cart-management/add-multiple-items.spec.js`

**Steps:**
  1. Add 'Sauce Labs Bolt T-Shirt' to cart
    - expect: Cart badge should show '1'
    - expect: Product button should change to 'Remove'
  2. Add 'Sauce Labs Bike Light' to cart
    - expect: Cart badge should show '2'
    - expect: Product button should change to 'Remove'
  3. Add 'Sauce Labs Onesie' to cart
    - expect: Cart badge should show '3'
    - expect: Product button should change to 'Remove'
  4. Navigate to cart page
    - expect: All three items should be displayed in cart
    - expect: Each item should show correct name, description, and price
    - expect: Total quantity should be accurate

#### 2.3. Remove items from cart

**File:** `tests/cart-management/remove-items.spec.js`

**Steps:**
  1. Add 'Sauce Labs Backpack' to cart and navigate to cart page
    - expect: Cart should show one item
  2. Click 'Remove' button for the item
    - expect: Item should be removed from cart
    - expect: Cart should appear empty
    - expect: Cart badge should disappear or show '0'
  3. Return to inventory page
    - expect: 'Sauce Labs Backpack' button should show 'Add to cart' again
    - expect: Cart badge should not be visible

#### 2.4. Remove items from inventory page

**File:** `tests/cart-management/remove-from-inventory.spec.js`

**Steps:**
  1. Add 'Sauce Labs Fleece Jacket' to cart
    - expect: Button should change to 'Remove'
    - expect: Cart badge should show '1'
  2. Click 'Remove' button directly on inventory page
    - expect: Button should change back to 'Add to cart'
    - expect: Cart badge should disappear
    - expect: Item should be removed from cart

### 3. Checkout Process

**Seed:** `tests/setup-authenticated-user.spec.js`

#### 3.1. Complete checkout flow with single item

**File:** `tests/checkout/single-item-checkout.spec.js`

**Steps:**
  1. Add 'Sauce Labs Backpack' ($29.99) to cart and proceed to checkout
    - expect: Should navigate to checkout information page (/checkout-step-one.html)
    - expect: Page title should be 'Checkout: Your Information'
    - expect: Form should have fields: First Name, Last Name, Zip/Postal Code
    - expect: 'Continue' and 'Cancel' buttons should be present
  2. Fill out checkout form: First Name: 'John', Last Name: 'Doe', Zip: '12345'
    - expect: All fields should accept input
    - expect: Form validation should pass
  3. Click 'Continue' button
    - expect: Should navigate to checkout overview page (/checkout-step-two.html)
    - expect: Page title should be 'Checkout: Overview'
    - expect: Order summary should show 'Sauce Labs Backpack'
    - expect: Payment info should show 'SauceCard #31337'
    - expect: Shipping info should show 'Free Pony Express Delivery!'
    - expect: Price breakdown should show: Item total: $29.99, Tax: $2.40, Total: $32.39
  4. Click 'Finish' button
    - expect: Should navigate to order complete page (/checkout-complete.html)
    - expect: Page should show 'Thank you for your order!' message
    - expect: Pony Express image should be displayed
    - expect: 'Back Home' button should be present
    - expect: Success message about dispatch should be visible
  5. Click 'Back Home' button
    - expect: Should return to inventory page
    - expect: Cart should be empty (no badge visible)
    - expect: All product buttons should show 'Add to cart'

#### 3.2. Complete checkout flow with multiple items

**File:** `tests/checkout/multiple-items-checkout.spec.js`

**Steps:**
  1. Add three items to cart: Sauce Labs Onesie ($7.99), Sauce Labs Bike Light ($9.99), Sauce Labs Bolt T-Shirt ($15.99)
    - expect: Cart badge should show '3'
  2. Navigate to cart and verify all items are present
    - expect: All three items should be listed with correct details
    - expect: Each item quantity should be '1'
  3. Proceed through checkout with information: First Name: 'Jane', Last Name: 'Smith', Zip: '54321'
    - expect: Checkout information should be accepted
    - expect: Should proceed to overview page
  4. Verify checkout overview details
    - expect: All three items should be listed in overview
    - expect: Item total should be $33.97 (7.99 + 9.99 + 15.99)
    - expect: Tax should be calculated correctly
    - expect: Total amount should include tax
  5. Complete the order
    - expect: Order completion page should display success message
    - expect: Cart should be reset to empty after returning home

#### 3.3. Test checkout form validation

**File:** `tests/checkout/form-validation.spec.js`

**Steps:**
  1. Add any item to cart and proceed to checkout information page
    - expect: Checkout form should be displayed
  2. Try to continue with empty First Name field
    - expect: Error message should appear: 'Error: First Name is required'
    - expect: Should remain on checkout information page
  3. Fill First Name: 'John' and try to continue with empty Last Name
    - expect: Error message should appear: 'Error: Last Name is required'
    - expect: Should remain on checkout information page
  4. Fill First Name: 'John', Last Name: 'Doe' and try to continue with empty Postal Code
    - expect: Error message should appear: 'Error: Postal Code is required'
    - expect: Should remain on checkout information page
  5. Fill all required fields and continue
    - expect: Should successfully progress to checkout overview page
    - expect: No error messages should be displayed

#### 3.4. Test checkout cancellation flows

**File:** `tests/checkout/checkout-cancellation.spec.js`

**Steps:**
  1. Add item to cart, proceed to checkout information and click 'Cancel'
    - expect: Should return to cart page
    - expect: Items should still be in cart
    - expect: Cart state should be preserved
  2. Proceed to checkout overview page and click 'Cancel'
    - expect: Should return to inventory page
    - expect: Items should still be in cart
    - expect: Cart badge should still show item count
  3. Use 'Continue Shopping' button from cart page
    - expect: Should return to inventory page
    - expect: Cart contents should be preserved
    - expect: User can continue shopping

### 4. Navigation & Menu Functionality

**Seed:** `tests/setup-authenticated-user.spec.js`

#### 4.1. Test hamburger menu functionality

**File:** `tests/navigation/menu-navigation.spec.js`

**Steps:**
  1. Click hamburger menu button
    - expect: Side menu should slide out
    - expect: Menu items should be visible: All Items, About, Logout, Reset App State
    - expect: 'All Items' should be highlighted as active
    - expect: Close menu button (X) should be present
  2. Click 'About' menu item
    - expect: Should open new tab/window
    - expect: Should navigate to https://saucelabs.com/
    - expect: Original SauceDemo tab should remain open
  3. Click 'All Items' menu item
    - expect: Should navigate to inventory page if not already there
    - expect: Menu should close
    - expect: All products should be displayed
  4. Open menu and click 'Reset App State'
    - expect: All items should be removed from cart
    - expect: Cart badge should disappear
    - expect: All 'Remove' buttons should change back to 'Add to cart'
    - expect: Application should reset to initial state

#### 4.2. Test logout functionality

**File:** `tests/navigation/logout.spec.js`

**Steps:**
  1. Add items to cart and open hamburger menu
    - expect: Menu should open with all items visible
  2. Click 'Logout' menu item
    - expect: Should navigate back to login page (/)
    - expect: Login form should be displayed
    - expect: Should not be able to access inventory page without re-authentication
    - expect: Cart state should be cleared
  3. Try to manually navigate to inventory page while logged out
    - expect: Should be redirected to login page
    - expect: Session should be properly terminated

### 5. User Experience & Edge Cases

**Seed:** `tests/setup-authenticated-user.spec.js`

#### 5.1. Test application state persistence

**File:** `tests/edge-cases/state-persistence.spec.js`

**Steps:**
  1. Add multiple items to cart and navigate between pages
    - expect: Cart contents should persist across page navigation
    - expect: Cart badge should always show correct count
    - expect: Product button states should remain consistent
  2. Sort products, add items to cart, then navigate to product detail and back
    - expect: Sorting preference should be maintained
    - expect: Cart contents should be preserved
    - expect: Page state should be consistent

#### 5.2. Test maximum cart functionality

**File:** `tests/edge-cases/maximum-cart.spec.js`

**Steps:**
  1. Add all six available products to cart
    - expect: Cart badge should show '6'
    - expect: All product buttons should show 'Remove'
    - expect: Cart page should display all six items correctly
  2. Proceed through complete checkout with all items
    - expect: Checkout should handle multiple items correctly
    - expect: Total calculation should be accurate for all items
    - expect: Order completion should process successfully

#### 5.3. Test responsive design and UI elements

**File:** `tests/edge-cases/ui-responsiveness.spec.js`

**Steps:**
  1. Verify all images load correctly
    - expect: All product images should display without broken links
    - expect: Pony Express image should load on completion page
    - expect: Menu icons should display properly
  2. Test all clickable elements
    - expect: All buttons should have proper cursor pointer styling
    - expect: Links should be accessible and functional
    - expect: Form elements should accept input correctly
  3. Verify text content and formatting
    - expect: Product descriptions should be complete and readable
    - expect: Prices should be consistently formatted
    - expect: Error messages should be clear and helpful
