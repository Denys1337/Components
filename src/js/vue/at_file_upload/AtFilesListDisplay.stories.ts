import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import AtFilesListDisplay from './AtFilesListDisplay.vue';
import { AtFileListDisplayProps } from './types';

export default {
  title: 'Components/AtFilesListDisplay',
  component: AtFilesListDisplay,
  decorators: [DefaultDecorator],
};
const AtFilesListDisplayStory: Story<AtFileListDisplayProps> = (args) => ({
  name: 'AtFilesListDisplayStory',
  components: { AtFilesListDisplay },
  setup() {
    return { args };
  },
  template: `<div style="width: 100%; padding: 50px;">
<AtFilesListDisplay v-bind="args"></AtFilesListDisplay>
</div>`,
});
export const Default = AtFilesListDisplayStory.bind({});
Default.args = {
  filesToDisplay: [
    {
      uuid: '1',
      fileName: 'one',
      src: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      uuid: '2',
      fileName: 'Two',
      src: 'https://www.rd.com/wp-content/uploads/2019/01/shutterstock_673465372.jpg?fit=700,467',
    },
    {
      uuid: '3',
      fileName: 'Three',
      src: 'https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-08/220805-border-collie-play-mn-1100-82d2f1.jpg',
    },
  ],
  displayFileName: true,
  deleteIconSize: 23,
};
