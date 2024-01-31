<template>
  <div class="ReadonlyField">
    <b v-if="label" class="ReadonlyField-label">{{ label }}: </b>{{ value ? value : '-' }}
    <span v-if="replacedValue && replacedValue !== value" class="replaced-content">{{
      replacedValue
    }}</span>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';

  import { ContentType } from '@agritask/js-utils/libs/string_utils';

  import formatValueToString from '../utils/formatValueToString';

  export default defineComponent({
    name: 'ReadonlyField',
    props: {
      label: { type: String, default: '' },
      content: {
        type: [String, Number, Boolean, Object, Array, Date] as PropType<ContentType>,
        default: '',
      },
      valueField: { type: String, default: 'text' },
      replacedContent: {
        type: [String, Number, Boolean, Object, Array, Date] as PropType<ContentType>,
        default: '',
      },
    },
    setup(props) {
      const value = computed(() => formatValueToString(props.content, props.valueField));
      const replacedValue = computed(() =>
        props.replacedContent !== props.content
          ? formatValueToString(props.replacedContent, props.valueField)
          : ''
      );

      return { value, replacedValue };
    },
  });
</script>

<style lang="scss">
  .ReadonlyField {
    word-wrap: break-word;
    &.long-label {
      > .ReadonlyField-label {
        min-width: 190px;
        display: inline-block;
      }
    }

    .replaced-content {
      text-decoration: line-through;
    }
  }
</style>
