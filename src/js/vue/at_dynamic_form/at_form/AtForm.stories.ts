import { ref } from 'vue';

import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import { AtQuestionType } from '../types';
import AtForm from './AtForm.vue';
import { AtFormElementType, AtFormProps, AtFormSectionType, AtQuestionStatus } from './types';

export default {
  title: 'Dynamic Form/AtForm',
  component: AtForm,
  decorators: [DefaultDecorator],
};

const AtFormStory: Story<AtFormProps> = (args) => ({
  name: 'AtFormStory',
  components: { AtForm },
  setup() {
    const modelValue = ref<string | object>(
      args.element.type === AtFormElementType.Field ? '' : {}
    );

    function statusChanged(e: any) {
      console.warn('status changed to', e);
    }

    function addNote(e: unknown) {
      console.warn('trying to add note', e);
    }
    return { args, statusChanged, modelValue, addNote };
  },
  template: `
    <div style="width: 100%; padding: 50px;">
    <AtForm v-bind="args" v-model="modelValue" @status-change="statusChanged($event)"
            @add-note="addNote($event)">
    </AtForm>

    <pre>
          {{ modelValue }}
        </pre>
    </div>`,
});

export const Question = AtFormStory.bind({});
export const Section = AtFormStory.bind({});

Section.args = {
  element: {
    id: 'sub2',
    title: 'sub2',
    sectionType: AtFormSectionType.STACK,
    type: AtFormElementType.Section,
    value: {},
    notes: [],
    settings: {
      repeatable: true,
      grouped: false,
      minStack: 1,
      maxStack: null,
    },
    fields: [
      {
        id: 'sub_q1',
        type: AtFormElementType.Field,
        title: 'question1 in subsection',
        fieldType: AtQuestionType.Boolean,
        settings: {
          required: true,
        },
        value: '',
        options: [],
        notes: [],
        status: AtQuestionStatus.Open,
      },
      {
        id: 'sub_q2',
        type: AtFormElementType.Field,

        title: 'question2 in subsection',
        fieldType: AtQuestionType.Number,
        settings: {
          required: true,
        },
        value: '2',
        options: [],
        notes: [],
        status: AtQuestionStatus.Open,
      },
    ],
  },
};

Question.args = {
  element: {
    type: AtFormElementType.Field,
    title: 'Select Question title required',
    fieldType: AtQuestionType.Boolean,
    value: '',
    id: '4',
    settings: {
      required: true,
    },
    notes: [],
    status: AtQuestionStatus.Open,
    options: [],
  },
};
