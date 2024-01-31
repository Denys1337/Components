<template>
  <div class="BadgeCell" v-on="$attrs" @mouseover="showTooltip">
    <AtBadge v-bind="badgeProps" :id="id" />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';

  import createId from '@agritask/js-utils/libs/createId';

  import AtBadge from '../../../at_badge/AtBadge.vue';
  import { BadgeTypes } from '../../../at_badge/types';
  import { Badge } from './types';

  export default defineComponent({
    name: 'BadgeCell',
    components: { AtBadge },
    props: {
      modelValue: { type: Object as PropType<Badge>, required: true },
    },
    emits: ['show-tooltip'],
    setup(props, { emit }) {
      const badgeProps = computed(() => ({
        label: props.modelValue.label || props.modelValue.value,
        color: props.modelValue?.color,
        backgroundColor: props.modelValue?.backgroundColor,
        type: Object.values(BadgeTypes).includes(props.modelValue.value as BadgeTypes)
          ? props.modelValue.value
          : props.modelValue.badgeType,
        icon: props.modelValue.iconName,
      }));
      const id = computed(() => props.modelValue.hint && createId('BadgeCell'));
      const showTooltip = computed(() =>
        id.value
          ? () => {
              emit('show-tooltip', { id: id.value, message: props.modelValue.hint });
            }
          : null
      );
      return { badgeProps, showTooltip, id };
    },
  });
</script>
<style lang="scss" scoped></style>
