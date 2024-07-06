const { JSDOM } = require('jsdom');

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
    getURLsFromHTML
}
