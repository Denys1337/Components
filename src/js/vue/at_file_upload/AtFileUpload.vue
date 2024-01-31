<template>
  <div>
    <label :for="inputId" @click.prevent="openUploadFile">
      <slot>
        <AtButton visual="text" :disabled="disabled">
          <template #start>
            <Loader :spinner-size="4" v-if="disabled" class="loader" />
            <PaperclipIcon size="18" :disabled="disabled" color="#008ef4" v-else />
          </template>
          {{ disabled ? $t('file_upload.uploading') : uploadLabel }}
        </AtButton>
      </slot>
    </label>
    <input
      hidden
      :id="inputId"
      type="file"
      :accept="filesExtensions.toString()"
      ref="inputRef"
      @change="handleSelectedFiles"
      :multiple="maxSelection > 1"
      :disabled="disabled"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, PropType, getCurrentInstance, defineAsyncComponent } from 'vue';

  import { PaperclipIcon } from 'vue-tabler-icons';

  const Loader = defineAsyncComponent(
    () => import(/* webpackChunkName: "Loader" */ '../loaders/loader/Loader.vue')
  );
  import createId from '@agritask/js-utils/libs/createId';

  import AtButton from '../at_button/AtButton.vue';
  import createToast from '../utils/createToast';
  import getTranslators from '../utils/getTranslators';
  import {
    FileTypes,
    validatorFilesTypes,
    DEFUALT_SUPPORTED_FILES,
    ONE_MB_IN_BYTES,
    TOAST_TYPE,
    FileTypeExtensionMap,
  } from './types';
  export default defineComponent({
    name: 'AtFileUpload',
    components: { AtButton, PaperclipIcon, Loader },
    props: {
      filesExtensions: {
        type: Array as PropType<FileTypes[]>,
        default: DEFUALT_SUPPORTED_FILES,
        validator: (values: FileTypes[]) => validatorFilesTypes(values),
      },
      maxFileMbSize: { type: Number },
      maxSelection: { type: Number, default: 1 },
      disabled: { type: Boolean, default: false },
      label: {
        type: String,
      },
    },
    emits: ['selected-files'],
    setup(props, { emit }) {
      const vm = getCurrentInstance()?.proxy;
      const { t } = getTranslators('file_upload');
      const titleToast = t('errors.title');
      const inputId = createId();
      const inputRef = ref<HTMLInputElement>();
      const validFiles = ref<File[]>([]);

      function openUploadFile() {
        if (inputRef.value) {
          inputRef.value?.click();
        }
      }
      function isFileSizeValid(bytes: number) {
        if (props.maxFileMbSize) {
          return ONE_MB_IN_BYTES * props.maxFileMbSize > bytes;
        }
        return true;
      }
      function isFileTypeValid(fileType: FileTypes) {
        return props.filesExtensions.includes(fileType);
      }
      function handleMultiSelectionError() {
        createToast(vm, {
          title: titleToast,
          message: t('errors.quantity_files_error', props.maxSelection, {
            count: props.maxSelection,
          }),
          type: TOAST_TYPE,
        });
      }
      function handleFileTypeError() {
        const uniqueExtensions = props.filesExtensions!.reduce(
          (acc: string[], extension: FileTypes) => {
            const mappedExtension = FileTypeExtensionMap[extension];
            if (!acc.includes(mappedExtension)) {
              acc.push(mappedExtension);
            }
            return acc;
          },
          []
        );

        createToast(vm, {
          title: titleToast,
          duration: 99999999,
          message: t('errors.type_file_error', props.filesExtensions.length, {
            extensions: uniqueExtensions.join(', '),
          }),
          type: TOAST_TYPE,
        });
      }
      function handleFileSizeError() {
        const message =
          props.maxSelection > 1
            ? t('errors.size_file_error', props.maxFileMbSize, {
                size: props.maxFileMbSize,
              })
            : t('errors.size_file_error', 1, {
                size: props.maxFileMbSize,
              });
        createToast(vm, {
          title: titleToast,
          message,
          type: TOAST_TYPE,
        });
      }
      function isFileValid(file: File) {
        if (!file.type || !isFileTypeValid(file.type as FileTypes)) {
          handleFileTypeError();
          return false;
        }
        if (props.maxFileMbSize && !isFileSizeValid(file.size)) {
          handleFileSizeError();
          return false;
        }
        return true;
      }
      function handleSelectedFiles(e: Event) {
        const fileInput = e.target as HTMLInputElement;
        if (fileInput.files?.length) {
          const filesArr = Array.from(fileInput.files);
          if (props.maxSelection > 1 && filesArr.length > props.maxSelection) {
            handleMultiSelectionError();
            return;
          }
          filesArr.forEach((file) => {
            if (isFileValid(file)) {
              validFiles.value.push(file);
            }
          });
          if (validFiles.value.length > 0) {
            emit('selected-files', validFiles.value);
            validFiles.value = [];
          }
        }
      }

      const uploadLabel = props.label || t('attach_photos');

      return {
        inputRef,
        openUploadFile,
        handleSelectedFiles,
        inputId,
        uploadLabel,
      };
    },
  });
</script>
<style lang="scss">
  .loader {
    position: unset;
    transform: unset;
  }
</style>
