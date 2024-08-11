import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { userData } from '../data/TestData';

test('Search for a product', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigateToHome();
    await homePage.clickProduct(userData.productName);
});

test('Search for all Sony brand laptops', async ({ page }) => {
    // Navigate to the home page
    await page.goto('https://www.demoblaze.com/');
    // Click on the 'Laptops' category
    await page.click('a:has-text("Laptops")');
    await page.waitForSelector('#tbodyid'); // Wait for the products list to load

    let countSony = 0;
    let hasNext, hasPrev;

    do {
        // Count Sony laptops on the current page
        countSony += await page.locator('a:has-text("Sony")').count();
        
        // Check presence of 'Next' and 'Previous' buttons
        hasNext = await page.isEnabled('button#next2') && await page.isVisible('button#next2:not([style*="display: none"])');
        hasPrev = await page.isEnabled('button#prev2');

        // Click 'Next' only if both 'Next' and 'Previous' buttons are present and 'Next' is not hidden
        if (hasNext && hasPrev) {
            await page.click('button#next2');
            // Wait for the products to update/reload after clicking 'Next'
            await page.waitForSelector('#tbodyid', { state: 'visible' });
            // Optionally, add a timeout to ensure all dynamic content has fully loaded
            await page.waitForTimeout(2000);  // Adjust timeout as needed
        }
    } while (hasNext && hasPrev);

    // Output the count to the console for verification
    console.log(`Total Sony laptops found: ${countSony}`);

    // Assertion to check if the count meets expected value
    expect(countSony).toEqual(userData.expectedSonyCount); // Update the expected count based on actual test data needs
});