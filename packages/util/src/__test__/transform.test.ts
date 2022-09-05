import * as util from '../transform';

describe('utils transform test', () => {
  test('toArray', () => {
    expect(util.toArray(undefined)).toEqual([]);
    expect(util.toArray(null)).toEqual([]);
    expect(util.toArray('')).toEqual([]);
    expect(util.toArray(['foo'])).toEqual(['foo']);
    expect(util.toArray('bar')).toEqual(['bar']);
  });

  test('toPromise', () => {
    util.toPromise(undefined).then((res) => expect(res).toEqual(undefined));
    util.toPromise(null).then((res) => expect(res).toEqual(null));
    util.toPromise(Promise.resolve('')).then((res) => expect(res).toEqual(''));
    util.toPromise(Promise.resolve(['a'])).then((res) => expect(res).toEqual(['a']));
  });

  test('toFix', () => {
    expect(util.toFix(22.434343)).toBe(22.43);
    expect(util.toFix(0.454, 1)).toBe(0.4);
    expect(util.toFix('foo' as any)).toBe(0);
    expect(util.toFix(233.223, 'bar' as any)).toBe(233.22);
    expect(util.toFix(23.3245, 0)).toBe(23);
  });
});
