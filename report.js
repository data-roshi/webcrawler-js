const sortPages = (pages) => {
    const pageEntries = Object.entries(pages);
    pageEntries.sort((a, b) => {
       return b[1] - a[1];
    })
    return pageEntries;
}

const printReport = (pages) => {
    console.log("============");
    console.log("REPORT START")
    console.log("============");
    const sortedPages = sortPages(pages);
    for (const sortedPage of sortedPages) {
       console.log(`Page ${sortedPage[0]} is found ${sortedPage[1]} times.`)
    }
    console.log("============");
    console.log("REPORT STOP")
    console.log("============");
}

module.exports = {
    sortPages,
    printReport
}