import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
    // async addToCart(productId: number): Promise<void> {
    //     const addToCartButton = `a[onclick="addToCart(${productId})"]`; // Corrected selector based on the HTML
    //     await this.page.waitForSelector(addToCartButton, { state: 'visible' });
    //     await this.page.click(addToCartButton);
    //     await this.page.waitForTimeout(1000); // Handling potential alerts or modal dialogs
    // }

    async addToCart(): Promise<void> {
        // Directly targeting the "Add to cart" link by its text content and class for specificity
        const addToCartButton = `a.btn-success:has-text("Add to cart")`;
        await this.page.waitForSelector(addToCartButton, { state: 'visible' });
        await this.page.click(addToCartButton);
        await this.page.waitForTimeout(1000); // Allow for handling potential alerts or dialogs
    }

    async handleDialogIfPresent(): Promise<void> {
        try {
            const [dialog] = await Promise.all([
                this.page.waitForEvent('dialog'),
                this.page.click('button.addToCart') // example of triggering action that might cause a dialog
            ]);
            await dialog.dismiss();
        } catch (error) {
            console.error("No dialog appeared after adding to cart.");
        }
    }
}
