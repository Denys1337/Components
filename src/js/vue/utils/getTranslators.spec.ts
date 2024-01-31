import { getTranslatedText } from './getTranslatedText';

describe('getTranslatedText', () => {
  test('returns a string in case it is a string or empty', () => {
    expect(getTranslatedText('', 'en')).toBe('');
    // @ts-ignore
    expect(getTranslatedText(undefined)).toBe('');
    // @ts-ignore
    expect(getTranslatedText(null)).toBe('');
  });
  it('Returns the content if it is a string', () => {
    expect(getTranslatedText('bla')).toBe('bla');
  });
  it('Returns the correct locale when it is specified', () => {
    const obj = {
      en: 'Lol',
      he: 'לול',
    };
    expect(getTranslatedText(obj, 'he')).toBe('לול');
  });
  it('Returns the default locale when it is not specified', () => {
    const obj = {
      en: 'Lol',
      he: 'לול',
    };
    expect(getTranslatedText(obj)).toBe('Lol');
  });
  it('Returns any locale if the default does not exist without specified locale', () => {
    const obj = {
      es: 'Lol',
      he: 'לול',
    };
    expect(getTranslatedText(obj)).toBe('Lol');
  });
});
