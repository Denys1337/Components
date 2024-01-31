import { computed } from 'vue';

import { StepperStatus, StepperStep } from '../types';

export const useStepperHeader = (steps: StepperStep[]) => {
  const completedSteps = computed(() =>
    steps.reduce((acc, step) => (step.status === StepperStatus.Completed ? acc + 1 : acc), 0)
  );

  const sectionStatus = computed(() => {
    switch (completedSteps.value) {
      case 0:
        return StepperStatus.Empty;
      case steps.length:
        return StepperStatus.Completed;
      default:
        return StepperStatus.InProgress;
    }
  });

  return {
    completedSteps,
    sectionStatus,
  };
};
