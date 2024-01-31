<template>
  <PortalToBody
    class="AtPositionedMenu"
    :reposition="true"
    position="bottom"
    align="start"
    :align-with="position"
    v-if="show && menuItemList.length"
  >
    <MenuList
      ref="menuContainerRef"
      class="AtPositionedMenu-menu p-absolute"
      :menu-item-list="menuItemList"
      @menu-item-click="$emit('menu-item-click', $event)"
    />
  </PortalToBody>
</template>

<script lang="ts">
  import { defineComponent, ref, PropType } from 'vue';

  import useClickOutside from '../hooks/useClickOutside';
  import PortalToBody from '../portal_to_body/PortalToBody.vue';
  import MenuList from './MenuList.vue';
  import { MenuItemList } from './types';

  export default defineComponent({
    name: 'AtPositionedMenu',
    components: { MenuList, PortalToBody },
    props: {
      menuItemList: {
        type: Array as PropType<MenuItemList>,
        required: true,
      },
      position: {
        type: Object as PropType<DOMRect>,
        required: true,
      },
      show: { type: Boolean, default: false },
      transfrom: { type: String, default: '' },
    },
    emits: ['click-outside', 'menu-item-click'],
    setup(_, { emit }) {
      const menuContainerRef = ref();
      const align = ref();

      useClickOutside([menuContainerRef], () => {
        emit('click-outside');
      });

      return { menuContainerRef, align };
    },
  });
</script>

<style lang="scss" scoped>
  .AtPositionedMenu {
    &-menu {
      display: inline-block;
      body[dir='rtl'] & {
        transform: translateX(-100%);
      }
    }
  }
</style>
