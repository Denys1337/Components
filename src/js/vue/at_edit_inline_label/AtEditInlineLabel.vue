<template>
  <textarea
    v-if="isEdit"
    ref="inputRef"
    :rows="1"
    wrap="hard"
    v-model="localValue"
    class="editable-input"
    :max-length="maxLength"
    v-bind="$attrs"
    @change="onChangeHandler"
    @keypress.enter="onChangeHandler"
  ></textarea>
  <span
    v-bind="$attrs"
    class="label"
    :class="currentComponentId"
    @click="onClick"
    ref="spanRef"
    v-else
    >{{ previewText }}</span
  >
  <Tooltip :reference="spanRef" v-if="displayTooltip">{{ modelValue }}</Tooltip>
</template>

<script lang="ts">
  import { defineComponent, ref, nextTick, computed } from 'vue';

  import createId from '@agritask/js-utils/libs/createId';

  import useClickOutside from '../hooks/useClickOutside';
  import useTruncatedString from '../hooks/useTruncate';
  import Tooltip from '../tooltip/Tooltip.vue';
  import { ElementReference } from '../tooltip/types';

  export default defineComponent({
    name: 'AtEditInlineLabel',
    components: { Tooltip },
    inheritAttrs: false,
    props: {
      modelValue: { type: String, required: true },
      maxLength: { type: Number },
      maxPreviewLength: { type: Number },
      isEditEnabledByDefault: { type: Boolean, default: false },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const currentComponentId = createId('AtEditInlineLabel');
      const inputRef = ref<HTMLTextAreaElement>();
      const spanRef = ref<ElementReference>();
      const isEdit = ref(props.isEditEnabledByDefault);
      const previewText = computed(() =>
        props.maxPreviewLength
          ? useTruncatedString(props.modelValue, props.maxPreviewLength).value
          : props.modelValue
      );
      const displayTooltip = computed(() =>
        props.maxPreviewLength && !isEdit.value
          ? props.modelValue.length > props.maxPreviewLength
          : false
      );
      const localValue = ref(props.modelValue);
      if (isEdit.value) {
        onClick();
      }

      function onClick() {
        isEdit.value = true;
        localValue.value = props.modelValue;
        nextTick(() => {
          resize();
          inputRef.value?.focus();
        });
      }

      function onChangeHandler() {
        resize();
        if (!localValue.value) {
          localValue.value = props.modelValue;
        } else {
          if (localValue.value != props.modelValue) {
            emit('update:modelValue', localValue.value);
          }
        }
        isEdit.value = false;
      }
      useClickOutside(inputRef, (e) => {
        const target = e.target as Element;

        if (target.classList.contains(currentComponentId)) {
          return;
        }

        if (isEdit.value) {
          onChangeHandler();
        }
      });

      const resize = () => {
        if (inputRef.value) {
          inputRef.value.style.height = inputRef.value.scrollHeight - 4 + 'px';
        }
      };

      return {
        onClick,
        isEdit,
        resize,
        onChangeHandler,
        localValue,
        inputRef,
        useTruncatedString,
        spanRef,
        displayTooltip,
        previewText,
        currentComponentId,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .label {
    word-break: break-all;
    user-select: none;
  }
  .editable-input {
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    border: none;
    resize: none;
    width: 100%;
    overflow: hidden;
    background-color: rgba(0, 142, 244, 0.2);
    &:focus-visible {
      outline: none;
    }
  }
</style>
