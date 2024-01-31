import booleanToWord from './booleanToWord';

test('should convert booleans to a word ("yes"/"no")', () => {
  expect(booleanToWord(true)).toBe('yes');
  expect(booleanToWord(false)).toBe('no');
});
