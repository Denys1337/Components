<template>
  <div class="AtInputNumberFormat w-100">
    <AtInput
      type="text"
      v-model="model"
      v-bind="propsAndAttrs"
      :formatter="formatDecimals"
      @change="$emit('change', (model = $event))"
      @focus="$emit('focus', $event)"
      @is-valid="$emit('is-valid', $event)"
      v-on="otherListeners"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';

  import { formatDecimal, decimalSeparator } from '@agritask/js-utils/libs/string_utils';

  import AtInput from './AtInput.vue';
  import { vueProps } from './types';

  export default defineComponent({
    name: 'AtInputNumberFormat',
    components: { AtInput },
    props: {
      ...vueProps,
      modelValue: { type: [String, Number], default: '' },
      isNumber: { type: Boolean, default: false },
      decimalLength: { type: Number, default: undefined },
      locale: { type: String, required: true },
    },
    emits: ['change', 'focus', 'is-valid', 'update:modelValue', 'blur'],
    setup(props, { emit, attrs }) {
      const model = computed({
        get: () => {
          if (props.modelValue === undefined) {
            return '';
          } else if (props.isNumber) {
            return formatDecimals((props.modelValue + '').replace('.', decimalSeparator()));
          }
          return formatDecimals(props.modelValue + '');
        },
        set: (value) => {
          let newValue;
          if (props.isNumber) {
            newValue = value ? Number(value.replace(',', '.')) : undefined;
          } else {
            newValue = value ? value.replace(',', '.') : '';
          }
          props.lazy ? emit('change', newValue) : emit('update:modelValue', newValue);
        },
      });

      function formatDecimals(value: string): string {
        if (!value) return '';
        if (!props.decimalLength) return value;
        return formatDecimal(value, props.decimalLength);
      }

      const propsAndAttrs = computed(() => ({ ...props, ...attrs }));

      const { input, change, ...otherListeners } = attrs;

      return {
        model,
        formatDecimals,
        propsAndAttrs,
        otherListeners,
      };
    },
  });
</script>

<style scoped lang="scss"></style>
