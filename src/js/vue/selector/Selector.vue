<template>
  <div class="Selector" :class="classList">
    <label class="selector-label margin-00 d-flex" :for="fieldId">
      <slot class="slot"></slot>
      <input
        :disabled="disabled"
        class="d-none"
        type="radio"
        @click="onClick"
        @change="onChange"
        @input="onInput"
        :value="modelValue"
        :name="name"
        :checked="isSelected"
        :id="fieldId"
      />
      <div class="d-flex flex-column inline-start-02 text-align-start">
        <span>{{ label }}</span>
        <span class="font-subtext" v-if="subLabel">{{ subLabel }}</span>
      </div>
    </label>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';

  import createId from '@agritask/js-utils/libs/createId';

  import { SelectorMood, Size } from './types';

  export default defineComponent({
    name: 'AtSelector',
    components: {},
    props: {
      modelValue: { type: [String, Number, Boolean] },
      label: { type: String, required: false },
      subLabel: { type: String },
      disabled: { type: Boolean, default: false },
      name: { type: String, required: true },
      size: {
        default: Size.Medium,
        validator: (value: Size) => Object.values(Size).includes(value),
      },
      selected: { type: [Boolean], default: null },
      mood: {
        type: String as PropType<SelectorMood>,
        default: SelectorMood.Primary,
        validator: (value: SelectorMood) => Object.values(SelectorMood).includes(value),
      },
    },
    emits: ['change', 'click', 'update:modelValue'],
    setup(props, { emit }) {
      const fieldId = createId('AtRadiobutton');
      const isSelected = computed(() => props.selected);
      const onChange = () => emit('change', props.modelValue);
      const onClick = (event: Event) => emit('click', event);
      const onInput = () => emit('update:modelValue', props.modelValue);

      const classList = computed(() => ({
        checked: props.selected,
        unchecked: props.selected === false,
        disabled: props.disabled,
        'with-sub-label': props.subLabel?.length,
        [props.size]: true,
        [props.mood]: true,
      }));

      return {
        isSelected,
        onChange,
        onClick,
        onInput,
        fieldId,
        classList,
      };
    },
  });
</script>
<style lang="scss">
  @import '../../../style/scss/_base_functions';

  .Selector {
    --selector-text-color: var(--gray-1000);
    --selector-border-color: var(--gray-500);
    --selector-background-color: transperent;

    border: 1px solid var(--selector-border-color);
    border-radius: var(--spacing-02);
    background-color: var(--selector-background-color);
    width: fit-content;
    min-width: pxToRem(120);

    .icon {
      stroke: var(--selector-text-color);
      & ~ .selector-label-text {
        margin-inline-start: var(--spacing-02);
      }
    }

    .selector-label {
      color: var(--selector-text-color);
      cursor: pointer;
      align-items: center;
      text-align: center;
    }

    // Sizes
    &.medium {
      font-size: var(--font-size-body-small);

      .selector-label-text {
        margin-inline-start: var(--spacing-02);
      }

      .selector-label {
        padding: var(--spacing-03);
      }

      &.with-sub-label {
        .selector-label {
          padding: var(--spacing-01) var(--spacing-03);
        }
      }
    }
    &.large {
      .selector-label {
        justify-content: center;
        padding: var(--spacing-04) var(--spacing-06);
      }
    }

    // Moods
    &.primary {
      &.checked {
        --selector-text-color: var(--pri-500);
        border-color: var(--pri-500);

        .icon {
          stroke: var(--pri-500);
        }
      }

      &.disabled {
        --selector-text-color: var(--gray-500);
      }
    }

    &.secondary {
      --selector-text-color: var(--pri-500);
      --selector-border-color: transperent;
      --selector-background-color: transperent;

      &.disabled {
        --selector-text-color: var(--gray-500);
      }

      &.checked,
      &:hover {
        --selector-text-color: var(--pri-500);
        --selector-border-color: transperent;
        --selector-background-color: var(--pri-100);
      }
    }

    &.danger {
      &.checked,
      &:hover {
        --selector-text-color: var(--white);
        --selector-background-color: var(--red-500);
        --selector-border-color: var(--red-500);
      }

      &.disabled {
        opacity: 0.7;
      }
    }

    &.success {
      &.checked,
      &:hover {
        --selector-text-color: var(--white);
        --selector-background-color: var(--green-500);
        --selector-border-color: var(--green-500);
      }

      &.disabled {
        opacity: 0.7;
      }
    }

    // generic modifications
    &.checked {
      font-weight: 600;
    }

    &.disabled {
      pointer-events: none;
      --selector-text-color: var(--gray-600);
      --selector-border-color: var(--gray-500);
      --selector-background-color: transperent;
    }
  }
</style>
