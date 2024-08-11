import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { userData } from '../data/TestData';

test('Add multiple products to cart and verify total', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await homePage.navigateToHome();
    
    let calculatedTotal = 0;

    for (const productName of userData.productNames) {
        await homePage.clickProduct(productName);
        
        // Get the price of the product
        const priceText = await productPage.getPrice();
        const price = parseFloat(priceText.replace('$', '').trim());
        calculatedTotal += price;

        await productPage.addToCart();
        await productPage.handleDialogIfPresent();

        // Ensure the product is added before navigating away
        await page.waitForTimeout(1000);

        // Use the home button to navigate instead of page.goto()
        await homePage.clickHomeButton();
    }

    await homePage.clickCart();

    // Wait for the cart page to load by waiting for a specific element
    await page.waitForSelector('#totalp', { state: 'visible' });

    const totalPrice = await cartPage.getTotalPrice();
    console.log(`Expected: ${calculatedTotal}, Received: ${totalPrice}`);
    expect(totalPrice).toEqual(calculatedTotal);

    const itemCount = await cartPage.getItemCount();
    console.log(`Expected Item Count: ${userData.productNames.length}, Received: ${itemCount}`);
    expect(itemCount).toBe(userData.productNames.length);
});
