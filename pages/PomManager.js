import RegistrarionPage from './RegistrarionPage.js';
import HomePage from './HomePage.js';

// example of POM framework implementation with Playwright
export default class PomManager {
    constructor(page) {
        this.page = page;
        this.homePage = new HomePage(page);
        this.registrarionPage = new RegistrarionPage(page);
    }
}