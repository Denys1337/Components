import { computed, Ref } from 'vue';

import { Condition } from '../at_action_bar/types';

export default function useIsOptionDisabled(selectedRowsLength: Ref<number>) {
  const passConditionForNoRow = computed(() => selectedRowsLength.value === 0);
  const passConditionForSingleRow = computed(() => selectedRowsLength.value === 1);
  const passConditionForMultipleRows = computed(() => selectedRowsLength.value > 1);

  const isOptionDisabled = (condition: Condition[]) => {
    if (!condition || condition.length === 0) {
      return false;
    }
    if (condition.length === 1) {
      if (condition.includes(Condition.NoRows) && passConditionForNoRow.value) {
        return false;
      }
      if (condition.includes(Condition.SingleRow) && passConditionForSingleRow.value) {
        return false;
      }
      if (condition.includes(Condition.MultipleRows) && passConditionForMultipleRows.value) {
        return false;
      }
    } else if (
      condition.includes(Condition.MultipleRows) &&
      condition.includes(Condition.SingleRow) &&
      (passConditionForSingleRow.value || passConditionForMultipleRows.value)
    ) {
      return false;
    }
    return true;
  };

  return { isOptionDisabled, passConditionForSingleRow, passConditionForMultipleRows };
}
