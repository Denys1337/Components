<template>
  <div class="AtSelectStatus">
    <div v-if="status === 'loading'" class="AtSelectStatus-loading">
      <span class="loader">
        {{ $t('loading') }}
      </span>
      <Loader :spinner-size="5" class="d-inline-block" />
    </div>
    <div v-else-if="status === 'error'" class="AtSelectStatus-error">
      <ErrorMessage :errors="errorMessage || $t('forms.errors.options_not_retrieved')" />
    </div>
    <StatusEmpty
      v-else-if="!filteredOptions || !filteredOptions.length"
      class="AtSelectStatus-empty block-start-02"
      :empty-response-message="emptyResponseMessage"
      :enable-add-option-when-options-empty="enableAddOptionWhenOptionsEmpty"
      :text-field="textField"
      :value-field="valueField"
      @add-option="$emit('add-option', $event)"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  import ErrorMessage from '../../error_message/ErrorMessage.vue';
  import Loader from '../../loaders/loader/Loader.vue';
  import { OptsOrGroups, Status } from '../types';
  import StatusEmpty from './status/StatusEmpty.vue';

  export default defineComponent({
    name: 'AtSelectStatus',
    components: { Loader, ErrorMessage, StatusEmpty },
    props: {
      status: {
        type: String as PropType<Status>,
        default: 'auto',
        validator: (value: Status) => Object.values(Status).includes(value),
      },
      errorMessage: { type: String, required: false },
      emptyResponseMessage: { type: String, required: false },
      filteredOptions: { type: Array as PropType<OptsOrGroups>, required: false },
      enableAddOptionWhenOptionsEmpty: { type: Boolean, default: false },
      textField: { type: String, required: false },
      valueField: { type: String, required: false },
    },
    emits: ['add-option'],
    setup() {
      return {};
    },
  });
</script>

<style lang="scss">
  @import '../../../../style/scss/_mixin';

  .AtSelectStatus {
    font-size: pxToRem(14);

    &-loading {
      > .loader {
        vertical-align: text-bottom;
      }
    }
  }
</style>
