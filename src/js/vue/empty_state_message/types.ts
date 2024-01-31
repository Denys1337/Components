import { PropType } from 'vue';

import { TablerIconComponent } from 'vue-tabler-icons';
export enum IconPosition {
  start = 'start',
  end = 'end',
}
export const EmptyStateMessageVueProps = {
  titleI18n: { type: String, required: true },
  descriptionI18n: { type: String, default: '' },
  actionTextI18n: { type: String, default: '' },
  showActionButton: { type: Boolean, default: false },
  buttonTag: { type: String, default: 'button' },
  buttonHref: { type: String, required: false },
  imgWidth: { type: String, required: false },
  buttonIcon: { type: Object as PropType<TablerIconComponent>, required: false },
  iconPosition: {
    type: String as PropType<IconPosition>,
    default: IconPosition.start,
    validator: (value: IconPosition) => Object.values(IconPosition).includes(value),
  },
  buttonIconSize: { type: String, default: '16' },
  centerWithAbsolute: { type: Boolean, default: false },
};
