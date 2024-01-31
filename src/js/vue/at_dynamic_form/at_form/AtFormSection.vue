<template>
  <div class="AtFormSection">
    <Component :is="component" v-bind="componentProps" v-model="model" />
    <slot name="actions"></slot>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';

  import {
    IAtFormSubSection,
    AtFormSubSectionTypeComponentMap,
    AtFormSubSectionTypeComponentMapType,
  } from './types';

  export default defineComponent({
    name: 'AtFormSection',
    props: {
      section: {
        type: Object as PropType<IAtFormSubSection>,
        required: true,
      },
      modelValue: {
        type: [Object, Array] as PropType<Record<string, unknown> | Record<string, unknown>[]>,
        required: true,
      },
      sectionComponentMap: {
        type: Object as PropType<AtFormSubSectionTypeComponentMapType>,
        default: () => {},
      },
    },
    emits: ['update:modelValue'],
    setup(props, { attrs, emit }) {
      const componentMap: AtFormSubSectionTypeComponentMapType = {
        ...AtFormSubSectionTypeComponentMap,
        ...props.sectionComponentMap,
      };
      const component = computed(() => componentMap[props.section.sectionType]);

      const model = computed({
        get: () => props.modelValue,
        set: (value) => {
          emit('update:modelValue', value);
        },
      });

      const componentProps = computed(() => ({
        ...props,
        ...attrs,
      }));

      return { componentProps, component, model };
    },
  });
</script>
<style lang="scss" scoped></style>
