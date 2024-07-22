import { expect } from '@playwright/test';
import CommonActions from '../utils/CommonActions.js';

export default class RegistrarionPage {
    constructor(page) {
        this.actions = new CommonActions(page);
    }

    async navigate() {
        await this.actions.navigate('https://automation-test.brandlive.com/Automation-Test/en/registration');
    }

    // register method can be reused in multiple tests with different parameters
    async register(username, lastname, email, framework = null) {
        await this.actions.page.getByPlaceholder('First Name').fill(username);
        await this.actions.page.getByPlaceholder('Last Name').fill(lastname);
        await this.actions.page.getByPlaceholder('Email Address').fill(email);
        if (framework) {
            await this.actions.page.getByPlaceholder('Playwright').fill(framework);
        }
        await this.actions.page.getByRole('button', { name: 'Next' }).click();
        await expect(this.actions.page.getByRole('heading', { name: 'Add a profile photo' })).toBeVisible();
        await expect(this.actions.page.getByRole('button', { name: 'Skip' })).toBeVisible();
        await expect(this.actions.page.getByRole('group')).toContainText('Add');

        // Handle the file chooser dialog
        const [fileChooser] = await Promise.all([
            this.actions.page.waitForEvent('filechooser'),
            this.actions.page.getByRole('button', { name: 'Add' }).click()
        ]);
        await fileChooser.setFiles('./test-data/1.png');
        // Verify avatar was uploaded
        await expect(this.actions.page.locator('.registration-avatar')).toHaveCSS('background-image', /url\(".*\.png"\)/)
        await this.actions.page.getByRole('button', { name: 'Save' }).click();
    }
}