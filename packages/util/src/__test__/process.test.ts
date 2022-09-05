jest.mock('url-parse');
import parse from 'url-parse';
import * as util from '../process';

describe('utils receive test', () => {
  test('getGlobalWindow', () => {
    const fakeWin = {} as any;
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => fakeWin);
    expect(util.getGlobalWindow()).toEqual(fakeWin);

    windowSpy.mockImplementation(() => undefined as any);
    expect(util.getGlobalWindow()).toEqual(global);
    windowSpy.mockRestore();
  });

  test('getUrlData', () => {
    const parseLib = parse as any;
    const href = 'https://www.foo.com/path/test';
    parseLib.mockReturnValueOnce({ query: { a: 1, b: 2 }, hash: '#!/path/hash/test?x=1&y=2' });
    parseLib.qs.stringify.mockReturnValueOnce('a=1&b=2');

    const result = util.getUrlData(href);
    expect(parse).toBeCalled();
    expect(result.search).toBe('a=1&b=2');
    expect(result.hash).toBe('!/path/hash/test?x=1&y=2');

    expect((util.getRealHash as any)()).toBe('');
    expect((util.getRealHash as any)({})).toBe('');
    expect(util.getRealHash('/a/b/c')).toBe('/a/b/c');
  });

  test('getFullUrl', () => {
    expect((util.getFullUrl as any)()).toBe('');
    expect((util.getFullUrl as any)(undefined, '/')).toBe('/');
    expect((util.getFullUrl as any)({}, '/')).toBe('/');
    expect(util.getFullUrl('http://foo.com', 'http://foo.com/abc')).toBe('http://foo.com/abc');
    expect(util.getFullUrl('http://bar.com', 'http://foo.com/bar')).toBe('http://foo.com/bar');
    expect(util.getFullUrl('http://foo.com/', '/bar')).toBe('http://foo.com/bar');
  });
});
