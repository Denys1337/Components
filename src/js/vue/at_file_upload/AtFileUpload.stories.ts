import { Story } from '@storybook/vue3';
import { PaperclipIcon } from 'vue-tabler-icons';

import { DefaultDecorator } from '@stories/decorators';

import AtButton from '../at_button/AtButton.vue';
import AtFileUpload from './AtFileUpload.vue';
import AddLogoButton from './components/AddLogoButton.vue';
import { AtFileUploadProps } from './types';

export default {
  title: 'Components/AtFileUpload',
  component: AtFileUpload,
  decorators: [DefaultDecorator],
};
const AtFileUploadStory: Story<AtFileUploadProps> = (args) => ({
  name: 'AtFileUploadStory',
  components: { AtFileUpload, AtButton, PaperclipIcon, AddLogoButton },
  setup() {
    return { args };
  },
  template: `<div style="width: 100%; padding: 50px;">
  <AtFileUpload  v-bind="args" :sizeFileMb="4">
 </AtFileUpload>
 <AddLogoButton/>
</div>`,
});
export const Default = AtFileUploadStory.bind({});
Default.args = {
  maxFileMbSize: 5,
  disabled: false,
  maxMultiSelection: 10,
};
