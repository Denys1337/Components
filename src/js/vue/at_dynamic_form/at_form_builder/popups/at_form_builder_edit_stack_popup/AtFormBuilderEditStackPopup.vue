<template>
  <AtPopup
    v-bind="$props"
    class="AtFormBuilderEditStackPopup"
    show-close-icon
    show-confirmation-buttons
    current-size="small"
    :show="show"
    :title-text="$t('form_builder.stack_settings_popup.title')"
    :confirm-disabled="isConfirmDisabled"
    :confirm-text="$t('general.save')"
    disable-click-away
    show-divider-line
    @ok="handleOk"
    @close="$emit('close')"
  >
    <div class="block-05">
      <AtInput
        class="w-100"
        v-model="localModel.title"
        :title="$t('form_builder.stack_settings_popup.name')"
        :maxlength="STACK_MAX_LENGTH"
        required
      />
    </div>

    <div class="block-end-05">
      <AtToggle
        class="jc-space-between"
        :label="$t('form_builder.stack_settings_popup.repeatable')"
        v-model="localModel.repeatable"
      />
    </div>
    <div class="block-end-05">
      <AtToggle
        :label="$t('general.mandatory')"
        v-model="localModel.mandatory"
        :disabled="!localModel.repeatable"
        class="jc-space-between"
      />
    </div>
    <AtFormBuilderEditStackAdvanced v-if="enableAdvancedEdit" v-model="localModel" />
  </AtPopup>
</template>

<script lang="ts">
  export default {
    name: 'AtFormBuilderEditStackPopup',
  };
</script>
<script setup lang="ts">
  import { computed, reactive, watch, defineAsyncComponent } from 'vue';

  import AtInput from '../../../../at_input/AtInput.vue';
  import AtPopup from '../../../../at_popup/AtPopup.vue';
  import { atPopupVueProps } from '../../../../at_popup/types';
  import AtToggle from '../../../../at_toggle/AtToggle.vue';
  import { atFormBuilderAdvancedSettingsProps } from '../../components/at_form_builder_advanced_settings/types';
  import { QUESTION_MAX_LENGTH as STACK_MAX_LENGTH } from '../at_form_builder_questions_popup/types';
  import { EditStackValueModel } from './types';

  const AtFormBuilderEditStackAdvanced = defineAsyncComponent(
    () =>
      import(
        /* webpackChunkName: "AtFormBuilderEditStackAdvanced" */ './AtFormBuilderEditStackAdvanced.vue'
      )
  );

  const props = defineProps({
    ...atPopupVueProps,
    ...atFormBuilderAdvancedSettingsProps,
    title: {
      type: String,
      default: '',
    },
    enableAdvancedEdit: {
      type: Boolean,
      default: false,
    },
    externalGroupId: { type: String, default: '' },
    repeatable: { type: Boolean, default: false },
    maxStack: { type: Number, default: null },
    minStack: { type: Number, default: 0 },
  });

  const emit = defineEmits(['ok', 'close']);

  const localModel = reactive<EditStackValueModel>({
    title: props.title,
    externalGroupId: props.externalGroupId,
    repeatable: props.repeatable,
    mandatory: props.minStack > 0,
  });

  const isConfirmDisabled = computed(
    () => !localModel.title || localModel.title.length > STACK_MAX_LENGTH
  );

  const handleOk = () => {
    emit('ok', {
      title: localModel.title,
      externalGroupId: localModel.externalGroupId,
      repeatable: localModel.repeatable,
      minStack: localModel.mandatory ? 1 : 0,
      maxStack: null,
    });
  };

  watch(
    () => localModel.repeatable,
    (repeatableValue: boolean) => {
      if (!repeatableValue) {
        localModel.mandatory = false;
      }
    }
  );
</script>
