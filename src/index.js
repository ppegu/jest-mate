const puppeteer = require('puppeteer')

const defaultMobileDevice = "Pixel 2 XL"

const launchBrowser = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        ignoreHTTPSErrors: true,
        defaultViewport: {
            width: 1920,
            height: 1080
        },
    })

    return browser
}

const startLocalServer = () => {
    // start local server 
}

const renderPage = async (url = "https://google.com", config = {
    mobile: false,
    device: "Pixel 2 XL"
}) => {
    startLocalServer()
    const browser = await launchBrowser()
    const page = await browser.newPage()
    await page.goto(url)
    if (config.mobile) {
        await page.emulate(puppeteer.devices[config.device ? config.device : defaultMobileDevice])
    }
    global._browser = browser
    global._page = page
    return page
};

afterAll(async () => {
    await global._browser.close()
})

// startLocalServer()
// renderPage()

module.exports = {
    renderPage
}