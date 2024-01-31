<template>
  <div class="MenuList pad-02 elevation-level-02">
    <Component
      v-for="(menuItem, index) of menuItemList"
      :key="getKey(menuItem, index)"
      :is="getComponent(menuItem)"
      v-bind="menuItem"
      @menu-item-click="$emit('menu-item-click', $event)"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  import createId from '@agritask/js-utils/libs/createId';

  import { getComponent, MenuItemList, MenuItemOrGroup } from './types';

  export default defineComponent({
    name: 'MenuList',
    components: {},
    props: {
      menuItemList: {
        type: Array as PropType<MenuItemList>,
        required: true,
      },
    },
    emits: ['menu-item-click'],
    setup(props) {
      const menuKey = createId('menu-group-');

      const getKey = (item: MenuItemOrGroup, index: number) => {
        return item.groupItems ? menuKey + index : item.name;
      };
      return {
        getKey,
        getComponent,
      };
    },
  });
</script>

<style lang="scss">
  .MenuList {
    width: 248px;
    list-style-type: none;
    background: var(--white);
    border-radius: 8px;

    .AtMenuGroup:first-child {
      border-top: none;
    }
  }
</style>
