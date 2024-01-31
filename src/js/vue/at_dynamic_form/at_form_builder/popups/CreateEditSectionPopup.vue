<template>
  <AtPopup
    class="CreateEditSectionPopup"
    disable-click-away
    show-close-icon
    show-divider-line
    :show="show"
    :title-text="$t(`${prefixFormBuilder}.${titleText}`)"
    :confirm-text="$t(`${prefixFormBuilder}.${confirmText}`)"
    current-size="small"
    :confirm-disabled="!sectionName"
    appearance="confirmation"
    @close="$emit('close')"
    @ok="onSave"
  >
    <div class="CreateEditSectionPopup-section-name block-start-06 block-end-04 pad-block-end-04">
      <AtInput
        ref="atInputEl"
        required
        :title="$t(`${prefixFormBuilder}.create_section_section_name`)"
        class="w-100"
        v-model="sectionName"
      />
    </div>
  </AtPopup>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, watch } from 'vue';

  import AtInput from '../../../at_input/AtInput.vue';
  import AtPopup from '../../../at_popup/AtPopup.vue';

  export default defineComponent({
    name: 'CreateEditCertificationPopup',
    components: { AtPopup, AtInput },
    props: {
      show: { type: Boolean, default: false },
      sectionNameToUpdate: { type: String, default: '' },
      isEdit: { type: Boolean, default: false },
      prefixFormBuilder: {
        type: String,
        required: true,
      },
    },
    emits: ['close', 'ok', 'save'],
    setup(props, { emit }) {
      const atInputEl = ref<InstanceType<typeof AtInput>>();
      const titleText = computed(() =>
        props.isEdit ? 'update_section_title' : 'create_section_title'
      );
      const confirmText = computed(() =>
        props.isEdit ? 'update_section_confirm_text' : 'create_section_confirm_text'
      );
      function onSave() {
        if (props.isEdit) {
          emit('save', { title: sectionName.value });
        } else {
          emit('ok', sectionName);
        }
      }
      watch(
        () => atInputEl.value,
        (value) => {
          if (value) atInputEl.value?.focusInput();
        }
      );
      const sectionName = props.sectionNameToUpdate ? ref(props.sectionNameToUpdate) : ref('');
      return { sectionName, onSave, titleText, confirmText, atInputEl };
    },
  });
</script>
<style lang="scss">
  .CreateCertificationPopup {
    .popup-content {
      overflow: hidden;
    }
  }
</style>
