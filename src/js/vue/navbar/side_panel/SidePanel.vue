<template>
  <nav
    class="SidePanel"
    :class="{
      'cover-screen': coverScreen,
      'mobile-sidepanel': isMobile,
      'show-close-button': showClose,
    }"
  >
    <div class="top-bar pad-04">
      <h2 :class="coverScreen ? 'font-title-xx-large' : 'font-tag'">
        {{ title }}
      </h2>
      <button class="top-bar-close" @click="$emit('close')">
        <template v-if="showClose">
          <img v-if="isMobile" :width="xIconSize" :src="CircleArrowLeft" class="rtl-rotate-180" />
          <XIcon v-else :size="xIconSize" />
        </template>
      </button>
      <div v-if="isSearchEnabled" class="search-wrapper">
        <SearchInput
          v-model="searchTextModel"
          auto-focus
          :placeholder="$t('general.search')"
          class="w-100"
        />
      </div>
    </div>
    <div class="SidePanel-main-slot pad-inline-04">
      <slot name="main">
        <MenuItemList
          class="nav-section"
          :icons-size="iconsSize"
          main-tag="section"
          :items="filteredMenuItems"
          :display-collapseable-as-sections="coverScreen"
          :should-keep-sub-links-open="!!searchTextModel || coverScreen"
          :is-hover-affect-on-parent="!coverScreen"
          :auto-padding="false"
        />
      </slot>
    </div>
    <div class="nav-section pad-04">
      <slot name="footer"></slot>
    </div>
  </nav>
</template>

<script lang="ts">
  export default {
    name: 'SidePanel',
  };
</script>

<script setup lang="ts">
  import { PropType, ref, computed } from 'vue';

  import { XIcon } from 'vue-tabler-icons';

  import SearchInput from '../../at_input/SearchInput.vue';
  import MenuItemList from '../MenuItemList.vue';
  import { DEFAULT_ICON_SIZE } from '../constants';
  import { MenuItem } from '../types';
  import { findInMenuItem } from '../utils';

  const CircleArrowLeft = require('../../../assets/icons/CircleArrowLeft.svg');

  const emit = defineEmits(['close', 'update:searchText']);
  const props = defineProps({
    isSearchEnabled: { type: Boolean, default: true },
    title: { type: String, default: '' },
    menuItems: { type: Array as PropType<MenuItem[]>, required: false },
    iconsSize: { type: Number, default: DEFAULT_ICON_SIZE },
    showClose: { type: Boolean, default: true },
    coverScreen: { type: Boolean, default: false },
    searchText: { type: String, required: false },
    isMobile: { type: Boolean, default: false },
  });
  const localSearchText = ref('');
  const searchTextModel = computed({
    get: () => props.searchText ?? localSearchText.value,
    set: (value: string) => {
      if (props.searchText !== undefined) {
        emit('update:searchText', value);
      } else {
        localSearchText.value = value;
      }
    },
  });

  const filteredMenuItems = computed<MenuItem[]>(() => {
    if (!props.menuItems) return [];
    if (!searchTextModel.value) return props.menuItems;
    const newMenuItems = [];
    for (const item of props.menuItems) {
      const newMenuItem = findInMenuItem(searchTextModel.value, item) as MenuItem;
      if (newMenuItem) newMenuItems.push(newMenuItem);
    }
    return newMenuItems;
  });

  const xIconSize = computed(() => {
    if (props.isMobile) return '48';

    return props.coverScreen ? '24' : '16';
  });
</script>

<style lang="scss">
  @import '@style/scss/_mixin';

  .SidePanel {
    display: flex;
    position: relative;
    flex-direction: column;
    z-index: 1;
    width: 248px;
    height: calc(100vh - var(--header-height));
    overflow: hidden;
    background: var(--gray-100);
    @include ltr-rtl(box-shadow, 2px 0px 5px rgba(0, 0, 0, 0.1), 0px 2px 5px rgba(0, 0, 0, 0.1));
    &-main-slot {
      height: 100%;
      overflow-y: auto;
      padding-block-end: var(--spacing-03);
      position: relative;
      &::after {
        content: '';
        height: var(--spacing-03);
        position: absolute;
        inset-block-end: 0;
        width: 90%;
        display: block;
        box-shadow: 0px -10px 10px var(--gray-100);
        border: none;
      }
    }
    .top-bar {
      z-index: 2;
      background: inherit;
      display: grid;
      align-items: center;
      grid-template-columns: 1fr 50px;
      gap: var(--spacing-04);
      color: var(--gray-800);
      inset-inline-start: 0;
      inset-block-start: 0;
      &-close {
        cursor: pointer;
        align-self: top;
        justify-self: end;
        color: var(--gray-800);
      }
      .search-wrapper {
        grid-column: span 2;
      }
    }

    .nav-section {
      max-height: 100%;
      overflow-y: auto;
      z-index: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .section-title {
      color: var(--gray-1000);
      text-transform: capitalize;
      margin-block-end: var(--spacing-04);
      margin-block-start: var(--spacing-05);
    }
    &.cover-screen {
      max-width: unset;
      --flex-gap: var(--spacing-07);
      height: calc(100vh - var(--header-height));
      width: calc(100vw - var(--header-icon-mode-width));
      padding-inline: var(--spacing-09);
      .nav-section {
        display: grid;
        flex-direction: row;
        grid-template-columns: repeat(auto-fill, 250px);
        grid-auto-flow: row dense;
        gap: var(--flex-gap);
        width: calc(100% - (var(--flex-gap)));
        max-height: 100%;
        flex-wrap: wrap;
        .links-section {
          width: min(calc(100% + var(--flex-gap) * 2), 250px);
          flex-grow: 0;
        }
        //Pushing all menu items to start
        &::after {
          content: '';
          width: 100%;
          display: block;
          margin-inline-end: auto;
        }
      }
      .top-bar {
        padding-block-start: var(--spacing-10);
        grid-template-columns: 3fr 1fr 50px;
        .search-wrapper {
          grid-row: 1;
          grid-column: 2;
        }
        .title {
          color: var(--gray-1000);
          text-transform: capitalize;
        }
      }
    }

    &.mobile-sidepanel {
      padding-block-start: var(--spacing-07);
      &.show-close-button {
        padding-block-end: calc(var(--spacing-08) + 48px);
      }
      .top-bar-close {
        position: absolute;
        inset-block-end: var(--spacing-08);
        inset-inline-start: 50%;
        @include ltr-rtl(transform, translateX(-50%), translateX(50%));
      }
    }
  }
</style>
