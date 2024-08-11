import { PlaywrightTestConfig, LaunchOptions } from '@playwright/test';

// Define the browser name here to switch easily between 'chromium', 'firefox', or 'webkit'
const browserName = 'chromium'; // Change this to 'firefox' or 'webkit' as needed

// Generate browser-specific launch options
const getBrowserLaunchOptions = (browser: string): LaunchOptions => {
    switch (browser) {
        case 'firefox':
            return {
                args: [],
                firefoxUserPrefs: { 'browser.privatebrowsing.autostart': true }
            };
        case 'chromium':
        case 'webkit':
            return {
                args: ['--incognito']
            };
        default:
            return {
                args: []
            };
    }
};

const browserLaunchOptions = getBrowserLaunchOptions(browserName);

const config: PlaywrightTestConfig = {
    projects: [
        {
            name: 'Browser Test',
            use: {
                browserName: browserName,
                baseURL: 'https://www.demoblaze.com/',
                headless: false,
                viewport: { width: 1280, height: 720 },
                ignoreHTTPSErrors: true,
                video: 'retain-on-failure',
                screenshot: 'only-on-failure',
                launchOptions: browserLaunchOptions
            },
        }
    ],
    testDir: './src/tests',
    timeout: 30000,
};

export default config;
