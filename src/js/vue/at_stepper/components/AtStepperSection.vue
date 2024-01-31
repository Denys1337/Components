<template>
  <section class="AtStepperSection pad-inline-06 pad-block-02">
    <AtAccordion :offset-height="0" :is-opened="openAccordion">
      <template #header="{ opened }">
        <AtStepperSectionHeader :opened="opened" :title="title" :steps="steps" />
      </template>
      <template #body>
        <AtStepperStepTypeResolver
          v-for="step in steps"
          :step="step"
          :key="step.id"
          :is-active="step.id === activeStepId"
          @step-click="$emit('step-click', $event)"
          @step-group-click="$emit('step-group-click', $event)"
        />
      </template>
    </AtAccordion>
  </section>
</template>
<script lang="ts">
  import { defineComponent, PropType, computed } from 'vue';

  import AtStepperSectionHeader from './AtStepperSectionHeader.vue';
  import AtStepperStepTypeResolver from './AtStepperStepTypeResolver.vue';
  import AtAccordion from '../../at_accordion/AtAccordion.vue';
  import useTruncatedString from '../../hooks/useTruncate';
  import { StepperStep, STEPPER_SECTION_MAX_TITLE_LENGTH } from '../types';

  export default defineComponent({
    name: 'AtStepperSection',
    components: { AtAccordion, AtStepperSectionHeader, AtStepperStepTypeResolver },
    props: {
      title: {
        type: String,
        required: true,
      },
      steps: {
        type: Array as PropType<StepperStep[]>,
        required: true,
      },
      activeStepId: {
        type: String,
        required: true,
      },
    },
    emits: ['step-click', 'step-group-click'],
    setup(props) {
      const truncatedTitle = useTruncatedString(props.title, STEPPER_SECTION_MAX_TITLE_LENGTH);
      const openAccordion = computed(() =>
        props.steps.some((step) => step.id === props.activeStepId)
      );

      return { truncatedTitle, openAccordion };
    },
  });
</script>
<style lang="scss" scoped>
  .AtStepperSection {
    border-bottom: 1px solid var(--gray-400);
    transition: box-shadow 250ms ease-in-out;

    &:last-child {
      border: none;
    }

    &:hover {
      box-shadow: inset 0 1px 0 var(--gray-400);
    }
  }
</style>
