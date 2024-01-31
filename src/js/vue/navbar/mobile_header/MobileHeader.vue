<template>
  <div ref="header" class="MobileHeader elevation-level-02 d-grid">
    <button
      data-testid="MobileHeader-main-menu-button"
      class="MobileHeader-menu-item"
      :class="{ active: !endMenuItemActive && showMainMenuModel }"
      @click="showMainMenuModel = !showMainMenuModel"
    >
      <Menu2Icon size="24" />
    </button>
    <HeaderLogo :logo-href="logoHref" v-bind="logoData" :is-icon-mode="false" />
    <button
      v-if="endMenuItem"
      data-testid="MobileHeader-end-item-button"
      class="MobileHeader-menu-item"
      :class="{ active: endMenuItemActive }"
      @click="emit('end-menu-item-click', { mouseEvent: $event, menuItem: endMenuItem })"
    >
      <Component :is="endMenuItem.icon" size="24" />
    </button>
  </div>
</template>

<script lang="ts">
  export default { name: 'MobileHeader' };
</script>

<script setup lang="ts">
  import { PropType, computed, ref } from 'vue';

  import { Menu2Icon } from 'vue-tabler-icons';

  import useWatchResize from '../../hooks/useWatchResize';
  import setGlobalCssVar from '../../utils/setGlobalCssVar';
  import HeaderLogo from '../header_logo/HeaderLogo.vue';
  import { CustomSidePanelMenuItem, LogoData } from '../types';
  const emit = defineEmits(['update:showMainMenu', 'end-menu-item-click', 'header-logo-click']);
  const props = defineProps({
    logoHref: { type: String, required: false },
    showMainMenu: { type: Boolean, default: false },
    logoData: {
      type: Object as PropType<LogoData>,
      required: true,
    },
    endMenuItem: { type: Object as PropType<CustomSidePanelMenuItem>, required: false },
    endMenuItemActive: { type: Boolean, default: false },
  });

  const header = ref<HTMLElement>();
  useWatchResize(header, (el) => {
    setGlobalCssVar('--header-height', `${el.target.clientHeight}px`);
  });

  const showMainMenuModel = computed({
    get: () => props.showMainMenu,
    set: (value: boolean) => emit('update:showMainMenu', value),
  });
</script>

<style lang="scss">
  .MobileHeader {
    z-index: calc(var(--main-menu-z) + 10);
    position: fixed;
    align-items: center;
    justify-items: center;
    grid-template-columns: 32px 1fr 32px;
    inset-block-start: 0;
    inset-inline: 0;
    padding-inline: var(--spacing-04);
    padding-block: var(--spacing-06) var(--spacing-04);
    background-color: var(--gray-100);
    &-menu-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2rem;
      height: 2rem;
      border-radius: 6px;
      &.active {
        background-color: var(--pri-100);
        color: var(--pri-500);
      }
    }
  }
</style>
