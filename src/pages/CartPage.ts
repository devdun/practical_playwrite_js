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

    // async getTotalPrice(): Promise<number> {
    //     const totalText = await this.getText('#totalp');
    //     return parseInt(totalText || '0', 10);
    // }

    async getTotalPrice(): Promise<number> {
        const totalPriceText = await this.page.textContent('#totalp'); // Using the ID selector for total price
        return parseFloat(totalPriceText.trim()); // Directly parse the text content
    }

    async getItemCount(): Promise<number> {
        const itemRows = await this.page.$$('#tbodyid > tr'); // Selector to count rows within the table body
        return itemRows.length;
    }
}
