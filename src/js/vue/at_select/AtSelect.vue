<template>
  <div
    class="AtSelect mt at-grid p-relative block-end-00"
    :class="cssClass"
    v-if="!readonly"
    ref="rootElemRef"
  >
    <div :class="inputContainerClass" class="input-container-height mt-input-height">
      <div
        ref="selectWrapRef"
        :class="['mt-container body-container', { 'no-border': visual === 'inline' }]"
      >
        <AtSelectBody
          :disabled="disabled"
          :label="label"
          :label-classes="labelClasses"
          :use-inline-label="useInlineLabelComputed"
          :show-label-with-selected="showLabelWithSelected"
          :text-field="textField"
          :selected-options="selectedOptions"
          :required="required"
          :passive-required="passiveRequired"
          :valid="valid"
          :multiple="multiple"
          :dropdown-opened="showOptions"
          :show-clear-button="showClearButton"
          :max-label-length="maxLabelLength"
          @toggle-options="toggleOptions"
          @clear-selections="clearSelections"
        />
        <ErrorMessage v-if="showErrors" :errors="errors" class="p-absolute" />
        <PortalToBody
          :align-with="selectWrapRef"
          :fit-width="selectWrapRef"
          :reposition="true"
          position="bottom"
          align="start"
          v-if="showOptions"
        >
          <DropdownListContainer
            :resize-on-next-tick="true"
            :min-width="minDropdownWidth"
            :max-width="maxDropdownWidth"
            @scroll-end="onScrolledToEnd"
            ref="dropdownRef"
          >
            <AtSelectFilter
              v-if="enableFiltering && status !== 'loading'"
              :default-text="queryText"
              :dropdown-opened="showOptions"
              :search-button-enabled="searchButtonEnabled"
              :is-indeterminate="isIndeterminate"
              :input-placeholder="searchInputPlaceholder"
              @search="$emit('search', $event)"
              @filter="filterHandler"
              @select-first="selectFirstOption"
            >
              <template #dropdownListHeader>
                <slot name="dropdownListHeader"></slot>
              </template>
              <template #noOptions>
                <button type="button" class="dropdown__option-item" disabled>
                  {{ $t('general.no_results') }}
                </button>
                <!-- FIXME: createNewOption doesn't exist in this file, it seems like it's implemented in: src/js/vue/at_select/components/status/StatusEmpty.vue -->
                <IconButton
                  icon="icon-general-add"
                  class="dropdown__option-item"
                  :no-border="true"
                  :blue="true"
                  @click="createNewOption()"
                  font-size="inherit"
                >
                  {{ $t('general.create_new_option') }}: {{ filter }}
                </IconButton>
              </template>
            </AtSelectFilter>
            <AllOptionsSelectionButton
              v-if="showSelectAllOptions && !!options?.length && searchedOptionsCount"
              :is-select-all-options-disabled="isSelectAllOptionsDisabled"
              :is-select-all-loading="isSelectAllLoading"
              :searched-options-count="searchedOptionsCount"
              @select-all-options="$emit('select-all-options')"
            />
            <AtSelectStatus
              :status="status"
              :error-message="errorMessage"
              :empty-response-message="emptyResponseMessage"
              :filtered-options="filteredOptions"
              :enable-add-option-when-options-empty="enableAddOptionWhenOptionsEmpty"
              @add-option="onAddOption"
              :value-field="valueField"
              :text-field="textField"
            />
            <AtSelectDropdown
              v-if="showOptions"
              :status="status"
              ref="atSelectDropdownRef"
              :value-field="valueField"
              :text-field="textField"
              :key-field="keyField"
              :enable-lazy-render="enableLazyRender"
              :enable-lazy-load="enableLazyLoad"
              :multiple="multiple"
              :filtered-options="filteredOptions"
              :selected-values-set="selectedValuesSet"
              :options-are-grouped="optionsAreGrouped"
              :loading-next-options="loadingNextOptions"
              @toggle-selection="toggleSelection"
            />
          </DropdownListContainer>
        </PortalToBody>
      </div>
    </div>
    <div :class="selectionsContainerClass" v-if="showAtSelectSelections">
      <AtSelectSelections
        :selected-options="selectedOptions"
        :value-field="valueField"
        :text-field="textField"
        :max-shown="maxShownSelections"
        @remove="toggleSelection"
      />
    </div>
    <div class="empty-selection" v-else-if="showEmptySelection">
      <slot name="emptySelection"></slot>
    </div>
  </div>
  <ReadonlyField :content="selectedOptions" :label="label" v-else />
