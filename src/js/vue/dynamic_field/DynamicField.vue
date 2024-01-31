<template>
  <Component
    class="DynamicField"
    :is="field.component"
    v-bind="field.props"
    v-model="fieldModel"
    v-on="otherListeners"
  />
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';

  import { defaultFieldMap, ModelType, FieldComponentMap } from './types';

  export default defineComponent({
    name: 'DynamicField',
    components: {},
    props: {
      modelValue: {
        type: [String, Number, Boolean, Array, Date, Object] as PropType<unknown>,
        required: true,
      },
      fieldProps: {
        type: Object,
        default: () => ({}),
      },
      type: {
        type: String,
        required: true,
        // add this validator once all field types are migrated to vue-components
        // validator: (value: FieldType) => Object.values(FieldType).includes(value),
      },
      valueParser: { type: Function as PropType<(value?: any) => ModelType>, required: false },
      valueFormatter: { type: Function as PropType<(value?: any) => ModelType>, required: false },
      customFieldComponentMap: {
        type: Object as PropType<FieldComponentMap>,
        default: () => ({}),
      },
    },
    emits: ['update:modelValue'],
    setup(props, { emit, attrs }) {
      const fieldComponentMap = computed(() => ({
        ...defaultFieldMap,
        ...props.customFieldComponentMap,
      }));
      const field = computed(() =>
        fieldComponentMap.value[props.type]({ ...props.fieldProps, ...attrs })
      );
      const fieldModel = computed({
        get: () => props.valueParser?.(props.modelValue) ?? props.modelValue,
        set: (value) => {
          emit('update:modelValue', props.valueFormatter?.(value) ?? value);
        },
      });
      const { input, ...otherListeners } = attrs;

      return { field, fieldModel, otherListeners };
    },
  });
</script>

<style lang="scss" scoped></style>
