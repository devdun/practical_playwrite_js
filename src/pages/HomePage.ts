import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    async navigateToHome(): Promise<void> {
        for (let i = 0; i < 3; i++) {  // Try 3 times
            try {
                await this.page.goto('https://www.demoblaze.com/');
                break;
            } catch (error) {
                console.error(`Navigation attempt ${i + 1} failed: ${error}`);
            }
        }
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
        await this.page.click('text=Home '); // Click the "Home" button in the navbar
    }

    async clickProduct(productName: string): Promise<void> {
        await this.page.click(`text=${productName}`);
    }
}
