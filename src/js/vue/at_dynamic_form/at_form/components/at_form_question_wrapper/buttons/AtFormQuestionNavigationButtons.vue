<template>
  <div class="AtFormQuestionNavigationButtons d-flex jc-space-between">
    <div>
      <AtButton v-if="showPrevButton" @click="$emit('back')" visual="secondary">
        <template #start>
          <Component :is="iconMap.previous" size="16" />
        </template>
        {{ $t('general.previous') }}
      </AtButton>
    </div>
    <div>
      <AtButton v-if="showNextButton && !showSubmitButton" @click="$emit('next')">
        <template #end>
          <Component :is="iconMap.next" size="16" />
        </template>
        {{ $t('general.next') }}
      </AtButton>
      <AtButton v-if="showSubmitButton" @click="$emit('submit')" :disabled="isSubmitDisabled">
        <template #start>
          <CheckIcon size="16" />
        </template>
        {{ $t('general.submit') }}
      </AtButton>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { ArrowLeftIcon, CheckIcon, ArrowRightIcon } from 'vue-tabler-icons';

  import AtButton from '../../../../../at_button/AtButton.vue';
  import { isRTL } from '../../../../../utils/styling';
  export default defineComponent({
    name: 'AtFormQuestionNavigationButtons',
    components: { ArrowLeftIcon, CheckIcon, ArrowRightIcon, AtButton },
    props: {
      showPrevButton: {
        type: Boolean,
      },
      showSubmitButton: {
        type: Boolean,
      },
      showNextButton: {
        type: Boolean,
      },
      isSubmitDisabled: {
        type: Boolean,
      },
    },
    emits: ['submit', 'next', 'back'],
    setup() {
      const isRtl = isRTL();

      const iconMap = {
        next: isRtl ? ArrowLeftIcon : ArrowRightIcon,
        previous: isRtl ? ArrowRightIcon : ArrowLeftIcon,
      };

      return {
        iconMap,
      };
    },
  });
</script>
