import { test, expect } from '@playwright/test';
import PomManager from '../pages/PomManager.js';
import speakers from '../test-data/speakers.js';

let page;
let pm;


// describe block with POM implementation and page object that works in same page for multiple tests
test.describe('Verify user registration', () => {
    test.beforeAll(async ({ browser }) => {
        // created page from browser to use same page for all the tests
        page = await browser.newPage();

        // passing page to PomManager and storing it in pm object
        pm = new PomManager(page);
    });

    test.afterAll(async () => {
        await page.close();
    });

    test('Verify registration button on homepage redirect to registration', async () => {
        await pm.homePage.navigate();
        await pm.page.getByText('Registration').click();
        await expect(pm.page).toHaveURL('https://automation-test.brandlive.com/Automation-Test/en/registration');
    });

    test('Verify registration form submission', async () => {
        await pm.registrarionPage.navigate();
        await pm.registrarionPage.register('John', 'Smith', 'test@email.com', 'Playwright')
        await expect(pm.page).toHaveURL('https://automation-test.brandlive.com/Automation-Test/en/home');
    });

    test('Verify profile page', async () => {
        // this will test without POM page object, thus we use page object directly
        await page.getByLabel('Open profile pop-up').click();
        await page.getByRole('button', { name: 'John Smith See your profile ' }).click();
        await expect(page.locator('h2')).toContainText('John Smith');
        await expect(page.locator('div').filter({ hasText: /^Replace$/ })).toBeVisible();
        await expect(page.locator('.profile-card-item p')).toContainText('Playwright');
    });

});

// describe block with build in {page} fixture
// this also could be one method in POM class not to retype the same code in every test


test.describe('Verify team member profiles and social media links', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://automation-test.brandlive.com/Automation-Test/en');
    });

    for (const speaker of speakers) {
        test(`Verify details and social media links for ${speaker.name}`, async ({ page }) => {
            await page.pause()
            const speakerElement = page.locator(`.speakers-list .speakers-column:has(h3:has-text("${speaker.name}"))`);
            await expect(speakerElement.locator('.speaker-name')).toHaveText(speaker.name);
            await expect(speakerElement.locator('.speaker-job-title')).toHaveText(speaker.title);
            await expect(speakerElement.locator('.speaker-about')).toHaveText(speaker.about);
            // Verify the social media link is present without looking into broker href to fail it later with redirect
            const socialLink = speakerElement.locator('.social-links a');
            await expect(socialLink).toBeVisible();

            // Click the social media link and assert the new link
            const [newPage] = await Promise.all([
                // Wait for the new page to open
                page.context().waitForEvent('page'), 
                socialLink.click()
            ]);

            // Wait for the new page to fully load
            await newPage.waitForTimeout(1000)
            // Soft assetion not to abourt test run for broken links not loading
            await expect.soft(newPage).toHaveURL(speaker.socialLink);
   
            await newPage.close();

        });
    }
});