import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { BasePage } from '../pages/BasePage';
import { Helper } from '../utils/Helper';

test('Sign up a new user', async ({ page }) => {
    const homePage = new HomePage(page);
    const basePage = new BasePage(page);

    const randomUsername = await Helper.randomString(8);
    await homePage.navigateToHome();
    await homePage.clickSignUp();
    await basePage.type('#sign-username', randomUsername);
    await basePage.type('#sign-password', 'password123');
    await basePage.click('button[onclick="register()"]');
});
