<template>
  <div class="AtSelectOption">
    <button
      v-if="!multiple"
      type="button"
      class="AtSelectOption-single d-block w-100"
      @click="$emit('click')"
      :title="text"
    >
      {{ text }}
    </button>
    <AtCheckbox
      v-else
      tabindex="0"
      :model-value="selected"
      :label="text"
      @update:modelValue="$emit('click')"
      class="AtSelectOption-multiple w-100"
      :title="text"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, PropType } from 'vue';

  import AtCheckbox from '../../at_checkbox/AtCheckbox.vue';
  import getTranslators from '../../utils/getTranslators';
  import { Option } from '../types';

  import './at-select-option.scss';

  export default defineComponent({
    name: 'AtSelectOption',
    components: { AtCheckbox },
    props: {
      option: {
        type: Object as PropType<Option>,
        default: () => {},
      },
      valueField: { type: String, default: 'value' },
      textField: { type: String, default: 'text' },
      multiple: { type: Boolean, default: false },
      selected: { type: Boolean, default: false },
    },
    emits: ['click'],
    setup(props) {
      const { t } = getTranslators();

      const text = computed(() =>
        props.option.translate ? t(props.option[props.textField]) : props.option[props.textField]
      );

      return { text };
    },
  });
</script>
