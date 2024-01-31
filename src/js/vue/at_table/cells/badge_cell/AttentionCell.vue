<template>
  <BadgeCell
    class="AttentionCell"
    :id="id"
    v-bind="badgeCellProps"
    @mouseover="showTooltip"
    v-if="modelValue.attentionRequired !== AttentionTypes.No"
  />
</template>

<script lang="ts">
  import { computed, defineComponent, defineAsyncComponent, PropType } from 'vue';

  import createId from '@agritask/js-utils/libs/createId';

  import { BadgeTypes } from '../../../at_badge/types';
  import { AttentionTypes, BadgeCellProps, AttentionRequired } from './types';
  const BadgeCell = defineAsyncComponent(() => import('./BadgeCell.vue'));

  export default defineComponent({
    name: 'AttentionCell',
    components: { BadgeCell },
    props: {
      modelValue: { type: Object as PropType<AttentionRequired>, required: true },
    },
    emits: ['show-tooltip'],
    setup(props, { emit }) {
      const id = computed(() => props.modelValue.hint && createId('AttentionCell'));
      const badgeCellProps: BadgeCellProps = { modelValue: { badgeType: BadgeTypes.Attention } };
      const showTooltip = computed(() =>
        id.value
          ? () => {
              emit('show-tooltip', { id: id.value, message: props.modelValue.hint });
            }
          : null
      );
      return { AttentionTypes, badgeCellProps, showTooltip, id };
    },
  });
</script>
<style lang="scss" scoped></style>
