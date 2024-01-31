<template>
  <Component
    :is="tag"
    class="AtButtonOld mt mt-button"
    :type="type"
    :disabled="disabled"
    v-bind="$attrs"
    v-on="$attrs"
  >
    <slot></slot>
  </Component>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import './at-button.scss';

  enum Tag {
    a = 'a',
    button = 'button',
  }

  export default defineComponent({
    name: 'AtButtonOld',
    props: {
      disabled: { type: Boolean, default: false },
      type: { type: String, default: 'button' },
      tag: {
        type: String,
        default: 'button',
        validator: (tag: Tag) => Object.values(Tag).includes(tag),
      },
    },
  });
</script>
