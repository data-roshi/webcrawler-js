const { crawlPage } = require('./crawl');
const { printReport } = require('./report');

const main = async () => {
    if (process.argv.length < 3) {
        console.log("no website provided");
        process.exit(1);
    }
    if (process.argv.length > 3) {
        console.log("too many args");
        process.exit(1);
    }

    const baseURL = process.argv[2];

    console.log(`start crawling of ${baseURL}`);
    const pages = await crawlPage(baseURL, baseURL, {});

    console.log(`pages: `, pages);
}

main();

