<template>
  <section class="AtTabs">
    <nav class="navigation block-end-07">
      <ul class="navigation-list d-flex margin-00 pad-00">
        <li
          v-for="(tab, index) in configuration"
          class="navigation-list-item p-relative pad-inline-07 pointer font-body-default-b"
          :key="`tab-${index}-${tab.component.name}`"
          :class="{ active: index === selectedIndexModel }"
          @click="selectedIndexModel = index"
        >
          <p class="block-end-03">{{ tab.title }}</p>
        </li>
      </ul>
    </nav>
    <Component v-if="activeTab" v-bind="activeTab.properties" :is="activeTab.component" />
  </section>
</template>
<script lang="ts">
  import { defineComponent, computed, PropType } from 'vue';

  import { TabsConfiguration } from './types';

  export default defineComponent({
    name: 'AtTabs',
    model: {
      prop: 'selectedIndex',
      event: 'update:selectedIndex',
    },
    props: {
      configuration: { type: Array as PropType<TabsConfiguration[]>, required: true },
      /**The selected tab index */
      selectedIndex: { type: Number, required: false, default: 0 },
    },
    emits: ['update:selectedIndex'],
    setup(props, { emit }) {
      const activeTab = computed(() =>
        props.selectedIndex >= 0 ? props.configuration[props.selectedIndex] : undefined
      );
      const selectedIndexModel = computed({
        get: () => props.selectedIndex,
        set: (value: number) => emit('update:selectedIndex', value),
      });
      return { activeTab, selectedIndexModel };
    },
  });
</script>
<style lang="scss" scoped>
  .AtTabs {
    .navigation {
      border-bottom: 2px solid var(--gray-400);

      &-list {
        list-style: none;
        &-item {
          color: var(--gray-800);
          &.active {
            color: var(--gray-1000);

            &::after {
              content: '';
              height: 4px;
              position: absolute;
              background: var(--pri-500);
              width: 100%;
              inset-inline-start: 0;
            }
          }
        }
      }
    }
  }
</style>
