import { config } from '../config/config';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    async navigateToHome(): Promise<void> {
        for (let i = 0; i < 3; i++) {  // Try 3 times
            try {
                await this.page.goto(config.baseURL);
                break;
            } catch (error) {
                console.error(`Navigation attempt ${i + 1} failed: ${error}`);
            }
        }
    }

    async clickCategory(categoryName: string): Promise<void> {
        const categorySelector = `a:has-text("${categoryName}")`;
        await this.page.waitForSelector(categorySelector, { state: 'visible' });
        await this.page.click(categorySelector);
    }

    async clickLogin(): Promise<void> {
        await this.click('#login2');
    }

    async clickSignUp(): Promise<void> {
        await this.click('#signin2');
    }

    async isProductAvailable(productName: string): Promise<boolean> {
        return await this.page.isVisible(`text=${productName}`);
    }

    async clickCart(): Promise<void> {
        await this.page.click('text=Cart');
    }

    async clickHomeButton(): Promise<void> {
        await this.page.click('text=Home ');
    }

    async clickProduct(productName: string): Promise<void> {
        await this.page.click(`text=${productName}`);
    }

    async addProductToCart(productName: string): Promise<void> {
        await this.clickProduct(productName);
        await this.page.waitForSelector('button[class*="btn-success"]:has-text("Add to cart")', { state: 'visible' });
        await this.page.click('button[class*="btn-success"]:has-text("Add to cart")');
        // Optionally handle any dialog or popup that appears after adding to cart
        await this.page.on('dialog', dialog => dialog.accept());
    }

    async navigateToCart(): Promise<void> {
        await this.clickCart();
    }
}
