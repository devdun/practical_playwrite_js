import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { userData } from '../data/TestData';

test('Login with valid credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.navigateToHome();
    await homePage.clickLogin();
    await loginPage.login(userData.validUser.username, userData.validUser.password);
});
