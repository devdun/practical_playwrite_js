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
        const totalPriceElement = await this.page.$('#totalp');
        
        if (!totalPriceElement) {
            // If the element is not found, assume the cart is empty and return 0
            return 0;
        }
    
        const totalPriceText = await totalPriceElement.textContent();
        
        if (!totalPriceText) {
            // If the element has no text, assume the cart is empty and return 0
            return 0;
        }
    
        return parseFloat(totalPriceText.replace('$', '').trim()) || 0;
    }

    async getItemCount(): Promise<number> {
        const itemRows = await this.page.$$('#tbodyid > tr'); // Selector to count rows within the table body
        return itemRows.length;
    }
}
