import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { userData } from '../data/TestData';

test('Checkout process', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await homePage.navigateToHome();
    await homePage.clickCart();
    await cartPage.placeOrder();
    await checkoutPage.fillCheckoutForm(userData.checkoutDetails);
    const confirmationMessage = await checkoutPage.getOrderConfirmation();
    if (!confirmationMessage.includes('Thank you for your purchase!')) {
        throw new Error('Order was not successful');
    }
});
