import testModule from '../src/components/helper-modules/async-test';


test('Async test module loaded function returns "test"', () => {
  expect(testModule.loaded()).toBe('test');
});
