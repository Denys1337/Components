import { Story } from '@storybook/vue3';
import { BallpenIcon } from 'vue-tabler-icons';
import { PlusIcon } from 'vue-tabler-icons';

import { DefaultDecorator } from '@stories/decorators';

import AtBadge from '../at_badge/AtBadge.vue';
import AtButton from '../at_button/AtButton.vue';
import { MenuItemList, MenuItemTypes } from '../at_menu/types';
import AtCard from './AtCard.vue';
import AtCardSkeleton from './components/AtCardSkeleton.vue';
import { AtCardProps } from './types';

export default {
  title: 'Components/AtCard',
  component: { AtCard, AtCardSkeleton },
  decorators: [DefaultDecorator],
};

// AtCardStory
const AtCardStory: Story<AtCardProps> = (args) => ({
  name: 'AtCardStory',
  components: { AtCard },
  setup() {
    return { args };
  },
  template: `
  <div style="height:275px; width:385px;" class="d-flex jc-center">
    <AtCard v-bind="args"/>
  </div>`,
});
export const Default = AtCardStory.bind({});
Default.args = {
  clickable: false,
  additionalInfo: 'additional info',
  imageUrl: require('@/assets/types/grower.svg'),
  imageSize: '44',
  showImage: true,
  title: 'Card long title with tooltip',
  description: 'descriptionp description ',
  subTitle: 'Version 0.0',
  buttonContent: 'Start Audit',
  menuItems: [
    {
      icon: BallpenIcon,
      label: 'start_auditing',
      name: 'start-execution',
      type: MenuItemTypes.Regular,
    },
  ] as MenuItemList,
  id: 'id',
  extended: false,
  tag: 'button',
  height: '80',
  defaultAddCard: false,
  clickableCardText: 'Add new',
  showDividerLine: true,
  cardClickableDisabled: false,
  showButton: true,
};

// AtCardClickable
const AtCardClickableStory: Story = () => ({
  name: 'AtCardClickableStory',
  components: { AtCard, PlusIcon },
  template: `
  <div style="padding: 50px; width:800px;">
  <AtCard :show-default-add-card="false" extended clickable><template #text><div class="d-flex gap-01 ai-center text-pri-600"><PlusIcon size="16"/><span>New question</span></div></template></AtCard>
  <div style=" height:270px; width:320px">
  <AtCard clickable-card-text="Add New" default-add-card  clickable></AtCard>
  </div>
  </div>`,
});
export const Clickable = AtCardClickableStory.bind({});

// AtCardWithSlotsStory
const AtCardWisthSlotsStory: Story<AtCardProps> = (args) => ({
  name: 'AtCardWithSlotsStory',
  components: { AtCard, AtButton, PlusIcon, AtBadge },
  setup() {
    return { args };
  },
  template: `
  <div style="padding: 50px;">
    <AtCard v-bind="args">
    <template #startHeader><PlusIcon size="50"/></template>
    <template #beforeEndHeader><AtBadge label="before end header" type="InProgress"></AtBadge></template>
    <template #endHeaderTitle><span>Title Header</span><span>subTitle one</span></template>
    <template #endHeaderSubtitle><div class="d-flex ai-center"><PlusIcon size="14"/><span>subTitle two</span></div></template>
    <template #afterEndHeader>After end header</template>
    <template #description>description as slot very very very very very long long long long long long long very long </template>
    <template #startAdditional><span>some info as slot</span><AtButton>as slot</AtButton></template>
    </AtCard>
  </div>`,
});
export const withSlots = AtCardWisthSlotsStory.bind({});

// AtCardSkeleton
const AtCardSkeletonStory: Story = () => ({
  name: 'AtCardSekeltonStory',
  components: { AtCardSkeleton },
  setup() {
    return {};
  },
  template: `
  <div style="padding: 50px;">
    <AtCardSkeleton/>
  </div>`,
});

export const Skeleton = AtCardSkeletonStory.bind({});
