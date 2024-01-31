<template>
  <section
    class="VisualizedGroup block-end-04"
    :class="{
      'empty-group': !filteredItems.length,
      highlight: config.highlight,
      deprecated: config.deprecated,
    }"
  >
    <h2 class="group-title">
      <Component
        v-if="collapsed !== 'disabled'"
        :is="collapsed ? 'ChevronUpIcon' : 'ChevronDownIcon'"
        class="toggle p-relative"
        @click="collapsed = !collapsed"
        tabindex="0"
      />
      {{ title }}
    </h2>
    <template v-if="!collapsed">
      <button
        v-for="item in filteredItems"
        :key="item.key"
        @click="onItemClick(item, $event)"
        class="VisualizedGroup-item pad-01-02 block-end-03"
      >
        <Component :is="getComponentType(item)" :item="item" />
      </button>
    </template>
    <div>
      <CssVarsMenu
        v-if="isVarsMenuVisible"
        :item="itemSelected"
        :position="position"
        :default-var-css-property="config.property || ''"
        @selected="isVarsMenuVisible = false"
      />
    </div>
  </section>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType, ref, watch } from 'vue';

  import { Group, GroupItem } from 'scripts/comps/types';
  import { ChevronUpIcon, ChevronDownIcon } from 'vue-tabler-icons';

  import { isColorValue } from '../../../helpers/colors';
  import CssVarsMenu from '../../comps/CssVarsMenu.vue';
  import useClipboardStore from '../../hooks/useClipboardStore';
  import useFilter from '../../hooks/useFilter';
  import ColorVisualizer from './ColorVisualizer.vue';
  import FontVarVisualizer from './FontVarVisualizer.vue';
  import SizeVisualizer from './SizeVisualizer.vue';

  type Collapsed = boolean | 'disabled';

  interface GroupConfig {
    component: string;
    property?: string;
    collapsed: Collapsed;
    deprecated: boolean;
    highlight: boolean;
  }

  const defaultConfig: GroupConfig = {
    component: 'SizeVisualizer',
    collapsed: false,
    deprecated: false,
    highlight: true,
  };

  export default defineComponent({
    name: 'VisualizedGroup',
    components: {
      ColorVisualizer,
      FontVarVisualizer,
      SizeVisualizer,
      ChevronUpIcon,
      ChevronDownIcon,
      CssVarsMenu,
    },
    props: {
      group: { type: Object as PropType<Group>, required: true },
      visualizerType: String,
    },
    setup(props) {
      const { addCSSProperty } = useClipboardStore();

      const collapsed = ref<Collapsed>(true);
      const config = ref<GroupConfig>();

      const itemSelected = ref<GroupItem>();
      const position = ref({ x: 0, y: 0 });
      const isVarsMenuVisible = ref<boolean>(false);

      watch(
        () => props.group.title,
        () => {
          const index = props.group.title.trim().indexOf('{');

          config.value =
            index === -1
              ? defaultConfig
              : {
                  ...defaultConfig,
                  ...JSON.parse(props.group.title.substring(index)),
                };

          collapsed.value = config.value!.collapsed;
        },
        { immediate: true }
      );

      const getComponentType = (item: GroupItem) => {
        if (isColorValue(item.calculatedValue)) {
          return 'ColorVisualizer';
        }
        return config.value!.component;
      };

      const onItemClick = (item: GroupItem, e: PointerEvent) => {
        e.stopPropagation();
        if (item.cssVars.length > 1) {
          position.value = { x: e.pageX, y: e.pageY };
          itemSelected.value = item;
          isVarsMenuVisible.value = true;
        } else {
          isVarsMenuVisible.value = false;
          const finalValue = item.cssVars?.[0] ? `var(${item.cssVars[0]})` : item.key;
          addCSSProperty(finalValue, item.calculatedValue, config.value!.property);
        }
      };

      const title = computed(() => {
        const { title } = props.group;
        const index = title.indexOf('{');
        return (index > -1 ? title.substr(0, index) : title).trim();
      });

      const { registerTargetToFilter } = useFilter();
      const filteredItems = registerTargetToFilter(props.group.items, 'key');
      return {
        getComponentType,
        onItemClick,
        title,
        filteredItems,
        collapsed,
        config,
        position,
        isVarsMenuVisible,
        itemSelected,
      };
    },
  });
</script>

<style lang="scss">
  .VisualizedGroup {
    .toggle {
      cursor: pointer;
      top: 0.1em;
    }

    &.highlight {
      .group-title {
        font-weight: var(--font-bolder);
        font-size: var(--font-size-xx-large);
      }
    }

    &.deprecated {
      .group-title {
        text-decoration: line-through;
      }
    }
  }
  .VisualizedGroup-item {
    + .VisualizedGroup-item {
      border-inline-start: solid 1px var(--greyE5);
    }

    &:hover {
      background: var(--pri-100);
    }
  }
</style>
