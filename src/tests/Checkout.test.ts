import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('Checkout process', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await homePage.navigateToHome();
    await homePage.clickCart();
    await cartPage.placeOrder();
    await checkoutPage.fillCheckoutForm({
        name: 'John Doe',
        country: 'USA',
        city: 'New York',
        card: '1234567890123456',
        month: '12',
        year: '2024',
    });
});
