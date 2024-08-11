import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { userData } from '../data/TestData';

test('Login with invalid credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.navigateToHome();
    await homePage.clickLogin();
    await loginPage.login(userData.invalidUser.username, userData.invalidUser.password);
    
    try {
        const loginError = await page.waitForSelector('.error-message', { timeout: 5000 });
        expect(loginError).toBeDefined();
    } catch (error) {
        console.error('Expected error message did not appear:', error.message);
        throw new Error('Login failure error message not detected.');
    }
});
