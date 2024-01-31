export interface AtStepperProps {
  logo: string;
  title: string;
  sections: StepperSection[];
  resultText: string;
  activeStepId: string;
  showExitIcon: boolean;
  exitText: string;
}

export interface StepperSection {
  title: string;
  steps: StepperStep[];
}

export interface StepperStep {
  title: string;
  status: StepperStatus;
  id: string;
  type: StepType;
  stepGroups?: StepperStep[][];
}

export enum StepperStatus {
  Empty = 'empty',
  InProgress = 'inprogress',
  Completed = 'completed',
}

export enum StepType {
  Regular = 'regular',
  Group = 'Group',
  RepeatableGroup = 'RepeatableGroup',
}

export const STEPPER_SECTION_MAX_TITLE_LENGTH: number = 45;
export const STEPPER_STEP_MAX_TITLE_LENGTH: number = 30;
export const STEPPER_STEP_GROUP_MAX_TITLE_LENGTH: number = 25;
