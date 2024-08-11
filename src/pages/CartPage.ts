import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    async verifyProductInCart(productName: string): Promise<boolean> {
        return await this.page.isVisible(`text=${productName}`);
    }

    async placeOrder(): Promise<void> {
        await this.click('button[data-target="#orderModal"]');
    }

    async removeProductFromCart(productName: string): Promise<void> {
        await this.click(`//td[text()='${productName}']/following-sibling::td/button[text()='Delete']`);
    }

    async getTotalPrice(): Promise<number> {
        const totalText = await this.getText('#totalp');
        return parseInt(totalText || '0', 10);
    }
}
