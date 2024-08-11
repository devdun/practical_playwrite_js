import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
    async fillCheckoutForm(details: { name: string; country: string; city: string; card: string; month: string; year: string }): Promise<void> {
        await this.type('#name', details.name);
        await this.type('#country', details.country);
        await this.type('#city', details.city);
        await this.type('#card', details.card);
        await this.type('#month', details.month);
        await this.type('#year', details.year);
        await this.click('button[onclick="purchaseOrder()"]');
    }

    async getOrderConfirmation(): Promise<string> {
        await this.waitForSelector('.sweet-alert.showSweetAlert.visible');
        return this.getText('.sweet-alert.showSweetAlert.visible h2');
    }
}
