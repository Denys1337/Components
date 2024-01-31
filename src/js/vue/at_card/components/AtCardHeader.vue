<template>
  <section
    class="AtCard-header d-flex pad-block-end-06 pad-inline-06"
    :class="{ 'border-bottom': showBorderBottom }"
  >
    <slot name="startHeader">
      <LogoUploadingDisplay :size="imageSize" class="logo" :image-url="imageUrl" v-if="showImage" />
    </slot>
    <div class="d-flex flex-column inline-end-04">
      <slot name="beforeEndHeader"></slot>
      <div class="AtCard-title font-title-large text-gray-1000 block-end-01">
        <slot name="endHeaderTitle">
          <span v-if="title" ref="titleCardRef" :title="title">
            {{ truncatedTitle }}
          </span>
        </slot>
      </div>
      <div class="font-body-small text-gray-900">
        <slot name="endHeaderSubtitle">
          <span v-if="subTitle" :title="subTitle">{{ subTitle }}</span>
        </slot>
      </div>
      <slot name="afterEndHeader"></slot>
    </div>
    <Tooltip :reference="titleCardRef" v-if="titleCardRef && showTooltip">{{ title }}</Tooltip>
  </section>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, defineAsyncComponent } from 'vue';

  import LogoUploadingDisplay from '../../at_file_upload/components/LogoUploadingDisplay.vue';
  const Tooltip = defineAsyncComponent(
    () => import(/* webpackChunkName: "Tooltip" */ '../../tooltip/Tooltip.vue')
  );
  import { ElementReference } from '../../tooltip/types';
  import { truncateString } from '../../utils/truncateString';
  import { TITLE_MAX_LENGTH } from '../types';

  import '../at-card.scss';
  export default defineComponent({
    name: 'AtCardHeader',
    components: {
      LogoUploadingDisplay,
      Tooltip,
    },

    props: {
      imageSize: { type: String, default: '44' },
      imageUrl: { type: String },
      showBorderBottom: { type: Boolean, default: true },
      showImage: { type: Boolean, default: false },
      subTitle: { type: String },
      title: { type: String },
    },
    setup(props) {
      const titleCardRef = ref<ElementReference>();
      const truncatedTitle = props.title ? truncateString(props.title, TITLE_MAX_LENGTH) : '';
      const showTooltip = computed(() => props.title && props.title.length > TITLE_MAX_LENGTH);
      return {
        titleCardRef,
        truncatedTitle,
        TITLE_MAX_LENGTH,
        showTooltip,
      };
    },
  });
</script>
