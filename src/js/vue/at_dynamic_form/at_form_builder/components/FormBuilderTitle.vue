<template>
  <header class="FormBuilderTitle jc-space-between w-100 d-flex pad-block-04 pad-inline-06">
    <div class="d-flex ai-center">
      <AtButton class="secondary inline-end-07" @click="handleBackButtonClick" is-square>
        <ArrowLeftIcon class="rotate-180-rtl" size="24" />
      </AtButton>

      <slot name="logo"></slot>

      <h3 class="font-title-x-large" :title="title">{{ truncatedTitle }}</h3>
      <AtButton visual="tertiary" @click="$emit('open-edit')" :size="ButtonSize.m">
        <template #start>
          <PencilIcon size="16" />
        </template>
        {{ $t(prefixFormBuilder + '.edit') }}
      </AtButton>
    </div>
    <div class="actions-wrapper d-flex flex-wrap">
      <AtButton
        :disabled="disableSaveButtons"
        :loading="isLoading && activeButton === 'save'"
        v-if="displaySaveButton"
        class="secondary inline-end-04"
        @click="save"
      >
        {{ $t(prefixFormBuilder + '.save') }}</AtButton
      >
      <AtButton
        :disabled="disableSaveButtons"
        :loading="isLoading && activeButton === 'publish'"
        @click="publish"
      >
        <template #start>
          <CheckIcon size="16" />
        </template>
        {{ $t(prefixFormBuilder + '.publish') }}
      </AtButton>
    </div>
  </header>
</template>
<script lang="ts">
  import { toRef, defineComponent, ref } from 'vue';

  import { ArrowLeftIcon, CheckIcon, PencilIcon } from 'vue-tabler-icons';

  import AtButton from '../../../at_button/AtButton.vue';
  import { ButtonSize } from '../../../at_button/types';
  import useTruncate from '../../../hooks/useTruncate';

  export default defineComponent({
    name: 'FormBuilderTitle',
    components: { AtButton, ArrowLeftIcon, CheckIcon, PencilIcon },
    props: {
      title: { type: String, required: true },
      isLoading: { type: Boolean, default: false },
      disableSaveButtons: { type: Boolean, default: false },
      displaySaveButton: {
        type: Boolean,
        required: true,
      },
      prefixFormBuilder: {
        type: String,
        required: true,
      },
    },
    emits: ['save', 'publish', 'open-edit', 'back'],
    setup(props, { emit }) {
      const activeButton = ref('');
      const save = () => {
        activeButton.value = 'save';
        emit('save');
      };

      const publish = () => {
        activeButton.value = 'publish';
        emit('publish');
      };

      const handleBackButtonClick = () => {
        emit('back');
      };

      const title = toRef(props, 'title');
      const truncatedTitle = useTruncate(title, 35);

      return {
        handleBackButtonClick,
        activeButton,
        save,
        publish,
        truncatedTitle,
        ButtonSize,
      };
    },
  });
</script>
<style lang="scss">
  .FormBuilderTitle {
    align-items: center;
    background: var(--white);
    border-block-start: 1px solid var(--gray-400);
    border-block-end: 1px solid var(--gray-400);
  }
</style>
