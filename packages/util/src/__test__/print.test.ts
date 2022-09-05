import * as util from '../print';

describe('utils print test', () => {
  test('printLog', () => {
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation(() => 'true');
    const spy = jest.spyOn(window.console, 'log').mockImplementation();

    util.printLog();
    expect(console.log).toBeCalled();
    expect(spy.mock.calls[0]).toEqual(['[wui-micro] log']);

    util.printLog('number', 23456);
    expect(console.log).toBeCalledTimes(2);
    expect(spy.mock.calls[1]).toEqual(['[wui-micro] number:', 23456]);

    jest.spyOn(window, 'localStorage', 'get').mockImplementationOnce(() => undefined as any);
    util.printLog();
    expect(console.log).toBeCalledTimes(3);

    spy.mockRestore();
  });

  test('printWarn', () => {
    const spy = jest.spyOn(window.console, 'warn').mockImplementation();
    util.printWarn();
    expect(console.warn).toBeCalled();
    expect(console.warn).toBeCalledTimes(1);
    spy.mockRestore();
  });

  test('printError', () => {
    const spy = jest.spyOn(window.console, 'error').mockImplementation();
    util.printError();
    expect(console.error).toBeCalled();
    expect(console.error).toBeCalledTimes(1);
    spy.mockRestore();
  });

  test('throwError', () => {
    try {
      util.throwError('error test');
    } catch (err) {
      expect(err.message).toBe('[wui-micro] error: error test');
    }
  });
});
