<template>
  <div class="ImagesCell" :class="{ 'no-images': !sliderPictures.length }">
    <PictureSlider
      open-on-click
      :autoplay="0"
      :pictures="sliderPictures"
      v-if="sliderPictures.length"
    >
      <div class="container">
        <PhotoIcon :size="iconSize" class="text-gray-800" />
        <span class="images-count"> {{ getImagesCountTranslated() }} </span>
      </div>
    </PictureSlider>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, defineAsyncComponent, PropType } from 'vue';

  import { PhotoIcon } from 'vue-tabler-icons';

  import { SliderPic } from '../../../slider/interfaces';
  import getTranslators from '../../../utils/getTranslators';

  const PictureSlider = defineAsyncComponent(() => import('../../../slider/PictureSlider.vue'));

  export default defineComponent({
    name: 'ImagesCell',
    components: { PhotoIcon, PictureSlider },
    props: {
      modelValue: { type: Array as PropType<string[]>, default: () => [] },
      column: { type: Object, required: true },
      iconSize: { type: String, default: '24' },
    },
    setup(props) {
      const { t } = getTranslators('tables');
      const sliderPictures = computed<SliderPic[]>(() =>
        props.modelValue.map((src) => ({
          thumbSrc: src,
          src,
          caption: '',
          alt: '',
          title: '',
        }))
      );
      function getImagesCountTranslated() {
        return t('cells.images.count', sliderPictures.value.length, {
          count: sliderPictures.value.length,
        });
      }
      return { sliderPictures, getImagesCountTranslated };
    },
  });
</script>

<style lang="scss">
  .ImagesCell {
    width: max-content;
    cursor: pointer;
    .container {
      display: flex;
      gap: var(--spacing-02);
      .icon {
        color: var(--gray-900);
        display: inline;
      }
      .images-count {
        align-self: flex-end;
        color: var(--pri-500);
        text-decoration: underline;
      }
    }
    &.no-images {
      pointer-events: none;
      .images-count {
        text-decoration: none;
        color: var(--gray-700);
      }
    }
  }
</style>
