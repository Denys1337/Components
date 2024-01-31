export const getTranslatedText = (
  content: string | Record<string, string>,
  locale: string = 'en'
): string => {
  if (!content) {
    return '';
  }
  if (typeof content === 'string') {
    return content;
  }
  if (typeof content === 'object') {
    if (locale in content) return content[locale];
    else if ('en' in content) return content['en'];
    return Object.values(content)[0];
  }
  return '';
};
