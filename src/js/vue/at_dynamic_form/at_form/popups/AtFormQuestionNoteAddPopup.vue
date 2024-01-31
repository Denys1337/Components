<template>
  <AtPopup
    class="AtFormQuestionNoteAddModal"
    show-close-icon
    show-confirmation-buttons
    disable-click-away
    current-size="small"
    :show="show"
    :confirm-disabled="isSaveButtonDisabled"
    :title-text="$t('certifications.execution.notes_modal.title')"
    :buttons-disabled="popupButtonsDisabled"
    :confirm-text="$t('certifications.execution.notes_modal.confirm_button_text')"
    show-divider-line
    @ok="onOk"
    @close="closeAndDeleteFiles"
  >
    <p class="font-body-default-b block-start-07 block-end-02">
      {{ $t('certifications.execution.notes_modal.comment_label') }}
    </p>
    <AtTextarea
      v-model="commentText"
      :placeholder="$t('certifications.execution.notes_modal.comment_placeholder')"
      :maxlength="NOTE_MAX_LENGTH"
      :disabled="popupButtonsDisabled"
    />
    <AtFilesListDisplay
      v-if="filesToDisplay"
      :files-to-display="filesToDisplay"
      :delete-icon-size="42"
      @load-file-src="$emit('load-file-src', $event)"
      @delete-file="$emit('delete-file', { index: $event, deleteCallback: onFileDelete })"
      display-file-name
    />
    <AtFileUpload
      multiple-files
      :disabled="popupButtonsDisabled"
      :max-file-mb-size="maxFileMbSize"
      :max-selection="maxMultiSelectionFiles"
      @selected-files="$emit('upload-files', { files: $event, uploadCallback: onFileUpload })"
    />
  </AtPopup>
</template>
<script lang="ts">
  import { computed, defineComponent, ref, watch } from 'vue';

  import AtFileUpload from '../../../at_file_upload/AtFileUpload.vue';
  import AtFilesListDisplay from '../../../at_file_upload/AtFilesListDisplay.vue';
  import { FileToDisplay } from '../../../at_file_upload/types';
  import AtPopup from '../../../at_popup/AtPopup.vue';
  import AtTextarea from '../../../at_textarea/AtTextarea.vue';

  const NOTE_MAX_LENGTH = 1000;

  export default defineComponent({
    name: 'AtFormQuestionNoteAddPopup',
    components: {
      AtPopup,
      AtTextarea,
      AtFileUpload,
      AtFilesListDisplay,
    },
    props: {
      show: {
        type: Boolean,
        required: true,
      },
      popupButtonsDisabled: {
        type: Boolean,
        default: false,
      },
      maxMultiSelectionFiles: { type: Number, default: 10 },
      maxFilesToUpload: { type: Number, default: 10 },
      maxFileMbSize: { type: Number, default: 5 },
    },
    emits: [
      'close',
      'add-note',
      'upload-files',
      'delete-file',
      'delete-all-files',
      'load-file-src',
    ],
    setup(props, { emit }) {
      const commentText = ref<String>('');
      const filesToDisplay = ref<FileToDisplay[]>([]);

      watch(
        () => props.show,
        () => {
          commentText.value = '';
          filesToDisplay.value = [];
        }
      );
      const isSaveButtonDisabled = computed(
        () =>
          commentText.value.length === 0 ||
          commentText.value.length >= NOTE_MAX_LENGTH ||
          (commentText.value.length > 0 && props.popupButtonsDisabled)
      );
      function onFileDelete(index: number) {
        filesToDisplay.value.splice(index, 1);
      }
      function onFileUpload(files: FileToDisplay[]) {
        filesToDisplay.value.push(...files);
      }
      function closeAndDeleteFiles() {
        emit('close');
        if (filesToDisplay.value.length) {
          emit('delete-all-files');
          filesToDisplay.value = [];
        }
      }

      function onOk() {
        emit('add-note', {
          text: commentText.value,
        });
        emit('close');
      }

      return {
        commentText,
        NOTE_MAX_LENGTH,
        isSaveButtonDisabled,
        onFileUpload,
        filesToDisplay,
        onFileDelete,
        closeAndDeleteFiles,
        onOk,
      };
    },
  });
</script>
<style lang="scss">
  .AtFormQuestionNoteAddModal {
    .AtTextarea {
      max-width: unset;
      margin-block-end: var(--spacing-07);
    }
  }
</style>
