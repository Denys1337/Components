<template>
  <div class="SelectButton AtSelect" :class="{ disabled, focused: showOptions }">
    <AtTriggerWithOverlayContext
      :show-overlay="showOptions"
      @update:toggle-overlay="showOptions = $event"
      ref="atDropdownTrigger"
    >
      <template #trigger>
        <button
          @click="showOptions = !showOptions"
          type="button"
          class="AtSelectBody"
          :class="{ 'dropdown-opened': showOptions }"
        >
          <span class="SelectButton-body">
            {{ label }}
          </span>
          <i class="AtSelectBody-buttons arrow-icon body-btn d-inline-block pointer"></i>
        </button>
      </template>
      <template #overlay>
        <DropdownListContainer
          v-show="showOptions"
          @scroll-end="onScrolledToEnd"
          :min-width="minDropDownWidth"
          v-bind="$props"
          style="position: relative"
        >
          <AtSelectFilter
            v-if="enableFiltering && flattenOptions.length"
            v-show="status === 'auto'"
            :dropdown-opened="showOptions"
            @filter="onFilter"
            @select-first="selectFirstOption"
          />
          <AtSelectStatus :status="status" :filtered-options="filteredOptions" />

          <AtSelectDropdown
            ref="atSelectDropdownRef"
            :text-field="textField"
            :key-field="keyField"
            :value-field="valueField"
            :filtered-options="filteredOptions"
            :selected-values-set="selectedValues"
            :options-are-grouped="optionsAreGrouped"
            @toggle-selection="onToggleSelection"
          />
        </DropdownListContainer>
      </template>
    </AtTriggerWithOverlayContext>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref, toRefs } from 'vue';

  import AtSelectDropdown from './components/AtSelectDropdown.vue';
  import AtSelectFilter from './components/AtSelectFilter.vue';
  import AtSelectStatus from './components/AtSelectStatus.vue';
  import useFiltering from './hooks/useFiltering';
  import useGroupedOptions from './hooks/useGroupedOptions';
  import { Option, OptsOrGroups } from './types';
  import AtTriggerWithOverlayContext from '../at_trigger_with_overlay_context/AtTriggerWithOverlayContext.vue';
  import DropdownListContainer from '../dropdown_list_container/DropdownListContainer.vue';

  import './components/at_select_body/at-select-body.scss';
  import './at-select.scss';

  export default defineComponent({
    name: 'SelectButton',
    components: {
      AtSelectDropdown,
      AtSelectStatus,
      AtSelectFilter,
      AtTriggerWithOverlayContext,
      DropdownListContainer,
    },
    props: {
      label: { type: String, required: true, default: '' },
      options: { type: Array as PropType<OptsOrGroups>, required: false, default: () => [] },
      valueField: { type: String, required: false, default: 'value' },
      textField: { type: String, required: false, default: 'text' },
      keyField: { type: String, required: false, default: '' },
      disabled: { type: Boolean, default: false },
      filter: { type: Boolean, default: null },
      status: { type: String, default: 'auto' },
      minDropDownWidth: { type: String, default: '350px' },
    },
    emits: ['change'],
    setup(props, { emit }) {
      const rootEl = ref<HTMLElement>();
      const selectedValues = new Set();
      const showOptions = ref(false);
      const onToggleSelection = (option: Option) => {
        if (props.disabled) return;
        emit('change', option);
        showOptions.value = false;
      };

      const atSelectDropdownRef = ref<{ onScrolledToEnd(): void }>();

      const onScrolledToEnd = () => {
        atSelectDropdownRef.value?.onScrolledToEnd();
      };

      const { options, textField, valueField, filter } = toRefs(props);

      const { optionsAreGrouped, flattenOptions } = useGroupedOptions(options);

      const { filteredOptions, onFilter, enableFiltering } = useFiltering(
        textField,
        valueField,
        options,
        filter,
        optionsAreGrouped,
        flattenOptions
      );

      const selectFirstOption = () => {
        if (filteredOptions.value.length) {
          onToggleSelection(filteredOptions.value[0]);
        }
      };

      return {
        showOptions,
        rootEl,
        onToggleSelection,
        selectedValues,
        onScrolledToEnd,
        atSelectDropdownRef,
        filteredOptions,
        onFilter,
        enableFiltering,
        optionsAreGrouped,
        flattenOptions,
        selectFirstOption,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .SelectButton {
    position: relative;

    &.disabled {
      pointer-events: none;
    }

    .AtSelectBody {
      cursor: pointer;
      border: none;
      border-bottom: 1px solid black;
      border-radius: 0;

      &.dropdown-opened {
        border-bottom: 1px solid var(--lightish-blue);
      }
    }

    .SelectButton-body {
      color: var(--grayish-black);
      font-size: 14px;
      padding-inline-end: 2px;
    }
  }
</style>
