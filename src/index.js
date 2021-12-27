const puppeteer = require('puppeteer')

const defaultMobileDevice = "Pixel 2 XL"

const launchBrowser = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
        // defaultViewport: {
        //     width: 1920,
        //     height: 1080
        // },
    })

    return browser
}

const startLocalServer = () => {
    // start local server 
}

const renderPage = async (url = "https://google.com", config = {
    mobile: true,
    device: "Pixel 2 XL"
}) => {
    startLocalServer()
    const browser = await launchBrowser()
    const page = await browser.newPage()
    await page.setJavaScriptEnabled(true)
    await page.waitForTimeout(1000);
    await page.goto(url)
    if (config.mobile) {
        await page.emulate(puppeteer.devices[config.device ? config.device : defaultMobileDevice])
    }
    global._browser = browser
    global._page = page
    return page
};


const checkSelector = (selector, page) => {
    return new Promise((resolve) => {
        page.waitForSelector(selector, timeoutConfig)
            .then(() => {
                console.log(selector, 'selector found')
                resolve(true)
            })
            .catch(async (error) => {
                console.error(selector, 'selector not found')
                // return error output to the console
                await global._browser.close()
                resolve(false)
            })
    })
}

const teardown = async () => {
    await global._browser.close()
}


module.exports = {
    renderPage,
    teardown
}