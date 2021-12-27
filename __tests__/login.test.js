const { renderPage, teardown } = require("../src")


describe("Login to http://182.75.43.185/login with username password", () => {
    let page;

    beforeAll(async () => {
        page = await renderPage("http://182.75.43.185/login", {
            // mobile: true
        })
    }, 1000000)

    it('should able to render and login', async () => {
        const text = await page.evaluate(() => document.body.textContent);
        expect(text).toContain('Welcome to Github Dashboard');

        const username = 'input[placeholder="Enter your username"]'
        const password = 'input[placeholder="Enter your password"]'
        await page.waitForSelector(username)
        await page.waitForSelector(password)

        await page.type(username, 'demo_user')
        await page.type(password, 'NewPass123')
        await page.click('.auth-buttons')

        const welcomeText = await page.evaluate(() => document.body.textContent);
        expect(welcomeText).toBe('Welcome demo_user!');
    });

    afterAll(async () => {
        teardown()
    })
})