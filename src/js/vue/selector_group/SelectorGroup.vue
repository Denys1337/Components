<template>
  <div class="SelectorGroup d-flex" :class="`flex-${orientation}`">
    <Selector
      :class="selectorClass"
      v-for="(option, index) of options"
      :key="option.value"
      @change="onChange"
      :disabled="disabled || option.disabled"
      @update:modelValue="onInput"
      :name="name"
      :selected="optionsSelectedMap[index]"
      :size="size"
      :model-value="option.value"
      :label="option.translate ? $t(option.text) : option.text"
      :mood="option.mood"
      :sub-label="option.subLabel"
    >
      <Component :size="size === 'medium' ? '16' : '24'" :is="option.icon" />
    </Selector>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';

  import Selector from '../selector/Selector.vue';
  import { Size } from '../selector/types';
  import { Orientation, SelectorItem } from './types';

  export default defineComponent({
    name: 'SelectorGroup',
    components: {
      Selector,
    },
    props: {
      modelValue: { type: [String, Number, Boolean] },
      options: { type: Array as PropType<SelectorItem[]>, required: true },
      disabled: { type: Boolean },
      name: { type: String, required: true },
      orientation: { type: String, default: Orientation.Column },
      size: { type: String, default: Size.Medium },
      initialStateOn: {
        type: Boolean,
        default: false,
      },
      fullWidth: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['change', 'update:modelValue'],
    setup(props, { emit }) {
      const onChange = (value: string | number) => emit('change', value);
      const onInput = (value: string | number) => emit('update:modelValue', value);

      const selectorClass = computed(() => ({
        'inline-end-04': props.orientation === Orientation.Row,
        'block-end-04': props.orientation === Orientation.Column,
        'w-100': props.fullWidth,
        checked: props.initialStateOn && !props.modelValue,
      }));

      const optionsSelectedMap = computed(() =>
        props.options.map((selector) => getOptionSelected(selector))
      );

      const getOptionSelected = (selector: SelectorItem) => {
        if (!props.modelValue) {
          return null;
        }
        if (props.disabled) {
          return false;
        }

        return selector.value === props.modelValue;
      };

      return {
        Orientation,
        selectorClass,
        onInput,
        onChange,
        optionsSelectedMap,
      };
    },
  });
</script>
<style lang="scss"></style>
