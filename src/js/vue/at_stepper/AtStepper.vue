<template>
  <div class="AtStepper elevation-level-01">
    <AtStepperHeader
      :logo="logo"
      :title="title"
      :sections="sections"
      :result-text="resultText"
      @exit-audit="$emit('exit-audit')"
    >
      <template #header-bottom><slot name="header-bottom"></slot></template>
    </AtStepperHeader>
    <div class="AtStepper-sections styled-scroll">
      <AtStepperSection
        v-for="(section, index) of sections"
        v-bind="section"
        :key="section.title"
        :active-step-id="activeStepId"
        @step-click="$emit('step-click', index, $event)"
        @step-group-click="$emit('step-group-click', index, $event)"
      />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  import AtStepperHeader from './components/AtStepperHeader.vue';
  import AtStepperSection from './components/AtStepperSection.vue';
  import { StepperSection } from './types';

  export default defineComponent({
    name: 'AtStepper',
    components: {
      AtStepperHeader,
      AtStepperSection,
    },
    props: {
      sections: {
        type: Array as PropType<StepperSection[]>,
        required: true,
      },
      logo: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      resultText: {
        type: String,
        required: true,
      },
      activeStepId: {
        type: String,
        required: true,
      },
    },
    emits: ['exit-audit', 'step-click', 'step-group-click'],
  });
</script>
<style lang="scss">
  .AtStepper {
    height: 100%;
    overflow: hidden;
    width: 366px;
    background-color: var(--gray-100);
    border: 1px solid var(--gray-400);
    flex-shrink: 0;

    &-sections {
      max-height: 100%;
      overflow-y: auto;
    }
  }
</style>
