<template>
  <div class="AtFormStackWrapper pad-block-start-06 pad-block-end-04">
    <slot></slot>
  </div>
</template>
<script lang="ts">
  export default {
    name: 'AtFormStackWrapper',
  };
</script>
<style lang="scss" scoped>
  .AtFormStackWrapper {
    border-radius: var(--spacing-02);
    background: var(--white);
    border: 1px solid var(--gray-400);
  }
</style>
