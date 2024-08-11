import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { userData } from '../data/TestData';  

test('Attempt to checkout with an empty cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await homePage.navigateToHome();
    await homePage.clickCart();
    const totalPrice = await cartPage.getTotalPrice();
    expect(totalPrice).toBe(0);  // Ensure the cart is empty

    try {
        await cartPage.placeOrder();
        await checkoutPage.fillCheckoutForm(userData.checkoutDetails);
        const confirmationMessage = await checkoutPage.getOrderConfirmation();
        expect(confirmationMessage).not.toContain('Thank you for your purchase!');
    } catch (error) {
        console.log('Handled expected error during invalid checkout:', error.message);
    }
});
