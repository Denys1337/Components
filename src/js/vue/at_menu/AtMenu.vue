<template>
  <div class="AtMenu">
    <AtTriggerWithOverlayContext
      min-overlay-width="248"
      :show-overlay="isActionMenuVisible"
      @update:toggle-overlay="isActionMenuVisible = $event"
    >
      <template #trigger>
        <div class="AtMenu-trigger" @click="handleTriggerClick">
          <slot :is-action-menu-visible="isActionMenuVisible"></slot>
        </div>
      </template>
      <template #overlay>
        <MenuList :menu-item-list="menuItemList" @menu-item-click="handleMenuItemClick($event)" />
      </template>
    </AtTriggerWithOverlayContext>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType, ref } from 'vue';

  import AtTriggerWithOverlayContext from '../at_trigger_with_overlay_context/AtTriggerWithOverlayContext.vue';
  import MenuList from './MenuList.vue';
  import { MenuItem, MenuItemList } from './types';

  export default defineComponent({
    name: 'AtMenu',
    components: {
      AtTriggerWithOverlayContext,
      MenuList,
    },
    props: {
      menuItemList: {
        type: Array as PropType<MenuItemList>,
        required: true,
      },
      position: { type: String, required: false },
      align: { type: String, required: false },
    },
    emits: ['menu-item-click'],
    setup(_, { emit }) {
      const isActionMenuVisible = ref(false);

      function handleTriggerClick() {
        isActionMenuVisible.value = !isActionMenuVisible.value;
      }

      function handleMenuItemClick(menuItem: MenuItem) {
        emit('menu-item-click', menuItem);
        handleTriggerClick();
      }

      return {
        isActionMenuVisible,
        handleTriggerClick,
        handleMenuItemClick,
      };
    },
  });
</script>
<style lang="scss">
  .AtMenu {
    &::v-deep .trigger-wrapper {
      display: inline-block;
    }

    &-trigger {
      cursor: pointer;
    }
  }
</style>
