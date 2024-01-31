<template>
  <section class="AtFormStackWrapper">
    <Component
      :is="stackComponentType"
      v-bind="{ ...$attrs, ...$props }"
      :notes="section.notes ?? []"
      v-model="sectionModel"
    />
  </section>
</template>
<script lang="ts">
  import { defineComponent, PropType, computed, Component } from 'vue';

  import { IAtFormSubSection } from '../../../types';
  import AtFormStackRepeatable from './AtFormStackRepeatable.vue';
  import AtFormStackSection from './AtFormStackSection.vue';

  export default defineComponent({
    name: 'AtFormStackWrapper',
    props: {
      section: {
        type: Object as PropType<IAtFormSubSection>,
        required: true,
      },
      modelValue: {
        type: [Object, Array] as PropType<Record<string, unknown> | Record<string, unknown>[]>,
        required: true,
      },
    },
    emits: ['update:modelValue'],
    setup(props, { attrs, emit }) {
      const stackComponentType = computed<Component>(() =>
        props.section.settings.repeatable ? AtFormStackRepeatable : AtFormStackSection
      );

      const sectionModel = computed({
        get: () => props.modelValue,
        set: (value) => {
          emit('update:modelValue', value);
        },
      });

      return { stackComponentType, sectionModel };
    },
  });
</script>
<style lang="scss" scoped>
  .AtFormStackSection {
    border-radius: var(--spacing-02);
    background: var(--white);
    transition: box-shadow 250ms ease-in-out;
    border: 1px solid var(--gray-400);

    &:hover {
      box-shadow: inset 0 1px 0 var(--gray-400);
    }

    &-number {
      background-color: var(--pri-500);
      color: var(--white);
      border-radius: 5rem;
      min-width: var(--spacing-09);
      width: fit-content;
    }

    .repeat-stack-wrapper {
      background: var(--white);
      border: 1px solid var(--gray-400);
      border-radius: var(--spacing-02);
    }

    .remove-stack-icon {
      &:hover {
        color: var(--gray-1000);
      }
    }
  }
</style>
