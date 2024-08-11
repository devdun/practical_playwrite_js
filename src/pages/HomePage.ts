import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    async navigateToHome(): Promise<void> {
        await this.navigate('/');
    }

    async clickLogin(): Promise<void> {
        await this.click('#login2');
    }
    
    async clickSignUp(): Promise<void> {
        await this.click('#signin2');
    }

    async clickCart(): Promise<void> {
        await this.click('#cartur');
    }

    async clickProduct(productName: string): Promise<void> {
        await this.click(`text=${productName}`);
    }
}
