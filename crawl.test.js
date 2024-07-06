const { normalizeURL, getURLsFromHTML } = require('./crawl');
const { expect, test} = require('@jest/globals');

test('normalizeURL strip protocol', () => {
    // GIVEN
    const input = 'https://blog.boot.dev/path';
    const expected = 'blog.boot.dev/path';
    // WHEN
    const result = normalizeURL(input);
    // THEN
    expect(result).toEqual(expected);
});

test('normalizeURL trim trailing slash', () => {
    // GIVEN
    const input = 'https://blog.boot.dev/path/';
    const expected = 'blog.boot.dev/path';
    // WHEN
    const result = normalizeURL(input);
    // THEN
    expect(result).toEqual(expected);
});

test('normalizeURL capitals', () => {
    // GIVEN
    const input = 'https://blOG.boot.dev/path/';
    const expected = 'blog.boot.dev/path';
    // WHEN
    const result = normalizeURL(input);
    // THEN
    expect(result).toEqual(expected);
});

test('normalizeURL strip http', () => {
    // GIVEN
    const input = 'http://blog.boot.dev/path/';
    const expected = 'blog.boot.dev/path';
    // WHEN
    const result = normalizeURL(input);
    // THEN
    expect(result).toEqual(expected);
});

test('getURLsFromHTML absolute', () => {
    // GIVEN
    const inputHTMLbody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">
                boot.dev blog 
            </a>
        </body> 
    </html>`;
    const inputBaseURL = "https://blog.boot.dev"
    const expected = ["https://blog.boot.dev/path/"];
    // WHEN
    const result = getURLsFromHTML(inputHTMLbody, inputBaseURL);
    // THEN
    expect(result).toEqual(expected);
});

test('getURLsFromHTML empty href', () => {
    // GIVEN
    const inputHTMLbody = `
    <html>
        <body>
            <a href="">
                boot.dev blog 
            </a>
        </body> 
    </html>`;
    const inputBaseURL = "https://blog.boot.dev"
    // WHEN
    const result = getURLsFromHTML(inputHTMLbody, inputBaseURL);
    // THEN
    expect(result).toEqual([]);
});

test('getURLsFromHTML relative', () => {
    // GIVEN
    const inputHTMLbody = `
    <html>
        <body>
            <a href="/path/">
                boot.dev blog 
            </a>
        </body> 
    </html>`;
    const inputBaseURL = "https://blog.boot.dev"
    const expected = ["https://blog.boot.dev/path/"];
    // WHEN
    const result = getURLsFromHTML(inputHTMLbody, inputBaseURL);
    // THEN
    expect(result).toEqual(expected);
});

test('getURLsFromHTML invalid url', () => {
    // GIVEN
    const inputHTMLbody = `
    <html>
        <body>
            <a href="invalid-url">
                invalid url
            </a>
        </body> 
    </html>`;
    const inputBaseURL = "https://blog.boot.dev"
    const expected = ["https://blog.boot.dev/path/"];
    // WHEN
    const result = getURLsFromHTML(inputHTMLbody, inputBaseURL);
    // THEN
    expect(result).toEqual([]);
});

test('getURLsFromHTML absolute and relative', () => {
    // GIVEN
    const inputHTMLbody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/">
                boot.dev blog 1
            </a>
            <a href="/path2/">
                boot.dev blog 2
            </a>
        </body> 
    </html>`;
    const inputBaseURL = "https://blog.boot.dev"
    const expected = ["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"];
    // WHEN
    const result = getURLsFromHTML(inputHTMLbody, inputBaseURL);
    // THEN
    expect(result).toEqual(expected);
});
