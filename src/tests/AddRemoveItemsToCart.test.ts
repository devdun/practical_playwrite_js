import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { userData } from '../data/TestData';

test.describe('Cart operations', () => {
    test('Add a product to cart and verify its presence', async ({ page }) => {
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);

        await homePage.navigateToHome();
        await homePage.clickProduct(userData.productName);
        await productPage.addToCart();
        await homePage.clickCart();

        await page.waitForSelector('#tbodyid', { state: 'visible' });

        const isProductInCart = await cartPage.verifyProductInCart(userData.productName);
        expect(isProductInCart).toBeTruthy();
    });

    test('Add two products, remove one, and verify its absence', async ({ page }) => {
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);

        await homePage.navigateToHome();
        
        // Add the first product
        await homePage.clickProduct(userData.productNames[0]);
        await productPage.addToCart();
        await homePage.clickHomeButton();

        // Add the second product
        await homePage.clickProduct(userData.productNames[1]);
        await productPage.addToCart();
        await homePage.clickCart();

        // Wait for the cart to be visible
        await page.waitForSelector('#tbodyid', { state: 'visible' });

        // Remove the first product
        await cartPage.removeProductFromCart(userData.productNames[0]);

        // Wait until the first product is removed before checking the count
        await page.waitForTimeout(2000); // Add a short delay to ensure the cart is updated

        // Verify the number of items left in the cart
        const itemCount = await cartPage.getItemCount();
        expect(itemCount).toBe(1);
    });
});