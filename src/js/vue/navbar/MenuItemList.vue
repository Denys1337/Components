<template>
  <Component
    :is="mainTag"
    data-testid="main-menu"
    class="MenuItemList"
    :class="{ 'pad-inline-04': autoPadding }"
  >
    <slot name="start"></slot>
    <template v-for="item in items" :key="item.name">
      <CollapsableLink
        v-if="item.children?.length"
        class="links-section"
        :style="{ 'grid-row': `span ${2 + item.children!.length}` }"
        v-bind="{ item: (item as CollapsableMenuItem), showOnlyIcon: mini, iconsSize, capitalizeLabels }"
        :is-hover-affect-on-parent="isHoverAffectOnParent"
        :should-keep-open="shouldKeepSubLinksOpen"
        :display-as-sections="displayCollapseableAsSections"
      />
      <NavLink
        v-else
        class="links-section"
        v-bind="{ item: (item as MenuItem), showOnlyIcon: mini, iconsSize, capitalizeLabels }"
      />
    </template>
    <slot name="end"></slot>
  </Component>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  import CollapsableLink from './CollapsableLink.vue';
  import NavLink from './NavLink.vue';
  import { DEFAULT_ICON_SIZE } from './constants';
  import { CollapsableMenuItem, MenuItem } from './types';

  import './nav_bar.scss';

  export default defineComponent({
    name: 'MenuItemList',
    components: { NavLink, CollapsableLink },
    props: {
      items: { type: Array as PropType<MenuItem[] | CollapsableMenuItem[]>, required: true },
      mini: { type: Boolean, default: false },
      mainTag: { type: String, default: 'nav' },
      iconsSize: { type: Number, default: DEFAULT_ICON_SIZE },
      capitalizeLabels: { type: Boolean, default: true },
      shouldKeepSubLinksOpen: { type: Boolean, required: false },
      sectionSpacing: { type: String, default: '4px' },
      displayCollapseableAsSections: { type: Boolean, default: false },
      isHoverAffectOnParent: { type: Boolean, default: true },
      autoPadding: { type: Boolean, default: true },
    },
  });
</script>

<style lang="scss">
  .MenuItemList {
    .links-section {
      margin-block-end: v-bind(sectionSpacing);
    }
  }
</style>
