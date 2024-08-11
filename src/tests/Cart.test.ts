import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test('Add a product to cart and verify', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await homePage.navigateToHome();
    await homePage.clickProduct('Samsung galaxy s6');
    await productPage.addToCart();
    await homePage.clickCart();
    const isProductInCart = await cartPage.verifyProductInCart('Samsung galaxy s6');
    if (!isProductInCart) {
        throw new Error('Product not found in cart');
    }
});
