<template>
  <Component
    :is="tag"
    class="AtCardClickable d-flex flex-column ai-center"
    :class="cssClass"
    @click="$emit('card-click')"
    role="button"
    tabindex="0"
    :style="{ 'min-height': extended && heightInPX }"
  >
    <span class="font-body-default-b d-flex ai-center flex-column jc-center">
      <slot name="text">
        <CirclePlusIcon
          class="tabler-circle-plus block-end-04"
          size="32"
          stroke-width="1.5"
          v-if="showDefaultAddCard"
        />
        <span v-if="text" class="text font-title-large">{{ text }}</span>
      </slot>
    </span>
  </Component>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';

  import '../at-card.scss';
  import { CirclePlusIcon } from 'vue-tabler-icons';
  export default defineComponent({
    name: 'AtCardClickable',
    components: { CirclePlusIcon },
    props: {
      text: { type: String },
      tag: { type: String, default: 'button' },
      extended: { type: Boolean, default: false },
      height: { type: String, default: '80' },
      showDefaultAddCard: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false },
    },
    emits: ['card-click'],
    setup(props) {
      const heightInPX = `${props.height}px`;
      const cssClass = computed(() => ({
        'default-hover': props.showDefaultAddCard,
        extended: props.extended,
        disabled: props.disabled,
      }));
      return {
        heightInPX,
        cssClass,
      };
    },
  });
</script>
