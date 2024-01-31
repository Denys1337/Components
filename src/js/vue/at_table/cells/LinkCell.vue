<template>
  <a
    target="_blank"
    :href="modelValue.href"
    :id="cellId"
    class="LinkCell"
    @mouseover="mouseoverHandler"
  >
    {{ modelValue.title }}
  </a>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import createId from '@agritask/js-utils/libs/createId';

  interface LinkValue {
    title: string;
    href: string;
    hint?: string;
  }
  const props = defineProps<{ modelValue: LinkValue }>();
  const emits = defineEmits(['show-tooltip']);
  const cellId = ref<string>();
  const mouseoverHandler = ref<Function | undefined>();

  if (props.modelValue.hint) {
    cellId.value = createId('LinkCell');
    mouseoverHandler.value = () =>
      emits('show-tooltip', { id: cellId.value, message: props.modelValue.hint });
  }
</script>

<style></style>
