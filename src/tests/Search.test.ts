import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { userData } from '../data/TestData';

test('Search for a product', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigateToHome();
    await homePage.clickProduct(userData.productName);
});
