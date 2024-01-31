<template>
  <section class="ItemsFilter p-sticky top-0 z1">
    <AtInput v-model="filterText" title="Filter" />
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import AtInput from '@/vue/at_input/AtInput.vue';

  import useFilter from '../../hooks/useFilter';

  export default defineComponent({
    name: 'ItemsFilter',
    components: { AtInput },
    emits: ['change', 'update:modelValue', 'focus', 'is-valid'],
    setup() {
      const { filterText } = useFilter();
      return {
        filterText,
      };
    },
  });
</script>

<style lang="scss">
  .ItemsFilter {
    --spacing: var(--spacing-03);
    top: var(--spacing);
    padding: var(--spacing) var(--spacing) var(--spacing) 0;
    background: var(--white);
    display: inline-block;
    width: 50%;
    max-width: 300px;
  }
</style>
