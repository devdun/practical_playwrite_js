import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('Navigate to different products and verify correct pages', async ({ page }) => {
    const homePage = new HomePage(page);

    // Navigate to the homepage first
    await homePage.navigateToHome();

    // Navigate to and verify the first product
    await homePage.clickProduct('Samsung galaxy s6');
    // Check for a unique identifier on the product page, like a title or specific image alt text
    await expect(page).toHaveURL(/.*prod.html\?idp_=1/); 
    await expect(page.locator('h2')).toHaveText('Samsung galaxy s6');

    // Return to the homepage before going to the next product
    await homePage.navigateToHome();

    // Navigate to and verify the second product
    await homePage.clickProduct('Nokia lumia 1520');
    // Similar checks for the second product
    await expect(page).toHaveURL(/.*prod.html\?idp_=2/);
    await expect(page.locator('h2')).toHaveText('Nokia lumia 1520');
});
