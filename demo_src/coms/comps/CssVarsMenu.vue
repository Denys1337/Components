<template>
  <AtPositionedMenu
    class="CssVarsMenu"
    :menu-item-list="menuItemListGroup"
    :position="position"
    :show="true"
    @click-outside="$emit('selected', null)"
    @menu-item-click="handleVarCssClick"
  />
</template>

<script lang="ts">
  import { defineComponent, computed, PropType } from 'vue';

  import { GroupItem } from 'scripts/comps/types';

  import AtPositionedMenu from '../../../src/js/vue/at_menu/AtPositionedMenu.vue';
  import { MenuItem, MenuItemTypes, MenuItemList } from '../../../src/js/vue/at_menu/types';
  import useClipboardStore from '../../coms/hooks/useClipboardStore';

  type Position = {
    x: number;
    y: number;
  };

  export default defineComponent({
    name: 'CssVarsMenu',
    components: { AtPositionedMenu },
    props: {
      position: {
        type: Object as PropType<Position>,
        required: true,
      },
      defaultVarCssProperty: {
        type: String,
        required: true,
        default: '',
      },
      item: {
        type: Object as PropType<GroupItem>,
        reuired: true,
      },
    },
    emits: ['selected'],
    setup(props, { emit }) {
      const { addCSSProperty } = useClipboardStore();
      const menuItemListGroup = computed(() => {
        const varsCssArr = props.item?.cssVars.map((vCss: string) => {
          return {
            label: vCss,
            name: vCss,
            type: MenuItemTypes.Regular,
            menuItemProps: { calculatedValue: props.item?.calculatedValue },
          } as MenuItem;
        });
        return [{ title: 'CSS Vars', groupItems: varsCssArr }] as MenuItemList;
      });

      function handleVarCssClick(item: MenuItem) {
        const finalValue = `var(${item.name})`;
        addCSSProperty(
          finalValue,
          item.menuItemProps?.calculatedValue as string,
          props.defaultVarCssProperty
        );
        emit('selected', item);
      }
      return {
        menuItemListGroup,
        handleVarCssClick,
      };
    },
  });
</script>
<style lang="scss">
  .CssVarsMenu {
    .Menu {
      background-color: var(--white);
      z-index: 2;
      border-radius: var(--input-border-radius);
      border: 1px solid var(--gray-200);
      .AtMenuGroup {
        .AtMenuItem {
          font-weight: var(--font-normal);
          font-size: var(--font-size-small);
        }
        .menu-group-title {
          color: var(--black);
        }
      }
    }
  }
</style>
