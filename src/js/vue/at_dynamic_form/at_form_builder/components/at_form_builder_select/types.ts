import { Locales } from '../../../../at_translations/types';
import { Option } from '../../../types';
import { AtFormBuilderQuestion } from '../../types';

export interface AtFormBuilderSelectQuestionProps extends AtFormBuilderQuestion {}

export const defaultSelectFormBuilderOptions = (
  t: (arg: string) => string,
  locale: Locales
): Option[] => [
  {
    value: '0',
    label: { [locale]: `${t('general.option')} 1` },
  },
  {
    value: '1',
    label: { [locale]: `${t('general.option')} 2` },
  },
];
