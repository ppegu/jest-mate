const { renderPage } = require("../src")


describe("Lest start with example test", () => {
    let page;

    beforeAll(async () => {
        page = await renderPage("http://google.com", {
            mobile: true
        })
    }, 10000)

    it('should load without error using global variable', async () => {
        const text = await global._page.evaluate(() => document.body.textContent);
        expect(text).toContain('google');
    });

    it('should load without error using local variable', async () => {
        const text = await page.evaluate(() => document.body.textContent);
        expect(text).toContain('search');
    });
})