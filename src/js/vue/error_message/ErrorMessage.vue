<template>
  <div class="ErrorMessage" :class="cssCls">
    <i class="icon icon-exclamation-mark-circle inline-end-01"></i>
    <span v-if="errors && errors.length">
      {{ shownErrors }}
    </span>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';

  import getTranslators from '../utils/getTranslators';

  export type ErrorPosition = 'bottom' | 'corner' | 'bottom-start';

  export default defineComponent({
    name: 'ErrorMessage',
    props: {
      position: { type: String as PropType<ErrorPosition>, default: 'bottom' },
      errors: {
        type: [Array, String] as PropType<
          { type: string; context: unknown; message: string }[] | string[] | string
        >,
        required: false,
        default: () => [],
      },
      useCustomErrorMessages: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      const cssCls = computed(() => ({
        [`position-${props.position}`]: true,
      }));

      const { t } = getTranslators();

      const shownErrors = computed(() => {
        if (!props.errors?.length) return '';
        if (typeof props.errors === 'string') return props.errors;
        if (typeof props.errors[0] === 'string') {
          return props.errors[0];
        }
        return props.useCustomErrorMessages
          ? props.errors[0].message
          : t('forms.errors.' + props.errors[0].type, 0, props.errors[0].context as Object);
      });

      return {
        cssCls,
        shownErrors,
      };
    },
  });
</script>

<style lang="scss">
  .ErrorMessage {
    font-size: 0.8rem;
    color: var(--severity-red);
    z-index: 1;
    inset-inline-start: calc(var(--label-hor-offset) + var(--label-whitespace));
    &.position-bottom {
      transform: translateY(100%);
      inset-inline-start: 0;
      inset-block-end: calc(-1 * var(--spacing-01));
    }
    &.position-corner {
      inset-inline-end: 5px;
      inset-block-end: 5px;
    }
    &.position-bottom-start {
      inset-inline-start: 0;
    }
    .icon {
      font-size: 1rem;
    }
  }
</style>
