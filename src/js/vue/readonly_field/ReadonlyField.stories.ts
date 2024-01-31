import { DefaultDecorator } from '@stories/decorators';

import ReadonlyField from './ReadonlyField.vue';
import ReadonlyFieldProps from './types';

const defaultProps = (): ReadonlyFieldProps => ({
  content: 'Content Example',
  valueField: 'text',
  label: 'Label example',
  replacedContent: '',
});

export default {
  title: 'Form/ReadonlyField',
  component: ReadonlyField,
  decorators: [DefaultDecorator],
};

const story = (propsToData: ReadonlyFieldProps) => () => ({
  name: 'AtTextareaStory',
  components: { ReadonlyField },
  data: () => ({
    content: propsToData.content,
    valueField: propsToData.valueField,
    label: propsToData.label,
    replacedContent: propsToData.replacedContent,
  }),
  template: `
    <ReadonlyField :label="label" :content="content" :valueField="valueField" :replacedContent="replacedContent" />`,
});

export const String = story(defaultProps());
export const Number = story({ ...defaultProps(), content: 2 });
export const Boolean = story({ ...defaultProps(), content: true });
export const ArrayOfStrings = story({
  ...defaultProps(),
  content: ['test1', 'test2'],
});
export const ArrayOfNumbers = story({ ...defaultProps(), content: [12, 34] });
export const ArrayOfObjects = story({
  ...defaultProps(),
  content: [
    {
      text: 'test1',
    },
    {
      text: 1,
    },
    {
      text: true,
    },
  ],
});

export const ObjectStory = story({
  ...defaultProps(),
  content: {
    text: 'test1',
  },
});

export const ReplacedContent = story({ ...defaultProps(), replacedContent: 'Old Content' });
export const ContentSameAsReplacedContent = story({
  ...defaultProps(),
  replacedContent: 'Content Example',
});
