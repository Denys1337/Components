<template>
  <div class="AtSelectSelections">
    <div v-for="val in selectionsToShow" :key="val[valueField]" class="mt-pill d-inline-block">
      {{ getTextField(val) }}
      <button type="button" @click.stop="remove(val)" class="AtSelectSelections_remove-btn">
        <i class="icon icon-general-close"></i>
      </button>
    </div>
    <span
      v-if="valueArr.length > maxShown && !showAll"
      @click="showAll = true"
      class="round-button"
      role="button"
    >
      ...
    </span>
    <span v-if="showAll" @click="showAll = false" class="round-button" role="button">
      <i class="icon icon-chevron-down"></i>
    </span>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType, ref } from 'vue';

  import getTranslators from '../../utils/getTranslators';
  import { SHOWN_SELECTIONS_LIMIT, Option } from '../types';

  export default defineComponent({
    name: 'AtSelectSelections',
    props: {
      selectedOptions: {
        type: [Array, String, Number] as PropType<Option | Option[]>,
        required: false,
      },
      valueField: { type: String, default: 'value' },
      textField: { type: String, default: 'text' },
      maxShown: { type: Number, default: SHOWN_SELECTIONS_LIMIT },
    },
    emits: ['remove'],
    setup(props, { emit }) {
      const { t } = getTranslators();
      const valueArr = computed(() =>
        Array.isArray(props.selectedOptions) ? props.selectedOptions : [props.selectedOptions]
      );

      const remove = (option: Option) => emit('remove', option);

      const showAll = ref(false);

      const onlyFirstSelections = computed(() => valueArr.value.slice(0, props.maxShown));

      const selectionsToShow = computed(() =>
        showAll.value ? valueArr.value : onlyFirstSelections.value
      );

      const getTextField = (option: Option) =>
        option.translate ? t(option[props.textField]) : option[props.textField];

      return {
        valueArr,
        remove,
        selectionsToShow,
        showAll,
        getTextField,
      };
    },
  });
</script>

<style lang="scss">
  .AtSelectSelections {
    .AtSelectSelections_remove-btn {
      position: relative;
      transform: translateY(10%);

      &:focus,
      &:hover {
        color: var(--severity-red);
      }

      > .icon {
        vertical-align: unset;
      }
    }

    .round-button {
      display: inline-block;
      width: 30px;
      height: 30px;
      border-radius: 16px;
      border: solid 1px var(--lightish-blue);
      color: var(--lightish-blue);
      text-align: center;
      cursor: pointer;

      .icon {
        display: inline-block;
        transform: rotate(180deg);
        font-size: 10px;
      }
    }
  }
</style>
