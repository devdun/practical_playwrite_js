import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
    async addToCart(): Promise<void> {
        await this.click('a[onclick="addToCart(1)"]'); // Assuming 1 is the product ID
        await this.page.waitForTimeout(1000); // wait for alert
        await this.page.once('dialog', dialog => dialog.accept());
    }
}
