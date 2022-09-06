jest.mock('url-parse');
import parse from 'url-parse';
import { FileType } from '@wuijs/type';
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

  test('getFileExt', () => {
    expect(util.getFileExt('https://www.foo.com')).toBe(FileType.JSON);
    expect(util.getFileExt('https://www.foo.com/')).toBe(FileType.JSON);
    expect(util.getFileExt('https://www.foo.com/abc')).toBe(FileType.JSON);
    expect(util.getFileExt('https://www.foo.com/index.htm?a=1&b=2&c=3')).toBe(FileType.HTML);
    expect(util.getFileExt('https://www.foo.com/index.xhtml#hash=test')).toBe(FileType.HTML);
    expect(util.getFileExt('https://www.foo.com/index.html?a=1&b=2&c=3#hash=test')).toBe(FileType.HTML);
    expect(util.getFileExt('https://www.foo.com/index.html#hash=test?a=1&b=2&c=3')).toBe(FileType.HTML);
    expect(util.getFileExt('https://www.foo.com/index.js')).toBe(FileType.JS);
    expect(util.getFileExt('https://www.foo.com/index.css')).toBe(FileType.CSS);
    expect(util.getFileExt('//www.foo.com/??s/0.0.1/jquery.js,s/0.1.0/jq-plugin.js')).toBe(FileType.JS);
    expect(util.getFileExt('js')).toBe(FileType.JS);
    expect(util.getFileExt('test.vue')).toBe(FileType.JS);

    expect((util.getFileName as any)()).toBe('');
  });
});
