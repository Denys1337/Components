<template>
  <div class="AtTextarea textarea-wrapper mt mt-container" :class="wrapperClass">
    <template v-if="!readonly">
      <label v-if="title" class="mt-label" :class="{ required, up: labelIsUp }" ref="label">
        {{ title }}
      </label>
      <textarea
        :disabled="disabled"
        :value="modelValue"
        ref="textareaEl"
        :class="{ 'no-resize': !resizeable }"
        class="textarea w-100"
        :readonly="readonly"
        v-on="customListeners"
        v-bind="$attrs"
        :style="{ direction }"
        :placeholder="placeholder"
        :max-length="maxlength"
      ></textarea>
      <span
        v-if="maxlength >= 0"
        class="p-absolute no-events maxlength"
        :class="[maxLengthPositionClass, { max: textLength >= maxlength }]"
      >
        {{ textLength }}/{{ maxlength }}
      </span>
    </template>
    <ReadOnlyField v-else :content="modelValue" :label="title" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref, SetupContext, computed } from 'vue';

  import { LanguageDirection } from '@agritask/js-utils/libs/types';

  import { ButtonSize } from '../at_button/types';
  import { InputType } from '../at_input/types';
  import useFieldUtilities from '../hooks/useFieldUtilities';
  import useInputRules from '../hooks/useInputRules';
  import ReadOnlyField from '../readonly_field/ReadonlyField.vue';
  import { MaxlengthPosition } from './types';

  export default defineComponent({
    name: 'AtTextarea',
    components: {
      ReadOnlyField,
    },
    props: {
      modelValue: { type: String, default: '' },
      maxlength: { type: Number, required: false, default: 99999 },
      minlength: { type: Number, required: false, default: 0 },
      title: { type: String, required: false },
      name: { type: String, required: false },
      required: { type: Boolean, default: false },
      invalid: { type: Boolean, default: false },
      readonly: { type: Boolean, default: false },
      direction: {
        type: String as PropType<LanguageDirection>,
        default: LanguageDirection.Inherit,
        validator: (value: LanguageDirection) => Object.values(LanguageDirection).includes(value),
      },
      lazy: { type: Boolean, default: false },
      placeholder: { type: String, default: '' },
      type: { type: String as PropType<InputType>, default: 'text' },
      disabled: { type: Boolean, default: false },
      resizeable: { type: Boolean, default: true },
      maxLengthPosition: { type: String, default: MaxlengthPosition.Bottom },
      size: {
        type: String as PropType<ButtonSize>,
        default: ButtonSize.m,
        validator: (value: any) => Object.values(ButtonSize).includes(value),
      },
    },
    emits: ['update:modelValue', 'change'],
    setup(props, context: SetupContext) {
      const textareaEl = ref<HTMLTextAreaElement>();

      const { rules } = useInputRules(props);
      // focusTextArea is available for the usage of a parent component with a ref
      // e.g: atTextAreaRef.value?.focusTextArea();
      const focusTextArea = () => {
        textareaEl.value?.focus();
      };
      const { customListeners, labelIsUp, wrapperClass, textLength } = useFieldUtilities(
        textareaEl,
        props,
        context,
        'AtTextarea',
        rules
      );

      const maxLengthPositionClass = computed(() =>
        props.maxLengthPosition === MaxlengthPosition.Bottom ? 'maxlength-bottom' : 'maxlength-top'
      );

      return {
        customListeners,
        textareaEl,
        labelIsUp,
        wrapperClass,
        textLength,
        focusTextArea,
        maxLengthPositionClass,
      };
    },
  });
</script>

<style lang="scss">
  .AtTextarea {
    margin-bottom: 1.25rem;
    box-sizing: border-box;

    .no-resize {
      resize: none;
    }
    .maxlength {
      inset-inline-end: 0;
      margin-top: 0.25rem;
      font-size: var(--input-label-size);
      &.max {
        color: var(--severity-red);
      }
      &-bottom {
        inset-block-start: 100%;
        &.max {
          color: var(--severity-red);
        }
      }
      &-top {
        inset-block-end: 100%;
      }
    }

    .textarea {
      min-height: 6rem;
      vertical-align: top;
      border-radius: var(--input-border-radius);
      border: none;
      outline: none;

      &:disabled {
        background-color: initial;
        resize: none;
      }
    }

    .options-title {
      margin-bottom: var(--spacing-03);
    }
  }
</style>
