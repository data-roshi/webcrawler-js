const normalizeURL = (url) => {
    const urlObj = new URL(url);
    let hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    if (!!hostPath.length && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1);
    }
    return hostPath;
}

module.exports = {
    normalizeURL
}