</template>

<script lang="ts">
  import { computed, ComputedRef, defineComponent, Ref, ref, toRefs, watch, useSlots } from 'vue';

  import Joi from 'joi';

  import createId from '@agritask/js-utils/libs/createId';
  import { isEmpty } from '@agritask/js-utils/libs/object_utils';

  import useFormControl from '../at_form_control/useFormControl';
  import DropdownListContainer from '../dropdown_list_container/DropdownListContainer.vue';
  import ErrorMessage from '../error_message/ErrorMessage.vue';
  import useClickOutside from '../hooks/useClickOutside';
  import useOnScroll from '../hooks/useOnScroll';
  import IconButton from '../icon_button/IconButton.vue';
  import PortalToBody from '../portal_to_body/PortalToBody.vue';
  import ReadonlyField from '../readonly_field/ReadonlyField.vue';
  import AllOptionsSelectionButton from './AllOptionsSelectionButton.vue';
  import AtSelectDropdown from './components/AtSelectDropdown.vue';
  import AtSelectFilter from './components/AtSelectFilter.vue';
  import AtSelectSelections from './components/AtSelectSelections.vue';
  import AtSelectStatus from './components/AtSelectStatus.vue';
  import AtSelectBody from './components/at_select_body/AtSelectBody.vue';
  import useFiltering from './hooks/useFiltering';
  import useGroupedOptions from './hooks/useGroupedOptions';
  import { AtSelectVisual, atSelectVueProps, Option, OptsOrGroups } from './types';

  import './at-select.scss';

  export default defineComponent({
    name: 'AtSelect',
    components: {
      AtSelectSelections,
      AtSelectBody,
      AtSelectDropdown,
      AtSelectStatus,
      DropdownListContainer,
      AtSelectFilter,
      ErrorMessage,
      ReadonlyField,
      PortalToBody,
      AllOptionsSelectionButton,
      IconButton,
    },
    props: atSelectVueProps,
    emits: [
      'open',
      'close',
      'update:modelValue',
      'option-toggle',
      'search',
      'remove',
      'first-opening',
      'scrolled-down',
      'update-text',
      'select-all-options',
      'clear-selections',
      'add-option',
    ],
    setup(props, { emit, attrs }) {
      const rootElemRef = ref<HTMLElement>();
      const selectWrapRef = ref<HTMLElement>();
      const dropdownRef = ref<HTMLElement>();
      const selectedOptions = ref<Option[]>([]);
      const getRequiredValidations = () => [
        Joi.alternatives([
          Joi.string().min(1).required(),
          Joi.number().min(1).required(),
          Joi.array().min(1),
        ]).required(),
      ];

      const useInlineLabelComputed = computed(
        () => props.useInlineLabel ?? props.visual === AtSelectVisual.Inline
      );

      const validations = computed<Joi.AnySchema[]>(() =>
        props.required ? getRequiredValidations() : []
      );

      const isAllOptionsSelected = computed(
        (): boolean =>
          selectedOptions.value?.length === props.options?.length &&
          selectedOptions.value?.length !== 0
      );

      const isIndeterminate = computed(
        (): boolean => !!selectedOptions.value.length && !isAllOptionsSelected.value
      );

      const fieldId = createId('AtSelect');
      const { valid, errors, formDisplayErrors } = useFormControl(
        props,
        props.name || fieldId,
        false,
        validations
      );

      const wasFocused = ref(false);

      const showErrors = computed(
        () => !valid.value && (wasFocused.value || formDisplayErrors.value)
      );

      const showOptions = ref(false);
      let shouldEmitFirstOpening = true;

      watch(
        () => showOptions.value,
        () => {
          if (shouldEmitFirstOpening && showOptions.value) {
            emit('first-opening');
            shouldEmitFirstOpening = false;
          }
          if (showOptions.value) {
            emit('open');
          } else {
            emit('close', selectedOptions.value);
            wasFocused.value = true;
          }
        }
      );

      useOnScroll(() => {
        showOptions.value = false;
      }, [dropdownRef, rootElemRef]);

      useClickOutside([selectWrapRef, dropdownRef], () => {
        showOptions.value = false;
        if (isFilterEnabled) filterHandler(''); //Resets the filtering text
      });

      // callback to open/close the options dropdown
      const toggleOptions = (show?: boolean) => {
        if (props.disabled) return;
        showOptions.value = typeof show === 'boolean' ? show : !showOptions.value;
      };

      const selectedValuesSet = ref<Set<string | number>>(new Set());

      const cssClass = computed(() => ({
        focused: showOptions.value,
        'mt-disabled': props.disabled,
        [props.visual]: true,
        'mt-invalid': showErrors.value || props.invalid,
        'mt-max-input-width': !props.wideLayout,
        'grid-template-2-parts-input': props.multiple && props.wideLayout,
        [`input-size-${props.size}`]: true,
      }));

      const { options } = toRefs(props);
      const addedOptions: Ref<Option[]> = ref([]);
      const allOptions: ComputedRef<OptsOrGroups> = computed(() => [
        ...(options.value || []),
        ...(addedOptions.value || []),
      ]);

      const { optionsAreGrouped, flattenOptions } = useGroupedOptions(allOptions);

      // update selected options
      watch(
        () => [props.modelValue, flattenOptions.value, props.valueField, props.storedOptions],
        () => {
          const val = props.modelValue;
          wasFocused.value = false;
          // if empty string,
          if (isEmpty(val) || isEmpty(allOptions)) {
            selectedValuesSet.value = new Set();
            if (selectedOptions.value.length !== 0) {
              selectedOptions.value = [];
            }
          } else {
            const { valueField, textField } = props;
            let opts = [];
            // If we pass the stored options as an Array we get less good preformance
            if (Array.isArray(props.storedOptions)) {
              const uniqueStoredValues = new Set<string>(
                props.storedOptions?.map((storedOption: any) => storedOption[valueField])
              );
              opts = [
                ...flattenOptions.value.filter(
                  (itm: Option) => !uniqueStoredValues.has(itm[valueField])
                ),
                ...props.storedOptions,
              ];
              //Better pass a map
            } else if (props.storedOptions) {
              for (let [key, option] of props.storedOptions?.entries()) {
                opts.push({
                  [props.valueField]: key,
                  [textField]: option[textField],
                  translate: option?.translate,
                });
              }
              for (let option of flattenOptions.value) {
                if (!props.storedOptions.has(option[valueField])) {
                  opts.push(option);
                }
              }
            } else {
              opts = flattenOptions.value;
            }
            // multi select
            if (Array.isArray(val)) {
              selectedOptions.value = opts.filter((opt) => {
                // @ts-ignore
                return val.includes(opt[valueField]);
              });
            } else {
              const selected = opts.find((opt: any) => {
                return val == opt[valueField];
              });
              selectedOptions.value = selected ? [selected] : [];
            }
          }
        },
        { immediate: true, deep: true }
      );

      watch(
        () => selectedOptions.value,
        () => {
          const newSelectedValuesSet = new Set<string | number>();
          for (let i = 0; i < selectedOptions.value.length; i++) {
            newSelectedValuesSet.add(selectedOptions.value[i][props.valueField]);
          }
          selectedValuesSet.value = newSelectedValuesSet;
        },
        { immediate: true }
      );

      // toggle selection
      const toggleSelection = (option: Option) => {
        emit('option-toggle', option);
        if (props.disabled) return;

        const valKey = props.valueField;
        const optionValue = option[valKey];
        if (props.multiple) {
          // multi select
          // getting the values of the selected options
          let newValues = [...selectedOptions.value.map((opt) => opt[valKey])];
          const index = selectedOptions.value.findIndex((opt) => opt[valKey] == optionValue);
          if (index === -1) {
            // target option NOT IN selected options - add to selection
            newValues.push(optionValue);
          } else {
            // target option IN selected options - remove from selection
            newValues.splice(index, 1);
          }
          emit('update:modelValue', newValues);
        } else {
          // not multi select
          emit('update:modelValue', optionValue);
          showOptions.value = false;
        }
      };

      const { textField, valueField, filter: isFilterEnabled } = toRefs(props);

      const { filteredOptions, onFilter, enableFiltering } = useFiltering(
        textField,
        valueField,
        allOptions,
        isFilterEnabled,
        optionsAreGrouped,
        flattenOptions,
        props.minOptionsForFiltering
      );

      const searchedOptionsCountLocal = computed(
        () => props.searchedOptionsCount || filteredOptions.value.length
      );

      const selectAllOptions = () => {
        const updateSelectAllFunction = () => {
          const valKey = props.valueField;
          let newSelectedValues = [...selectedValuesSet.value];
          for (let i = 0; i < filteredOptions.value.length; i++) {
            const index = newSelectedValues.findIndex(
              (opt) => opt == filteredOptions.value[i][valKey]
            );
            if (index === -1) {
              newSelectedValues.push(filteredOptions.value[i][valKey]);
            }
          }
          emit('update:modelValue', newSelectedValues);
        };

        if (!props.customSelectAll) {
          updateSelectAllFunction();
        }

        emit('select-all-options', updateSelectAllFunction);
      };

      const filterHandler = (searchText: string) => {
        emit('update-text', searchText);
        if (props.disableDefaultFilter) return;
        onFilter(searchText);
      };

      // clear all selections
      const clearSelections = () => {
        if (props.disabled) return;
        emit('update:modelValue', props.multiple ? [] : undefined);
      };

      const selectFirstOption = () => {
        if (!props.disabled && filteredOptions.value.length) {
          toggleSelection(filteredOptions.value[0]);
        }
      };

      // in multi-select, the number of columns the input takes
      const inputContainerClass = computed(() => {
        return {
          [`at-col-${props.multiple ? props.inputCols : 12}`]: true,
          ['width-inherit']: !props.multiple,
        };
      });

      // in multi-select, the number of columns the selected pills section takes
      const selectionsContainerClass = computed(() => {
        return {
          [`at-col-${props.inputCols === 12 ? 12 : 12 - props.inputCols}`]: true,
        };
      });

      const atSelectDropdownRef = ref<{ onScrolledToEnd(): void }>();

      const onScrolledToEnd = () => {
        emit('scrolled-down');
        atSelectDropdownRef.value?.onScrolledToEnd();
      };

      const onAddOption = (option: Option) => {
        if (attrs['add-option']) {
          emit('add-option', option);
        } else {
          addedOptions.value.push(option);
          emit('update:modelValue', option[props.valueField]);
        }
      };

      const showAtSelectSelections = computed(
        () => props.multiple && props.showSelectionsAsPills && selectedOptions.value.length
      );

      const showEmptySelection = computed(() => {
        const slots = useSlots();
        return props.multiple && props.showSelectionsAsPills && slots.emptySelection;
      });

      return {
        useInlineLabelComputed,
        selectWrapRef,
        cssClass,
        selectedOptions,
        optionsAreGrouped,
        toggleSelection,
        valid,
        errors,
        formDisplayErrors,
        toggleOptions,
        showOptions,
        onFilter,
        filteredOptions,
        selectedValuesSet,
        clearSelections,
        inputContainerClass,
        enableFiltering,
        selectionsContainerClass,
        selectFirstOption,
        flattenOptions,
        showErrors,
        atSelectDropdownRef,
        dropdownRef,
        onScrolledToEnd,
        filterHandler,
        isIndeterminate,
        rootElemRef,
        onAddOption,
        showAtSelectSelections,
        showEmptySelection,
        searchedOptionsCountLocal,
        selectAllOptions,
      };
    },
  });
</script>
