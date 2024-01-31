<template>
  <div class="AtStepperStepGroup pad-inline-start-06">
    <AtAccordion :offset-height="0" :is-opened="isActive">
      <template #header="{ opened }">
        <AtStepperStackHeader
          :opened="opened"
          :steps="step.stepGroups"
          :title="stepGroupTitle"
          :type="step.type"
        />
      </template>
      <template #body>
        <div
          v-for="(stepGroup, index) in step.stepGroups"
          :key="index"
          class="group pad-block-end-02"
          @click="
            $emit('step-group-click', {
              stepId: step.id,
              stepGroupIndex: index,
            })
          "
        >
          <AtStepperStep
            v-for="subStep in stepGroup"
            :step="subStep"
            :key="subStep.id"
            :show-vertical-line="false"
          />
        </div>
      </template>
    </AtAccordion>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';

  import AtStepperStackHeader from './AtStepperStackHeader.vue';
  import AtStepperStep from './AtStepperStep.vue';
  import AtAccordion from '../../at_accordion/AtAccordion.vue';
  import { StepperStep, StepType } from '../types';

  export default defineComponent({
    name: 'AtStepperStepGroup',
    components: { AtStepperStep, AtStepperStackHeader, AtAccordion },
    props: {
      step: {
        type: Object as PropType<StepperStep>,
        required: true,
      },
      isActive: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['step-click', 'step-group-click'],
    setup(props) {
      const stepGroupTitle = computed<string>(() =>
        props.step.type === StepType.Group
          ? props.step.title
          : `${props.step.title} (${props.step.stepGroups!.length})`
      );

      return {
        stepGroupTitle,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .AtStepperStepGroup {
    .group {
      border-radius: var(--spacing-02);
      cursor: pointer;

      &:hover {
        background: var(--gray-200);

        .AtStepperStep {
          &:hover {
            background: none;
          }
        }
      }
    }
  }
</style>
