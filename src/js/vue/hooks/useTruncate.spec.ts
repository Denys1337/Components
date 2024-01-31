import { ref } from 'vue';

import useTruncatedString from './useTruncate';

const testString = 'Lorem ipsum dolor sit amet';

describe('tests useTruncatedString', () => {
  const text = ref(testString);
  const truncatedText = useTruncatedString(text, 11);
  test('should truncate string by length ', () => {
    expect(truncatedText.value).toBe('Lorem ipsum...');
  });
  test('The ref gets updated with the truncated part after updating the original text', () => {
    text.value = 'לורם איפסום דולור סיט אמט';
    expect(truncatedText.value).toBe('לורם איפסום...');
  });
});
