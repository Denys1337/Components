<template>
  <div class="AtFilesListDisplay gap-04">
    <div v-for="(file, index) in filesToDisplay" :key="file.uuid" class="p-relative">
      <AtButton
        is-square
        size="s"
        class="delete-button"
        visual="text"
        @click="deleteFile(index)"
        v-if="deleteIconSize"
      >
        <template #start>
          <CircleXIcon :size="deleteIconSize" />
        </template>
      </AtButton>
      <AtFileDisplay
        :file="file"
        :display-file-name="displayFileName"
        @load-file-src="$emit('load-file-src', $event)"
      />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  import { CircleXIcon } from 'vue-tabler-icons';

  import AtButton from '../at_button/AtButton.vue';
  import AtFileDisplay from './AtFileDisplay.vue';
  import { FileToDisplay } from './types';

  export default defineComponent({
    name: 'AtFilesListDisplay',
    components: { CircleXIcon, AtButton, AtFileDisplay },
    props: {
      filesToDisplay: { type: Array as PropType<FileToDisplay[]>, default: () => [] },
      deleteIconSize: { type: Number },
      displayFileName: { type: Boolean, default: false },
    },
    emits: ['delete-file', 'load-file-src'],
    setup(_, { emit }) {
      function deleteFile(index: number) {
        emit('delete-file', index);
      }

      return { deleteFile };
    },
  });
</script>
<style lang="scss">
  .AtFilesListDisplay {
    display: inline-flex;
    flex-wrap: wrap;
    .delete-button {
      position: absolute;
      inset-inline-end: -10%;
      inset-block-start: -10%;
      .icon-tabler {
        stroke-width: 1;
        circle {
          stroke: var(--gray-300);
        }
        fill: var(--gray-100);
        stroke: var(--gray-900);
      }
    }
    .delete-button:hover {
      .icon-tabler {
        fill: var(--gray-300);
      }
    }
  }
</style>
