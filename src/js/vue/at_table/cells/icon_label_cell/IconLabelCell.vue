<template>
  <div class="IconLabelCell">
    <div class="icon">
      <img :src="modelValue.img" :alt="modelValue.label" v-if="modelValue.img" loading="lazy" />
    </div>
    <span @mouseover="hoverHandler" ref="labelRef" :id="id" class="label font-body-small-b">{{
      modelValue.label
    }}</span>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, PropType } from 'vue';

  import useShowTooltipOnOverflow from '../hooks/useShowTooltipOnOverflow';

  export default defineComponent({
    name: 'IconLabelCell',
    components: {},
    props: {
      modelValue: {
        type: Object as PropType<{
          img: string;
          label: string;
        }>,
        required: true,
      },
    },
    emits: ['show-tooltip'],
    setup(props, { emit }) {
      const labelRef = ref<Element>();
      const { hoverHandler, id } = useShowTooltipOnOverflow(labelRef, emit, props.modelValue.label);
      return { labelRef, hoverHandler, id };
    },
  });
</script>

<style lang="scss" scoped>
  .IconLabelCell {
    display: flex;
    align-items: center;
    gap: var(--spacing-02);
    .icon {
      border: 1px solid #bcc5cb;
      border-radius: 13px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      img {
        width: 24px;
        height: 24px;
      }
    }
    .label {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 22ch;
    }
  }
</style>
