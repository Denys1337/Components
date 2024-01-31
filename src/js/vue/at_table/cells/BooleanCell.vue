<template>
  <div class="BooleanCell">
    <CheckIcon v-if="modelValue" />
    <MinusIcon v-if="modelValue === false" />
  </div>
</template>
<script lang="ts">
  // eslint-disable-next-line import/order
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'BooleanCell' });
</script>
<script lang="ts" setup>
  import { CheckIcon, MinusIcon } from 'vue-tabler-icons';
  defineProps<{ modelValue: '' | boolean }>();
</script>
