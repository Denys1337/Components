<template>
  <section
    class="EmptyStateMessage text-align-center"
    :style="imageWidthCss"
    :class="{ 'ab-center': centerWithAbsolute, flex: !centerWithAbsolute }"
  >
    <slot name="image-logo"></slot>
    <h2 class="empty-state-title block-start-04 block-end-02 font-title-medium text-gray-900">
      {{ $t(titleI18n!) }}
    </h2>
    <h3 class="empty-state-description block-start-02 block-end-04 font-body-default text-gray-900">
      {{ $t(descriptionI18n) }}
    </h3>
    <AtButton
      v-if="showActionButton"
      :tag="buttonTag"
      :href="buttonHref"
      size="m"
      class="secondary action-button"
      @click="$emit('click')"
    >
      <template #[iconPosition] v-if="buttonIcon"
        ><Component :is="buttonIcon" :size="buttonIconSize"
      /></template>
      {{ $t(actionTextI18n) }}
    </AtButton>
  </section>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import AtButton from '../at_button/AtButton.vue';
  import { EmptyStateMessageVueProps } from './types';

  export default defineComponent({
    name: 'EmptyStateMessage',
    components: { AtButton },
    props: EmptyStateMessageVueProps,
    emits: ['click'],
    setup(props) {
      const imageWidthCss = {
        '--image-width': `${props.imgWidth}px`,
      };
      return {
        imageWidthCss,
      };
    },
  });
</script>
<style lang="scss">
  @import '../../../style/scss/_base_functions.scss';
  @import '@style/scss/_mixin';

  .EmptyStateMessage {
    &.flex {
      display: flex;
      align-items: center;
      flex-flow: column;
    }
    &.ab-center {
      @include ltr-rtl(transform, translate(-50%, -50%), translate(50%, -50%));
      position: absolute;
      inset-inline-start: 50%;
      inset-block-start: 50%;
      img {
        margin-inline: auto;
      }
    }

    img {
      width: var(--image-width);
    }
    .AtButton {
      color: var(--pri-500);
    }
  }
</style>
