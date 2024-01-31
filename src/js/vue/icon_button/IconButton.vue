<template>
  <button
    :type="type"
    class="IconButton btn btn-sm h-100"
    :class="iconButtonClass"
    :style="{ fontSize }"
    :disabled="disabled"
    @click="onClick"
  >
    <slot v-if="iconLast"></slot>
    <i class="icon" :class="iconClass"></i>
    <slot v-if="!iconLast"></slot>
  </button>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';

  export default defineComponent({
    name: 'IconButton',
    props: {
      icon: { type: String, required: true },
      fontSize: { type: String, default: '1rem' },
      disabled: { type: Boolean, default: false },
      noBorder: { type: Boolean },
      blue: { type: Boolean },
      round: { type: Boolean },
      iconLast: { type: Boolean },
      type: { type: String, default: 'button' },
    },
    emits: ['click'],
    setup(props, { emit, slots }) {
      const onClick = () => {
        if (!props.disabled) emit('click');
      };

      const hasSlots = computed(() => slots && Object.keys(slots).length > 0);

      const iconClass = computed(() => {
        let iconClass = props.icon;
        if (!hasSlots.value) {
          return iconClass;
        }
        iconClass += props.iconLast ? ' icon-last' : ' icon-first';
        return iconClass;
      });

      const iconButtonClass = computed(() => ({
        disabled: props.disabled,
        'btn-outline-secondary': !props.noBorder,
        'no-border': props.noBorder,
        'text__lightish-blue': props.blue,
        round: props.round,
      }));

      return {
        onClick,
        iconClass,
        iconButtonClass,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .icon {
    vertical-align: middle;
    &.icon-last {
      padding-left: 4px;
    }
    &.icon-first {
      padding-right: 4px;
    }
  }
  .round {
    border-radius: 50%;
  }
  .no-border {
    padding: 0;
    border: 0;
  }
</style>
