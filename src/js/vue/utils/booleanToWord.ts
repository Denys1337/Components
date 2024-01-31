import getTranslators from './getTranslators';

function booleanToWord(value: boolean) {
  try {
    const { t } = getTranslators();
    return value ? t('yes') : t('no');
  } catch {
    return value ? 'yes' : 'no';
  }
}

export default booleanToWord;
