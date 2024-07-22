import { expect } from '@playwright/test';
import CommonActions from '../utils/CommonActions.js';

export default class  {
    constructor(page) {
        this.actions = new CommonActions(page);
    }

    async navigate() {
        await this.actions.navigate('https://automation-test.brandlive.com/Automation-Test/en');
    }
    
}