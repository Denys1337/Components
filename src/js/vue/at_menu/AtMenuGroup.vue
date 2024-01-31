<template>
  <section class="AtMenuGroup block-01 pad-block-01" v-if="groupItems.length">
    <h3 class="menu-group-title pad-02 margin-00">{{ title }}</h3>
    <AtMenuItem
      v-for="menuItem of groupItems"
      :key="menuItem.name"
      v-bind="menuItem"
      @menu-item-click="$emit('menu-item-click', $event)"
    />
  </section>
</template>
<script lang="ts">
  import { defineAsyncComponent, defineComponent, PropType } from 'vue';

  import { MenuItem } from './types';
  const AtMenuItem = defineAsyncComponent(() => import('./AtMenuItem.vue'));

  export default defineComponent({
    name: 'AtMenuGroup',
    components: {
      AtMenuItem,
    },
    props: {
      title: {
        type: String,
        required: true,
      },
      groupItems: {
        type: Array as PropType<MenuItem[]>,
        default: () => [],
      },
    },
    emits: ['menu-item-click'],
  });
</script>
<style lang="scss">
  @import '../../../style/scss/_base_functions.scss';
  @import '../../../style/scss/_colors.scss';

  .AtMenuGroup {
    border-top: 1px solid rgba($gray-800, 0.28);
    border-bottom: 1px solid rgba($gray-800, 0.28);
  }

  .menu-group-title {
    color: var(--gray-900);

    // TODO - ask Uzi about text class
    font-size: pxToRem(14);
    line-height: 1.4;
    font-weight: 600;
  }
</style>
