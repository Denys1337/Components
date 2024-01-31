<template>
  <header class="AtStepperSectionHeader d-flex pad-block-02 pad-block-end-04">
    <div class="inline-end-02 block-start-01">
      <slot name="start-icon" :section-status="sectionStatus">
        <AtStepperSectionStatusIcon :progress="progress" :status="sectionStatus" />
      </slot>
    </div>

    <div class="d-flex flex-column w-100">
      <span class="font-body-default inline-end-04" :title="title">{{ truncatedTitle }}</span>
      <span class="AtStepperSectionHeader-status font-subtext" :class="sectionStatus">{{
        sectionProgress
      }}</span>
    </div>

    <div class="d-flex ai-center inline-end-02 block-start-01" v-if="$slots['end-icon']">
      <slot name="end-icon"></slot>
    </div>
    <div class="d-flex ai-center">
      <ChevronDownIcon size="20" class="chevron" :class="{ opened }" />
    </div>
  </header>
</template>
<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';

  import { ChevronDownIcon } from 'vue-tabler-icons';

  import AtStepperSectionStatusIcon from './AtStepperSectionStatusIcon.vue';
  import useTruncatedString from '../../hooks/useTruncate';
  import getTranslators from '../../utils/getTranslators';
  import { useStepperHeader } from '../hooks/useStepperHeader';
  import { StepperStatus, StepperStep, STEPPER_SECTION_MAX_TITLE_LENGTH } from '../types';

  export default defineComponent({
    name: 'AtStepperSectionHeader',
    components: {
      ChevronDownIcon,
      AtStepperSectionStatusIcon,
    },
    props: {
      title: {
        type: String,
        required: true,
      },
      steps: {
        type: Array as PropType<StepperStep[]>,
        required: true,
      },
      opened: {
        type: Boolean,
        default: false,
      },
      unitNameCounti18nPath: {
        type: String,
        default: 'at_stepper_section_header.default_unit_count',
      },
      unitNamei18nPath: {
        type: String,
        default: 'at_stepper_section_header.default_unit_name',
      },
    },
    setup(props) {
      const truncatedTitle = useTruncatedString(props.title, STEPPER_SECTION_MAX_TITLE_LENGTH);
      const { t } = getTranslators();

      const sectionProgress = computed<string>(() => {
        const stepsNumber = props.steps.length;
        switch (sectionStatus.value) {
          case StepperStatus.Empty:
            return t(props.unitNameCounti18nPath, stepsNumber, { count: stepsNumber });
          case StepperStatus.Completed:
            return t('at_stepper_section_header.completed');
          default:
            return `${completedSteps.value}/${stepsNumber} ${t(props.unitNamei18nPath)}`;
        }
      });

      const { completedSteps, sectionStatus } = useStepperHeader(props.steps);

      const progress = computed<number>(() => (completedSteps.value / props.steps.length) * 100);

      return { truncatedTitle, sectionProgress, sectionStatus, progress };
    },
  });
</script>
<style lang="scss">
  .AtStepperSectionHeader {
    cursor: pointer;

    &-status {
      color: var(--gray-800);

      &.completed {
        color: var(--pri-500);
      }
    }

    .chevron {
      color: var(--gray-700);

      &.opened {
        color: var(--pri-500);
        transform: rotate(180deg);
        transition: transform 200ms ease-in-out;
      }
    }
  }
</style>
