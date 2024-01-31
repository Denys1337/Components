<template>
  <div class="StatusEmpty">
    <slot name="noOptions">
      <template v-if="enableAddOptionWhenOptionsEmpty">
        <AtInput
          v-model="newOptionText"
          :title="$t('general.type_new_option')"
          class="block-start-03 inline-end-03"
        />
        <button type="button" class="dropdown__option-item" disabled>
          {{ $t('general.no_results') }}
        </button>
        <br />
        <IconButton
          icon="icon-general-add"
          class="dropdown__option-item"
          :no-border="true"
          :blue="true"
          @click="createNewOption()"
          font-size="inherit"
          :disabled="!newOptionText"
        >
          {{ $t('general.create_new_option') }}: {{ newOptionText }}
        </IconButton>
      </template>
      <span v-else>{{ emptyResponseMessage || $t('general.no_options') }}</span>
    </slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';

  import AtInput from '../../../at_input/AtInput.vue';
  import IconButton from '../../../icon_button/IconButton.vue';
  import { Option } from '../../types';

  export default defineComponent({
    name: 'StatusEmpty',
    components: { AtInput, IconButton },
    props: {
      emptyResponseMessage: { type: String, required: false },
      enableAddOptionWhenOptionsEmpty: { type: Boolean, default: false },
      textField: { type: String, required: false },
      valueField: { type: String, required: false },
    },
    emits: ['add-option'],
    setup(props, { emit }) {
      const newOptionText = ref('');

      function createNewOption() {
        const newOption: Option = {
          [`${props.valueField}`]: newOptionText.value,
          [`${props.textField}`]: newOptionText.value,
        };
        newOptionText.value = '';
        emit('add-option', newOption);
      }

      return {
        createNewOption,
        newOptionText,
      };
    },
  });
</script>
