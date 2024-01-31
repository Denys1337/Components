<template>
  <AtSelect
    v-model="model"
    v-bind="$props"
    :options="retrievedOptions"
    @first-opening="onOpen"
    @search="$emit('search', $event)"
    @scrolled-down="$emit('scrolled-down')"
    @update-text="$emit('update-text', $event)"
    @select-all-options="$emit('select-all-options')"
    @clear-selections="$emit('clear-selections')"
    :status="localStatus"
    class="AtSelectRequestOptions"
  >
    <template #emptySelection>
      <slot name="emptySelection"></slot>
    </template>
    <template #dropdownListHeader>
      <slot name="dropdownListHeader"></slot>
    </template>
  </AtSelect>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, computed, watch, PropType } from 'vue';

  import AtSelect from './AtSelect.vue';
  import { atSelectVueProps, Status, OptsOrGroups } from './types';

  export const AtSelectRequestOptionsVueProps = {
    ...atSelectVueProps,
    requestFunction: { type: Function, required: true },
    requestParams: { type: [Array, Object] as PropType<object | object[]>, required: false },
    requestErrorHandler: { type: Function },
    optionsResponseFormatter: { type: Function, required: false },
    lazyLoad: {
      type: Boolean,
      required: false,
      default: true,
    },
  };

  export default defineComponent({
    name: 'AtSelectRequestOptions',
    components: { AtSelect },
    props: AtSelectRequestOptionsVueProps,
    emits: [
      'update:modelValue',
      'search',
      'scrolled-down',
      'update-text',
      'select-all-options',
      'clear-selections',
      'loaded-options',
    ],
    setup(props, { emit }) {
      const model = computed({
        get: () => props.modelValue,
        set: (value) => {
          emit('update:modelValue', value);
        },
      });
      const retrievedOptions = ref<OptsOrGroups | undefined>([]);
      const localStatus = ref<Status>(Status.Auto);

      watch(
        () => props.status,
        () => {
          localStatus.value = props.status;
        }
      );

      const hasValue = computed(() =>
        Array.isArray(model.value) ? model.value.length > 0 : !!model.value
      );

      const hasExistingOptions = computed(() => !!retrievedOptions.value?.length);

      const initRequestOptions = async () => {
        if (!props.requestFunction) {
          localStatus.value = Status.Error;
          return;
        }
        try {
          localStatus.value = Status.Loading;

          const response = await props.requestFunction.call(null, props.requestParams);
          if (response) {
            retrievedOptions.value =
              (props.optionsResponseFormatter
                ? props.optionsResponseFormatter(response)
                : response) || [];
            localStatus.value = Status.Auto;
          } else {
            localStatus.value = Status.Error;
          }
        } catch (error) {
          localStatus.value = Status.Error;

          if (props.requestErrorHandler) {
            props.requestErrorHandler(error);
          }
        }
      };

      const onOpen = () => {
        if (!hasExistingOptions.value) {
          initRequestOptions();
        }
      };

      onMounted(() => {
        // only execute when it has a value or if it's not lazy loading.
        if (hasValue.value || !props.lazyLoad) {
          initRequestOptions();
        }
      });

      watch(
        () => retrievedOptions.value,
        () => {
          emit('loaded-options', retrievedOptions.value);
        }
      );

      watch(
        () => props.options,
        () => {
          retrievedOptions.value = props.options;
        },
        { immediate: true, deep: true }
      );

      watch(
        () => props.requestParams,
        (newValue, prevValue) => {
          // Skips execution on the first change since it'll be handled in the onMounted hook
          if (!props.lazyLoad || prevValue) {
            // Resetting options since the requestArguments are changed
            retrievedOptions.value = [];
            initRequestOptions();
          }
        },
        {
          deep: true,
        }
      );

      return {
        retrievedOptions,
        onOpen,
        model,
        hasValue,
        localStatus,
        initRequestOptions,
      };
    },
  });
</script>

<style lang="scss" scoped></style>
