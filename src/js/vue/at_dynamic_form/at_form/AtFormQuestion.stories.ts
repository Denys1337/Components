import { ref } from 'vue';

import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import { AtQuestionType } from '../types';
import AtForm from './AtForm.vue';
import {
  AtFormElementType,
  AtFormQuestionProps,
  AtFormWrapperType,
  AtQuestionStatus,
} from './types';

export default {
  title: 'Dynamic Form/AtForm Question',
  component: AtForm,
  decorators: [DefaultDecorator],
  argTypes: {
    questionWrapperComponentType: {
      control: {
        options: Object.values(AtFormWrapperType),
        type: 'select',
      },
    },
  },
};

const AtFormStory: Story<AtFormQuestionProps> = (args) => ({
  name: 'AtFormStory',
  components: { AtForm },
  setup() {
    function statusChanged(e: any) {
      console.warn('status changed to', e);
    }

    function addNote(e: unknown) {
      console.warn('trying to add note', e);
    }

    const value = ref(args.question.value);

    return { args, statusChanged, value, addNote };
  },
  template: `
      <div style="width: 100%; padding: 50px;">
      {{JSON.stringify(value)}}
        <AtForm v-bind="args"  v-model="value" @status-change="statusChanged($event)" @add-note="addNote($event)"/>
      </div>`,
});

export const Default = AtFormStory.bind({});
export const ShortText = AtFormStory.bind({});
export const LongText = AtFormStory.bind({});
export const Select = AtFormStory.bind({});
export const MultiSelect = AtFormStory.bind({});

const optionsMock = [
  {
    text: 'Option 1',
    value: '1',
  },
  {
    text: 'Option 2',
    value: '2',
  },
  {
    text: 'Option 3',
    value: '3',
  },
  {
    text: 'Option 4',
    value: '4',
  },
  {
    text: 'Option 5',
    value: '5',
  },
  {
    text: 'Option 6',
    value: '6',
  },
];

Default.args = {
  question: {
    type: AtFormElementType.Field,
    title: 'Boolean Question title required',
    fieldType: AtQuestionType.Boolean,
    value: '',
    id: '1',
    settings: {
      required: true,
    },
    notes: [],
    options: [],
    status: AtQuestionStatus.Open,
  },
  questionHierarchyText: '1.1',
  isBackButtonDisabled: false,
  questionWrapperComponentType: AtFormWrapperType.Default,
  showPrevButton: true,
  showSubmitButton: false,
  showNextButton: true,
};

ShortText.args = {
  question: {
    type: AtFormElementType.Field,
    title: 'Short text Question title required',
    fieldType: AtQuestionType.ShortText,
    value: '',
    id: '2',
    settings: {
      required: true,
    },
    notes: [
      {
        text: 'Test note',
        imageIds: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
        lastEditor: 'Author name',
        lastUpdate: new Date().toLocaleDateString(),
        files: [],
      },
    ],
    options: [],
    status: AtQuestionStatus.Open,
  },
  questionHierarchyText: '1.1',
  isBackButtonDisabled: false,
  formButtonsDisabled: false,
  questionWrapperComponentType: AtFormWrapperType.Default,
};

LongText.args = {
  question: {
    type: AtFormElementType.Field,
    title: 'Long text Question title required',
    fieldType: AtQuestionType.LongText,
    value: '',
    id: '3',
    settings: {
      required: true,
    },
    options: [],
    notes: [],
    status: AtQuestionStatus.Open,
  },
  questionHierarchyText: '1.1',
  isBackButtonDisabled: false,
  questionWrapperComponentType: AtFormWrapperType.Review,
};
Select.args = {
  question: {
    type: AtFormElementType.Field,
    title: 'Select Question title required',
    fieldType: AtQuestionType.Select,

    value: '',
    id: '4',
    settings: {
      required: true,
    },
    notes: [],

    options: optionsMock,
    status: AtQuestionStatus.Open,
  },
  questionHierarchyText: '1.1',
  isBackButtonDisabled: false,
  questionWrapperComponentType: AtFormWrapperType.Default,
};

MultiSelect.args = {
  question: {
    type: AtFormElementType.Field,
    title: 'MultiSelect Question title required',
    fieldType: AtQuestionType.MultiSelect,
    value: '',
    id: '5',
    notes: [],

    settings: {
      required: true,
    },
    options: optionsMock,
    status: AtQuestionStatus.Open,
  },
  questionHierarchyText: '1.1',
  isBackButtonDisabled: false,
};
