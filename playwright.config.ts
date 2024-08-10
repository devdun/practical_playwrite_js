import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    use: {
        baseURL: 'https://www.demoblaze.com/',
        headless: false, // Set to true if you want to run tests in headless mode
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },
    testDir: './src/tests',
    timeout: 30000,
};

export default config;
