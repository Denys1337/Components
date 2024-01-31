<template>
  <div class="AtFileDisplay d-flex flex-col font-subtext">
    <div class="image-container rounded-02">
      <img v-if="fileSrc" loading="lazy" :src="fileSrc" class="image rounded-02" />
      <Loader v-else />
    </div>
    <span v-if="displayFileName && file.fileName">{{ getTruncatedString(file.fileName) }}</span>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref, watch } from 'vue';

  import useTruncatedString from '../hooks/useTruncate';
  import Loader from '../loaders/loader/Loader.vue';
  import { FileToDisplay } from './types';

  export default defineComponent({
    name: 'AtFileDisplay',
    components: { Loader },
    props: {
      file: { type: Object as PropType<FileToDisplay>, required: true },
      displayFileName: { type: Boolean, default: false },
    },
    emits: ['load-file-src'],
    setup(props, { emit }) {
      const fileSrc = ref('');
      const setFileSrc = (src: string) => {
        fileSrc.value = src;
      };

      const loadFileSrc = (uuid: string) => {
        if (props.file.src) {
          fileSrc.value = props.file.src;
        } else {
          emit('load-file-src', { uuid, setFileSrc });
        }
      };

      loadFileSrc(props.file.uuid);

      watch(
        () => props.file.uuid,
        (uuid) => {
          loadFileSrc(uuid);
        }
      );

      function getTruncatedString(fileName: string) {
        return useTruncatedString(fileName, 12).value;
      }

      return { fileSrc, getTruncatedString };
    },
  });
</script>

<style lang="scss">
  .AtFileDisplay {
    .image-container {
      width: 108px;
      height: 108px;
      background-color: var(--gray-400);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    span {
      align-self: center;
      color: var(--gray-900);
    }
  }
</style>
