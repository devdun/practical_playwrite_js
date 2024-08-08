import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  async goToSignUp() {
    await this.page.click('text=Sign up');
  }

  async goToLogin() {
    await this.page.click('text=Log in');
  }

  async searchForProduct(productName: string) {
    await this.page.fill('#search_input', productName);
    await this.page.click('#search_button');
  }
}
