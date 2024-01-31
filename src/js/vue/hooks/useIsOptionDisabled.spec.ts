import { ref } from 'vue';

import { Condition } from '../at_action_bar/types';
import useIsOptionDisabled from './useIsOptionDisabled';

const singleRowCondition: Condition[] = [Condition.SingleRow];
const singleRowAndMultipleRowsConditions: Condition[] = [
  Condition.SingleRow,
  Condition.MultipleRows,
];
const multipleRowsCondition: Condition[] = [Condition.MultipleRows];

describe('Test useIsOptionDisabled', () => {
  describe('No selected rows scenario', () => {
    const selectedRows = ref(0);
    const { isOptionDisabled, passConditionForMultipleRows, passConditionForSingleRow } =
      useIsOptionDisabled(selectedRows);
    test('No condition should pass', () => {
      expect(passConditionForSingleRow.value).toBe(false);
      expect(passConditionForMultipleRows.value).toBe(false);
    });
    test('isOptionDisabled should return true for optionWithSingleRowCondition', () => {
      expect(isOptionDisabled(singleRowCondition)).toBe(true);
    });
    test('isOptionDisabled should return true for optionWithMultipleRowsCondition', () => {
      expect(isOptionDisabled(multipleRowsCondition)).toBe(true);
    });
    test('isOptionDisabled should return true for optionWithSingleRowAndMultipleRowsConditions', () => {
      expect(isOptionDisabled(singleRowAndMultipleRowsConditions)).toBe(true);
    });
  });

  describe('1 selected row scenario', () => {
    const selectedRows = ref<number>(1);
    const { isOptionDisabled, passConditionForMultipleRows, passConditionForSingleRow } =
      useIsOptionDisabled(selectedRows);
    test('Only passConditionForSingleRow should pass', () => {
      expect(passConditionForSingleRow.value).toBe(true);
      expect(passConditionForMultipleRows.value).toBe(false);
    });
    test('isOptionDisabled should return false for optionWithSingleRowCondition', () => {
      expect(isOptionDisabled(singleRowCondition)).toBe(false);
    });
    test('isOptionDisabled should return false for optionWithMultipleRowsCondition', () => {
      expect(isOptionDisabled(multipleRowsCondition)).toBe(true);
    });
    test('isOptionDisabled should return false for optionWithSingleRowAndMultipleRowsConditions', () => {
      expect(isOptionDisabled(singleRowAndMultipleRowsConditions)).toBe(false);
    });
  });
  describe('2 selected row scenario', () => {
    const selectedRows = ref<number>(2);
    const { isOptionDisabled, passConditionForMultipleRows, passConditionForSingleRow } =
      useIsOptionDisabled(selectedRows);
    test('Only passConditionForMultipleRows should pass', () => {
      expect(passConditionForSingleRow.value).toBe(false);
      expect(passConditionForMultipleRows.value).toBe(true);
    });
    test('isOptionDisabled should return true for optionWithSingleRowCondition', () => {
      expect(isOptionDisabled(singleRowCondition)).toBe(true);
    });
    test('isOptionDisabled should return false for optionWithMultipleRowsCondition', () => {
      expect(isOptionDisabled(multipleRowsCondition)).toBe(false);
    });
    test('isOptionDisabled should return false for optionWithSingleRowAndMultipleRowsConditions', () => {
      expect(isOptionDisabled(singleRowAndMultipleRowsConditions)).toBe(false);
    });
  });
});
