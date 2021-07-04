//@ts-check
const { chromium, webkit, firefox } = require("playwright");
const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end("Hello, world");
});

const headless = !process.env.HEADFUL;

async function checkBrowser(browserType) {
    try {
        console.log(`Running ${browserType.name()}`);
        const browser = await browserType.launch({ headless });
        const page = await browser.newPage();
        await page.goto("http://localhost:8080");
        console.log(
            `- ${browserType.name()}:`,
            await page.evaluate(() => ({
                width: document.documentElement.clientWidth,
                clientHeight: document.documentElement.clientHeight,
            }))
        );
        await browser.close();
        console.log(`SUCCESS running ${browserType.name()}`);
        return true;
    } catch (e) {
        console.log(`FAILED running ${browserType.name()}`);
        console.error(e);
        return false;
    }
}

server.listen(8080, async () => {
    let success = true;
    success = (await checkBrowser(chromium)) && success;
    success = (await checkBrowser(webkit)) && success;
    success = (await checkBrowser(firefox)) && success;
    server.close();
    // in case some browsers failed to close - exit process.
    process.exit(success ? 0 : 1);
});
