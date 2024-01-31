<template>
  <div class="CollapsableLink">
    <Component
      :is="props.displayAsSections ? 'h4' : 'button'"
      :aria-label="item.name"
      class="collapse-button at-nav-link"
      :class="buttonClasses"
      @click.prevent.stop="toggle()"
    >
      <Component
        v-if="item.icon && !displayAsSections"
        class="flex-shrink-0"
        :is="item.icon"
        :size="`${iconsSize}`"
      />
      <span v-tooltip.overflow="{ delay: TOOLTIP_DELAY }"> {{ item.name }} </span>
      <ChevronDownIcon
        v-if="!shouldKeepOpen"
        class="chevron"
        :size="`${iconsSize}`"
        :class="{ open: isOpen }"
      />
    </Component>
    <Transition name="collapse">
      <div class="collapsable-menu" v-if="isOpen">
        <NavLink
          v-for="(child, index) in item.children"
          :is-custom-actions="isCustomActions"
          :key="child.name"
          :aria-label="child.name"
          :is-child="!displayAsSections"
          v-bind="{ item: child, showOnlyIcon, iconsSize, capitalizeLabels }"
          @focusin.stop="toggle(true)"
          @focusout="closeOnLastChildFocusOut(index, item as MenuItem)"
          @click="isCustomActions && customActionHandler($event, child)"
        />
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'CollapsableLink',
  };
</script>

<script setup lang="ts">
  import { computed, PropType, ref } from 'vue';

  import { ChevronDownIcon } from 'vue-tabler-icons';

  import { tooltip as vTooltip } from '../directives/tooltip';
  import NavLink from './NavLink.vue';
  import { DEFAULT_ICON_SIZE, TOOLTIP_DELAY } from './constants';
  import { CollapsableMenuItem, MenuItem } from './types';
  const props = defineProps({
    item: { type: Object as PropType<CollapsableMenuItem>, required: true },
    showOnlyIcon: { type: Boolean, default: false },
    iconsSize: { type: Number, default: DEFAULT_ICON_SIZE },
    capitalizeLabels: { type: Boolean, default: true },
    shouldKeepOpen: { type: Boolean, default: false },
    displayAsSections: { type: Boolean, default: false },
    isHoverAffectOnParent: { type: Boolean, default: true },
    isCustomActions: { type: Boolean, default: false },
  });
  const emit = defineEmits(['custom-menu-item-click']);

  const isManuallyOpen = ref(props.item.current);

  const toggle = (value?: boolean) => {
    isManuallyOpen.value = typeof value === 'undefined' ? !isManuallyOpen.value : value;
  };

  const isOpen = computed(() => isManuallyOpen.value || props.shouldKeepOpen);

  const closeOnLastChildFocusOut = (index: number, item: MenuItem) =>
    item.children && index === item.children.length - 1 && toggle(false);

  const buttonClasses = computed(() => [
    props.displayAsSections ? 'font-body-default-b' : 'font-body-small',
    {
      'cursor-pointer': !props.displayAsSections,
      'no-hover-affect': !props.isHoverAffectOnParent,
      capitalize: props.capitalizeLabels,
    },
  ]);

  const buttonMargin = computed(() => (props.displayAsSections ? 'var(--spacing-04)' : '0px'));

  const customActionHandler = (e: MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    e.preventDefault();
    emit('custom-menu-item-click', item);
  };
</script>

<style lang="scss">
  .CollapsableLink {
    user-select: none;
    .chevron {
      color: var(--gray-800);
      flex-shrink: 0;
      margin-inline-start: auto;
      transition: transform 200ms ease-in-out;
      &.open {
        transform: rotate(180deg);
      }
    }
    .collapse-button {
      margin-block-end: v-bind(buttonMargin);
    }
  }
  .collapsable-menu {
    margin-block-start: var(--spacing-02);
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4px;
    z-index: 0;
  }

  .collapse-enter-active,
  .collapse-leave-active {
    transition: opacity 300ms ease-in-out, max-height 400ms ease-in-out;
    max-height: 100vh;
  }

  .collapse-enter-from,
  .collapse-leave-to {
    max-height: 0;
    opacity: 0;
  }
</style>
