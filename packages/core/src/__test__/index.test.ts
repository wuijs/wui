import { register, inject, hook, start } from '..';

describe('core output test', () => {
  test('register', () => {
    expect(register()).toBeUndefined();
  });

  test('inject', () => {
    expect(inject()).toBeUndefined();
  });

  test('hook', () => {
    expect(hook()).toBeUndefined();
  });

  test('start', () => {
    expect(start()).toBeUndefined();
  });
});
