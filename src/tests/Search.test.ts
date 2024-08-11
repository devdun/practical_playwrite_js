import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('Search for a product', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigateToHome();
    await homePage.clickProduct('Samsung galaxy s6');
});
