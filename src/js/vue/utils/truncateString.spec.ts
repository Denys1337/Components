import { truncateString } from './truncateString';

const testString = 'Lorem ipsum dolor sit amet';

test('should truncate string by length ', () => {
  expect(truncateString(testString, 26)).toBe(testString);
  expect(truncateString(testString, 11)).toBe('Lorem ipsum...');
  expect(truncateString(testString, 11, '^^')).toBe('Lorem ipsum^^');
  expect(truncateString(testString, 25)).toBe('Lorem ipsum dolor sit...');
  expect(truncateString(testString, 2)).toBe('Lo...');
  const longText =
    'A very very very very very very very very very very very very very very very very very very very long text';
  expect(truncateString(longText, 10)).toBe('A very...');
  const text = 'Choose option (Very long long long long long long long long long long text)';
  expect(truncateString(text, 20)).toBe('Choose option (Very...');
});
