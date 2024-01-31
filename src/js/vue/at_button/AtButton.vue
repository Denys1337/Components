<template>
  <Component
    v-bind="$attrs"
    :is="tag"
    class="AtButton mt mt-button"
    :class="[visual, mood, `size-${size}`, { square: isSquare, active }]"
    :disabled="disabled"
    :type="type"
    v-on="$attrs"
    ref="elemRef"
  >
    <span class="AtButton-content" :class="{ hidden: loading }">
      <i v-if="startIcon" class="icon" :class="startIcon"></i>
      <slot name="start"></slot>
      <slot ref="contentElemRef"></slot>
      <slot name="end"></slot>
      <i v-if="endIcon" class="icon" :class="endIcon"></i>
      <Loader v-if="loading" />
    </span>
  </Component>
</template>

<script lang="ts">
  import { defineComponent, defineAsyncComponent, ref } from 'vue';

  import { ButtonSize, ButtonVisual, Tag, validateButtonSize, ButtonMood } from './types';
  import './at-button.scss';

  const Loader = defineAsyncComponent(() => import('../loaders/loader/Loader.vue'));

  export default defineComponent({
    components: { Loader },
    props: {
      disabled: { type: Boolean, default: false },
      active: { type: Boolean, default: false },
      loading: { type: Boolean, default: false },
      type: { type: String, default: 'button' },
      tag: {
        type: String,
        default: 'button',
        validator: (tag: Tag) => Object.values(Tag).includes(tag),
      },
      visual: {
        type: String,
        default: ButtonVisual.primary,
        validator: (value: ButtonVisual) => Object.values(ButtonVisual).includes(value),
      },
      size: {
        type: String,
        default: ButtonSize.l,
        validator: validateButtonSize,
      },
      startIcon: {
        type: String,
        required: false,
      },
      endIcon: {
        type: String,
        required: false,
      },
      isSquare: {
        type: Boolean,
        default: false,
      },
      mood: {
        type: String,
        default: ButtonMood.none,
        validator: (value: ButtonMood) => Object.values(ButtonMood).includes(value),
      },
    },
    setup: () => {
      const elemRef = ref<HTMLElement>();
      const contentElemRef = ref<HTMLElement>();

      return {
        elemRef,
        contentElemRef,
      };
    },
  });
</script>
