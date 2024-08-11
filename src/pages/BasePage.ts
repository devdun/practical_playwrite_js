import { Page } from '@playwright/test';
import { config } from '../config/config';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(url: string): Promise<void> {
        await this.page.goto(config.baseURL + url);
    }

    async click(selector: string): Promise<void> {
        await this.page.click(selector);
    }

    async type(selector: string, text: string): Promise<void> {
        await this.page.fill(selector, text);
    }

    async getText(selector: string): Promise<string> {
        return this.page.textContent(selector);
    }

    async waitForSelector(selector: string): Promise<void> {
        await this.page.waitForSelector(selector);
    }
}
