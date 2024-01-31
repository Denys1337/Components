<template>
  <div class="AtFormElementNotes d-flex flex-column">
    <div
      class="AtFormElementNotes-scrollarea styled-scroll"
      :style="{
        overflowY: showMoreButton && isShowMoreButtonVisible ? 'hidden' : 'auto',
      }"
      ref="questionNotesElement"
    >
      <div class="AtFormElementNotes-note pad-02-00" v-for="note of notes" :key="note.text">
        <div class="d-flex jc-space-between">
          <div class="d-flex flex-column">
            <span class="font-body-default-b">{{ note.lastEditor }} </span>
            <span class="AtFormElementNotes-note-text font-body-default word"
              >{{ note.text }}
            </span>
          </div>
          <span class="font-subtext flex-shrink-0">{{ note.lastUpdate }} </span>
        </div>
        <AtFilesListDisplay
          :files-to-display="note.files"
          @load-file-src="$emit('load-file-src', $event)"
        />
      </div>
    </div>
    <AtButton
      visual="text"
      class="AtFormElementNotes-show-more"
      v-if="showMoreButton && isShowMoreButtonVisible"
      @click="showRest"
    >
      <span class="font-bold">{{ $t('certifications.execution.notes.show_more') }}</span>
    </AtButton>
  </div>
</template>
<script lang="ts">
  import { defineComponent, nextTick, PropType, ref, watch } from 'vue';

  import AtButton from '../../../../at_button/AtButton.vue';
  import AtFilesListDisplay from '../../../../at_file_upload/AtFilesListDisplay.vue';
  import { AtFormQuestionNote, RepeatableNotes } from '../../types';

  export default defineComponent({
    name: 'AtFormElementNotes',
    components: {
      AtButton,
      AtFilesListDisplay,
    },
    props: {
      notes: {
        type: Array as PropType<AtFormQuestionNote[] | RepeatableNotes>,
        default: () => [],
      },
      showMoreButton: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['load-file-src'],
    setup(props) {
      const questionNotesElement = ref<HTMLElement>();
      const isShowMoreButtonVisible = ref<boolean>();

      watch(
        () => props.notes,
        () => {
          nextTick(() => {
            if (questionNotesElement.value) {
              questionNotesElement.value!.scrollTop = 0;
              isShowMoreButtonVisible.value = questionNotesElement.value!.scrollHeight >= 350;
            }
          });
        },
        {
          deep: true,
          immediate: true,
        }
      );

      const showRest = () => {
        isShowMoreButtonVisible.value = false;
      };

      return {
        isShowMoreButtonVisible,
        questionNotesElement,
        showRest,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .AtFormElementNotes {
    &-scrollarea {
      max-height: 350px;
      overflow-y: hidden;
    }

    &-note {
      border-bottom: 1px solid var(--gray-400);

      &:last-child {
        border-bottom: none;
      }

      &-image {
        max-width: 90px;
        height: auto;
        border-radius: 10%;
      }

      &-text {
        word-break: break-word;
      }
    }

    &-show-more {
      align-self: center;
      transform: translateY(50%);
    }
  }
</style>
