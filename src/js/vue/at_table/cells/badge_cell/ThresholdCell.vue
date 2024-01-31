<template>
  <div class="ThresholdCell">
    <AtBadge
      :type="badgeType"
      :label="label"
      :background-color="backgroundColor"
      :color="textColor"
      :id="id"
      @mouseover="showTooltip"
    />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';

  import createId from '@agritask/js-utils/libs/createId';

  import AtBadge from '../../../at_badge/AtBadge.vue';
  import { backgroundColorByGradeColor, ThresholdCellValue } from './types';

  export default defineComponent({
    name: 'ThresholdCell',
    components: { AtBadge },
    props: {
      modelValue: {
        type: Object as PropType<ThresholdCellValue>,
        required: true,
      },
    },
    emits: ['show-tooltip'],
    setup(props, { emit }) {
      const badgeType = computed(() => props.modelValue.threshold?.gradeThreshold);
      const label = computed(() => props.modelValue.threshold?.value);
      const textColor = computed(() => `#${props.modelValue.threshold?.gradeColor}`);
      const backgroundColor = computed(() => {
        const gradeColor = props.modelValue.threshold.gradeColor;
        if (!gradeColor) return;
        return (
          backgroundColorByGradeColor['#' + gradeColor] ||
          //3 charcter hex
          backgroundColorByGradeColor['#' + gradeColor[0] + gradeColor[2] + gradeColor[4]]
        );
      });
      const id = computed(() => props.modelValue.hint && createId('ThresholdCell'));
      const showTooltip = computed(() =>
        id.value
          ? () => {
              emit('show-tooltip', { id: id.value, message: props.modelValue.hint });
            }
          : null
      );
      return { badgeType, label, textColor, backgroundColor, id, showTooltip };
    },
  });
</script>

<style lang="scss" scoped></style>
