const { JSDOM } = require('jsdom');

const crawlPage = async (currentURL) => {
    console.log(`actively crawling: ${currentURL}`);

    try {
        const res = await fetch(currentURL);

        if (res.status > 399) {
            console.log(`error in fetch with status code: ${res.status} on page ${currentURL}`);
            return;
        }

        const contentType = res.headers.get("content-type");

        if (!contentType?.includes("text/html")) {
            console.log(`non html response, contentType: ${contentType} on page ${currentURL}`);
            return;
        }
        console.log(await res.text());
    } catch (err) {
       console.log(`error in fetch: ${err.message}, on page ${currentURL}`)
    }
}

const getURLsFromHTML = (htmlBody, baseURL) => {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');
    for (const linkElement of linkElements) {
        const url = linkElement.href;
        if (!url) {
            continue;
        }

        const relativeURL = linkElement.href.slice(0, 1) === '/';
        const fullURL = relativeURL ? `${baseURL}${linkElement.href}` : linkElement.href;
        try {
            const urlObj = new URL(fullURL);
            urls.push(urlObj.href)
        } catch (err) {
            console.log(`error ${relativeURL ? 'relative' : 'absolute'} url: ${err.message}`);
        }
    }
    return urls;
}

const normalizeURL = (url) => {
    const urlObj = new URL(url);
    let hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    if (!!hostPath.length && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1);
    }
    return hostPath;
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}
