<template>
  <div v-if="hasItems" class="CSSPropertiesList preview-part-container elevation-level-03">
    <ul class="d-flex flex-column List">
      <CSSPropertyListItem
        v-for="(item, index) in cssProperties"
        :key="index + item.property + item.value"
        :item="item"
        :index="index"
        :on-remove="removeCSSPropertyIndex"
      />
    </ul>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';

  import useClipboardStore from '../../../hooks/useClipboardStore';
  import CSSPropertyListItem from './CSSPropertyListItem.vue';

  import './list.scss';

  export default defineComponent({
    components: { CSSPropertyListItem },
    setup() {
      const { cssProperties, removeCSSPropertyIndex } = useClipboardStore();

      const hasItems = computed(() => {
        return cssProperties.value.length > 0;
      });

      return {
        cssProperties,
        removeCSSPropertyIndex,
        hasItems,
      };
    },
  });
</script>
