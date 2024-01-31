<template>
  <div class="AddLogoButton">
    <div class="upload" v-show="!imageId?.length">
      <AtFileUpload
        :files-extensions="supportedTypes"
        :max-file-mb-size="1"
        @selected-files="handleSelectedLogoEvent"
        ref="fileUploadRef"
      >
        <AtButton size="m" class="flex align-items-center">
          <template #start>
            <PlusIcon :size="'20'" />
          </template>
          {{ $t('file_upload.add_logo') }}
        </AtButton>
      </AtFileUpload>
    </div>
    <div class="d-flex" v-if="imageId?.length">
      <AtButton @click="handleChangeButtonClick">
        {{ $t(changeButtonTextI18n) }}
      </AtButton>
      <AtButton
        visual="tertiary"
        mood="danger"
        class="inline-start-03"
        @click="handleDelete"
        v-if="showDeleteButton"
      >
        {{ $t('file_upload.delete') }}
      </AtButton>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';

  import { PlusIcon } from 'vue-tabler-icons';

  import AtButton from '../../at_button/AtButton.vue';
  import AtFileUpload from '../AtFileUpload.vue';
  import { FileTypes } from '../types';

  export default defineComponent({
    name: 'AddLogoButton',
    components: {
      AtButton,
      PlusIcon,
      AtFileUpload,
    },
    props: {
      imageId: {
        type: String,
      },
      changeButtonTextI18n: {
        type: String,
        default: 'file_upload.change',
      },
      showDeleteButton: {
        type: Boolean,
        default: true,
      },
    },
    emits: ['upload', 'delete'],
    setup(_, { emit }) {
      const supportedTypes = [FileTypes.JPEG_OR_JPG_FILE, FileTypes.PNG_FILE, FileTypes.SVG_FILE];
      const fileUploadRef = ref<InstanceType<typeof AtFileUpload>>();
      const handleSelectedLogoEvent = (logo: File) => {
        emit('upload', logo);
      };

      const handleDelete = () => {
        emit('delete');
      };

      const handleChangeButtonClick = () => {
        fileUploadRef.value?.openUploadFile();
      };

      return {
        handleSelectedLogoEvent,
        handleDelete,
        handleChangeButtonClick,
        supportedTypes,
        fileUploadRef,
      };
    },
  });
</script>
