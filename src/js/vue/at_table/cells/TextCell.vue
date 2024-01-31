<template>
  <span
    ref="cell"
    :id="cellId"
    class="TextCell"
    @mouseover="mouseoverHandler"
    v-if="fullText !== ''"
  >
    {{ fullText }}
  </span>
</template>

<script lang="ts">
  // eslint-disable-next-line import/order
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'TextCell',
  });
</script>

<script lang="ts" setup>
  import { computed, ref } from 'vue';

  import createId from '@agritask/js-utils/libs/createId';

  const cell = ref<HTMLElement>();
  const props =
    defineProps<{
      modelValue: string | { value: string; hint?: string };
    }>();
  const emits = defineEmits(['show-tooltip']);
  const cellId = ref<string>();

  defineExpose({ cell });
  const fullText = computed<string>(() => {
    const modelValueType = typeof props.modelValue;
    if (modelValueType === 'string') return props.modelValue as string;
    if (modelValueType === 'object') return (props.modelValue as { value?: string })?.value || '';
    if (
      modelValueType === 'boolean' ||
      modelValueType === 'number' ||
      modelValueType === 'bigint'
    ) {
      return props.modelValue.toString();
    }
    return '';
  });
  const hint = computed(() => typeof props.modelValue === 'object' && props.modelValue?.hint);
  const mouseoverHandler = () => {
    const isTextOverFlowing = cell.value && cell.value.scrollWidth > cell.value.clientWidth;
    if (hint.value || isTextOverFlowing) {
      cellId.value = cellId.value || createId('TextCell');
      const message =
        isTextOverFlowing && hint.value
          ? `${fullText.value}\n${hint.value}`
          : hint.value || fullText.value;

      emits('show-tooltip', { id: cellId.value, message });
    }
  };
</script>

<style>
  .TextCell {
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: start;
  }
</style>
