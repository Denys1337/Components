import { computed, markRaw, ref } from 'vue';

import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import AtInput from '../at_input/AtInput.vue';
import AtSelect from '../at_select/AtSelect.vue';
import AtTranslations from './AtTranslations.vue';
import { Locales, TranslationField, TranslationObject } from './types';
export default {
  title: 'Components/AtTranslations',
  component: AtTranslations,
  decorators: [DefaultDecorator],
};

const AtTranslationsStory: Story = (args) => ({
  name: 'AtTranslationsStory',
  components: { AtTranslations, AtInput, AtSelect },
  setup() {
    const translations = ref<TranslationObject>({
      en: { title: 'Original english title', select: '123' },
    });
    const locales = ref<Locales[]>(['en', 'he', 'es', 'de']);
    const currentLocal = 'en';
    const translationFields = ref<TranslationField[]>([
      {
        component: markRaw(AtInput),

        name: 'title',
        label: 'title',
        originalValue: computed(() => translations.value.en!.title),
      },
      {
        component: markRaw(AtSelect),
        props: {
          options: [
            { value: '1', text: '1' },
            { value: '2', text: '2' },
            { value: '3', text: '3' },
            { value: '123', text: '123' },
          ],
        },
        name: 'select',
        label: 'select',
        originalValue: computed(() => translations.value.en!.select),
      },
    ]);
    return { args, translationFields, translations, locales, currentLocal };
  },
  template: `
  <div  style="width: 100%; padding: 50px;">
    <label class="capitalize">
    <div v-for="(field,index) in translationFields" :key="field.name">
      <label class="">{{ field.label }}</label>
      <Component :is="field.component"  v-model="translations[currentLocal][field.name]" v-bind="translationFields[index].props" />
      <br />
    </div>
    </label>
    <AtTranslations  
      :locale="currentLocal" 
      :user-locales="locales" 
      :translation-fields="translationFields"   
      @remove-translation="delete translations[$event]"
      v-model:translations="translations" 
      v-bind="args"  />
  </div>`,
});

export const Default = AtTranslationsStory.bind({});

Default.args = {};
