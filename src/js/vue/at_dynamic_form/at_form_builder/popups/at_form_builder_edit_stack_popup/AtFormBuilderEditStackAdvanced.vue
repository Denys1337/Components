<template>
  <div class="AtFormBuilderEditStackAdvanced block-end-06">
    <AtCollapse :button-label="$t('general.advanced')" v-model:collapsed="isAdvancedCollapsed">
      <div class="block-end-05 d-flex ai-center">
        <AtInput
          :title="$t('form_builder.stack_settings_popup.external_group_id')"
          v-model="localModel.externalGroupId"
          class="w-100"
        />
        <i id="id-hint-icon" class="inline-start-02 cursor-pointer">
          <InfoCircleIcon />
        </i>
      </div>

      <Tooltip reference="#id-hint-icon">
        <span class="field-id-hint-tooltip">
          {{ $t('form_builder.stack_settings_popup.external_group_id_tooltip') }}
        </span>
      </Tooltip>
    </AtCollapse>
  </div>
</template>
<script lang="ts">
  export default {
    name: 'AtFormBuilderEditStackAdvanced',
  };
</script>
<script lang="ts" setup>
  import { ref, defineProps, PropType, computed, defineEmits } from 'vue';

  import { InfoCircleIcon } from 'vue-tabler-icons';

  import AtCollapse from '../../../../at_collapse/AtCollapse.vue';
  import AtInput from '../../../../at_input/AtInput.vue';
  import Tooltip from '../../../../tooltip/Tooltip.vue';
  import { EditStackValueModel } from '../../popups/at_form_builder_edit_stack_popup/types';

  const props = defineProps({
    modelValue: {
      type: Object as PropType<EditStackValueModel>,
      required: true,
    },
  });
  const emit = defineEmits(['update:valueModel']);

  const isAdvancedCollapsed = ref(true);

  const localModel = computed<EditStackValueModel>({
    get: () => props.modelValue,
    set: (value) => {
      emit('update:valueModel', value);
    },
  });
</script>
