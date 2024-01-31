<template>
  <div class="AtToggle" @click="handleOnClick" v-if="!readonly" :class="{ disabled: disabled }">
    <label
      v-if="labelPosition === LabelPositions.inlineStart && label"
      class="at-toggle-label inline-end-03"
    >
      {{ label }}
    </label>
    <input type="checkbox" class="at-toggle-input" :disabled="disabled" :checked="model" />
    <div class="toggle-body" :class="{ disabled: disabled }">
      <div class="knob">
        <div class="hover-element"></div>
      </div>
    </div>

    <label
      v-if="labelPosition === LabelPositions.inlineEnd && label"
      class="at-toggle-label inline-start-03"
    >
      {{ label }}
    </label>
  </div>
  <ReadonlyField v-else :label="label" :content="model" />
</template>

<script lang="ts">
  import { computed, defineComponent, PropType, SetupContext } from 'vue';

  import ReadonlyField from '../readonly_field/ReadonlyField.vue';
  import './at-toggle.scss';

  export enum LabelPositions {
    inlineStart = 'inline-start',
    inlineEnd = 'inline-end',
  }

  export default defineComponent({
    name: 'AtToggle',
    components: {
      ReadonlyField,
    },
    props: {
      disabled: { type: Boolean, default: false },
      stopPropagation: { type: Boolean, default: true },
      modelValue: { type: Boolean, default: false },
      readonly: { type: Boolean, default: false, required: false },
      label: { type: String, default: '', required: false },
      labelPosition: {
        type: String as PropType<LabelPositions>,
        default: LabelPositions.inlineStart,
        required: false,
        validator: (value: LabelPositions) => Object.values(LabelPositions).includes(value),
      },
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }: SetupContext) {
      const model = computed({
        get: () => props.modelValue,
        set: (value) => {
          if (props.disabled) {
            return;
          }
          emit('update:modelValue', value);
          emit('change', value);
        },
      });

      const handleOnClick = (e: Event) => {
        props.stopPropagation && e.stopPropagation();
        model.value = !model.value;
      };

      return {
        model,
        handleOnClick,
        LabelPositions,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .AtToggle {
    display: flex;
    align-items: center;
    margin: 0;

    &.disabled label {
      cursor: default;
    }
  }

  .at-toggle-label {
    line-height: 1rem;
    margin-bottom: 0;
  }
</style>
