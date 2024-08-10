import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    async verifyProductInCart(productName: string): Promise<boolean> {
        const text = await this.getText(`text=${productName}`);
        return text.includes(productName);
    }

    async placeOrder(): Promise<void> {
        await this.click('button[data-target="#orderModal"]');
    }
}
