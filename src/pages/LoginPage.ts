import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    async login(username: string, password: string): Promise<void> {
        await this.type('#loginusername', username);
        await this.type('#loginpassword', password);
        await this.click('button[onclick="logIn()"]');
    }
}
