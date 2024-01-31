<template>
  <div class="AtFormStackHeader d-flex jc-space-between ai-center block-end-06 pad-inline-06">
    <span
      class="font-body-small-b AtFormStackHeader-number pad-02 text-align-center d-block"
      v-if="questionHierarchyText"
      >{{ questionHierarchyText }}</span
    >
    <XIcon
      size="24"
      class="remove-stack-icon text-gray-600 pointer"
      @click="$emit('remove-stack')"
      v-if="showRemoveButton"
    />
  </div>
  <div class="font-title-large pad-inline-06">{{ title }}</div>
</template>
<script lang="ts">
  export default {
    name: 'AtFormStackHeader',
  };
</script>
<script setup lang="ts">
  import { XIcon } from 'vue-tabler-icons';

  defineEmits(['remove-stack']);

  defineProps({
    questionHierarchyText: {
      type: String,
    },
    showRemoveButton: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
  });
</script>
<style lang="scss">
  .AtFormStackHeader {
    &-number {
      background-color: var(--pri-500);
      color: var(--white);
      border-radius: 5rem;
      min-width: var(--spacing-09);
      width: fit-content;
    }

    .remove-stack-icon {
      &:hover {
        color: var(--gray-1000);
      }
    }
  }
</style>
