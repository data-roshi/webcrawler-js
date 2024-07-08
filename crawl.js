const { JSDOM } = require('jsdom');

const crawlPage = async (baseURL, currentURL, pages) => {

    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);
    if (baseURLObj.hostname !== currentURLObj.hostname) {
        console.log(`ignore external url ${currentURL}`)
        return pages;
    }

    const normalizedCurrentURL = normalizeURL(currentURL);
    if (pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL]++;
        return pages;
    }

    pages[normalizedCurrentURL] = 1;

    console.log(`actively crawling: ${currentURL}`);

    try {
        const res = await fetch(currentURL);

        if (res.status > 399) {
            console.log(`error in fetch with status code: ${res.status} on page ${currentURL}`);
            return pages;
        }

        const contentType = res.headers.get("content-type");

        if (!contentType?.includes("text/html")) {
            console.log(`non html response, contentType: ${contentType} on page ${currentURL}`);
            return pages;
        }

        const html = await res.text();

        const parsedURLs = getURLsFromHTML(html, baseURL);
        for (const parsedURL of parsedURLs) {
             pages = await crawlPage(baseURL, parsedURL, pages);
        }

    } catch (err) {
       console.log(`error in fetch: ${err.message}, on page ${currentURL}`)
    }
    return pages;
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
