import { computed, nextTick, Ref, ref } from 'vue';

import { debounce, isArray } from 'lodash-es';

import { Option, Status } from '../types';
export interface useAtSelectPaginatedParams {
  // If a multiple select
  multiple?: Ref<boolean>;
  // the field that would be used in the model - default 'value'
  valueField?: string;
  // the field that would be used in the text - default 'text'
  textField?: string;
  // start the modelValue with an initial value
  initialModelValue?: string | string[];
  // if we have some options that we want to have right away
  initialOptions?: Option[];
  // if we have some selected options from the get go
  initialStoredOptions?: Option[];
  // required - needed to load next options - on first open and on scrolling to the bottom
  loadNextOptionsPromise: () => Promise<void | unknown>;
  // only needed if we have a select all button
  selectAllOptionsPromise?: () => Promise<void | unknown>;
  // if we need to load some stored value without actually openning the AtSelect
  loadStoredOptionsPromise?: () => Promise<void | unknown>;
  // isShowSelectAllOptions
  hideSelectAllOptions?: boolean;
  // if we use search by pressing on button or delayed on type
  showSearchButton?: boolean;
}

interface queryResults {
  totalCount?: number;
  isLoaded?: boolean;
  options: Option[];
}

const useAtSelectPaginated = (params: useAtSelectPaginatedParams) => {
  const {
    selectAllOptionsPromise,
    loadStoredOptionsPromise,
    loadNextOptionsPromise,
    initialOptions,
    initialStoredOptions = new Map<string, Option>(),
    initialModelValue,
    multiple,
    valueField = 'value',
    showSearchButton = true,
  } = params;

  let { hideSelectAllOptions } = params;
  if (multiple?.value && !selectAllOptionsPromise && typeof hideSelectAllOptions !== 'boolean') {
    console.warn(
      '[useAtSelectPaginated] Multiple select must have a `selectAllOptionsPromise` ,or specify `hideSelectAllOptions` to true for disabling the select all button'
    );
    hideSelectAllOptions = true;
  }
  const modelValue = ref<string | string[]>(initialModelValue || (multiple?.value ? [] : ''));
  const isLoadingNextOptions = ref(false);
  const isSelectAllLoading = ref(false);
  const isSearchLoading = ref(false);
  const queryString = ref('');
  const optionsByQueryString = ref<Record<string, queryResults>>({
    '': { options: initialOptions || [] },
  });

  const resetOptions = () => {
    queryString.value = '';
    optionsByQueryString.value = {
      '': { options: initialOptions || [] },
    };
    status.value = Status.Loading;
  };

  const storedOptionsMap = ref(
    initialStoredOptions && isArray(initialStoredOptions)
      ? new Map<string, Option>(initialStoredOptions?.map((opt) => [opt[valueField], opt]))
      : initialStoredOptions
  );
  nextTick(() => loadStoredOptionsPromise?.());

  const options = computed<Option[]>({
    get: () => optionsByQueryString.value[queryString.value].options,
    set: (newOptions) => {
      const currentQueryOptions = optionsByQueryString.value[queryString.value].options;
      addUniqueOptions(newOptions, currentQueryOptions);
    },
  });

  function addUniqueOptions(from: Option[], to: Option[]) {
    for (const option of from) {
      if (!to.find((existingOption) => existingOption[valueField] === option[valueField])) {
        to.push(option);
      }
    }
  }

  const totalOptionsCount = computed<number | undefined>({
    get: () => optionsByQueryString.value[queryString.value].totalCount,
    set: (value: number | undefined) => {
      optionsByQueryString.value[queryString.value].totalCount = value;
    },
  });

  const isLoaded = computed<boolean | undefined>({
    get: () => optionsByQueryString.value[queryString.value].isLoaded,
    set: (value: boolean | undefined) => {
      optionsByQueryString.value[queryString.value].isLoaded = value;
    },
  });

  const status = ref(Status.Loading);

  const isAllOptionsLoaded = computed<boolean>(
    () =>
      isLoaded.value ||
      !!(totalOptionsCount.value && options.value.length >= totalOptionsCount.value)
  );

  const isLoadingOptions = computed(() => isSearchLoading.value || isLoadingNextOptions.value);

  const loadNextPage = (search?: boolean) => {
    if (!isLoadingOptions.value && !isAllOptionsLoaded.value) {
      isLoadingNextOptions.value = true;
      isSearchLoading.value = !!search;
      return loadNextOptionsPromise()
        .then(() => {
          status.value = Status.Auto;
        })
        .catch(() => {
          status.value = Status.Error;
        })
        .finally(() => {
          nextTick(() => {
            isSearchLoading.value = false;
            isLoadingNextOptions.value = false;
          });
        });
    }
    return Promise.resolve();
  };

  const showSelectAllOptions = computed(
    () => multiple?.value && selectAllOptionsPromise && !hideSelectAllOptions
  );
  const selectAllOptions = (callback?: () => void) => {
    isSelectAllLoading.value = true;
    // We know it exist as `showSelectAllOptions` is true, otherwise we don't show the button
    return selectAllOptionsPromise!()
      .then(() => {
        for (const option of options.value) {
          addOptionToStored(option);
          if (
            Array.isArray(modelValue.value) &&
            !(modelValue.value as string[]).includes(option[valueField])
          ) {
            modelValue.value.push(option[valueField]);
          }
        }
        callback?.();
      })
      .finally(() => (isSelectAllLoading.value = false));
  };

  const debounceUpdateSearchText = debounce((text: string) => {
    updateSearchText(text);
  }, 300);

  const updateSearchText = (textFilters: string) => {
    // Initialize the query entry
    if (!optionsByQueryString.value[textFilters]) {
      optionsByQueryString.value[textFilters] = { options: [] };
    }
    if (queryString.value !== textFilters) {
      queryString.value = textFilters;
      return loadNextPage();
    }
    return Promise.resolve();
  };

  function addOptionToStored(option: Option) {
    storedOptionsMap.value.set(option[valueField], option);
  }

  const overrideProps = ref<any>();

  const searchListener = {
    [showSearchButton ? 'onSearch' : 'onUpdateText']: showSearchButton
      ? updateSearchText
      : debounceUpdateSearchText,
  };

  const attrs = computed(() => ({
    enableLazyLoad: true,
    enableLazyRender: false,
    searchButtonEnabled: showSearchButton,
    disableDefaultFilter: true,
    customSelectAll: true,
    minOptionsForFiltering: 0,
    onSelectAllOptions: selectAllOptions,
    onFirstOpening: loadNextPage,
    onScrolledDown: loadNextPage,
    onSearch: updateSearchText,
    valueField,
    multiple: multiple?.value,
    searchedOptionsCount: totalOptionsCount.value,
    queryText: queryString.value,
    showSelectAllOptions: showSelectAllOptions.value,
    totalOptionsCount: totalOptionsCount.value,
    isSelectAllLoading: isSelectAllLoading.value,
    storedOptions: storedOptionsMap.value,
    options: options.value,
    loadingNextOptions: isLoadingNextOptions.value,
    status: status.value,
    modelValue: modelValue.value,
    onOptionToggle: addOptionToStored,
    'onUpdate:modelValue': (value: string | string[]) => {
      modelValue.value = value;
    },
    ...searchListener,
    ...overrideProps.value,
  }));

  return {
    modelValue,
    overrideProps,
    attrs,
    options,
    isLoaded,
    totalOptionsCount,
    queryString,
    updateSearchText,
    status,
    storedOptionsMap,
    resetOptions,
    loadNextPage,
    isLoadingNextOptions,
    selectAllOptions,
    isSelectAllLoading,
  };
};
export default useAtSelectPaginated;
