const { normalizeURL } = require('./crawl');
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
