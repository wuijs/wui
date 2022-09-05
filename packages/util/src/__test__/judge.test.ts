import * as util from '../judge';

describe('utils judge test', () => {
  test('isRegExp', () => {
    expect(util.isRegExp(undefined)).toBe(false);
    expect(util.isRegExp(null)).toBe(false);
    expect(util.isRegExp('')).toBe(false);
    expect(util.isRegExp(/\s/)).toBe(true);
    expect(util.isRegExp(new RegExp('\\s'))).toBe(true);
  });

  test('isFullUrl', () => {
    expect(util.isFullUrl('//foo.com')).toBe(true);
    expect(util.isFullUrl('http://foo.com/bar')).toBe(true);
    expect(util.isFullUrl('https://bar.com/')).toBe(true);
  });
});
