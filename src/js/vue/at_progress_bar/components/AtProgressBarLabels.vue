<template>
  <div class="AtProgressBarLabels legend d-flex jc-space-between" :class="size">
    <span>{{ actionText }}</span>
    <span>{{ resultText }}</span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'AtProgressBarLabels',
    components: {},
    props: {
      size: {
        type: String,
        required: false,
      },
      actionText: {
        type: String,
        required: false,
      },
      resultText: {
        type: String,
        required: false,
      },
    },
    setup() {
      return {};
    },
  });
</script>

<style lang="scss" scoped></style>
