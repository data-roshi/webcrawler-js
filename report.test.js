const {  sortPages } = require('./report');
const { expect, test} = require('@jest/globals');

test('sortPages', () => {
    // GIVEN
    const input = {
        'https://blog.boot.dev/path': 1,
        'https://blog.boot.dev': 5,
        'https://blog.boot.dev/another': 2
    };
    const expected = [
        ['https://blog.boot.dev', 5],
        ['https://blog.boot.dev/another', 2],
        ['https://blog.boot.dev/path', 1]
    ];
    // WHEN
    const result = sortPages(input);
    // THEN
    expect(result).toEqual(expected);
});