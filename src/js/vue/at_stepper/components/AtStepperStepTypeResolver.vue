<template>
  <div class="AtStepperStepTypeResolver">
    <Component
      :is="component"
      v-bind="$props"
      @step-group-click="$emit('step-group-click', $event)"
      @step-click="$emit('step-click', $event)"
    />
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';

  import { StepperStep, StepType } from '../types';
  import AtStepperStep from './AtStepperStep.vue';
  import AtStepperStepGroup from './AtStepperStepGroup.vue';

  export default defineComponent({
    name: 'AtStepperStepTypeResolver',
    components: {},
    props: {
      isActive: {
        type: Boolean,
        default: false,
      },
      step: {
        type: Object as PropType<StepperStep>,
        required: true,
      },
    },
    emits: ['step-group-click', 'step-click'],
    setup(props) {
      const component = computed(() =>
        props.step.type !== StepType.Regular ? AtStepperStepGroup : AtStepperStep
      );

      return {
        component,
      };
    },
  });
</script>
<style lang="scss" scoped></style>
