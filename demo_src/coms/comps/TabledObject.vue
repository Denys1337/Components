<template>
  <section class="TabledObject d-flex flex-column margin-03 elevation-level-02">
    <h2 v-if="title" class="font-title-x-large">{{ title }}</h2>
    <table class="d-flex flex-column">
      <tr
        class="TabledObject-row d-flex jc-space-between"
        v-for="entry in keyValueEntries"
        :key="entry[0]"
      >
        <td>{{ entry[0] }}</td>
        <td>{{ entry[1] }}</td>
      </tr>
    </table>
  </section>
</template>

<script lang="ts">
  import { defineComponent, computed, PropType } from 'vue';

  export default defineComponent({
    name: 'TabledObject',
    props: {
      title: { type: String, required: false },
      values: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({}),
      },
    },
    setup(props) {
      const keyValueEntries = computed(() => Object.entries(props.values));

      return {
        keyValueEntries,
      };
    },
  });
</script>

<style lang="scss">
  .TabledObject {
    width: 25rem;
    list-style: none;
    border: 1px solid var(--gray-400);
    border-radius: var(--spacing-03);
    padding: var(--spacing-03) !important;
    gap: var(--spacing-03);

    ul {
      gap: var(--spacing-03);
    }

    &-row {
      gap: var(--spacing-03);

      border-bottom: 1px #000 black;
    }
  }
</style>
