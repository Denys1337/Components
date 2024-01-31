<template>
  <div class="AggregatedNotesCell">
    <TextCell
      ref="textCellRef"
      :model-value="textValue"
      @mouseenter="mouseOverCell = true"
      @mouseleave="mouseOverCell = false"
      @show-tooltip="shouldTooltipRendered = true"
    />
    <Tooltip
      :reference="textCellRef?.cell"
      :show="mouseOverCell"
      v-if="modelValue?.dates && shouldTooltipRendered"
    >
      <div v-for="(date, i) of modelValue.dates" :key="date">
        <b>{{ date }} - </b> {{ modelValue?.values?.[i] }}
      </div>
    </Tooltip>
  </div>
</template>
<script lang="ts">
  // eslint-disable-next-line import/order
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'AggregatedNotesCell',
  });
</script>
<script setup lang="ts">
  import { PropType, ref, computed, defineAsyncComponent } from 'vue';

  import { AggregatedNotesValue } from '../types';
  import TextCell from './TextCell.vue';

  const Tooltip = defineAsyncComponent(
    () => import(/* webpackChunkName: "Tooltip" */ '../../tooltip/Tooltip.vue')
  );

  const shouldTooltipRendered = ref<boolean>();
  const mouseOverCell = ref<boolean>();
  const textCellRef = ref<InstanceType<typeof TextCell>>();
  const props = defineProps({
    modelValue: {
      type: Object as PropType<AggregatedNotesValue>,
      required: true,
    },
  });

  const textValue = computed(
    () =>
      props.modelValue?.dates
        ?.map((date, index) => `${date} - ${props.modelValue?.values?.[index]}`)
        .join(`\n`) || ''
  );
</script>
