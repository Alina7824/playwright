export default class CommonActions {
    constructor(page) {
        this.page = page;
    }

    // This method will navigate to the given URL, start of test execution
    async navigate(url) {
        // remove comment below and set headless to false in config to run in debug mode
        // await this.page.pause()
        await this.page.goto(url);
    }
    
    // fill the text in the provided selector
    async fill(selector, text) {
        await this.page.fill(selector, text);
    }

    // get the text of the provided selector
    async getText(selector) {
        return await this.page.textContent(selector);
    }

}