import { Story } from '@storybook/vue3';

import { DefaultDecorator } from '@stories/decorators';

import PictureSlider from './PictureSlider.vue';

export default {
  title: 'Components/PictureSlider',
  component: PictureSlider,
  decorators: [DefaultDecorator],
};

const PictureSliderStory: Story<typeof PictureSlider> = (args) => ({
  name: 'PictureSliderStory',
  components: { PictureSlider },
  setup() {
    return { args };
  },
  template: `
  <div style="width: 500px ;height:300px; padding: 50px;">
    <PictureSlider v-bind="args" />
  </div>`,
});

export const Default = PictureSliderStory.bind({});

Default.args = {
  pictures: [
    {
      alt: 'city',
      caption: 'Caption : river city',
      title: 'title',
      src: 'https://images.pexels.com/photos/11578092/pexels-photo-11578092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      thumbSrc:
        'https://images.pexels.com/photos/11578092/pexels-photo-11578092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      alt: 'city',
      caption: 'Caption : river city',
      title: 'second title',
      src: 'https://images.pexels.com/photos/6858680/pexels-photo-6858680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      thumbSrc:
        'https://images.pexels.com/photos/6858680/pexels-photo-6858680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      alt: 'city 3',
      caption: 'caption 3',
      title: 'ttile 3',
      src: 'https://images.pexels.com/photos/13378650/pexels-photo-13378650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      thumbSrc:
        'https://images.pexels.com/photos/13378650/pexels-photo-13378650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ],
} as typeof PictureSlider;
