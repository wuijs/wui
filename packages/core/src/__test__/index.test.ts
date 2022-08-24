import { register, wave, hook, start } from '..';

describe('core output test', () => {
  test('register', () => {
    expect(register()).toBeUndefined();
  });

  test('wave', () => {
    expect(wave()).toBeUndefined();
  });

  test('hook', () => {
    expect(hook()).toBeUndefined();
  });

  test('start', () => {
    expect(start()).toBeUndefined();
  });
});
