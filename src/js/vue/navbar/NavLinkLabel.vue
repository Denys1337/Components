<template>
  <div class="at-nav-link">
    <Component
      v-if="item.icon"
      :size="`${iconsSize}`"
      class="NavLinkLabel MenuItemList-item-icon flex-shrink-0"
      :is="item.icon"
    />
    <span v-if="!showOnlyIcon" v-tooltip.overflow="{ delay: TOOLTIP_DELAY }" class="name">
      {{ item.name }}
    </span>
    <span
      v-if="item.counter"
      class="link-icon-end count-icon flex-shrink-0"
      :class="{ 'inline-end-01': !isShowChevron, 'icon-mode': showOnlyIcon }"
    >
      {{ item.counter }}
    </span>
    <ChevronRightIcon
      class="text-gray-800 rtl-rotate-180 inline-end-01"
      :class="{ 'link-icon-end': !item.counter }"
      size="16"
      v-if="isShowChevron && !showOnlyIcon"
    />
  </div>
</template>

<script lang="ts">
  export default { name: 'NavLinkLabel' };
</script>

<script setup lang="ts">
  import { PropType, computed } from 'vue';

  import { ChevronRightIcon } from 'vue-tabler-icons';

  import { tooltip as vTooltip } from '../directives/tooltip';
  import { DEFAULT_ICON_SIZE, TOOLTIP_DELAY } from './constants';
  import { MenuItem } from './types';

  const props = defineProps({
    iconsSize: { type: Number, default: DEFAULT_ICON_SIZE },
    item: { type: Object as PropType<MenuItem>, required: true },
    showOnlyIcon: { type: Boolean, default: false },
    showChevron: { type: Boolean, default: false },
  });

  const isShowChevron = computed(() => props.showChevron || props.item.showChevron);
</script>
