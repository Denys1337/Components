<template>
  <div class="AtSelectDropdown">
    <template v-if="status !== Status.Loading">
      <ul v-if="optionsAreGrouped" class="AtSelectDropdown AtSelectDropdown-groups">
        <li v-for="optGroup in renderedOptions" :key="optGroup.title">
          <AtSelectOption
            v-if="!optGroup.options"
            :value-field="valueField"
            :text-field="textField"
            :option="optGroup"
            :selected="selectedValuesSet.has(optGroup[valueField])"
            :multiple="multiple"
            @click="toggleSelection(optGroup)"
            class="d-block"
          />
          <div v-else>
            <div class="AtSelectDropdown-title">
              {{ optGroup.title }}
            </div>
            <AtSelectOption
              v-for="opt in optGroup.options"
              :key="opt[keyField] || opt[valueField]"
              :value-field="valueField"
              :text-field="textField"
              :option="opt"
              :selected="selectedValuesSet.has(opt[valueField])"
              :multiple="multiple"
              @click="toggleSelection(opt)"
              class="d-block inline-start-03"
            />
          </div>
        </li>
        <li class="loader" v-if="loadingNextOptions">
          <Loader />
        </li>
      </ul>
      <div v-else class="AtSelectDropdown-flat block-start-02">
        <AtSelectOption
          v-for="opt in renderedOptions"
          :key="opt[keyField] || opt[valueField]"
          :value-field="valueField"
          :text-field="textField"
          :option="opt"
          :selected="selectedValuesSet.has(opt[valueField])"
          :multiple="multiple"
          @click="toggleSelection(opt)"
          class="d-block"
        />
        <div class="loader" v-if="loadingNextOptions">
          <Loader />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref, watch } from 'vue';

  import Loader from '../../loaders/loader/Loader.vue';
  import { Status } from '../types';
  import { OptsOrGroups, Option } from '../types';
  import AtSelectOption from './AtSelectOption.vue';

  const OPTIONS_COUNT_PER_RENDER = 40;

  export default defineComponent({
    name: 'AtSelectDropdown',
    components: { AtSelectOption, Loader },
    props: {
      valueField: { type: String, default: 'value' },
      textField: { type: String, default: 'text' },
      keyField: { type: String, required: false, default: '' },
      multiple: { type: Boolean, default: false },
      filter: { type: Boolean, default: false },
      filteredOptions: { type: Array as PropType<OptsOrGroups>, required: true },
      selectedValuesSet: { type: Set, required: true },
      optionsAreGrouped: { type: Boolean, default: false },
      enableLazyLoad: { type: Boolean, default: true },
      enableLazyRender: { type: Boolean, default: true },
      status: { type: String, default: Status.Auto },
      loadingNextOptions: { type: Boolean, required: false },
    },
    emits: { 'toggle-selection': null },
    setup(props, { emit }) {
      const renderedOptions = ref<OptsOrGroups>([]);

      const onScrolledToEnd = () => {
        if (renderedOptions.value?.length < props.filteredOptions?.length) {
          const nextOptions: OptsOrGroups = props.filteredOptions.slice(
            renderedOptions.value.length,
            renderedOptions.value.length + OPTIONS_COUNT_PER_RENDER
          );
          // @ts-ignore
          renderedOptions.value.push(...nextOptions);
        }
      };

      watch(
        () => props.filteredOptions,
        (opts) => {
          // If we retrieve all the options in one request,
          // then we enable lazy rendering to avoid performance problems just in case there would be a lot of options to avoid overload on the DOM.
          if (!props.enableLazyLoad && props.enableLazyRender) {
            renderedOptions.value = [];
            onScrolledToEnd();
            return;
          }
          // If we lazy load options from server by parts. It means that we will load the next 40 options from BE when we reach the end of the list.
          if (props.enableLazyLoad && !props.enableLazyRender) {
            renderedOptions.value = opts.slice(0, opts.length);
            return;
          }
          renderedOptions.value = opts.slice(0, OPTIONS_COUNT_PER_RENDER);
        },
        { immediate: true }
      );

      return {
        onScrolledToEnd,
        renderedOptions,
        toggleSelection: (opt: Option) => emit('toggle-selection', opt),
        Status,
      };
    },
  });
</script>

<style lang="scss">
  @import '../../../../style/scss/_base_functions';

  .AtSelectDropdown {
    font-size: pxToRem(14);
    text-transform: capitalize;
    .loader {
      display: flex;
      justify-content: center;
    }
  }

  .AtSelectDropdown-title {
    padding: 0.62em 0;
  }
</style>
