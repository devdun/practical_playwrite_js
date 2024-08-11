import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    async login(username: string, password: string): Promise<void> {
        // Wait for the username input to be visible and ready for input
        await this.page.waitForSelector('#loginusername', { state: 'visible' });
        await this.type('#loginusername', username);
        
        // Wait for the password input in the same manner
        await this.page.waitForSelector('#loginpassword', { state: 'visible' });
        await this.type('#loginpassword', password);
        
        // Wait for the login button to be visible and not disabled
        await this.page.waitForSelector('button[onclick="logIn()"]:not([disabled])', { state: 'visible' });
        
        await this.click('button[onclick="logIn()"]');
    }
}
