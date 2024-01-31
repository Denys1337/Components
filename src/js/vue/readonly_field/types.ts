import { ContentType } from '@agritask/js-utils/libs/string_utils';

export default interface ReadonlyFieldProps {
  label: string;
  content: ContentType;
  valueField: string;
  replacedContent: ContentType;
}
