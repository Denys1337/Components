import { ref } from 'vue';

import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import AtSelect from '../AtSelect.vue';
import { Option } from '../types';
import useAtSelectPaginated from './useAtSelectPaginated';

export default {
  title: 'Hooks/useAtSelectPaginated',
  component: AtSelect,
  decorators: [DefaultDecorator],
};

const useAtSelectPaginatedStory: Story = (args) => ({
  name: 'useAtSelectPaginatedStory',
  components: { AtSelect },
  setup() {
    const optionsPerPage = 30;
    const { options, storedOptionsMap, totalOptionsCount, queryString, attrs, modelValue } =
      useAtSelectPaginated({
        multiple: ref(args.multiple),
        initialModelValue: args.model,
        //Handles loading next page/options
        loadNextOptionsPromise() {
          const from = options.value.length;
          const to = options.value.length + optionsPerPage;
          return getData(from, to, queryString.value).then((res) => {
            options.value.push(...res.options);
            totalOptionsCount.value = res.count;
            return res;
          });
        },
        // Help intialiaze the stored options if needed
        loadStoredOptionsPromise() {
          return new Promise<void>((resolve) => {
            storedOptionsMap.value.set('40', {
              text: 'option 40',
            });
            resolve();
          });
        },
        // hideSelectAllOptions: true,
        // Handle the select all
        selectAllOptionsPromise() {
          return new Promise<void>((resolve, reject) => {
            return getData(options.value.length, undefined, queryString.value).then((res) => {
              options.value.push(...res.options);
              return resolve();
            });
          });
        },
      });
    totalOptionsCount.value = args.totalOptionsCount;

    return {
      modelValue,
      args,
      attrs,
    };
  },
  template: `
  <div style="width: 100%; padding: 50px;">
    <AtSelect
        v-bind="{...args,...attrs}" />
    <br />
    Selected: {{attrs.modelValue}}
  </div>`,
});

export const Default = useAtSelectPaginatedStory.bind({});

Default.args = {
  model: '40',
};

export const Multi = useAtSelectPaginatedStory.bind({});

Multi.args = {
  multiple: true,
  model: ['40'],
};

function generateData(size: number): Option[] {
  const data = [];
  for (let i = 0; i < size; i++) {
    data.push({ text: `option ${i}`, value: `${i}` });
  }
  return data;
}
const size = 1000;
const data = generateData(size);

function getData(from: number, to?: number, query?: string) {
  return new Promise<{ count: number; options: Option[] }>((resolve) => {
    //Returns all data
    if (from === -1) {
      setTimeout(() => {
        resolve({ count: data.length, options: data });
      }, 1000);
    }
    const relatedData = query ? data.filter((option) => option.text?.includes(query)) : data;
    setTimeout(() => {
      resolve({ count: relatedData.length, options: relatedData.slice(from, to) });
    }, 1000);
  });
}
